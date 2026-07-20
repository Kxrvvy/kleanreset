# CLAUDE.md — Kleanreset

Context for AI assistants working in this repo. Read fully before writing code.

---

## 1. What this is

Marketing + booking site for **Kleanreset**, a cleaning service in **Edmonton, Alberta, Canada**. Serves homes, Airbnbs, dental clinics, and offices.

**The site's job:** capture booking requests, quote requests, and general inquiries, and email them to the business.

**This is NOT a booking system.** No real-time availability, no slot locking, no calendar, no accounts, no payments. A submission is a *request*. A human reads it and replies.

### How a booking works

1. Customer submits a **preferred** date + arrival time (never a locked slot).
2. Two emails fire automatically (§11): one to Kleanreset, one acknowledging the customer.
3. A human checks their real schedule (external to this site).
4. If the slot is free → they confirm. If not → they propose alternatives.
5. All confirmation happens human-to-human. The site's job ends when the request is delivered.

Copy everywhere reflects this: the acknowledgement email and thank-you page say **"we've received your request"** and set a 24-hour expectation — never "confirmed" or "booked." Form fields say **"Preferred date / Preferred arrival time"** deliberately.

---

## 2. Stack

- Next.js (App Router) + TypeScript, `strict: true`
- Tailwind CSS v4 (CSS-first `@theme`, **no `tailwind.config.ts`**)
- `next/font/google` — self-hosted
- `lucide-react` for icons
- Planned: `react-hook-form` + `zod` for the booking form
- Planned: Resend via a Route Handler for email

No `src/` directory. `app/`, `lib/`, `types/`, `components/` are root-level siblings. Alias `@/*` → `./*`.

---

## 3. Structure

```
app/
  globals.css        # @theme tokens — single source of truth
  layout.tsx         # fonts, metadata, Nav + Footer
  page.tsx           # Home
  about/ services/ booking/ contact/   # each has page.tsx
  api/booking/route.ts   # (later) email endpoint
components/
  ui/                # Button, Eyebrow, Section, TalkToUs, primitives
  layout/            # Nav, Footer
  home/              # Hero, Strip, Intro, Services, Why, How, CTA
lib/
  pricing.ts         # estimate() — pure, no React
types/
  booking.ts         # BookingPayload, ContactPayload — the contracts
```

---

## 4. Tailwind v4 — read before touching styles

**The `@theme` variable prefix determines which utilities generate.** Namespace, not decoration.

| Prefix | Generates |
|---|---|
| `--color-*` | `bg-*`, `text-*`, `border-*`, `ring-*`, `fill-*` |
| `--font-*` | `font-*` |
| `--radius-*` | `rounded-*` |
| `--spacing-*` | `p-*`, `m-*`, `gap-*`, `max-w-*` (custom) |

`--color-pine` → `bg-pine` works. `--pine` → **generates nothing, silently.** No error; the class just doesn't exist and the element renders unstyled. Has bitten this project. If a class does nothing, check the prefix first.

**Never use a colour not below. Never hardcode a hex in a component.**

### Tokens

**Greens:** `pine` #0E4D3C (primary — buttons, selected borders, eyebrows) · `pine-deep` #0A3729 (dark bands: footer, Why, CTA) · `mint` #15C79A (accent: checks, badges, focus rings, toggles) · `mint-bright` #1FE0AD (hover/glow) · `celadon` #7FDDC0 (description text on dark) · `sea-mist` #DDF3EB (soft wash: chips, pills, hero gradient; often `/4`)

**Neutrals:** `paper` #F9F9F9 (page bg) · `paper2` #FBFCF9 (alt sections) · `card` #FFFFFF · `field` #F4F6F1 (inputs) · `line` #E6E9E3 (borders) · `ink` #10241C (headings/body) · `ink-soft` #4C5A52 (secondary)

**Accents (sparingly):** `lemon` #F4C64B (logo dot, deep-clean badge) · `star-gold` #F0B21B (rating star only)

Opacity via slash: `bg-sea-mist/4`. Radii: `rounded-card` (16px), `rounded-pill` (999px).

### Fonts

| Class | Font | Use |
|---|---|---|
| `font-display` | Bricolage Grotesque | Headlines, ~weight 800 |
| `font-sans` | Hanken Grotesk | Body, UI. Default on `<body>` |
| `font-mono` | Space Mono | Eyebrows, small caps details |

The bridge (`--font-sans: var(--font-hanken-grotesk)`) is required or `font-sans` silently falls back to Arial.

---

## 5. Business rules — pricing & routing

### Tax
**5% GST** (Alberta), added on top of a **pre-tax** subtotal. The $50/hr and $55/room rates are pre-tax. Summary shows Subtotal → GST (5%) → Total. `pricing.ts` computes this via the `priced()` helper.

### Booking form services & price modes

The estimate has **two modes** (`Estimate.mode` in `pricing.ts`). Carpet became fixed-price, so **Commercial is now the ONLY quote.**

| Service | Category | Mode | Formula |
|---|---|---|---|
| Standard | Residential, Vacation | `price` | `1.5 + 0.5(beds−1) + 0.5(baths−1)` hrs × $50 |
| Deep | Residential, Vacation | `price` | `3.0 + 0.5(beds−1) + 1.0(baths−1)` hrs × $50 |
| Turnover | Vacation | `price` | `2.0 + 0.5(beds−1) + 0.5(baths−1)` hrs × $50 |
| Carpet | Residential, Commercial | `price` | `rooms × $55` (stairs/hallways each = 1 room) |
| Commercial | Commercial | `quote` | rough estimate off sq ft, labelled non-binding |

All + 5% tax. **Deep charges +1.0 hr per bathroom** (grout, descaling, detailing take longer) but +0.5 per bedroom — this makes the published $225 table (2bed·2bath Deep) correct.

Submit button by mode: `price` → **"Book My Cleaning"**; `quote` (commercial) → **"Request a Quote"**, estimate shown as rough with a "final quote within 24 hours" note.

### Dental / clinic
NOT a separate service. It's **Commercial with `businessType: "clinic"`**. Marketed as its own card on the Services page, but routes into the commercial flow.

### Not in the booking form
**Move-in/out** and **Decluttering** are NOT `ServiceId`s. They're general inquiries handled by the **Contact page** (§5a). Don't add them to the form.

### 5a. Contact page — general purpose

A standalone `/contact` page, its own nav link. NOT tied to any service. Handles any inquiry: move-in/out, decluttering, dental questions, quote clarifications, "do you clean X". Fields: **name, email, phone, message** (message doubles as "what to clean" / any question). No service selector. Shape = `ContactPayload` in `types/booking.ts`. Sends its own email (or reuses the API route with a type flag).

### 5b. "Talk to us" callout — reusable component

A reusable callout inviting direct contact for quote clarification. Contains "Questions? Call or email us" + phone + email + a link to the full Contact page. Placed on **Home, Booking, and Contact** pages. Lives in `components/ui/`.

All pricing lives in `lib/pricing.ts`. Never compute a price in a component.

---

## 6. TypeScript conventions

- String literal unions over `string` for fixed value sets.
- `Record<K, V>` for variant maps — forces exhaustiveness.
- `ComponentProps<T>` to inherit native element props. Never hand-list.
- Discriminated unions for shape-varying data — narrow with `if (x.kind === "...")` / `x.mode === "..."` before accessing branch fields.
- Compose `Extract` + `Omit` for precise helper param types (see `PricedExtra` in `pricing.ts`).

`types/booking.ts` is the contract: form writes it, summary reads it, API validates it, emails render it.

### 6a. PropertyDetails — FOUR-branch union (keyed on `kind`)

- **`residential`** — propertyType, sqft?, bedrooms, bathrooms, floors, hasPets
- **`carpet`** — propertyType, sqft?, **rooms** (drives price), hasStairs, floors, hasPets, description?. Selecting Carpet in the Residential form REPLACES beds/baths with these fields; keeps type/sqft/floors/pets.
- **`commercial`** — businessName, businessType (incl. "clinic"), buildingSize, floors, restrooms, meetingRooms, frequency, hasReception, hasKitchen, parkingAvailable
- **`vacation_rental`** — propertyType, sqft?, bedrooms, bathrooms, guestCapacity, checkout/checkin times?, linen/towel/supply toggles

`Estimate` (in `pricing.ts`) is keyed on `mode`: `price | quote`.

---

## 7. Localisation — Canadian

Mockups/prototype use US fields. **Wrong.**
- **Province** not State. Dropdown, 13 codes, default AB.
- **Postal Code** not Zip. `A1A 1A1`, uppercase on blur. `/^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/`
- CAD, 5% GST. Phone `780`.

---

## 8. Content bugs in mockups

Fix while building; don't reproduce.

**Services page:** "Six ways" but eight cards → "Eight ways" · Decluttering card describes windows → rewrite · card CTAs arbitrary → apply: fixed-price cards (Home, Deep, Carpet) "See pricing" (anchor to pricing table), commercial/dental "Get a quote", others "Learn more" · `Standard rate$50/ hour` missing space · "Exactly what gets done" Kitchen tab has identical L/R columns · dental checklist repeats 2 items.

**About page:** "HOW WE STARTED" appears twice → second "OUR PROMISE" · "DENTAL & COMMERCIAL" above "values" → "WHAT WE STAND FOR".

**Booking:** Standard accordion mirrors itself.

---

## 9. Missing screens

Designed: Home, About, Services, Booking. Build from scratch: Contact page · Thank-you / request-received state · inline validation errors · submit loading + failure states · Terms & Conditions page · Privacy Policy page · **mobile booking layout** (sticky summary → bottom bar + drawer). Blog dropped from nav.

---

## 10. Nav behaviour

Links: Home, Services, About, **Contact**. Route-aware: hero pages show Get a Quote + Book Now; Booking shows Get a Quote only. Nav is **transparent while over the hero, then a blurred sticky bar on scroll** (`fixed` positioning + `useEffect` scroll listener flipping a `scrolled` boolean; `bg-card/70 backdrop-blur-md` when scrolled). Because it's `fixed`, hero sections need top padding (~`pt-28`) so content clears it. Mobile dropdown keeps a solid `bg-card` so links stay readable over the transparent bar. Footer is static (server component).

---

## 11. Email (not yet built)

`submitBooking(payload)` is a stub that logs → will point at `app/api/booking/route.ts`.

**Two emails per booking:** (1) to Kleanreset — full detail, **reply-to = customer** so they can negotiate the date; (2) to customer — branded acknowledgement, "request received", 24h expectation, not-confirmed-until-reply. The Contact page sends its own inquiry email similarly.

**Blocker:** footer lists `kleanReset29@gmail.com`. **Cannot send FROM a `@gmail.com` via an email API** — can't set SPF/DKIM, DMARC fails. Need a domain (`kleanreset.ca`), send from `noreply@kleanreset.ca` with reply-to = their Gmail. DNS propagation has lead time — start early. API key in env var, server-side only, never in client bundle. Validate with the same zod schema client + server.

### SMS — open scope
Client mentioned confirmation "in both email and message." If "message" = SMS, that's a separate integration (Twilio): cost, API key, phone verification. Not in current plan. **Confirm before assuming.**

---

## 12. Open questions — do not invent answers

| Question | Status |
|---|---|
| Extras pricing | Window $30 · Wall $40 · Stair $25 · Fridge $30 · Declutter $50 · High-dust $35 — guesses, client OK'd for now |
| Turnover base hours | 2.0 — client-confirmed placeholder |
| Commercial rough rate | $0.08/sq ft — guess, courtesy estimate only |
| Cleaning frequency options | One-Time / Weekly / Bi-Weekly / Monthly — confirm |
| Upholstery | **Dropped.** Carpet is $55/room only. Revisit if client offers it |
| Domain purchased? | **Blocks all email** |
| SMS in scope? | Unconfirmed (§11) |

**Settled this session:** 5% GST pre-tax · carpet fixed at $55/room (moved from quote to book, upholstery dropped) · Deep = +0.5 bed / +1.0 bath (validates $225 table) · Estimate reduced to two modes (commercial-only quote) · carpet is its own PropertyDetails branch · dental = commercial/clinic · move-in/out & declutter = contact-only · general Contact page + ContactPayload · reusable "talk to us" callout on Home/Booking/Contact.

**Flag to client (not code):** About page claims 4.9★ and 100% satisfaction. If unsubstantiated, that's Competition Bureau exposure in Canada.

---

## 13. Working style

- Build what repeats before what appears once. Extract components from visible repetition, not anticipation.
- Booking page is a client component. Home/About/Services/Contact stay server components where possible.
- Run `npx tsc --noEmit` after structural changes.
- OneDrive repo — inexplicable file-lock / `.next` corruption → OneDrive first suspect.
- File extensions: pure logic `.ts`, JSX `.tsx`.

**Build order:** Foundation ✅ → Nav + Footer ✅ → Home ✅ → About + Services → Booking → Contact → Thank-you/legal → Email