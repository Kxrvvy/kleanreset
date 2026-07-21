// components/booking/sections/AddressSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { SectionCard } from "@/components/booking/sectionCard";
import { TextInput, SelectInput, ErrorText } from "@/components/booking/fields";

const PROVINCES = [
  "AB","BC","MB","NB","NL","NS","NT","NU","ON","PE","QC","SK","YT",
].map((p) => ({ value: p, label: p }));

export function AddressSection() {
  const { register, formState: { errors } } = useFormContext<BookingFormValues>();
  return (
    <SectionCard step={3} id="section-address" title="Property address" subtitle="Where should we come?">
      <div className="space-y-4">
        <div>
          <TextInput label="Street address" placeholder="123 Main St" {...register("address.street")} />
          <ErrorText error={errors.address?.street} />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <TextInput label="City" placeholder="Edmonton" {...register("address.city")} />
            <ErrorText error={errors.address?.city} />
          </div>
          <SelectInput label="Province" options={PROVINCES} defaultValue="AB" {...register("address.province")} />
          <div>
            <TextInput label="Postal code" placeholder="T5T 3A6" {...register("address.postalCode")} />
            <ErrorText error={errors.address?.postalCode} />
          </div>
        </div>
        <TextInput label="Landmark (optional)" placeholder="Near central park" {...register("address.landmark")} />
      </div>
    </SectionCard>
  );
}