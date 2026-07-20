// lib/pricing.ts
//
// All pricing logic. Pure functions, no React.
// The booking summary reads whatever estimate() returns and renders it.

import type {
  Category,
  ServiceId,
  ExtraId,
  PropertyDetails,
} from "@/types/booking";

// ── Constants ────────────────────────────────────────────────

export const HOURLY_RATE = 50;   // CAD, pre-tax
export const TAX_RATE = 0.05;    // 5% GST (Alberta)
export const CARPET_PER_ROOM = 55; // CAD per room (stairs/hallways count)

// Base hours per hourly service, before per-room additions.
const BASE_HOURS: Partial<Record<ServiceId, number>> = {
  standard: 1.5,
  deep: 3.0,
  turnover: 2.0, // client-confirmed placeholder
};

// Extra time added per additional room, per service.
// Deep charges more per bathroom (grout, descaling, detailing).
const ROOM_RATES: Record<string, { bed: number; bath: number }> = {
  standard: { bed: 0.5, bath: 0.5 },
  deep: { bed: 0.5, bath: 1.0 },
  turnover: { bed: 0.5, bath: 0.5 },
};

// Flat add-on prices (CAD). Placeholder guesses — awaiting client.
export const EXTRA_PRICES: Record<ExtraId, number> = {
  window: 30,
  wall: 40,
  stair: 25,
  refrigerator: 30,
  decluttering: 50,
  high_dusting: 35,
};

// Rough commercial rate for the courtesy estimate only. NOT committed.
const COMMERCIAL_RATE_PER_SQFT = 0.08; // CAD/sq ft — placeholder

// Which services each category unlocks.
export const SERVICES_BY_CATEGORY: Record<Category, ServiceId[]> = {
  residential: ["standard", "deep", "carpet"],
  commercial: ["commercial_clean", "carpet"],
  vacation_rental: ["turnover", "standard", "deep"],
};

// ── The Estimate shape ───────────────────────────────────────
//
// Two modes now (carpet became fixed-price, so only commercial quotes):
//   price → firm number with tax breakdown, "Book My Cleaning"
//   quote → no number, "Request a Quote" (commercial only)

export type Estimate =
  | {
      mode: "price";
      subtotal: number;   // labour or carpet + extras, pre-tax
      tax: number;        // subtotal × TAX_RATE
      total: number;      // subtotal + tax
      hours?: number;     // present for hourly services
      isRough?: boolean;  // true for commercial courtesy estimate
      note?: string;
    }
  | {
      mode: "quote";
      reason: string;
    };

// ── Helpers ──────────────────────────────────────────────────

function sumExtras(extras: ExtraId[]): number {
  return extras.reduce((total, id) => total + EXTRA_PRICES[id], 0);
}

function roomHours(
  service: "standard" | "deep" | "turnover",
  beds: number,
  baths: number
): number {
  const base = BASE_HOURS[service]!;
  const rate = ROOM_RATES[service];
  return base + rate.bed * Math.max(0, beds - 1) + rate.bath * Math.max(0, baths - 1);
}

// Wrap a pre-tax subtotal into a full priced estimate.
type PricedExtra = Partial<
  Omit<Extract<Estimate, { mode: "price" }>, "mode" | "subtotal" | "tax" | "total">
>;

function priced(subtotal: number, extra: PricedExtra = {}): Estimate {
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  return { mode: "price", subtotal, tax, total: subtotal + tax, ...extra };
}

// ── The one function everything calls ────────────────────────

export function estimate(
  category: Category,
  service: ServiceId,
  property: PropertyDetails | null,
  extras: ExtraId[]
): Estimate {
  const extrasTotal = sumExtras(extras);

  // 1. Carpet → fixed price, $55 per room (any category).
  if (service === "carpet") {
    if (!property || property.kind !== "carpet" || !property.rooms) {
      return { mode: "quote", reason: "Add your carpet rooms for a price." };
    }
    const subtotal = property.rooms * CARPET_PER_ROOM + extrasTotal;
    return priced(subtotal);
  }

  // 2. Commercial → the only true quote. Rough courtesy estimate.
  if (category === "commercial") {
    if (!property || property.kind !== "commercial" || !property.buildingSize) {
      return { mode: "quote", reason: "We'll send your quote within 24 hours." };
    }
    const rough = Math.round(property.buildingSize * COMMERCIAL_RATE_PER_SQFT);
    return priced(rough + extrasTotal, {
      isRough: true,
      note: "Rough estimate — we'll confirm a final quote within 24 hours.",
    });
  }

  // 3. Residential & vacation rental hourly services → firm price.
  if (
    !property ||
    (property.kind !== "residential" && property.kind !== "vacation_rental")
  ) {
    return { mode: "quote", reason: "Tell us about your space for an estimate." };
  }

  if (service !== "standard" && service !== "deep" && service !== "turnover") {
    return { mode: "quote", reason: "This service is quoted separately." };
  }

  const hours = roomHours(service, property.bedrooms, property.bathrooms);
  const subtotal = hours * HOURLY_RATE + extrasTotal;
  return priced(subtotal, { hours });
}