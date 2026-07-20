// Anchor links, not filters — clicking a pill smooth-scrolls to the
// matching section (html has scroll-smooth; sections carry scroll-mt-28
// so the fixed Nav doesn't cover the target on landing).

const PILLS = [
    { label: "Home & Deep", href: "#offer" },
    { label: "Airbnb & Carpet", href: "#offer" },
    { label: "Dental & Office", href: "#dental" },
    { label: "Pricing", href: "#pricing" },
    { label: "Checklist", href: "#checklist" },
] as const;

export function PillsNav() {
    return (
        <nav aria-label="Jump to section" className="bg-grayish">
            <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-3 px-gutter py-6">
                {PILLS.map((pill) => (
                    <li key={pill.label}>
                        <a
                            href={pill.href}
                            className="inline-flex items-center rounded-pill border border-line bg-card px-4 py-2 font-mono text-xs font-bold text-ink transition-colors hover:bg-pine hover:text-white"
                        >
                            {pill.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
