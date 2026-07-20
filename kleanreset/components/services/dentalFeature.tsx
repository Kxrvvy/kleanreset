import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";

const CHECKLIST = [
    "Waiting room sanitized",
    "Reception & door handles disinfected",
    "Exam & treatment rooms deep-cleaned",
    "High-touch surfaces disinfected",
    "Floors vacuumed & mopped",
    "Trash removed & liners replaced",
];

export function DentalFeature() {
    return (
        <section id="dental" className="scroll-mt-28 bg-paper2">
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-gutter py-16 md:grid-cols-2 md:py-24">
                {/* Left column */}
                <div className="space-y-6">
                    <Eyebrow>WHAT WE STAND FOR</Eyebrow>

                    <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        Professional dental & Office cleaning
                    </h2>

                    <p className="max-w-md text-lg text-ink-soft">
                        Clinics and offices run on trust — patients and staff need to see a
                        space that&apos;s visibly, consistently clean. We follow an
                        infection-control-minded checklist on every visit, so waiting rooms,
                        reception, and treatment areas are ready before the day starts.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Button href="/booking?category=commercial&type=clinic">
                            Get a free quote
                        </Button>
                        <Button href="/contact" variant="outline">
                            Message us
                        </Button>
                    </div>
                </div>

                {/* Right column: checklist card */}
                <div className="rounded-card border border-line bg-card p-6 shadow-xl shadow-pine/10">
                    <h3 className="mb-5 text-base font-semibold text-ink">
                        What every clinic visit includes
                    </h3>

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
                </div>
            </div>
        </section>
    );
}
