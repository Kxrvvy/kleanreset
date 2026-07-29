import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

// Only claims that are true for the business — no "vetted & insured" or
// "eco-friendly" unless confirmed as policy.
const TRUST = ["Locally Owned", "Professional Service", "Reliable & Detailed"];

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-b from-sea-mist to-grayish">
                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-30 pb-16 sm:px-6 md:grid-cols-[1.1fr_1.3fr] md:gap-10 md:px-8 md:pt-30 md:pb-24 lg:px-10 lg:pt-40 xl:px-12">
                    {/* Left column — the story intro */}
                    <div className="space-y-6 text-center md:text-left">
                        <div className="flex justify-center md:justify-start">
                            <Eyebrow>OUR STORY</Eyebrow>
                        </div>

                        <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl md:text-6xl md:leading-[1.05]">
                            <span className="text-ink">Cleaning done </span>
                            <br />
                            <span className="text-pine">with care</span>
                        </h1>

                        <p className="mx-auto max-w-md text-base text-ink-soft sm:text-lg md:mx-0">
                            Kleanreset started with a simple belief: a clean space changes how a
                            whole day feels. We set out to build a cleaning service we&apos;d
                            actually want to hire — dependable, detailed, and genuinely
                            considerate of the people and spaces we work in.
                        </p>

                        <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
                            {TRUST.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-1.5 rounded-pill bg-card px-4 py-2 font-mono text-xs font-bold text-ink"
                                >
                                    <Check className="h-3.5 w-3.5 shrink-0 text-mint" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:items-start md:justify-start">
                            <Button href="/booking">Book Now →</Button>
                            <Button href="/services" variant="outline">
                                Our Services
                            </Button>
                        </div>
                    </div>

                    {/* Right column — brand philosophy card (no people/avatars) */}
                    <div className="relative">
                        {/* Subtle abstract decoration */}
                        <div aria-hidden className="absolute -top-8 -right-6 h-40 w-40 rounded-full bg-mint/15 blur-2xl" />
                        <div aria-hidden className="absolute -top-6 -left-5 h-21.75 w-63.25 rounded-card bg-line" />
                        <div aria-hidden className="absolute -top-2.5 -left-1 h-18 w-16 rounded-card bg-sea-mist" />

                        <div className="relative rounded-card bg-pine-deep p-6 shadow-xl shadow-pine/20 sm:p-8">
                            <p className="font-display text-xl leading-snug text-white sm:text-2xl">
                                A clean space is more than just a clean space. It&apos;s a place
                                where you can feel comfortable, productive, and at ease.
                            </p>

                            <div className="mt-6 border-t border-white/10 pt-5">
                                <p className="font-mono text-xs font-bold uppercase tracking-widest text-mint">
                                    The Kleanreset Approach
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-celadon">
                                    We believe cleaning should be dependable, detailed, and
                                    thoughtfully done — so you can enjoy a space that feels ready for
                                    what comes next.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
