// components/booking/BookingSummary.tsx
"use client";
//
// Live summary — compact version. Echoes each section, scroll pencils,
// price block with GST. Tightened spacing so the total stays visible
// without scrolling the sidebar.

import { useFormContext } from "react-hook-form";
import type { BookingFormValues } from "@/lib/bookingSchema";
import type { Estimate } from "@/lib/pricing";
import { Pencil, CalendarDays } from "lucide-react";

const CATEGORY_LABEL: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  vacation_rental: "Vacation Rental",
};
const SERVICE_LABEL: Record<string, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  carpet: "Carpet Cleaning",
  turnover: "Airbnb Turnover",
  commercial_clean: "Commercial Cleaning",
};

export function BookingSummary({ estimate }: { estimate: Estimate }) {
  const { watch } = useFormContext<BookingFormValues>();

  const category = watch("category");
  const service = watch("service");
  const contact = watch("contact");
  const address = watch("address");
  const property = watch("property");
  const extras = watch("extras") ?? [];
  const schedule = watch("schedule");
  const access = watch("access");

  const contactVal = contact?.fullName || undefined;
  const addressVal = address?.street
    ? `${address.street}, ${address.city || ""}`.replace(/, $/, "")
    : undefined;
  const propertyVal =
    property?.kind === "commercial"
      ? property.businessName || "Commercial space"
      : property && "bedrooms" in property
      ? `${property.bedrooms} bed · ${property.bathrooms} bath`
      : property?.kind === "carpet"
      ? `${property.rooms ?? 0} rooms`
      : undefined;
  const extrasVal = extras.length ? `${extras.length} selected` : undefined;
  const scheduleVal = schedule?.date
    ? `${schedule.date}${schedule.arrivalTime ? ` · ${schedule.arrivalTime}` : ""}`
    : undefined;
  const accessVal = access?.method
    ? access.method.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;

  const rows = [
    { label: "Category", value: CATEGORY_LABEL[category], anchor: "section-category" },
    { label: "Contact", value: contactVal, anchor: "section-contact" },
    { label: "Address", value: addressVal, anchor: "section-address" },
    { label: "Service", value: SERVICE_LABEL[service], anchor: "section-service" },
    { label: "Property", value: propertyVal, anchor: "section-property" },
    { label: "Extras", value: extrasVal, anchor: "section-extras" },
    { label: "Schedule", value: scheduleVal, anchor: "section-schedule" },
    { label: "Access", value: accessVal, anchor: "section-access" },
  ];

  const money = (n: number) => `$${n.toFixed(2)}`;

  return (
    <div className="overflow-hidden rounded-card border border-line bg-card text-[13px]">
      {/* Header — tighter */}
      <div className="flex items-center gap-2 bg-pine px-4 py-3">
        <CalendarDays className="h-4 w-4 text-mint-bright" />
        <h2 className="font-display text-base font-bold text-white">Booking Summary</h2>
      </div>

      {/* Echoed rows — compact, label + value on one line */}
      <div className="px-4 py-1">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-2 border-b border-line py-1.5 last:border-0">
            <div className="min-w-0">
              <span className="font-mono text-[10px] uppercase tracking-wide text-ink-soft">
                {row.label}
              </span>
              <p className={`truncate leading-tight ${row.value ? "text-ink" : "text-ink-soft/50"}`}>
                {row.value ?? "Not Added"}
              </p>
            </div>
            <a
              href={`#${row.anchor}`}
              className="shrink-0 text-ink-soft/40 transition-colors hover:text-pine"
              aria-label={`Edit ${row.label}`}
            >
              <Pencil className="h-3 w-3" />
            </a>
          </div>
        ))}
      </div>

      {/* Price block — tighter */}
      <div className="border-t border-line bg-paper/50 px-4 py-3">
        {estimate.mode === "quote" ? (
          <div className="rounded-card bg-sea-mist/40 p-3 text-center">
            <p className="font-display text-base font-bold text-pine">Quote required</p>
            <p className="mt-0.5 text-xs text-ink-soft">{estimate.reason}</p>
          </div>
        ) : (
          <>
            <div className="space-y-0.5">
              {estimate.hours !== undefined && (
                <PriceRow label="Estimated Hours" value={`${estimate.hours}hrs`} />
              )}
              <PriceRow label="Subtotal" value={money(estimate.subtotal)} />
              <PriceRow label="GST (5%)" value={money(estimate.tax)} />
            </div>

            <div className="mt-2 flex items-center justify-between rounded-card bg-sea-mist/40 px-4 py-3">
              <span className="font-display text-sm font-bold text-ink">
                {estimate.isRough ? "Estimated Total" : "Total"}
              </span>
              <span className="font-display text-2xl font-extrabold text-pine">
                {money(estimate.total)}
              </span>
            </div>

            {estimate.note && (
              <p className="mt-1.5 text-[11px] text-ink-soft">{estimate.note}</p>
            )}
          </>
        )}

        <p className="mt-2 text-[11px] leading-snug text-ink-soft">
          Estimated price. Final pricing confirmed after we review your booking.
        </p>
      </div>
    </div>
  );
}

function PriceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-ink-soft">{label}</span>
      <span className="font-mono text-ink">{value}</span>
    </div>
  );
}