// app/api/contact/route.ts
//
// Receives a general Contact page inquiry (CLAUDE.md §5a), re-validates
// it server-side, and emails the business — reply-to = the sender, so
// a human can reply directly.

import { NextResponse } from "next/server";
import { contactPayloadSchema } from "@/lib/bookingSchema";
import { resend } from "@/lib/resend";
import { contactNotificationEmail } from "@/emails/contactNotification";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactPayloadSchema.safeParse(body);
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

  const payload = parsed.data;
  const notification = contactNotificationEmail(payload);

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: businessEmail,
      replyTo: payload.email,
      subject: notification.subject,
      html: notification.html,
    });

    if (result.error) {
      return NextResponse.json(
        { ok: false, error: "We couldn't send your message. Please try again." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
