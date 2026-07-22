// components/booking/sections/ContactSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import { SectionCard } from "@/components/booking/sectionCard";
import { TextInput, ErrorText } from "@/components/booking/fields";

export function ContactSection() {
  const { register, formState: { errors } } = useFormContext<BookingFormValues>();
  return (
    <SectionCard step={2} id="section-contact" title="Client information" subtitle="How can we reach you?">
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <TextInput label="Full name" placeholder="Jane Doe" {...register("contact.fullName")} />
          <ErrorText error={errors.contact?.fullName} />
        </div>
        <div>
          <TextInput label="Email" type="email" placeholder="jane@example.com" {...register("contact.email")} />
          <ErrorText error={errors.contact?.email} />
        </div>
        <div className="sm:col-span-2">
          <TextInput label="Phone number" type="tel" placeholder="780 123 4567" {...register("contact.phone")} />
          <ErrorText error={errors.contact?.phone} />
        </div>
      </div>
    </SectionCard>
  );
}