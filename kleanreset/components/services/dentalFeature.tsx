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
            <div className="mx-auto grid max-w-316.5 items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-x-[3.9rem] md:px-8 md:py-24 lg:px-10 xl:px-12">
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
                        <Button href="/booking?category=commercial">
                            Book Now →
                        </Button>
                        <Button href="/contact?service=commercial" variant="outline">
                            Ask a Question
                        </Button>
                    </div>
                </div>

                {/* Right column: commercial cleaning scope */}
                <div className="rounded-card border border-line bg-card p-6 shadow-sm md:p-8">
                    <p className="font-mono text-xs uppercase tracking-widest text-mint">
                        What&apos;s included
                    </p>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">
                        Every commercial visit
                    </h3>

                    <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {CHECKLIST.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                                <Check
                                    className="mt-0.5 h-4 w-4 shrink-0 text-mint"
                                    strokeWidth={2.5}
                                    aria-hidden
                                />
                                <span className="text-[15px] leading-snug text-ink-soft">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-6 border-t border-line pt-4 text-sm text-ink-soft">
                        Commercial spaces vary in size and layout — every visit is quoted for
                        your specific workspace.
                    </p>
                </div>
            </div>
        </section>
    );
}
