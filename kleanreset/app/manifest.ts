// app/manifest.ts → served at /manifest.webmanifest
// Basic PWA/install metadata + icons. Theme color matches the brand pine.

import type { MetadataRoute } from "next";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Cleaning Services in Edmonton`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#F9F9F9",
    theme_color: "#0E4D3C",
    icons: [
      {
        src: "/kleanreset.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
