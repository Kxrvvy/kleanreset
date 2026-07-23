import { Eyebrow } from "@/components/ui/eyebrow";

const STATS = [
    {
        value: "100%",
        label: "Satisfaction guarantee",
        description: "We'll make it right, to your complete satisfaction.",
    },
    {
        value: "24h",
        label: "Re-clean promise",
        description: "Missed a spot? Tell us within a day.",
    },
    {
        value: "Locally",
        label: "Owned & operated",
        description: "Consistently loved by locals.",
    },
    {
        value: "100%",
        label: "Vetted & insured",
        description: "Every cleaner, every visit.",
    },
];

export function Expect() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-pine-deep px-4 py-16 text-center sm:px-6 md:px-8 md:py-20 lg:px-10 xl:px-12">
                <Eyebrow tone="light">WHAT YOU EXPECT</Eyebrow>

                <h2 className="max-w-xl font-display text-4xl font-extrabold leading-tight text-white md:text-[40px]">
                    What every booking comes with
                </h2>

                <p className="max-w-lg text-celadon">
                    No fine print, just the standards we hold ourselves to on every single job.
                </p>

                <div className="grid w-full max-w-5xl gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    {STATS.map(({ value, label, description }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-1 rounded-card bg-white/5 p-6"
                        >
                            <p className="font-mono text-3xl font-bold text-mint-bright">{value}</p>
                            <p className="font-semibold text-white">{label}</p>
                            <p className="text-sm text-celadon">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
