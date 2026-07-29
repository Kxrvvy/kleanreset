// components/booking/sections/ReviewSection.tsx
"use client";
import type { Estimate } from "@/lib/pricing";
import { SectionCard } from "@/components/booking/sectionCard";

export function ReviewSection({
  estimate,
  submitting,
  error,
}: {
  estimate: Estimate;
  submitting: boolean;
  error?: string | null;
}) {
  const isQuote = estimate.mode === "quote";
  const buttonLabel = submitting
    ? "Sending..."
    : isQuote
    ? "Request a Quote →"
    : "Book My Cleaning →";

  return (
    <SectionCard step={10} title="Review and confirm">
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-pill bg-pine py-3.5 text-sm font-semibold text-white transition-colors hover:bg-pine-deep disabled:opacity-50"
      >
        {buttonLabel}
      </button>
      {error && <p className="mt-3 text-center text-sm text-red-600">{error}</p>}
    </SectionCard>
  );
}
