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
            <div className="bg-paper mx-auto grid max-w-[1228px] items-center gap-8 px-4 pt-28 pb-8 sm:px-6 md:px-8 md:pt-28 md:pb-8 lg:min-h-[540px] lg:grid-cols-[minmax(0,1fr)_minmax(300px,540px)] lg:gap-16 lg:px-8 xl:gap-16 xl:px-12">
                {/* Left column */}
                <div className="space-y-5 md:space-y-6 lg:space-y-6.5">
                    <Eyebrow>RESIDENTIAL & COMMERCIAL CLEANING</Eyebrow>

                    <h1 className="font-display text-[clamp(2.8rem,5.4vw,3.9rem)] font-extrabold leading-[1.06] text-ink lg:leading-[1.05]">
                        <span className="block">
                            Let us handle the
                            <br className="hidden sm:block" />
                            mess.
                        </span>
                        <span className="block text-pine">You enjoy the clean.</span>
                    </h1>

                    <p className="max-w-xl text-base text-ink-soft sm:text-lg font-sans">
                        Reliable, detailed cleaning for Homes, Airbnbs, and offices — done right, every single time.
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <Button href="/booking">Book a cleaning →</Button>
                        <Button href="/services" variant="outline">
                            View services
                        </Button>
                    </div>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
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

                {/* Right column: card. */}
                <div className="relative">
                    <div className="mx-auto w-full max-w-[500px] rounded-card border border-line bg-card p-5 shadow-xl shadow-pine/10 sm:p-6 md:max-w-[420px] lg:max-w-[500px] lg:p-5">
                        {/* Card Header */}
                        <div className="mb-4 flex items-center justify-between">
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
                        <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-4">
                            <div className="flex items-center gap-2">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pine text-xs font-bold text-card">
                                    M
                                </span>
                                <div className="text-xs">
                                    <p className="text-sm font-medium text-ink">Maria</p>
                                    <p className="text-ink-soft">Client for today</p>
                                </div>
                            </div>
                            <p className="max-w-[120px] text-[12px] font-semibold text-ink-soft sm:max-w-none">
                                Standard clean ·
                                <br className="sm:hidden" />
                                1 bed, 1 bath
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Footer strip */}
            <div className="bg-pine-deep">
                <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 md:py-6">
                    <p className="flex w-full flex-wrap items-center justify-center gap-2 font-mono text-[0.8rem] font-bold tracking-wide min-[375px]:text-[0.96rem] min-[425px]:text-[1.15rem] md:w-auto md:justify-start md:text-lg">
                        {FOOTER_TAGLINE.map((word, i) => (
                            <span key={word} className="flex items-center gap-2">
                                {i > 0 && <span className="text-celadon/50">·</span>}
                                <span className={i % 2 === 0 ? "text-mint-bright" : "text-celadon"}>
                                    {word}
                                </span>
                            </span>
                        ))}
                    </p>

                    <ul className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-1 md:w-auto">
                        {FOOTER_TRUST.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-1.5 text-[0.70rem] text-white min-[375px]:text-[0.76rem] min-[425px]:text-[1rem] md:text-sm"
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