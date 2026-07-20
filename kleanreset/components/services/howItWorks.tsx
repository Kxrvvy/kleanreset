"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const TABS = [
    {
        label: "Kitchen",
        items: [
            "Countertops & backsplash wiped down",
            "Stovetop & exterior of appliances cleaned",
            "Sink scrubbed & disinfected",
            "Cabinet fronts wiped down",
            "Floors swept & mopped",
            "Trash emptied & liner replaced",
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

    return (
        <section id="checklist" className="scroll-mt-28 bg-paper2">
            <div className="mx-auto max-w-6xl px-gutter py-16 md:py-24">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Eyebrow>HOW IT WORKS</Eyebrow>
                    <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        Exactly what gets done
                    </h2>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                    {TABS.map((t, i) => (
                        <button
                            key={t.label}
                            type="button"
                            onClick={() => setActive(i)}
                            className={`rounded-pill px-4 py-2 font-mono text-xs font-bold transition-colors ${
                                i === active
                                    ? "bg-pine text-white"
                                    : "border border-line bg-card text-ink hover:bg-sea-mist/40"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
                    {tab.items.map((item) => (
                        <li
                            key={item}
                            className="flex items-center gap-3 rounded-card border border-line bg-card p-4"
                        >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-mint">
                                <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                            </span>
                            <span className="text-sm text-ink">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
