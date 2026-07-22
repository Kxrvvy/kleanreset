// components/booking/sections/CategorySection.tsx
"use client";
//
// Pattern demo #1: a card-select bound to the form.
// Shows how a section plugs into the shared form via useFormContext,
// and how choosing a category resets the property shape to match.

import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { Home, Building2, BedDouble, Check } from "lucide-react";
import { SectionCard } from "@/components/booking/sectionCard";

const CATEGORIES = [
  {
    value: "residential" as const,
    icon: Home,
    title: "Residential",
    body: "Cleaning for homes, apartments, condos, and townhouses.",
  },
  {
    value: "commercial" as const,
    icon: Building2,
    title: "Commercial",
    body: "Offices, retail, warehouses, clinics, restaurants, and business spaces.",
  },
  {
    value: "vacation_rental" as const,
    icon: BedDouble,
    title: "Vacation Rental",
    body: "Cleaning for Airbnb and short-term rental properties.",
  },
];

// Sensible default property + service when a category is picked, so the
// form never sits in an invalid combination.
const DEFAULTS: Record<BookingFormValues["category"], Partial<BookingFormValues>> = {
  residential: {
    service: "standard",
    property: { kind: "residential", propertyType: "condo", bedrooms: 1, bathrooms: 1, floors: 1, hasPets: false },
  },
  commercial: {
    service: "commercial_clean",
    property: {
      kind: "commercial", businessName: "", businessType: "office",
      buildingSize: 0, floors: 1, restrooms: 0, meetingRooms: 0,
      frequency: "one_time", hasReception: false, hasKitchen: false, parkingAvailable: false,
    },
  },
  vacation_rental: {
    service: "turnover",
    property: {
      kind: "vacation_rental", propertyType: "condo", bedrooms: 1, bathrooms: 1,
      guestCapacity: 1, linenReplacement: false, towelReplacement: false, supplyRestocking: false,
    },
  },
};

export function CategorySection() {
  // useFormContext pulls the form methods shared by FormProvider — no props.
  const { watch, setValue } = useFormContext<BookingFormValues>();
  const selected = watch("category");

  function choose(value: BookingFormValues["category"]) {
    setValue("category", value);
    // Reset service + property to match the new category, so we never
    // end up with e.g. a commercial category holding residential fields.
    const d = DEFAULTS[value];
    if (d.service) setValue("service", d.service);
    if (d.property) setValue("property", d.property as BookingFormValues["property"]);
  }

  return (
    <SectionCard step={1} id="section-category" title="Choose service category" subtitle="Select the type of space you need cleaned.">
      <div className="grid gap-4 md:grid-cols-3">
        {CATEGORIES.map(({ value, icon: Icon, title, body }) => {
          const active = selected === value;
          return (
            <button
              type="button"
              key={value}
              onClick={() => choose(value)}
              className={`relative rounded-card border p-5 text-left transition-colors ${active
                ? "border-pine bg-sea-mist/30"
                : "border-line bg-card hover:border-pine/40"
                }`}
            >
              {active && (
                <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-pine">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </span>
              )}
              <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${active ? "bg-pine" : "bg-sea-mist/50"}`}>
                <Icon className={`h-5 w-5 ${active ? "text-white" : "text-pine"}`} strokeWidth={1.75} />
              </span>
              <h3 className="mt-3 font-display font-bold text-ink">{title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{body}</p>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}