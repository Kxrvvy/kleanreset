// components/booking/sections/AccessSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import type { AccessMethod } from "@/types/booking";
import { SectionCard } from "@/components/booking/sectionCard";
import { fieldCls, Label } from "@/components/booking/fields";

const METHODS: { id: AccessMethod; label: string }[] = [
  { id: "someone_there", label: "Someone's there" },
  { id: "key_under_mat", label: "Key Under Mat" },
  { id: "lockbox", label: "Lockbox" },
  { id: "smartlock", label: "Smart Lock" },
  { id: "reception", label: "Reception" },
  { id: "meet_outside", label: "Meet Outside" },
  { id: "other", label: "Other" },
];

export function AccessSection() {
  const { register, watch, setValue } = useFormContext<BookingFormValues>();
  const method = watch("access.method");

  return (
    <SectionCard step={8} id="section-access" title="Access information" subtitle="How will our team get in?">
      <Label>How will cleaners enter?</Label>
      <div className="mb-5 flex flex-wrap gap-2">
        {METHODS.map(({ id, label }) => {
          const active = method === id;
          return (
            <button
              type="button"
              key={id}
              onClick={() => setValue("access.method", id)}
              className={`rounded-pill border px-4 py-2 text-sm transition-colors ${active ? "border-pine bg-sea-mist/40 text-pine" : "border-line bg-card text-ink-soft hover:border-pine/40"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <Label>Parking information</Label>
          <textarea rows={2} className={fieldCls} placeholder="Driveway, street parking, garage code..." {...register("access.parkingInfo")} />
        </div>
        <div>
          <Label>Building instructions</Label>
          <textarea rows={2} className={fieldCls} placeholder="Buzzer, elevator, service entrance..." {...register("access.buildingInstructions")} />
        </div>
        <div className="lg:col-span-2 lg:w-1/2">
          <Label>Gate code (optional)</Label>
          <input className={fieldCls} placeholder="#1234" {...register("access.gateCode")} />
        </div>
      </div>
    </SectionCard>
  );
}