// components/booking/sections/ServiceSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import type { ServiceId } from "@/types/booking";
import { SectionCard } from "@/components/booking/sectionCard";
import { SERVICES_BY_CATEGORY } from "@/lib/pricing";
import { Check } from "lucide-react";

const SERVICE_META: Record<string, { title: string; desc: string; included: string[] }> = {
  standard: {
    title: "Standard Cleaning",
    desc: "A refreshing routine clean for tidy, everyday upkeep.",
    included: ["Dusting accessible surfaces", "Sweep and mop floors", "Bathroom cleaning", "Wipe high-touch areas"],
  },
  deep: {
    title: "Deep Cleaning",
    desc: "A thorough top-to-bottom clean of every detail.",
    included: ["Everything in Standard", "Baseboards & vents", "Inside appliances", "Grout & tile detailing"],
  },
  carpet: {
    title: "Carpet Cleaning",
    desc: "Steam and extraction for a fresh, restored carpet. $55 per room.",
    included: ["Deep steam extraction", "Stain treatment", "Stairs & hallways (per room)", "Deodorizing"],
  },
  turnover: {
    title: "Airbnb Turnover",
    desc: "Fast, guest-ready turnovers for short-term rentals.",
    included: ["Full reset between stays", "Linen & towel refresh", "Restock essentials", "Spot-check every room"],
  },
  commercial_clean: {
    title: "Commercial Cleaning",
    desc: "Professional cleaning for your business space. Quoted individually.",
    included: ["Sanitized shared spaces", "Restrooms & kitchens", "Floors & high-touch points", "Flexible scheduling"],
  },
};

export function ServiceSection() {
  const { watch, setValue, getValues } = useFormContext<BookingFormValues>();
  const category = watch("category");
  const selected = watch("service");
  const available = SERVICES_BY_CATEGORY[category];

  // Picking a service may need to reshape `property` — Carpet uses a
  // different property shape than Standard/Deep. Keep them in sync here.
  function choose(id: ServiceId) {
    setValue("service", id);

    const current = getValues("property");

    if (id === "carpet" && current.kind !== "carpet") {
      // Switch to the carpet property shape, carrying over what we can.
      setValue("property", {
        kind: "carpet",
        propertyType: "propertyType" in current ? current.propertyType : "condo",
        squareFootage: "squareFootage" in current ? current.squareFootage : undefined,
        rooms: 1,
        hasStairs: false,
        floors: "floors" in current ? current.floors : 1,
        hasPets: "hasPets" in current ? current.hasPets : false,
        description: "",
      });
    } else if (id !== "carpet" && current.kind === "carpet" && category === "residential") {
      // Leaving carpet → back to the residential shape.
      setValue("property", {
        kind: "residential",
        propertyType: current.propertyType,
        squareFootage: current.squareFootage,
        bedrooms: 1,
        bathrooms: 1,
        floors: current.floors,
        hasPets: current.hasPets,
      });
    }
  }

  return (
    <SectionCard step={4} id="section-service" title="Cleaning service" subtitle="Pick the service that fits your space.">
      <div className="space-y-4">
        {available.map((id) => {
          const meta = SERVICE_META[id];
          const active = selected === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => choose(id)}
              className={`block w-full rounded-card border p-5 text-left transition-colors ${
                active ? "border-pine bg-sea-mist/20" : "border-line bg-card hover:border-pine/40"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display font-bold text-ink">{meta.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{meta.desc}</p>
                </div>
                <span className={`shrink-0 rounded-pill px-3 py-1 text-xs font-semibold ${
                  active ? "bg-pine text-white" : "bg-field text-ink-soft"
                }`}>
                  {active ? "SELECTED" : "SELECT"}
                </span>
              </div>
              {active && (
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {meta.included.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-ink-soft">
                      <Check className="h-4 w-4 text-mint" strokeWidth={3} /> {item}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}