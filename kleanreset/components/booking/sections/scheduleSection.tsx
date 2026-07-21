// components/booking/sections/ScheduleSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { SectionCard } from "@/components/booking/sectionCard";
import { TextInput, ErrorText } from "@/components/booking/fields";

export function ScheduleSection() {
  const { register, formState: { errors } } = useFormContext<BookingFormValues>();
  return (
    <SectionCard step={7} id="section-schedule" title="Schedule" subtitle="Choose your preferred date and arrival time.">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <TextInput label="Preferred date" type="date" {...register("schedule.date")} />
          <ErrorText error={errors.schedule?.date} />
        </div>
        <div>
          <TextInput label="Preferred arrival time" type="time" {...register("schedule.arrivalTime")} />
          <ErrorText error={errors.schedule?.arrivalTime} />
        </div>
      </div>
    </SectionCard>
  );
}