// components/booking/sections/ReviewSection.tsx
"use client";
import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import type { Estimate } from "@/lib/pricing";
import { SectionCard } from "@/components/booking/sectionCard";
import { ErrorText } from "@/components/booking/fields";

export function ReviewSection({
  estimate,
  submitting,
}: {
  estimate: Estimate;
  submitting: boolean;
}) {
  const { register, formState: { errors } } = useFormContext<BookingFormValues>();
  const isQuote = estimate.mode === "quote";
  const buttonLabel = submitting
    ? "Sending..."
    : isQuote
    ? "Request a Quote →"
    : "Book My Cleaning →";

  return (
    <SectionCard step={10} title="Review and confirm">
      <div className="space-y-3">
        <label className="flex items-start gap-3 rounded-card border border-line bg-field px-4 py-3">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-pine" {...register("consent.terms")} />
          <span className="text-sm text-ink">
            I agree to the <a href="/terms" className="text-pine underline">Terms &amp; Conditions</a>.
          </span>
        </label>
        <ErrorText error={errors.consent?.terms} />

        <label className="flex items-start gap-3 rounded-card border border-line bg-field px-4 py-3">
          <input type="checkbox" className="mt-0.5 h-4 w-4 accent-pine" {...register("consent.privacy")} />
          <span className="text-sm text-ink">
            I agree to the <a href="/privacy" className="text-pine underline">Privacy Policy</a>.
          </span>
        </label>
        <ErrorText error={errors.consent?.privacy} />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-pill bg-pine py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-deep disabled:opacity-50"
      >
        {buttonLabel}
      </button>
    </SectionCard>
  );
}