import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const CHECKLIST = [
    "Kitchen & countertops",
    "Bathrooms sanitized",
    "Floors vacuumed & mopped",
    "High-touch surfaces disinfected",
];

const TRUST = [
    "Eco-friendly products",
    "100% satisfaction guarantee",
    "Vetted & insured cleaners",
];

const FOOTER_TAGLINE = ["Reliable.", "Detailed.", "Consistent"];

const FOOTER_TRUST = ["Same-day quotes", "Fully insured"];

export function Hero() {
    return (
        <section >
            <div className="bg-paper mx-auto mt-auto mb-auto grid min-h-130 max-w-347.5 items-center gap-8 px-gutter md:grid-cols-[600px_499px] md:gap-45.25 md:min-h-165.5 md:pt-20 md:pb-2">
                {/* Left column */}
                <div className="space-y-7">
                    <Eyebrow>RESIDENTIAL & COMMERCIAL CLEANING</Eyebrow>

                    <h1 className="font-display text-5xl font-extrabold leading-[1.05] md:text-6xl">
                        <span className="text-ink">
                            Let us handle the
                            <br />
                            mess.
                        </span>
                        <br />
                        <span className="text-pine">You enjoy the clean.</span>
                    </h1>

                    <p className="max-w-md text-lg text-ink-soft">
                        Reliable, detailed cleaning for Homes, Airbnbs, and offices — done right, every single time.
                    </p>

                    {/*BTNContainer */}
                    <div className="flex flex-wrap gap-4">
                        <Button href="/booking">Book a cleaning →</Button>
                        <Button href="/services" variant="outline">
                            View services
                        </Button>
                    </div>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                        {TRUST.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-1.5 font-mono text-xs text-ink-soft"
                            >
                                <Check className="h-4 w-4 text-mint" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column */}
                <div className="relative ">
                    <div className="mx-auto max-w-124.75 rounded-card border border-line bg-card p-6 shadow-xl shadow-pine/10 ">
                        {/* Card Header */}
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-base font-semibold text-ink">
                                Today&apos;s checklist
                            </h3>
                            <span className="rounded-pill bg-mint/15 px-3 py-1 font-mono text-xs uppercase tracking-wide text-pine">
                                In Progress
                            </span>
                        </div>

                        {/* Checklist */}
                        <ul className="space-y-3">
                            {CHECKLIST.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 border-b border-dashed border-line pb-3 last:border-0 last:pb-0"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-mint">
                                        <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                                    </span>
                                    <span className="text-sm text-ink">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Card Footer */}
                        <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4">
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pine text-xs font-bold text-card">
                                    M
                                </span>
                                <div className="text-xs">
                                    <p className="text-sm font-medium text-ink">
                                        Maria
                                    </p>
                                    <p className="text-ink-soft">
                                        Client for today
                                    </p>
                                </div>
                            </div>
                            <p className="text-[12px] font-semibold text-ink-soft">Standard clean · 1 bed, 1 bath</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Footer */}
            <div className="bg-pine-deep">
                <div className="mx-auto flex max-w-347.5 flex-wrap items-center justify-between gap-3 px-gutter py-6.5">
                    <p className="flex flex-wrap items-center gap-2 font-mono text-[22px] font-bold tracking-wide">
                        {FOOTER_TAGLINE.map((word, i) => (
                            <span key={word} className="flex items-center gap-2">
                                {i > 0 && <span className="text-celadon/50">·</span>}
                                <span className={i % 2 === 0 ? "text-mint-bright" : "text-celadon"}>
                                    {word}
                                </span>
                            </span>
                        ))}
                    </p>

                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                        {FOOTER_TRUST.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-1.5 text-sm text-white"
                            >
                                <Check className="h-4 w-4 text-mint" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}