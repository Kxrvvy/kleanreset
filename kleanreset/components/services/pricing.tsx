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

    // subtotal, not total — the published rate ($50/hr) and this table are
    // pre-tax; the disclaimer below calls out that tax isn't included.
    return { beds, baths, hours: result.hours!, price: result.subtotal };
}

const TABLES = [
    {
        title: "Standard Cleaning",
        badge: "MOST POPULAR",
        badgeTone: "bg-mint/15 text-pine",
        rows: ROOM_COMBOS.map(({ beds, baths }) => priceRow("standard", beds, baths)),
    },
    {
        title: "Deep Cleaning",
        badge: "EXTRA THOROUGH",
        badgeTone: "bg-lemon/25 text-ink",
        rows: ROOM_COMBOS.map(({ beds, baths }) => priceRow("deep", beds, baths)),
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="scroll-mt-28">
            <div className="px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10 xl:px-12">
                {/* Header row */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-4 text-left ">
                        <Eyebrow>SIMPLE PRICING</Eyebrow>
                        <h2 className="max-w-132.25 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
                            Priced by your space, not surprises
                        </h2>
                        <span className="inline-flex items-center rounded-pill bg-sea-mist/60 px-4 py-2 font-mono text-xs font-bold text-pine">
                            Standard rate — ${HOURLY_RATE}/hour
                        </span>
                    </div>

                    <p className="max-w-sm font-mono text-lg leading-relaxed text-ink-soft md:self-end md:text-right">
                        Residential jobs are priced by beds and baths. Add roughly 30 minutes
                        for each additional bed and bath. Deep cleans take longer for a more
                        thorough result.
                    </p>
                </div>

                {/* Pricing cards */}
                <div className="mt-12 flex flex-col items-center gap-5.25 lg:flex-row lg:justify-center">
                    {TABLES.map(({ title, badge, badgeTone, rows }) => (
                        <div
                            key={title}
                            className="w-full max-w-[663px] rounded-[28px] bg-card p-6 shadow-lg shadow-pine/10 lg:min-h-[245px]"
                        >
                            <div className="mb-5 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-pine">{title}</h3>
                                <span
                                    className={`rounded-pill px-3 py-1.5  font-mono font-bold text-xs uppercase tracking-wide ${badgeTone}`}
                                >
                                    {badge}
                                </span>
                            </div>

                            <ul className="space-y-4">
                                {rows.map((row) => (
                                    <li
                                        key={`${row.beds}-${row.baths}`}
                                        className="grid grid-cols-3 items-center border-b border-dashed border-line pb-5 last:border-0 last:pb-0"
                                    >
                                        <span className="text-sm text-ink">
                                            {row.beds} bed · {row.baths} bath
                                        </span>
                                        <span className="text-center text-sm text-ink-soft">
                                            {row.hours} hrs
                                        </span>
                                        <span className="text-right text-sm font-bold text-pine">
                                            ${row.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
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
