// app/opengraph-image.tsx
// Generates the default 1200×630 social-share image (Open Graph + Twitter) for
// every route, so links unfurl with a branded card. No external asset required.

import { ImageResponse } from "next/og";

export const alt = "Kleanreset — Professional cleaning services in Edmonton";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#15C79A",
          }}
        >
          Kleanreset
        </div>
        <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.05, marginTop: 28 }}>
          Cleaning done with care
        </div>
        <div style={{ fontSize: 34, color: "#DDF3EB", marginTop: 28 }}>
          Home &amp; commercial cleaning · Edmonton, AB
        </div>
      </div>
    ),
    { ...size },
  );
}
