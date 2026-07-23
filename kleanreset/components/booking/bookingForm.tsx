// components/booking/BookingForm.tsx
"use client";
//
// The full booking form. Wires all ten sections + the live summary sidebar.

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema, type BookingFormValues } from "@/lib/bookingSchema";
import { estimate } from "@/lib/pricing";
import { BookingSummary } from "@/components/booking/bookingSummary";

import { CategorySection } from "@/components/booking/sections/categorySection";
import { ContactSection } from "@/components/booking/sections/contactSection";
import { AddressSection } from "@/components/booking/sections/addressSection";
import { ServiceSection } from "@/components/booking/sections/serviceSection";
import { PropertySection } from "@/components/booking/sections/propertySection";
import { ExtrasSection } from "@/components/booking/sections/extraSection";
import { ScheduleSection } from "@/components/booking/sections/scheduleSection";
import { AccessSection } from "@/components/booking/sections/accessSection";
import { NotesSection } from "@/components/booking/sections/notesSection";
import { ReviewSection } from "@/components/booking/sections/reviewSection";

export function BookingForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: {
      category: "residential",
      service: "standard",
      extras: [],
      property: {
        kind: "residential",
        propertyType: "condo",
        bedrooms: 1,
        bathrooms: 1,
        floors: 1,
        hasPets: false,
      },
      access: { method: "someone_there" },
      contact: { fullName: "", email: "", phone: "" },
      address: { street: "", city: "", province: "AB", postalCode: "" },
      schedule: { date: "", arrivalTime: "" },
    },
  });

  const category = methods.watch("category");
  const service = methods.watch("service");
  const property = methods.watch("property");
  const extras = methods.watch("extras");

  const currentEstimate = estimate(category, service, property ?? null, extras ?? []);

  async function onSubmit(data: BookingFormValues) {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h2 className="font-display text-3xl font-extrabold text-pine">
          Request received
        </h2>
        <p className="mt-4 text-ink-soft">
          Thanks — we&apos;ve received your request and will get back to you within
          24 hours to confirm your preferred time or suggest the closest available slot.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-24 pt-10 sm:px-6 md:px-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10 xl:px-12">
          <div className="space-y-6">
            <CategorySection />
            <ContactSection />
            <AddressSection />
            <ServiceSection />
            <PropertySection />
            <ExtrasSection />
            <ScheduleSection />
            <AccessSection />
            <NotesSection />
            <ReviewSection estimate={currentEstimate} submitting={submitting} error={error} />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <BookingSummary estimate={currentEstimate} />
          </aside>
        </div>
      </form>
    </FormProvider>
  );
}