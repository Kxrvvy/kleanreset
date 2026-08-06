// app/opengraph-image.tsx
// Generates the default 1200×630 social-share image (Open Graph + Twitter) for
// every route, so links unfurl with a branded card: logo + company name +
// "Professional Cleaning Services" + location. No external asset required.

import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const alt =
  "Kleanreset Cleaning Services — Professional cleaning services in Edmonton, Alberta";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  // Embed the logo as a data URI (read at request time). Guarded so a missing
  // file never breaks the card — it just renders without the logo.
  let logoSrc: string | null = null;
  try {
    const data = readFileSync(join(process.cwd(), "public", "kleanreset.png"));
    logoSrc = `data:image/png;base64,${data.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "linear-gradient(135deg, #0E4D3C 0%, #093A2D 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} width={96} height={96} alt="" />
          ) : null}
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 2,
              color: "#15C79A",
            }}
          >
            Kleanreset Cleaning Services
          </div>
        </div>

        <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, marginTop: 36 }}>
          Professional Cleaning Services
        </div>
        <div style={{ fontSize: 36, color: "#DDF3EB", marginTop: 24 }}>
          Edmonton, Alberta
        </div>
      </div>
    ),
    { ...size },
  );
}
