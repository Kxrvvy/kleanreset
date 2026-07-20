// Pricing table numbers are derived from lib/pricing.ts's estimate() —
// never hand-typed — so this table can't drift from the live calculator.

import { Eyebrow } from "@/components/ui/eyebrow";
import { CARPET_PER_ROOM, HOURLY_RATE, TAX_RATE, estimate } from "@/lib/pricing";
import type { PropertyDetails } from "@/types/booking";

const ROOM_COMBOS = [
    { beds: 1, baths: 1 },
    { beds: 2, baths: 1 },
    { beds: 2, baths: 2 },
] as const;

function priceRow(service: "standard" | "deep", beds: number, baths: number) {
    const property: PropertyDetails = {
        kind: "residential",
        propertyType: "house",
        bedrooms: beds,
        bathrooms: baths,
        floors: 1,
        hasPets: false,
    };

    const result = estimate("residential", service, property, []);
    if (result.mode !== "price") {
        throw new Error(`Expected a firm price for ${service} ${beds}bed/${baths}bath`);
    }

    return { beds, baths, hours: result.hours!, total: result.total };
}

const TABLES = [
    {
        title: "Standard Cleaning",
        badge: "MOST POPULAR",
        rows: ROOM_COMBOS.map(({ beds, baths }) => priceRow("standard", beds, baths)),
    },
    {
        title: "Deep Cleaning",
        badge: "EXTRA THOROUGH",
        rows: ROOM_COMBOS.map(({ beds, baths }) => priceRow("deep", beds, baths)),
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="scroll-mt-28">
            <div className="mx-auto max-w-6xl px-gutter py-16 md:py-24">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Eyebrow>SIMPLE PRICING</Eyebrow>
                    <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        Priced by your space, not surprises
                    </h2>

                    <span className="rounded-pill bg-sea-mist/60 px-4 py-2 font-mono text-xs font-bold text-pine">
                        Standard rate — ${HOURLY_RATE}/hour
                    </span>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {TABLES.map(({ title, badge, rows }) => (
                        <div
                            key={title}
                            className="rounded-card border border-line bg-card p-6"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-ink">{title}</h3>
                                <span className="rounded-pill bg-mint/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-pine">
                                    {badge}
                                </span>
                            </div>

                            <ul className="space-y-3">
                                {rows.map((row) => (
                                    <li
                                        key={`${row.beds}-${row.baths}`}
                                        className="flex items-center justify-between border-b border-dashed border-line pb-3 last:border-0 last:pb-0"
                                    >
                                        <span className="text-sm text-ink">
                                            {row.beds}bed · {row.baths}bath
                                        </span>
                                        <span className="text-sm text-ink-soft">{row.hours}hrs</span>
                                        <span className="text-sm font-semibold text-ink">
                                            ${row.total}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <p className="mt-6 text-center text-sm text-ink-soft">
                    Carpet is ${CARPET_PER_ROOM}/room. Commercial is quoted separately.
                </p>

                <p className="mt-2 text-center text-xs text-ink-soft/80">
                    Prices are estimates, exclude {TAX_RATE * 100}% GST. Carpet is $
                    {CARPET_PER_ROOM}/room; commercial jobs are quoted — request a free quote.
                </p>
            </div>
        </section>
    );
}
