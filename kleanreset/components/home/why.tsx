import { Eyebrow } from "../ui/eyebrow";
import { ClipboardCheck, Clock, Droplet } from "lucide-react";

const WHY = [
    {
        icon: ClipboardCheck,
        title: "Vetted & insured",
        description:
            "Every cleaner is background-checked, trained, and fully insured — so you can hand over the keys with confidence.",
    },
    {
        icon: Clock,
        title: "On time, every time",
        description:
            "We show up when we say we will and stick to the checklist — no rushing, no skipped corners.",
    },
    {
        icon: Droplet,
        title: "Satisfaction guarantee",
        description:
            "Not happy with a spot we missed? Tell us within 24 hours and we'll come back and make it right — free.",
    },
];

export function Why() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-pine px-4 py-16 sm:px-6 md:px-8 md:py-15 lg:px-10 xl:px-12">
                <Eyebrow tone="light">WHY KLEANRESET</Eyebrow>

                <h1 className="font-display text-4xl font-extrabold leading-tight text-white text-center md:text-[40px]">
                    <span>
                        Fast, friendly, and satisfaction <br /> guaranteed
                    </span>
                </h1>

                <p className="max-w-2xl text-center text-[15px] text-celadon">
                    The little things are the whole job. Here&apos;s what you can count on every time we show up.
                </p>

                <div className="grid w-full max-w-6xl gap-3 pt-6 md:grid-cols-3 md:justify-items-center lg:grid-cols-3">
                    {WHY.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex flex-col gap-4 rounded-card bg-pine-deep p-6 md:max-w-100"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint text-pine-deep">
                                <Icon className="h-5 w-5" />
                            </span>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-white">{title}</h3>
                                <p className="text-sm text-celadon">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}