// emails/contactNotification.ts
//
// Sent to Kleanreset for a general Contact page inquiry (move-in/out,
// decluttering, dental questions, quote clarifications, etc. — see
// CLAUDE.md §5a). Not tied to any service.

import type { ContactPayload } from "@/types/booking";
import { emailShell, sectionHeading, detailTable, detailRow, escapeHtml } from "@/emails/layout";

export function contactNotificationEmail(payload: ContactPayload): { subject: string; html: string } {
  const { fullName, email, phone, message } = payload;

  const bodyHtml = `
    ${sectionHeading("Contact")}
    ${detailTable(detailRow("Name", fullName) + detailRow("Email", email) + detailRow("Phone", phone))}

    ${sectionHeading("Message")}
    <p style="margin:0;font-size:13px;line-height:1.6;color:#10241C;white-space:pre-wrap;">${escapeHtml(message)}</p>
  `;

  return {
    subject: `New contact inquiry — ${fullName}`,
    html: emailShell({
      heading: "New contact inquiry",
      preheader: `${fullName}: ${message.slice(0, 80)}`,
      bodyHtml,
    }),
  };
}
