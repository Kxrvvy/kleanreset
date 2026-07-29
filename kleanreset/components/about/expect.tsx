import { Eyebrow } from "@/components/ui/eyebrow";
import { ListChecks, MessageCircle, CalendarCheck, Sparkles } from "lucide-react";

// Realistic expectations — no numeric guarantees or unconfirmed claims
// (no "100% satisfaction", "24h re-clean", "vetted & insured", etc.).
const EXPECT = [
    {
        icon: ListChecks,
        title: "Detailed Service",
        description:
            "Attention to the areas that matter, with care given to the details that make a difference.",
    },
    {
        icon: MessageCircle,
        title: "Clear Communication",
        description:
            "Easy communication before and during the service so you can ask questions and share your needs.",
    },
    {
        icon: CalendarCheck,
        title: "Reliable Service",
        description:
            "A consistent approach focused on providing dependable cleaning services.",
    },
    {
        icon: Sparkles,
        title: "Professional Care",
        description: "Every space is treated with respect and attention.",
    },
];

export function Expect() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-pine-deep px-4 py-16 text-center sm:px-6 md:px-8 md:py-20 lg:px-10 xl:px-12">
                <Eyebrow tone="light">WHAT TO EXPECT</Eyebrow>

                <h2 className="max-w-xl font-display text-4xl font-extrabold leading-tight text-white md:text-[40px]">
                    What you can expect
                </h2>

                <p className="max-w-lg text-celadon">
                    A straightforward cleaning experience built around the standards we aim to
                    maintain on every job.
                </p>

                <div className="grid w-full max-w-5xl gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    {EXPECT.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex flex-col items-center gap-2 rounded-card bg-white/5 p-6 text-center"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint/15 text-mint-bright">
                                <Icon className="h-5 w-5" />
                            </span>
                            <p className="font-semibold text-white">{title}</p>
                            <p className="text-sm text-celadon">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
