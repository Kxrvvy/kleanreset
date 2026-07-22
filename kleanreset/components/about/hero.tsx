import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const TRUST = ["Locally owned", "Vetted & insured", "Eco-friendly"];

const CREW = [
    { initials: "JM", className: "bg-mint text-pine-deep" },
    { initials: "AR", className: "bg-ink-soft text-white" },
    { initials: "TS", className: "bg-lemon text-pine-deep" },
    { initials: "KL", className: "bg-sea-mist text-pine-deep" },
];

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-b from-sea-mist to-grayish">
                <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-30 pb-16 sm:px-6 md:grid-cols-[1.1fr_1.3fr] md:gap-10 md:px-8 md:pt-30 md:pb-24 lg:px-10 lg:pt-40 xl:px-12">
                    {/* Left column */}
                    <div className="space-y-6 text-center md:text-left">
                        <Eyebrow>OUR STORY</Eyebrow>

                        <h1 className="font-display text-4xl font-extrabold leading-[1.08] text-ink sm:text-5xl md:text-6xl md:leading-[1.05]">
                            <span className="text-ink">Cleaning done </span>
                            <br />
                            <span className="text-pine">with care</span>
                        </h1>

                        <p className="mx-auto max-w-md text-base text-ink-soft sm:text-lg md:mx-0">
                            Kleanreset started with a simple belief: a clean space changes how a
                            whole day feels. We built a cleaning service we&apos;d actually want
                            to hire — reliable, detailed, and genuinely kind.
                        </p>

                        <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
                            {TRUST.map((item) => (
                                <li
                                    key={item}
                                    className="group flex items-center gap-1.5 rounded-pill bg-card px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-pine hover:text-white"
                                >
                                    <Check className="h-3.5 w-3.5 shrink-0 text-mint" />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:items-start md:justify-start">
                            <Button href="/booking">Book a cleaning →</Button>
                            <Button href="/services" variant="outline">
                                Our services
                            </Button>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="relative">
                        <div aria-hidden className="absolute -top-6 -left-5 h-21.75 w-63.25 rounded-card bg-line" />
                        <div aria-hidden className="absolute -top-2.5 -left-1 h-18 w-16 rounded-card bg-sea-mist" />

                        <div className="relative rounded-card bg-pine-deep p-6 shadow-xl shadow-pine/20 sm:p-8">
                            <p className="font-display text-xl leading-snug text-white sm:text-2xl">
                                &ldquo;We don&apos;t consider a job done until the last corner
                                passes our own checklist.&rdquo;
                            </p>

                            <div className="mt-6 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {CREW.map((member) => (
                                        <span
                                            key={member.initials}
                                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ring-2 ring-pine-deep ${member.className}`}
                                        >
                                            {member.initials}
                                        </span>
                                    ))}
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-white">The Kleanreset crew</p>
                                    <p className="text-sm text-celadon">Trusted in homes & commercials</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}