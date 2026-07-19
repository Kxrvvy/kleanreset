// components/ui/Section.tsx
//
// Consistent max-width + horizontal padding for every page section.
// The `bg` prop lets a section paint a full-width background color while
// keeping its content centered. Used on every page — build once, reuse.

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Full-bleed background color. Content stays centered regardless. */
  bg?: "paper" | "paper2" | "pine-deep" | "card";
  className?: string;
};

const backgrounds: Record<NonNullable<Props["bg"]>, string> = {
  paper: "bg-paper",
  paper2: "bg-paper2",
  "pine-deep": "bg-pine-deep",
  card: "bg-card",
};

export function Section({ children, bg, className = "" }: Props) {
  return (
    <section className={bg ? backgrounds[bg] : ""}>
      <div className={`mx-auto max-w-6xl px-6 py-16 md:py-24 ${className}`}>
        {children}
      </div>
    </section>
  );
}