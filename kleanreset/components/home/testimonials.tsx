// components/home/testimonials.tsx
//
// Social proof between "Why Kleanreset" and the final CTA. Bridges the gap
// between the company claiming it's trustworthy and real customers saying so.
//
// ⚠️ PLACEHOLDER CONTENT — the quotes and names below are illustrative only.
// Replace with real, verified customer reviews (with permission) before
// launch. Do NOT present these as genuine reviews until confirmed. Add a
// star rating only if it reflects a real, collected rating.

import { Eyebrow } from "../ui/eyebrow";

type Testimonial = {
    quote: string;
    name: string;
    service: string;
};

const TESTIMONIALS: Testimonial[] = [
    {
        quote:
            "They were on time, thorough, and left the kitchen spotless. It's the first cleaning service I've actually wanted to rebook.",
        name: "Sarah M.",
        service: "Home cleaning",
    },
    {
        quote:
            "Our Airbnb turnovers used to stress me out. Kleanreset resets the whole place between guests without me lifting a finger.",
        name: "Daniel R.",
        service: "Airbnb turnover",
    },
    {
        quote:
            "Professional, friendly, and genuinely careful with our office. Everything is sanitized and presentable every single visit.",
        name: "Priya K.",
        service: "Commercial cleaning",
    },
];

export function Testimonials() {
    return (
        <section>
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 xl:px-12">
                <Eyebrow>TESTIMONIALS</Eyebrow>

                <h2 className="max-w-2xl text-center font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl md:text-[40px]">
                    Trusted by customers who value a clean space
                </h2>

                <div className="grid w-full gap-6 pt-6 md:grid-cols-3">
                    {TESTIMONIALS.map(({ quote, name, service }) => (
                        <figure
                            key={name}
                            className="flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-card p-6"
                        >
                            <blockquote className="text-[15px] leading-relaxed text-ink">
                                &ldquo;{quote}&rdquo;
                            </blockquote>

                            <figcaption className="flex items-center gap-3 border-t border-line pt-4">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sea-mist/60 font-display text-sm font-bold text-pine">
                                    {name.charAt(0)}
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-ink">{name}</span>
                                    <span className="block text-xs text-ink-soft">{service}</span>
                                </span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
