import { Eyebrow } from "../ui/eyebrow";

const STEPS = [
    {
        number: "01",
        title: "Book online",
        description: "Pick your service, date, and time — the whole thing takes under two minutes.",
    },
    {
        number: "02",
        title: "We show up",
        description: "Vetted cleaners arrive on schedule with all the supplies and equipment they need.",
    },
    {
        number: "03",
        title: "We clean",
        description: "We work through the full checklist for your space, room by room, corner by corner.",
    },
    {
        number: "04",
        title: "You relax",
        description: "Walk into a spotless space. If anything's off, we'll come back and fix it.",
    },
];

export function How() {
    return (
        <section>
            <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 md:px-8 md:py-14 lg:px-10 xl:px-12">

                <Eyebrow>How it works</Eyebrow>


                <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                    Book in two minutes, relax in one
                </h2>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {STEPS.map((step) => (
                        <div key={step.number} className="space-y-3">
                            <span className="font-mono text-sm font-bold text-ink">{step.number}</span>
                            <div className="h-0.5 w-full bg-mint" />
                            <h3 className="font-semibold text-ink">{step.title}</h3>
                            <p className="text-sm text-ink-soft">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
