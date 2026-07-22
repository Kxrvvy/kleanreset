"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const TABS = [
    {
        label: "Kitchen",
        items: [
            "Dust accessible surfaces",
            "Wipe countertops",
            "Clean sink and faucet",
            "Clean stovetop",
            "Wipe appliance exteriors (fridge, oven, etc.)",
            "Vacuum carpets and rugs",
            "Sweep and mop floor",
            "Empty garbage bin",
            "Wipe high-touch areas (knobs, switches)",
            "Light organizing and tidying",
        ],
    },
    {
        label: "Bathrooms",
        items: [
            "Toilet cleaned & disinfected, inside and out",
            "Clean shower, tub & tiles",
            "Mirrors & fixtures polished",
            "Sink & counter wiped down",
            "Mop & disinfect floors",
            "Towels & bath mats straightened",
        ],
    },
    {
        label: "Bedrooms & Living",
        items: [
            "Dust all surfaces & shelves",
            "Floors vacuumed or mopped",
            "Make beds & fluff cushions",
            "Mirrors & glass cleaned",
            "Trash emptied",
            "Tidy & declutter surfaces",
            "Wipe high-touch areas (knobs, switches)",
        ],
    },
    {
        label: "Commercial",
        items: [
            "Desks & workstations wiped down",
            "High-touch surfaces disinfected (handles, switches)",
            "Work stations and common areas sanitized",
            "Restrooms cleaned & sanitized",
            "carpets and rugs vaccumed",
            "kitchens/break rooms cleaned and sanitized",
            "Lobby and reception area cleaning",
            "interior windows and glass doors cleaned",
            "Trash removed & liners replaced",

        ],
    },
] as const;

export function HowItWorks() {
    const [active, setActive] = useState(0);
    const tab = TABS[active];
    const columns = tab.items.reduce(
        (acc, item, index) => {
            acc[index % 2].push(item);
            return acc;
        },
        [[], []] as [string[], string[]],
    );
    const [left, right] = columns;

    return (
        <section id="checklist" className="scroll-mt-28">
            <div className="px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10 xl:px-12">
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
                            className={`rounded-pill px-5 py-2.5 font-mono text-xs font-bold transition-colors ${i === active
                                ? "bg-pine text-white"
                                : "border border-line bg-card text-ink hover:bg-sea-mist/40"
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-x-6 gap-y-1 md:grid-cols-2 md:gap-x-10 lg:gap-x-16">
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
