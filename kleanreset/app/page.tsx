import type { Metadata } from "next";
import HomePage from "@/components/home/homePage";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Professional Cleaning Services Edmonton | Kleanreset",
  description:
    "Reliable, detailed home & commercial cleaning in Edmonton, AB — recurring cleans, deep cleaning, carpet, Airbnb turnovers and office cleaning. Book online today.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
