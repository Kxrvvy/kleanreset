// lib/pricing.ts
//
// All pricing logic lives here. Pure functions, no React.
// The booking summary sidebar reads whatever estimate() returns and
// renders accordingly — it never does math itself.

import type {
  Category,
  ServiceID,
  ExtraID,
  PropertyDetails,
} from "@/types/booking";

// ── Constants ────────────────────────────────────────────────

export const HOURLY_RATE = 50; // CAD, excludes tax

// Base hours per service, before per-room additions.
const BASE_HOURS: Partial<Record<ServiceID, number>> = {
  standard: 1.5,
  deep: 3.0,
  turnover: 2.0, // ← client-confirmed placeholder
};

// Flat add-on prices (CAD). Placeholder guesses — awaiting client.
export const EXTRA_PRICES: Record<ExtraID, number> = {
  window: 30,
  wall: 40,
  stair: 25,
  refrigerator: 30,
  decluttering: 50,
  high_dusting: 35,
};

// Rough commercial rate for the courtesy estimate only.
// NOT a committed price — the real number comes from a human quote.
const COMMERCIAL_RATE_PER_SQFT = 0.08; // CAD/sq ft — placeholder

// Which services each category unlocks.
export const SERVICES_BY_CATEGORY: Record<Category, ServiceID[]> = {
  residential: ["standard", "deep", "carpet"],
  commercial: ["commercial_clean", "carpet"],
  vacation_rental: ["turnover", "standard", "deep"],
};

// ── The Estimate shape ───────────────────────────────────────
//
// Three modes. The sidebar switches on `mode`:
//   price    → firm number, "Book My Cleaning"
//   estimate → rough number + "final quote follows", "Request My Quote"
//   quote    → no number at all, "Request My Quote"

export type Estimate =
  | {
      mode: "price";
      hours: number;
      labour: number;
      extrasTotal: number;
      total: number;
    }
  | {
      mode: "estimate";
      rough: number;
      extrasTotal: number;
      total: number;
      note: string;
    }
  | {
      mode: "quote";
      reason: string;
    };

// Services that never produce any number, in any category.
const QUOTE_ONLY: ServiceID[] = ["carpet"];

// ── Helpers ──────────────────────────────────────────────────

function sumExtras(extras: ExtraID[]): number {
  return extras.reduce((total, id) => total + EXTRA_PRICES[id], 0);
}

// +30 min per additional bedroom AND per additional bathroom.
function roomHours(base: number, bedrooms: number, bathrooms: number): number {
  return (
    base +
    0.5 * Math.max(0, bedrooms - 1) +
    0.5 * Math.max(0, bathrooms - 1)
  );
}

// ── The one function everything calls ────────────────────────

export function estimate(
  category: Category,
  service: ServiceID,
  property: PropertyDetails | null,
  extras: ExtraID[]
): Estimate {
  const extrasTotal = sumExtras(extras);

  // 1. Carpet always quotes, regardless of category.
  if (QUOTE_ONLY.includes(service)) {
    return { mode: "quote", reason: "Carpet cleaning is quoted separately." };
  }

  // 2. Commercial → rough courtesy estimate off building size.
  if (category === "commercial") {
    if (!property || property.kind !== "commercial" || !property.buildingSize) {
      return {
        mode: "quote",
        reason: "Tell us about your space for an estimate.",
      };
    }
    const rough = Math.round(property.buildingSize * COMMERCIAL_RATE_PER_SQFT);
    return {
      mode: "estimate",
      rough,
      extrasTotal,
      total: rough + extrasTotal,
      note: "Rough estimate — we'll confirm a final quote within 24 hours.",
    };
  }

  // 3. Residential & vacation rental → firm price off beds/baths.
  //    Both branches carry bedrooms/bathrooms; narrow to reach them.
  if (
    !property ||
    (property.kind !== "residential" && property.kind !== "vacation_rental")
  ) {
    return { mode: "quote", reason: "Tell us about your space for an estimate." };
  }

  const base = BASE_HOURS[service];
  if (base === undefined) {
    return { mode: "quote", reason: "This service is quoted separately." };
  }

  const hours = roomHours(base, property.bedrooms, property.bathrooms);
  const labour = hours * HOURLY_RATE;

  return {
    mode: "price",
    hours,
    labour,
    extrasTotal,
    total: labour + extrasTotal,
  };
}
