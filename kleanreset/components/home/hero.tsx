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
        <section>
            <div className="bg-paper mx-auto grid max-w-[1280px] items-center gap-10 px-4 pt-24 pb-10 sm:px-6 md:min-h-[600px] md:grid-cols-[minmax(0,1fr)_minmax(320px,500px)] md:gap-10 md:px-8 lg:gap-16 lg:px-10 xl:gap-20 xl:px-12">
                {/* Left column */}
                <div className="space-y-6 md:space-y-7">
                    <Eyebrow>RESIDENTIAL & COMMERCIAL CLEANING</Eyebrow>

                    {/* Headline: smaller on phone, scales up. Desktop = text-6xl unchanged. */}
                    <h1 className="font-display text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-5xl lg:text-6xl lg:leading-[1.05]">
                        <span className="text-ink">
                            Let us handle the
                            <br />
                            mess.
                        </span>
                        <br />
                        <span className="text-pine">You enjoy the clean.</span>
                    </h1>

                    <p className="max-w-lg text-base text-ink-soft sm:text-lg">
                        Reliable, detailed cleaning for Homes, Airbnbs, and offices — done right, every single time.
                    </p>

                    {/* Buttons: full-width on the smallest screens, inline once there's room */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
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
                                <Check className="h-4 w-4 shrink-0 text-mint" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right column: card. w-full fluid on mobile, capped by max-w. */}
                <div className="relative">
                    <div className="mx-auto w-full max-w-[500px] rounded-card border border-line bg-card p-5 shadow-xl shadow-pine/10 sm:p-6">
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
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine text-xs font-bold text-card">
                                    M
                                </span>
                                <div className="text-xs">
                                    <p className="text-sm font-medium text-ink">Maria</p>
                                    <p className="text-ink-soft">Client for today</p>
                                </div>
                            </div>
                            <p className="text-[12px] font-semibold text-ink-soft">Standard clean · 1 bed, 1 bath</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Footer strip */}
            <div className="bg-pine-deep">
                <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 md:py-6">
                    <p className="flex flex-wrap items-center gap-2 font-mono text-lg font-bold tracking-wide sm:text-xl md:text-[22px]">
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
                                <Check className="h-4 w-4 shrink-0 text-mint" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}