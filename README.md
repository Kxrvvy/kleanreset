# Kleanreset

A booking and quote-request website built for **Kleanreset**, a residential and commercial cleaning business in Edmonton, Alberta. Live at **[kleanreset.com](https://kleanreset.com)**.

This isn't a template. It's a purpose-built system: a live-pricing booking engine that adapts its fields and its price logic to what a customer selects, a transactional email pipeline that notifies the business and confirms the customer, and a full marketing site — all typed end to end so that an invalid booking is, as much as possible, impossible to submit.

---

## What this project demonstrates

Most small-business "booking" sites are either a static contact form or an expensive third-party embed (Calendly, SimplyBook) that doesn't understand the business's actual pricing. This project sits in between: a fully custom booking flow that **computes a real, itemized price live**, based on rules specific to a cleaning business — bedrooms, bathrooms, square footage, room counts for carpet work, and category-specific logic for residential, commercial, and vacation-rental jobs.

The interesting engineering problem here wasn't the UI. It was making sure that **a "Commercial" booking could never accidentally carry residential fields**, that **a Carpet booking always fixed-prices correctly regardless of category**, and that **the price shown to the customer and the price computed on the server can never drift apart** — because both read from the same source of truth.

---

## Why a business like this needs something like this

A newly started cleaning business typically faces a specific problem: they're good at cleaning, not at building software, and every existing option is a bad trade-off.

- **A plain contact form** collects a name and a vague message. The business then has to call the customer back just to find out what they actually need, how big the space is, and what it'll cost — friction on both sides, and a slower sales cycle.
- **A generic booking widget** (Calendly, etc.) handles scheduling but knows nothing about *cleaning* — it can't tell a 1-bedroom condo from a 4-bathroom office, so it can't price the job. The business ends up quoting everything manually anyway.
- **A custom-built system**, done right, closes that gap: the customer tells the site exactly what they need, the site tells them exactly what it costs (or that it needs a human quote, and why), and the business receives a fully structured request by email — ready to confirm, not something they have to decode.

That's what this project is: the customer does the work of specifying the job upfront, so the business's job becomes *confirming a time*, not *reconstructing a quote from a voicemail*.

**Deliberately, this is not a real-time booking system.** There's no calendar, no slot-locking, no double-booking logic — because a small, one-crew cleaning business doesn't run its actual scheduling through software; the owner checks a physical or personal calendar and replies. Building a fake "confirmed" booking experience on top of that would be dishonest to the customer. So every request is explicitly a *request* — the copy says so, the emails say so — and the business confirms or proposes an alternative time by replying directly to the customer's email. The system is scoped to the problem the business actually has, not the problem a generic SaaS product assumes every business has.

---

## Architecture

```
app/                          Routes (App Router) — one page per business page
  layout.tsx                  Root layout — metadata, JSON-LD, fonts, Analytics, Speed Insights
  page.tsx                    Home
  manifest.ts                 → /manifest.webmanifest (PWA metadata)
  opengraph-image.tsx         Generated 1200×630 social-share image
  robots.ts                   → /robots.txt
  sitemap.ts                  → /sitemap.xml, submitted to Google Search Console
  about/                      About ("Why Kleanreset")
    work/                     "Our Work" — Facebook-style photo feed of completed jobs
  services/                   Service list, live pricing table, checklists
  booking/                    The booking form
  contact/                    General-purpose inquiry form
  api/booking/                Server route — validates + emails a booking request
  api/contact/                Server route — validates + emails a contact inquiry

components/
  ui/                     Design-system primitives (Button, Section, Eyebrow, TalkToUs)
  layout/                 Nav (route-aware, scroll-reactive, dropdown on About), Footer
  home/                   Hero, trust bar, services, intro, why, how, testimonials, CTA
  about/, services/       Page-specific sections
  work/                   The photo gallery: job feed, photo-count-aware clustering
                          (1/2/3/4/5+ layouts), and the modal viewer
  booking/                The form: nine field sections + a live-updating summary
  contact/                The general inquiry form

lib/
  pricing.ts              estimate() — the ONLY place a price is computed
  bookingSchema.ts         Runtime validation (zod), mirrors the TS types
  workData.ts              The completed-jobs feed data (caption + photo set per job)
  resend.ts                Email-sending client
  seo.ts                   Site-wide constants, per-page metadata, structured data (JSON-LD)

types/
  booking.ts               The compile-time contract every booking conforms to

emails/
  layout.ts                 Shared HTML email shell/styling
  bookingNotification.ts    → the business, full structured request
  bookingConfirmation.ts    → the customer, "request received"
  contactNotification.ts    → the business, general inquiry
```

**The core design decision:** pricing logic lives in exactly one function, `estimate()`, in `lib/pricing.ts`. No component ever computes a price. The live sidebar on the booking page and the server-side email pipeline both call the same function — so the number a customer sees while filling out the form is *provably* the same number that gets emailed to the business. There's no second implementation to drift out of sync.

---

## The booking engine

This is the part of the project with real complexity, so it's worth explaining how it works rather than just what it does.

### One form, four different shapes

A booking isn't one kind of thing. A residential Standard clean needs bedrooms and bathrooms. A Carpet job needs a room count and whether there are stairs — bedrooms are meaningless to it. A Commercial job needs a business type and building square footage. A Vacation Rental booking needs guest capacity and turnover timing.

Rather than one bloated form object with fields that are sometimes irrelevant, the property details are modeled as a **discriminated union** — four distinct shapes, tagged by a `kind` field:

```ts
export type PropertyDetails =
  | ResidentialProperty   // bedrooms, bathrooms, floors, pets
  | CarpetProperty        // room count, stairs, description
  | CommercialProperty    // business type, sq ft, restrooms, frequency
  | VacationRentalProperty // guest capacity, checkout/checkin, linens
```

TypeScript enforces this at compile time: code that hasn't checked `property.kind === "commercial"` yet is *not allowed* to read `property.buildingSize` — the compiler blocks it. Selecting Carpet inside the Residential form doesn't just show different inputs; it swaps the underlying data shape, replacing bedroom/bathroom fields with room-count fields entirely.

### Two layers of validation, one set of rules

The same shape is described twice, on purpose:

- **`types/booking.ts`** — the compile-time contract. Catches mistakes in the code itself, before it ever runs.
- **`lib/bookingSchema.ts`** — a `zod` schema describing the identical shape, but enforced at *runtime*, against real user input. A discriminated union in zod mirrors the TypeScript one exactly, so a Carpet submission is validated only against carpet rules — it structurally cannot carry a bedroom count.

Both the form and the API route use this same schema. A malformed request that somehow bypasses client-side validation is re-validated on the server before anything is emailed.

### Pricing is a pure function, not a component

```ts
estimate(category, service, property, extras) → Estimate
```

`Estimate` is itself a small discriminated union:

- **`{ mode: "price", subtotal, tax, total, hours? }`** — a firm, bookable price
- **`{ mode: "quote", reason }`** — no number; the business will follow up

Standard, Deep, and Airbnb Turnover cleans price by time — a base duration plus additional time per extra bedroom and bathroom, with **Deep cleans weighted more heavily per bathroom than per bedroom**, reflecting that grout, descaling, and detail work in a bathroom takes measurably longer than dusting a bedroom. Carpet cleaning prices flatly per room (stairs and hallways counted as rooms), regardless of category. Commercial cleaning produces a clearly labeled rough estimate from square footage, with the real number always following as a human-confirmed quote — because commercial jobs vary too much (kitchens, restrooms, frequency contracts) to respectably auto-price. Every price includes 5% GST, computed once, not duplicated in the UI and the backend.

The summary sidebar on the booking page doesn't know any of this. It receives an `Estimate` and switches on its `mode` — the pricing logic itself is invisible to the UI layer entirely.

---

## The "Our Work" gallery

Trust, for a cleaning business, is largely visual — a customer wants to see finished spaces before they hand over their keys. `/about/work` presents completed jobs as a feed of posts (`lib/workData.ts` — a caption plus a set of photos per job), each rendered with photo-count-aware layout logic modeled on how Facebook and Messenger group images:

- 1 photo → full width
- 2 photos → even split
- 3 photos → one large, two stacked
- 4 photos → a 2×2 grid
- 5+ photos → a 2×2 grid with a "+N" overlay on the last tile

Clicking any photo opens a modal — a framed card (not a bare image on a dimmed backdrop), with the job's caption and a page counter inside the frame, and carousel-style navigation scoped to that job's own photos only. Currently populated with 57 real photos across four completed jobs.

## The email pipeline

Booking and contact submissions are transactional email, not a database write — this is intentional. There's no admin dashboard because the business doesn't need one; the business's dashboard *is* their email inbox.

1. Customer submits the booking form with a **preferred**, not guaranteed, date and time
2. The server re-validates the full payload against the same zod schema the form uses
3. Two emails send via **Resend**, from a fully authenticated custom domain:
   - To the business — full structured request detail, with **Reply-To set to the customer's email**, so replying from Gmail goes straight back to the customer with zero extra steps
   - To the customer — an acknowledgement that explicitly does not claim the booking is confirmed, and sets a 24-hour expectation
4. The business replies to confirm the time, or to propose an alternative if they're unavailable

Mail sends from `kleanreset.com`, with DKIM, SPF, and DMARC all verified — the domain is fully authenticated, so notifications land in the inbox rather than spam.

---

## SEO & discoverability

Beyond Search Console verification, the app generates its own SEO surface rather than relying on static files bolted on afterward:

- **`app/sitemap.ts`** and **`app/robots.ts`** — generated at request time from the same route structure the app actually has, so they can't drift out of sync with real pages the way a hand-maintained `sitemap.xml` can.
- **`app/opengraph-image.tsx`** — a 1200×630 social preview image generated by Next.js itself, so links to the site render properly with an image when shared on Facebook, Messenger, or iMessage rather than showing a blank card.
- **`lib/seo.ts`** — centralizes the site's name, description, and URL in one place, exposes a `pageSeo()` helper each route uses to build its own `<title>`/description, and emits JSON-LD structured data describing Kleanreset as a `LocalBusiness` — the same kind of markup that lets Google show a business's address, hours, and rating directly in search results, rather than just a blue link.
- **`app/manifest.ts`** — basic PWA metadata (app name, icons, theme color), which also improves how the site is treated if someone adds it to their phone's home screen.

## Tech stack

| | |
|---|---|
| Framework | Next.js (App Router), TypeScript (`strict`) |
| Styling | Tailwind CSS v4 — CSS-first `@theme` tokens, no config file |
| Forms | react-hook-form + zod, shared client/server validation |
| Email | Resend, on a verified custom domain |
| Hosting | Vercel, custom domain, automatic HTTPS |
| DNS / Domain | Namecheap (kleanreset.com) |
| Icons | lucide-react |
| SEO | Generated sitemap/robots/OG image, LocalBusiness JSON-LD, Google Search Console verified |

**Why App Router + Server Components by default:** every page that's pure content (Home, About, Services) ships zero client-side JavaScript for its markup — it renders to HTML on the server and stops. Interactivity (the booking form, the nav's scroll behavior, the photo gallery modal) is isolated to the specific components that need it, each opting in explicitly with `"use client"`. The result is a site where the heavy logic — pricing, validation, form state — never costs the visitor anything until they're actually on the page that needs it.

**Why Tailwind v4's `@theme` over a config file:** every color, radius, and font in this project is a named design token (`pine`, `mint`, `sea-mist`, `rounded-card`...), not a hardcoded value. A component never contains a hex code. Changing the brand green changes it everywhere, once.

---

## Infrastructure

| | |
|---|---|
| Domain | `kleanreset.com` — registered via Namecheap, 3-year term, auto-renew enabled, free WHOIS privacy |
| Hosting | Vercel, connected via A/CNAME records, automatic SSL |
| Email sending | Resend, verified on the root domain (DKIM, SPF, DMARC) |
| Analytics | Vercel Web Analytics + Speed Insights |
| Search | Verified in Google Search Console, sitemap submitted, indexing requested |

Environment variables (set in Vercel's project settings, and locally in `.env.local`, untracked):

```
RESEND_API_KEY=       # from resend.com
RESEND_FROM_EMAIL=    # noreply@kleanreset.com
BUSINESS_EMAIL=       # the business's real inbox
```

> The app itself lives one directory inside this repository, at `kleanreset/` —
> Vercel's Root Directory is configured to point there.

---

## Status

The site is live in production at **kleanreset.com** — fully custom domain, fully authenticated email sending, all four marketing pages, the complete booking flow with live pricing, the contact form, and the photo gallery all working end to end. Search Console is verified and indexing is underway.

Outstanding before this is fully client-ready:
- **Legal review** — the Privacy Policy page are structurally complete but contain placeholder legal language; they need review by the client or a lawyer before being treated as final.
- **Content substantiation** — any trust-signal copy on the site (guarantees, service claims) should be double-checked against what the business can actually stand behind before public launch.
- **Hosting plan** — the project currently runs on Vercel's Hobby tier, which is scoped to non-commercial use; moving to Pro is worth a conscious decision once the site is taking real customer bookings.
