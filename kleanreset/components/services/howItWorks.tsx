"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const TABS = [
    {
        label: "Kitchen",
        items: [
            "Wipe & disinfect countertops",
            "Sanitize sink & fixtures",
            "Empty bins & replace liners",
            "Stovetop & exterior of appliances cleaned",
            "Cabinet fronts wiped down",
            "Floors swept & mopped",
        ],
    },
    {
        label: "Bathrooms",
        items: [
            "Toilet cleaned & disinfected, inside and out",
            "Shower & tub scrubbed",
            "Mirrors & fixtures polished",
            "Sink & counter wiped down",
            "Floors mopped",
            "Towels & bath mats straightened",
        ],
    },
    {
        label: "Bedrooms & Living",
        items: [
            "Surfaces & furniture dusted",
            "Floors vacuumed or mopped",
            "Beds made / linens straightened",
            "Mirrors & glass cleaned",
            "Trash emptied",
            "Baseboards & light switches wiped",
        ],
    },
    {
        label: "Office & Clinic",
        items: [
            "Desks & workstations wiped down",
            "High-touch surfaces disinfected (handles, switches)",
            "Waiting & reception areas sanitized",
            "Floors vacuumed & mopped",
            "Trash removed & liners replaced",
            "Restrooms cleaned & restocked",
        ],
    },
] as const;

export function HowItWorks() {
    const [active, setActive] = useState(0);
    const tab = TABS[active];
    const left = tab.items.slice(0, 3);
    const right = tab.items.slice(3);

    return (
        <section id="checklist" className="scroll-mt-28">
            <div className="px-[200px] py-16 md:py-24">
                <div className="max-w-xl space-y-4 text-left">
                    <Eyebrow>HOW IT WORKS</Eyebrow>
                    <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        Exactly what gets done
                    </h2>
                    <p className="text-ink-soft">
                        No guesswork. Choose an area to see everything our team ticks off
                        before we call it clean.
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    {TABS.map((t, i) => (
                        <button
                            key={t.label}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`rounded-pill px-5 py-2.5 font-mono text-xs font-bold transition-colors ${
                                i === active
                                    ? "bg-pine text-white"
                                    : "border border-line bg-card text-ink hover:bg-sea-mist/40"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-x-16 gap-y-1 md:grid-cols-2">
                    {[left, right].map((column, colIndex) => (
                        <ul key={colIndex} className="space-y-1">
                            {column.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 border-b border-dashed border-line py-3.5"
                                >
                                    <Check className="h-4 w-4 shrink-0 text-mint" strokeWidth={3} />
                                    <span className="text-sm text-ink">{item}</span>
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}
