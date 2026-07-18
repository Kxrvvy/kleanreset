# CLAUDE.md — Kleanreset

Context for AI assistants working in this repo. Read fully before writing code.

---

## 1. What this is

Marketing + booking site for **Kleanreset**, a cleaning service in **Edmonton, Alberta, Canada**.
Serves homes, Airbnbs, dental clinics, and offices.

**The site's job:** capture booking requests and quote requests, and email them to the
business. That's it.

**Critically — this is NOT a booking system.** There is no real-time availability, no slot
locking, no calendar integration, no client accounts, no payments. A submission is a
*request*. A human at Kleanreset reads the email and replies.

### How a booking actually works (the confirmed model)

1. Customer fills the form and submits a **preferred** date + arrival time (never a locked slot).
2. Two emails fire automatically (see §11): one to Kleanreset, one acknowledging the customer.
3. A human at Kleanreset checks their real schedule (external to this site — the site has no
   calendar).
4. **If the preferred slot is free** → they reply confirming it.
   **If it isn't** → they reply proposing specific alternative date/times.
5. All confirmation and negotiation happens human-to-human over email/phone. The site's job
   ends when the request is delivered.

This governs copy everywhere. The automatic acknowledgement email and the thank-you page say
**"we've received your request"** and set the expectation of a reply within 24 hours — they
**never** say "confirmed" or "booked." Nothing is confirmed until a human replies.

The form fields say **"Preferred date"** and **"Preferred arrival time"** deliberately — that
wording signals request, not reservation. Keep it.

---

## 2. Stack

- Next.js (App Router) + TypeScript, `strict: true`
- Tailwind CSS v4 (CSS-first `@theme`, **no `tailwind.config.ts`**)
- `next/font/google` — self-hosted, no CDN links
- Planned: `react-hook-form` + `zod` for the booking form
- Planned: Resend via a Route Handler for email

No `src/` directory. `app/`, `lib/`, `types/`, `components/` are all root-level siblings.
Path alias is `@/*` → `./*`.

---

## 3. Structure

```
app/
  globals.css        # @theme tokens — single source of truth
  layout.tsx         # fonts, metadata, Nav + Footer
  page.tsx           # Home
  about/ services/ booking/
  api/booking/route.ts   # (later) email endpoint
components/
  ui/                # Button, Eyebrow, primitives
  layout/            # Nav, Footer
lib/
  pricing.ts         # estimate() — pure, no React
types/
  booking.ts         # BookingPayload — the contract
```

---

## 4. Tailwind v4 — read this before touching styles

**The `@theme` variable prefix determines which utilities get generated.** This is a
namespace, not decoration.

| Prefix | Generates |
|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*` |
| `--font-*` | `font-*` |
| `--radius-*` | `rounded-*` |

`--color-pine` → `bg-pine` works. `--pine` → `bg-pine` **generates nothing, silently.**
No error, no warning — the class just doesn't exist and the element renders unstyled.
This has already bitten this project once. If a class appears to do nothing, check the
prefix first.

**Never use a colour not in the table below.** Never hardcode a hex in a component.

### Tokens

**Greens**
| Token | Hex | Use |
|---|---|---|
| `pine` | `#0E4D3C` | Primary. Buttons, selected borders, summary header, eyebrows |
| `pine-deep` | `#0A3729` | Dark bands: footer, "Why Kleanreset", About promise |
| `mint` | `#15C79A` | Accent: checkmarks, step badges, focus rings, toggles |
| `mint-bright` | `#1FE0AD` | Hover/glow, strip tagline, gradient ends |
| `celadon` | `#7FDDC0` | Description text on dark backgrounds |
| `sea-mist` | `#DDF3EB` | Soft wash: icon chips, pills, hero gradients. Often `/4` opacity |

**Neutrals** (green-tinted, not pure grey)
| Token | Hex | Use |
|---|---|---|
| `paper` | `#F9F9F9` | Page background |
| `paper2` | `#FBFCF9` | Alternating sections |
| `card` | `#FFFFFF` | Card background |
| `field` | `#F4F6F1` | Booking page inputs |
| `line` | `#E6E9E3` | Borders, dividers |
| `ink` | `#10241C` | Headings, body |
| `ink-soft` | `#4C5A52` | Secondary text, labels |

**Accents** — use sparingly
| Token | Hex | Use |
|---|---|---|
| `lemon` | `#F4C64B` | Logo dot, "deep clean" badge |
| `star-gold` | `#F0B21B` | Rating star only |

Opacity via slash syntax: `bg-sea-mist/4`. Don't create separate faded tokens.

### Radii
`rounded-card` (16px) · `rounded-pill` (999px). The design is heavily rounded. Avoid
arbitrary `rounded-[Npx]`.

### Fonts

| Class | Font | Use |
|---|---|---|
| `font-display` | Bricolage Grotesque | Headlines. Chunky, geometric, usually weight 800 |
| `font-sans` | Hanken Grotesk | Body, UI, labels. Default on `<body>` |
| `font-mono` | Space Mono | Eyebrow labels, pricing tables, small caps details |

The bridge (`--font-sans: var(--font-hanken-grotesk)`) is required. Without it `font-sans`
silently falls back to Arial.

---

## 5. Business rules

### Category → services

A category unlocks a specific service list. Do not offer all services in all categories.

| Category | Services | Estimate mode |
|---|---|---|
| Residential | Standard, Deep, Carpet | Live **price** (Carpet → quote) |
| Commercial | Commercial Clean, Carpet | Rough **estimate** + "final quote follows" (Carpet → quote) |
| Vacation Rental | Turnover, Standard, Deep | Live **price** |

### The three estimate modes

The summary sidebar switches on `Estimate.mode`. This is a structural difference, not just a
value — handle it with the discriminated union from `estimate()`, never a conditional number.

| Mode | Shows | Submit button |
|---|---|---|
| `price` | Firm hours + total | "Book My Cleaning" |
| `estimate` | Rough total, clearly labelled "final quote within 24 hours" | "Request My Quote" |
| `quote` | No number — "We'll send your quote within 24 hours" | "Request My Quote" |

### Pricing (residential + vacation rental)

Rate: **$50/hour**, CAD, excludes tax.

```
Standard: 1.5 + 0.5×(beds−1) + 0.5×(baths−1)  hours
Deep:     3.0 + 0.5×(beds−1) + 0.5×(baths−1)  hours
Turnover: 2.0 + 0.5×(beds−1) + 0.5×(baths−1)  hours   (vacation rental)
Total = hours × $50 + extras
```

- **Carpet** never produces a number, in any category → `quote`.
- **Commercial** produces a *rough* courtesy `estimate` off building size, clearly labelled as
  non-binding. Built so it can be flipped to pure `quote` by changing one line if the client
  prefers. The real number always comes from a human.

All pricing lives in `lib/pricing.ts`. Never compute a price in a component.

### Known inconsistency — do not "fix" silently

The published Services page table lists 2bed·2bath Deep at **$225**. The formula yields
**$200**. The formula is what we implement; the marketing table needs correcting to match.
**The calculator and the published table must agree exactly** — different numbers in two
places is a trust problem. Flag, don't paper over.

---

## 6. TypeScript conventions

- **String literal unions over `string`** for any fixed set of values.
- **`Record<K, V>` for variant maps** — forces exhaustiveness.
- **`ComponentProps<T>`** to inherit native element props. Never hand-list them.
- **Discriminated unions for shape-varying data.** `PropertyDetails` is keyed on `kind`
  (three branches — see §6a); `Estimate` on `mode` (three modes). Narrow with
  `if (x.kind === "...")` before accessing branch-specific fields.
- **`href?: never`** is how `Button` makes its link/button variants mutually exclusive.
- Strip custom props by destructuring before spreading onto DOM elements.

`types/booking.ts` is the contract: the form writes it, the sidebar reads it, the API route
validates it, the emails render from it. One source of truth.

### 6a. PropertyDetails is a THREE-branch union

The prototype proved each category collects a different shape. `kind` is the discriminator.

- **`residential`** — propertyType, sqft?, bedrooms, bathrooms, floors, hasPets
- **`commercial`** — businessName, businessType, buildingSize, floors, restrooms,
  meetingRooms, frequency, hasReception, hasKitchen, parkingAvailable
- **`vacation_rental`** — propertyType, sqft?, bedrooms, bathrooms, guestCapacity,
  guestCheckoutTime?, nextCheckinTime?, linenReplacement, towelReplacement, supplyRestocking

Extras now include `high_dusting`. Access now includes `gateCode?`.

---

## 7. Localisation — Canadian, not American

The design mockups AND the prototype contain US address fields. **They are wrong.**

- **Province**, not State. Dropdown of 13 codes, default `AB`
- **Postal Code**, not Zip. Format `A1A 1A1`, uppercase on blur
  - `/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/`
- Currency is CAD. Prices exclude tax — say so
- Phone: `780` area code

---

## 8. Content bugs in the mockups

Known design errors. Fix while building; don't reproduce faithfully.

**Services page**
- "**Six** ways we keep your space spotless" — there are **eight** cards
- "Decluttering / Organizing" card describes *window* cleaning. Rewrite
- Card CTAs are arbitrary. Rule: **See pricing** (Home, Deep) · **Get a quote** (Carpet,
  Commercial, Dental, Move-in/out) · **Learn more** (Airbnb, Decluttering)
- `Standard rate$50/ hour` — missing space
- "Exactly what gets done" — left and right columns are identical
- Dental checklist repeats its last two items

**About page**
- "HOW WE STARTED" eyebrow appears twice → second becomes "OUR PROMISE"
- "DENTAL & COMMERCIAL" above "The values behind every clean" → "WHAT WE STAND FOR"

**Booking page**
- Standard Cleaning accordion mirrors itself — left/right columns identical
- Airbnb Turnover was missing from the service list despite being on Services (now in types)

---

## 9. Missing screens

Designed: Home, About, Services, Booking. Everything else built from scratch:

- Thank-you / request-received state
- Inline validation errors
- Submit loading state, and a failure state
- Terms & Conditions page (booking form links to it)
- Privacy Policy page (booking form links to it)
- **Mobile booking layout** — the sticky summary sidebar has no mobile design. Becomes a
  sticky bottom bar showing the total, expanding to a drawer
- Blog is in the nav with no design. Cut or build — client decision

---

## 10. Nav behaviour

Route-aware. Home/About/Services show **Get a Quote + Book Now**. The Booking page shows
**Get a Quote only** — Book Now is redundant there. Uses `usePathname()`, so Nav is a
client component. Footer is static and stays a server component.

---

## 11. Email (not yet built)

`submitBooking(payload)` is currently a stub that logs. It will point at
`app/api/booking/route.ts`.

**Two emails per submission:**
1. → Kleanreset's inbox: full structured detail, **reply-to set to the customer** so a human
   can reply directly to negotiate the date/time
2. → the customer: branded acknowledgement. Says "request received", sets the 24-hour
   expectation, and makes clear the preferred time isn't confirmed until Kleanreset replies

**Blocker:** the footer lists `kleanReset29@gmail.com`. **You cannot send from a
`@gmail.com` address via an email API** — we don't own gmail.com, so SPF/DKIM can't be set
and DMARC fails. Mail lands in spam or bounces.

Required: client buys a domain (e.g. `kleanreset.ca`), we send from `noreply@kleanreset.ca`
with **reply-to** pointing at their Gmail. SPF/DKIM/DMARC configured. DNS propagation has
lead time — it's the long pole, start it early.

API key lives in an environment variable, server-side only. **Never in client code.**

Validate with the same zod schema on client and server. Never trust the client.

### SMS — open scope question

The client mentioned confirmation "in both email and message." If "message" means the
confirmation email, we're covered. If it means **SMS/text**, that's a separate integration
(Twilio or similar): extra cost, another API key, phone-number verification. Not part of the
current email plan. **Confirm with client before assuming SMS is in scope.**

---

## 12. Open questions — do not invent answers

If code needs one of these, use the placeholder and flag it.

| Question | Current placeholder / status |
|---|---|
| Extras pricing | Window $30 · Wall $40 · Stair $25 · Fridge $30 · Declutter $50 · High-dust $35 — **guesses, client OK'd using them for now** |
| Turnover base hours | 2.0 — **client-confirmed placeholder** |
| Commercial rough rate | $0.08/sq ft — **a guess, for courtesy estimate only** |
| Cleaning frequency options | Assumed One-Time / Weekly / Bi-Weekly / Monthly — **confirm** |
| Deep clean: $200 or $225 at 2bed·2bath? | Formula says $200 |
| Domain purchased? | **Blocks all email work** |
| SMS in scope? | **Unconfirmed — see §11** |
| Blog — keep or cut? | In nav, undesigned |

**Settled this round:** vacation turnover prices live (off beds/baths); commercial shows a
rough labelled estimate (flippable to pure quote); extras placeholders approved for now.

**Also flag to the client, not a code issue:** the About page claims **4.9★** and **100%
satisfaction**. If those aren't substantiated by real reviews and a real policy, that's
Competition Bureau exposure in Canada.

---

## 13. Working style

- Build what repeats before what appears once. Extract components when repetition is visible,
  not anticipated
- Booking page is a client component (all interactive). Home/About/Services stay server
  components
- Run `npx tsc --noEmit` after structural changes
- Repo lives under OneDrive. Inexplicable file-lock / `.next/` corruption → OneDrive is the
  first suspect
- File extensions: pure logic is `.ts`, only files with JSX are `.tsx` (e.g. `pricing.ts`,
  not `pricing.tsx`)

**Build order:** Foundation (tokens, fonts, types ✅ · pricing ← NEXT) → Nav + Footer →
Home → About + Services → Booking → Thank-you/legal → Email