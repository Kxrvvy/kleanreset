// app/api/booking/route.ts
//
// Receives a booking submission, re-validates it server-side (client
// validation can always be bypassed), computes the authoritative
// estimate, and sends the two emails described in CLAUDE.md §11.

import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/bookingSchema";
import { estimate } from "@/lib/pricing";
import { resend } from "@/lib/resend";
import { bookingNotificationEmail } from "@/emails/bookingNotification";
import { bookingConfirmationEmail } from "@/emails/bookingConfirmation";
import type { BookingPayload } from "@/types/booking";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form for errors", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const businessEmail = process.env.BUSINESS_EMAIL;
  if (!fromEmail || !businessEmail) {
    return NextResponse.json(
      { ok: false, error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const data = parsed.data;
  const payload: BookingPayload = {
    ...data,
    meta: {
      submittedAt: new Date().toISOString(),
      estimate: estimate(data.category, data.service, data.property, data.extras),
    },
  };

  const notification = bookingNotificationEmail(payload);
  const confirmation = bookingConfirmationEmail(payload);

  // The business notification is the critical path — CLAUDE.md §11: "the
  // site's job ends when the request is delivered." If this fails, nothing
  // was captured, so the customer needs to know and retry.
  try {
    const notificationResult = await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      replyTo: payload.contact.email,
      subject: notification.subject,
      html: notification.html,
    });

    if (notificationResult.error) {
      console.error("Booking notification email failed", notificationResult.error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your request. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Booking notification email threw", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your request. Please try again." },
      { status: 502 }
    );
  }

  // The customer confirmation is a courtesy. The business already has the
  // request, so a failure here (e.g. a typo'd address) shouldn't make the
  // customer think their booking didn't go through.
  try {
    const confirmationResult = await resend.emails.send({
      from: fromEmail,
      to: payload.contact.email,
      subject: confirmation.subject,
      html: confirmation.html,
    });
    if (confirmationResult.error) {
      console.error("Booking confirmation email failed", confirmationResult.error);
    }
  } catch (err) {
    console.error("Booking confirmation email threw", err);
  }

  return NextResponse.json({ ok: true });
}
