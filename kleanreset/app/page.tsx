import type { Metadata } from "next";
import HomePage from "@/components/home/homePage";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Kleanreset Cleaning Services | Edmonton, AB",
  description:
    "Professional residential & commercial cleaning in Edmonton, Alberta — deep, move-in/out, office, Airbnb & carpet cleaning. Request your free quote today.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
