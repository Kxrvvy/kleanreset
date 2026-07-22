// components/booking/SectionCard.tsx
//
// White rounded card with a numbered step badge + title, wrapping each
// booking section. The optional `id` lets the summary's edit pencils
// scroll-link straight to this section.

import type { ReactNode } from "react";

export function SectionCard({
  step,
  title,
  subtitle,
  id,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 rounded-card border border-line bg-card p-5 sm:p-6 md:p-8">
      <div className="mb-6 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sea-mist/60 text-sm font-bold text-pine">
          {step}
        </span>
        <div>
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          {subtitle && <p className="text-sm text-ink-soft">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}