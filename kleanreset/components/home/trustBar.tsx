// components/home/trustBar.tsx
//
// Elevated credibility cards that overlap the bottom of the Hero (reference
// layout). Each card: icon → title → short reassurance. Answers "can I trust
// them in my home?" the moment the hero ends. Kept lighter than the hero.

import { ShieldCheck, Clock, BadgeCheck, Leaf } from "lucide-react";

const POINTS = [
    {
        icon: ShieldCheck,
        title: "Vetted & insured",
        
    },
    {
        icon: Clock,
        title: "Reliable & on time",
    },
    {
        icon: BadgeCheck,
        title: "Satisfaction guaranteed",
    },
    {
        icon: Leaf,
        title: "Eco-friendly products",
    },
];

export function TrustBar() {
    return (
        // Negative top margin lifts the cards up over the hero; z-30 keeps them
        // above the hero's own layers. Tune the -mt values to taste.
        <section className="relative z-40 -mt-14 px-4 sm:px-6 md:-mt-0 md:px-8 lg:px-10 xl:px-12">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {POINTS.map(({ icon: Icon, title }) => (
                    <div
                        key={title}
                        className="flex flex-col items-center gap-3 rounded-card border border-line bg-card p-6 text-center shadow-lg"
                    >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sea-mist/60 text-pine">
                            <Icon className="h-6 w-6" />
                        </span>
                        <h3 className="font-display text-base font-bold text-ink">{title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
