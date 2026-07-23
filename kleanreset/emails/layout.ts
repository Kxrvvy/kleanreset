// emails/layout.ts
//
// Shared HTML shell for outgoing emails. Inline styles only — email
// clients don't load external stylesheets or Tailwind. Colours are
// copied from app/globals.css tokens (see CLAUDE.md §4) since @theme
// isn't reachable outside the app.

const COLORS = {
  pine: "#0E4D3C",
  pineDeep: "#0A3729",
  mint: "#15C79A",
  celadon: "#7FDDC0",
  seaMist: "#DDF3EB",
  paper: "#F9F9F9",
  card: "#FFFFFF",
  field: "#F4F6F1",
  line: "#E6E9E3",
  ink: "#10241C",
  inkSoft: "#4C5A52",
} as const;

export function emailShell(opts: {
  heading: string;
  preheader?: string;
  bodyHtml: string;
}): string {
  const { heading, preheader, bodyHtml } = opts;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(heading)}</title>
  </head>
  <body style="margin:0;padding:0;background-color:${COLORS.paper};font-family:Arial,Helvetica,sans-serif;color:${COLORS.ink};">
    ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>` : ""}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLORS.paper};padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:${COLORS.card};border-radius:16px;overflow:hidden;border:1px solid ${COLORS.line};">
            <tr>
              <td style="background-color:${COLORS.pine};padding:20px 28px;">
                <span style="font-size:18px;font-weight:800;color:${COLORS.card};letter-spacing:0.02em;">Kleanreset</span>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <h1 style="margin:0 0 16px;font-size:20px;font-weight:800;color:${COLORS.pine};">${escapeHtml(heading)}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="background-color:${COLORS.field};padding:18px 28px;border-top:1px solid ${COLORS.line};">
                <p style="margin:0;font-size:12px;color:${COLORS.inkSoft};">
                  Kleanreset · Edmonton, Alberta
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// A single "field: value" row used inside detail tables.
export function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 0;font-size:13px;color:${COLORS.inkSoft};width:40%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:6px 0;font-size:13px;color:${COLORS.ink};font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

// A section heading used to group detailRow tables (Contact, Address, etc.)
export function sectionHeading(title: string): string {
  return `<h2 style="margin:20px 0 8px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${COLORS.pine};border-bottom:1px solid ${COLORS.line};padding-bottom:6px;">${escapeHtml(title)}</h2>`;
}

export function detailTable(rowsHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rowsHtml}</table>`;
}

export function calloutBox(html: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
    <tr>
      <td style="background-color:${COLORS.seaMist};border-radius:12px;padding:16px 20px;">
        ${html}
      </td>
    </tr>
  </table>`;
}

// Minimal escaping — every value rendered here is customer-submitted text.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
