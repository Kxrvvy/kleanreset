// components/booking/sections/ExtrasSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import type { ExtraId } from "@/types/booking";
import { SectionCard } from "@/components/booking/sectionCard";
import { EXTRA_PRICES } from "@/lib/pricing";
import { Check } from "lucide-react";

const EXTRAS: { id: ExtraId; label: string }[] = [
  { id: "window", label: "Window Cleaning" },
  { id: "wall", label: "Wall Cleaning" },
  { id: "stair", label: "Stair Cleaning" },
  { id: "refrigerator", label: "Refrigerator Cleaning" },
  { id: "decluttering", label: "Decluttering" },
  { id: "high_dusting", label: "High Dusting" },
];

export function ExtrasSection() {
  const { watch, setValue } = useFormContext<BookingFormValues>();
  const selected = watch("extras") ?? [];

  function toggle(id: ExtraId) {
    const next = selected.includes(id)
      ? selected.filter((e) => e !== id)
      : [...selected, id];
    setValue("extras", next);
  }

  return (
    <SectionCard step={6} id="section-extras" title="Extra services" subtitle="Add anything you'd like included.">
      <div className="flex flex-wrap gap-2">
        {EXTRAS.map(({ id, label }) => {
          const active = selected.includes(id);
          return (
            <button
              type="button"
              key={id}
              onClick={() => toggle(id)}
              className={`flex items-center gap-2 rounded-pill border px-4 py-2 text-sm transition-colors ${
                active ? "border-pine bg-sea-mist/40 text-pine" : "border-line bg-card text-ink-soft hover:border-pine/40"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              {label}
              <span className="text-xs opacity-70">+${EXTRA_PRICES[id]}</span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}