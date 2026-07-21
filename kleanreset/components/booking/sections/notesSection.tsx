// components/booking/sections/NotesSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { SectionCard } from "@/components/booking/sectionCard";
import { fieldCls } from "@/components/booking/fields";

export function NotesSection() {
  const { register } = useFormContext<BookingFormValues>();
  return (
    <SectionCard step={9} title="Additional notes" subtitle="Anything else we should know?">
      <textarea
        rows={4}
        className={fieldCls}
        placeholder="Tell us anything our cleaning team should know before arriving — fragile items, allergies, priority rooms, product preferences..."
        {...register("notes")}
      />
    </SectionCard>
  );
}