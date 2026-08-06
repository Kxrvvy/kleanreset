// lib/seo.ts
//
// Single source of truth for site-wide SEO. Used by the root layout metadata,
// per-page metadata (pageSeo), robots.ts, sitemap.ts, manifest.ts and the
// LocalBusiness JSON-LD. Update SITE_URL once the real domain goes live.

import type { Metadata } from "next";

// ⚠️ Set this to the live domain (no trailing slash). Canonical URLs, OG URLs,
// the sitemap and robots.txt all derive from it. Placeholder until DNS is live.
export const SITE_URL = "https://www.kleanreset.com";

export const SITE_NAME = "Kleanreset Cleaning Services";

export const DEFAULT_TITLE = "Professional Cleaning Services Edmonton | Kleanreset";
export const DEFAULT_DESCRIPTION =
  "Reliable, detailed home and commercial cleaning in Edmonton, AB — recurring cleans, deep cleaning, carpet, Airbnb turnovers, and office cleaning. Book online.";

// Business facts (kept in sync with the footer / contact page).
export const BUSINESS = {
  legalName: "Kleanreset Cleaning Services",
  telephone: "+1-780-220-5497",
  email: "kleanReset29@gmail.com",
  streetAddress: "80 Ave Northwest",
  city: "Edmonton",
  region: "AB",
  postalCode: "T5T 3A6",
  country: "CA",
  areaServed: "Edmonton",
  hoursOpen: "08:00",
  hoursClose: "18:00",
  hoursDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  // Confirmed social profiles only.
  sameAs: ["https://www.facebook.com/profile.php?id=61589492674045"],
  logo: "/kleanreset.png",
} as const;

/** Absolute URL for a site-relative path (e.g. "/about" → "https://…/about"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}

/**
 * Per-page metadata: full title (no template, so callers control exact length),
 * description, canonical URL, and Open Graph + Twitter cards. The OG/Twitter
 * image comes from app/opengraph-image.tsx automatically.
 */
export function pageSeo({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Schema.org LocalBusiness / cleaning-service structured data (JSON-LD). */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HouseKeepingService",
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: absoluteUrl(BUSINESS.logo),
    image: absoluteUrl(BUSINESS.logo),
    description: DEFAULT_DESCRIPTION,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: { "@type": "City", name: BUSINESS.areaServed },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.hoursDays,
        opens: BUSINESS.hoursOpen,
        closes: BUSINESS.hoursClose,
      },
    ],
    sameAs: BUSINESS.sameAs,
  };
}
