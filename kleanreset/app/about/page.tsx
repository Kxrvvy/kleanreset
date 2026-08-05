import type { Metadata } from "next";
import AboutPage from "@/components/about/aboutPage";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "About Kleanreset — Edmonton Cleaning Company",
  description:
    "Learn the story behind Kleanreset, a locally owned Edmonton cleaning service built on dependable, detailed work and the values that guide every clean we do.",
  path: "/about",
});

export default function Page() {
  return <AboutPage />;
}
