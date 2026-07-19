import { Eyebrow } from "../ui/eyebrow";
import { Check } from "lucide-react";


const TRUST = [
    "Locally owned & operated",
    "Background-checked, trained cleaners",
    "Eco-friendly products by default",
];


export function HomeIntro() {
    return <section>
        <div className="bg-paper mx-auto grid max-w-359.75 items-center gap-8 px-gutter py-16 md:grid-cols-[555px_1fr] md:gap-34.75 md:py-24">
            {/* Left Column */}
            <div className="space-y-6">
                <Eyebrow>ABOUT THE TEAM</Eyebrow>

                <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                    The people behind the spotless
                </h2>

                <div className="space-y-4 text-[17px] text-ink-soft">
                    <p>
                        Kleanreset is a small, tight-knit crew that treats every home and
                        workplace like our own. We hire for care, train for consistency, and
                        never rush a job just to get to the next one.
                    </p>
                    <p>
                        The result is cleaning you don&apos;t have to think about — because we
                        already did.
                    </p>
                </div>

                <ul className="space-y-3 pt-2">
                    {TRUST.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-ink">
                            <Check className="h-4 w-4 shrink-0 text-mint" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Column */}
            <div className="relative">
                {/*Back Card */}
                <div
                    aria-hidden
                    className="absolute -top-6 -left-5 h-21.75 w-63.25 rounded-card bg-line"
                />
                <div
                    aria-hidden
                    className="absolute -top-2.5 -left-1 h-18 w-16 rounded-card bg-sea-mist"
                />

                {/* Main Card */}
                <div className="relative rounded-card bg-pine-deep p-8 shadow-xl shadow-pine/20">
                    <p className="font-display text-2xl leading-snug text-white">
                        &ldquo;We don&apos;t consider a job done until the last corner passes
                        our own checklist.&rdquo;
                    </p>

                    <div className="mt-6 space-y-1">
                        <p className="text-sm font-bold text-white">- Our cleaning crew</p>
                        <p className="text-sm text-celadon">
                            Trusted in homes & commercial buildings
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
}
