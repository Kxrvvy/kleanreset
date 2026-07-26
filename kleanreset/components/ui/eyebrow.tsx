// components/ui/Eyebrow.tsx
//
// The small mono "— HOW WE STARTED" labels above section headings.
// Used across nearly every section on every page.

import type { ReactNode } from "react";

type Tone = "dark" | "light" | "lemon" | "gold";

type Props = {
  children: ReactNode;
  tone?: Tone; // light = on a dark bg; lemon = yellow accent; gold = muted warm gold
};

// Record forces every tone to map to a colour.
const colors: Record<Tone, string> = {
  dark: "text-pine",
  light: "text-mint",
  lemon: "text-lemon",
  gold: "text-gold",
};

export function Eyebrow({ children, tone = "dark" }: Props) {
  const color = colors[tone];
  return (
    <div className={`flex items-center gap-3 ${color}`}>
      {/* Decorative dash. bg-current inherits the text color above, so the
          dash always matches the label — one place to change, not two. */}
        {/*<span className="h-px w-6 bg-current" aria-hidden /> */}
      <span className="font-sans font-bold text-[14px] min-[320px]:text-[9px] min-[375px]:text-[11px] min-[425px]:text-[13px] uppercase tracking-widest">
        {children}
      </span>
    </div>
  );
}