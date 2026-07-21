import { Eyebrow } from "../ui/eyebrow";
import { Button } from "../ui/button";
import { Home, Footprints, Building2, RefreshCw } from "lucide-react";

const SERVICES = [
    {
        icon: Home,
        title: "Care in every corner",
        description:
            "We clean the spots most people skip, because the details are what  you actually notice.",
    },
    {
        icon: Footprints,
        title: "Consistency you trust",
        description:
            "Same standard, same care, every visit; so you always know what you're geting.",
    },
    {
        icon: Building2,
        title: "Honest & transparent",
        description:
            "Clear pricing and straight answers. Vetted, insured cleaners you can feel safe with.",
    },
    {
        icon: RefreshCw,
        title: "Kind to the planet",
        description:
            "Eco-friendly products by default — better for your space and everyone in it.",
    },
];

export function Commercial() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-paper px-6 py-16 sm:px-8 md:min-h-130 md:px-gutter md:py-15">
                <div className="w-full max-w-6xl">
                    <Eyebrow>OUR SERVICES</Eyebrow>
                </div>

                <div className="w-full max-w-6xl space-y-6">

                    <h1 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                            The values behind every clean
                    </h1>
                </div>

                <div className="grid w-full max-w-6xl justify-items-center gap-10 pt-6 sm:grid-cols-2 md:grid-cols-4">
                    {SERVICES.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex w-full max-w-70 flex-col gap-2 rounded-card border border-line bg-card p-6 md:h-50.25"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea-mist/60 text-pine">
                                <Icon className="h-5 w-5" />
                            </span>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-ink text-[18px]">{title}</h3>
                                <p className="text-[13px] text-ink-soft">{description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
