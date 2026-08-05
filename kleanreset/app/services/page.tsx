import type { Metadata } from "next";
import ServicePage from "@/components/services/servicePage";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Cleaning Services in Edmonton | Kleanreset",
  description:
    "Explore Kleanreset's cleaning services in Edmonton — home cleaning, deep cleaning, carpet, Airbnb turnovers, commercial and office cleaning. See pricing and book.",
  path: "/services",
});

export default function Page() {
  return <ServicePage />;
}
