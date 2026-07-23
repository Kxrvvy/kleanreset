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
            <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:px-8 md:py-24 lg:px-10 xl:px-12">
                {/* Left column */}
                <div className="space-y-6 text-center md:text-left">
                    <Eyebrow>WHAT WE STAND FOR</Eyebrow>

                    <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        Professional commercial & Office cleaning
                    </h2>

                    <p className="mx-auto max-w-md text-base text-ink-soft sm:text-lg md:mx-0">
                        commercial buildings and offices run on trust — employees, staff, and customers need to see a
                        space that&apos;s visibly, consistently clean. We follow rigorous sanitation procedures
                        on every visit, so waiting rooms, reception, workstations, and treatment areas are ready before 
                        the day starts.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:justify-start">
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
                        What every commercial visit includes
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
