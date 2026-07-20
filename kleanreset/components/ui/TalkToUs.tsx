// components/ui/TalkToUs.tsx
//
// Reusable "Questions? Call or email us" callout — CLAUDE.md §5b.
// Placed on Home, Booking, and Contact pages (and here, on Services).

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const CONTACT = {
  phone: "780 220 5497",
  email: "kleanReset29@gmail.com",
};

export function TalkToUs() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 rounded-card border border-line bg-card px-8 py-8 text-center md:flex-row md:text-left">
      <div>
        <h3 className="font-display text-2xl font-extrabold text-ink">
          Questions? Call or email us
        </h3>
        <p className="mt-1 text-ink-soft">
          We&apos;re happy to help you figure out exactly what you need.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <a
          href={`tel:+1${CONTACT.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-2 font-semibold text-ink hover:text-pine"
        >
          <Phone className="h-4 w-4 text-mint" />
          {CONTACT.phone}
        </a>
        <a
          href={`mailto:${CONTACT.email}`}
          className="flex items-center gap-2 font-semibold text-ink hover:text-pine"
        >
          <Mail className="h-4 w-4 text-mint" />
          {CONTACT.email}
        </a>
        <Link
          href="/contact"
          className="rounded-pill bg-pine px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pine-deep"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
