// emails/bookingConfirmation.ts
//
// Sent to the customer after a booking request. Friendly, brief, and
// careful with language (CLAUDE.md §1): this is a REQUEST, not a booking.
// Never say "booked" or "confirmed" — a human still has to check the
// real schedule and reply.

import type { BookingPayload } from "@/types/booking";
import { emailShell, calloutBox, escapeHtml } from "@/emails/layout";

const SERVICE_LABEL: Record<string, string> = {
  standard: "Standard Cleaning",
  deep: "Deep Cleaning",
  carpet: "Carpet Cleaning",
  turnover: "Airbnb Turnover",
  commercial_clean: "Commercial Cleaning",
};

export function bookingConfirmationEmail(payload: BookingPayload): { subject: string; html: string } {
  const { contact, service, schedule } = payload;
  const serviceLabel = SERVICE_LABEL[service] ?? service;
  const firstName = contact.fullName.split(" ")[0] || contact.fullName;

  const bodyHtml = `
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#10241C;">
      Hi ${escapeHtml(firstName)},
    </p>
    <p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:#10241C;">
      We&rsquo;ve received your request for <strong>${escapeHtml(serviceLabel)}</strong> on
      <strong>${escapeHtml(schedule.date)}</strong>${schedule.arrivalTime ? ` around <strong>${escapeHtml(schedule.arrivalTime)}</strong>` : ""}.
      We&rsquo;ll confirm within 24 hours.
    </p>
    ${calloutBox(
      `<p style="margin:0;font-size:13px;color:#0E4D3C;font-weight:700;">What happens next</p>
       <p style="margin:6px 0 0;font-size:13px;line-height:1.5;color:#4C5A52;">
         We&rsquo;ll check availability for your preferred date and time, then reply by email to confirm
         or suggest the closest available slot.
       </p>`
    )}
    <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#10241C;">
      Questions in the meantime? Just reply to this email.
    </p>
    <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#10241C;">
      Thanks,<br />The Kleanreset team
    </p>
  `;

  return {
    subject: `We've received your request — ${serviceLabel}`,
    html: emailShell({
      heading: "We've received your request",
      preheader: `${serviceLabel} on ${schedule.date} — we'll confirm within 24 hours.`,
      bodyHtml,
    }),
  };
}
