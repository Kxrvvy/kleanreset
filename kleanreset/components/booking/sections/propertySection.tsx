// components/booking/sections/PropertySection.tsx
"use client";
//
// Pattern demo #2: fields that CHANGE based on selections.
// - category decides which whole property shape renders
// - within residential, choosing Carpet swaps beds/baths for room fields
// This is the trickiest section; the rest of the form is simpler than this.

import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { SectionCard } from "@/components/booking/sectionCard";

export function PropertySection() {
  const { register, watch, setValue } = useFormContext<BookingFormValues>();
  const category = watch("category");
  const service = watch("service");
  const state = watch("property");

  // Residential + Carpet → the carpet field set. Everything else residential
  // → the normal beds/baths set. (Commercial & vacation have their own blocks.)
  const isCarpet = service === "carpet";

  return (
    <SectionCard step={5} id="section-property" title="Property details" subtitle="Help us plan the right team and time.">
      {category === "residential" && !isCarpet && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Select label="Property type" {...register("property.propertyType")}
            options={["house", "condo", "apartment", "townhouse"]} />
          <Number label="Square footage" placeholder="e.g. 1200"
            {...register("property.squareFootage", { valueAsNumber: true })} />
          <Number label="Bedrooms" {...register("property.bedrooms", { valueAsNumber: true })} />
          <Number label="Bathrooms" {...register("property.bathrooms", { valueAsNumber: true })} />
          <Number label="Floors" {...register("property.floors", { valueAsNumber: true })} />
        </div>
      )}

      {category === "residential" && isCarpet && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Select label="Property type" {...register("property.propertyType")}
            options={["house", "condo", "apartment", "townhouse"]} />
          <Number label="Square footage" placeholder="e.g. 1200"
            {...register("property.squareFootage", { valueAsNumber: true })} />
          <Number label="Carpeted rooms (stairs & hallways count as rooms)"
            {...register("property.rooms", { valueAsNumber: true })} />
          <Number label="Floors" {...register("property.floors", { valueAsNumber: true })} />
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-ink">
              Describe your carpets (optional)
            </label>
            <textarea rows={3} {...register("property.description")}
              placeholder="e.g. two bedrooms and a staircase, light stains in the living room"
              className={fieldCls} />
          </div>
        </div>
      )}

      {category === "commercial" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Text label="Business name" {...register("property.businessName")} />
          <Select label="Business type" {...register("property.businessType")}
            options={["office", "retail", "clinic", "restaurant", "warehouse"]} />
          <Number label="Building size (sq ft)" {...register("property.buildingSize", { valueAsNumber: true })} />
          <Number label="Floors" {...register("property.floors", { valueAsNumber: true })} />
          <Number label="Restrooms" {...register("property.restrooms", { valueAsNumber: true })} />
          <Number label="Meeting rooms" {...register("property.meetingRooms", { valueAsNumber: true })} />
          <Select
            label="Cleaning frequency"
            {...register("property.frequency")}
            options={[
              { value: "one_time", label: "One time" },
              { value: "weekly", label: "Weekly" },
              { value: "bi_weekly", label: "Bi-weekly" },
              { value: "monthly", label: "Monthly" },
            ]}
          />

          <div className="lg:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-ink">Facility details</label>
            <div className="grid gap-2 md:grid-cols-3">
              <ToggleRow
                label="Reception area"
                checked={state?.kind === "commercial" ? state.hasReception : false}
                onChange={(value) => setValue("property.hasReception", value)}
              />
              <ToggleRow
                label="Kitchen"
                checked={state?.kind === "commercial" ? state.hasKitchen : false}
                onChange={(value) => setValue("property.hasKitchen", value)}
              />
              <ToggleRow
                label="Parking available"
                checked={state?.kind === "commercial" ? state.parkingAvailable : false}
                onChange={(value) => setValue("property.parkingAvailable", value)}
              />
            </div>
          </div>
        </div>
      )}

      {category === "vacation_rental" && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Select label="Property type" {...register("property.propertyType")}
            options={["house", "condo", "apartment", "townhouse"]} />
          <Number label="Guest capacity" {...register("property.guestCapacity", { valueAsNumber: true })} />
          <Number label="Bedrooms" {...register("property.bedrooms", { valueAsNumber: true })} />
          <Number label="Bathrooms" {...register("property.bathrooms", { valueAsNumber: true })} />
        </div>
      )}
    </SectionCard>
  );
}

// ── Tiny field helpers (shared look) ─────────────────────────
const fieldCls =
  "w-full rounded-card border border-line bg-field px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-ink-soft/60 focus:border-pine focus:outline-none focus:ring-2 focus:ring-mint/30";

import { forwardRef } from "react";

const Text = forwardRef<HTMLInputElement, { label: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  function Text({ label, ...props }, ref) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
        <input ref={ref} type="text" className={fieldCls} {...props} />
      </div>
    );
  }
);

const Number = forwardRef<HTMLInputElement, { label: string } & React.InputHTMLAttributes<HTMLInputElement>>(
  function Number({ label, ...props }, ref) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
        <input ref={ref} type="number" min={0} className={fieldCls} {...props} />
      </div>
    );
  }
);

const Select = forwardRef<HTMLSelectElement, { label: string; options: Array<string | { value: string; label: string }> } & React.SelectHTMLAttributes<HTMLSelectElement>>(
  function Select({ label, options, ...props }, ref) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-ink">{label}</label>
        <div className="relative">
          <select
            ref={ref}
            className={`${fieldCls} appearance-none pr-10`}
            {...props}
          >
            {options.map((o) => {
              if (typeof o === "string") {
                return (
                  <option key={o} value={o}>
                    {o.charAt(0).toUpperCase() + o.slice(1)}
                  </option>
                );
              }

              return (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              );
            })}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
        </div>
      </div>
    );
  }
);

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-card border border-line bg-card px-4 py-3 text-left transition-colors hover:border-pine/40"
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span
        className={`flex h-6 w-11 items-center rounded-full p-1 transition-colors ${checked ? "bg-pine" : "bg-line"
          }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-5" : "translate-x-0"
            }`}
        />
      </span>
    </button>
  );
}