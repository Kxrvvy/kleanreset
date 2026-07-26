// components/home/trustBar.tsx
//
// Compact credibility strip directly below the Hero. Answers the visitor's
// first question — "can I trust these people in my home?" — at a glance.
// Kept deliberately light so it never competes with the Hero above it.

import { ShieldCheck, Clock, BadgeCheck, Leaf } from "lucide-react";

const POINTS = [
    { icon: ShieldCheck, label: "Vetted & insured cleaners" },
    { icon: Clock, label: "Reliable & on time" },
    { icon: BadgeCheck, label: "Satisfaction guaranteed" },
    { icon: Leaf, label: "Eco-friendly products" },
];

export function TrustBar() {
    return (
        <section className="border-b border-line bg-paper2">
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-4 px-4 py-6 sm:px-6 md:grid-cols-4 md:px-8 lg:px-10 xl:px-12">
                {POINTS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sea-mist/60 text-pine">
                            <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium text-ink">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
