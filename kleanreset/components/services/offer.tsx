import { Eyebrow } from "@/components/ui/eyebrow";
import {
    Home,
    Sparkles,
    Boxes,
    RefreshCw,
    Layers,
    Truck,
    Building2,
    Stethoscope,
    type LucideIcon,
} from "lucide-react";

type Card = {
    icon: LucideIcon;
    title: string;
    description: string;
    cta: string;
    href: string;
    highlight?: boolean;
};

const CARDS: Card[] = [
    {
        icon: Home,
        title: "Home cleaning",
        description:
            "Regular upkeep that keeps your home fresh, tidy, and welcoming between deep cleans.",
        cta: "See pricing",
        href: "#pricing",
    },
    {
        icon: Sparkles,
        title: "Deep cleaning",
        description:
            "A top-to-bottom reset for move-ins, spring cleans, and the corners no one ever gets to.",
        cta: "See pricing",
        href: "#pricing",
    },
    {
        icon: Boxes,
        title: "Decluttering / Organizing",
        description:
            "We help sort, box, and organize rooms that have gotten away from you — closets, garages, home offices — so the space is livable again.",
        cta: "Contact us",
        href: "/contact",
    },
    {
        icon: RefreshCw,
        title: "Airbnb Turnovers",
        description:
            "Fast turnovers between stays — rooms reset, linens refreshed, and essentials restocked for a five-star welcome.",
        cta: "Book now",
        href: "/booking?category=vacation_rental",
    },
    {
        icon: Layers,
        title: "Carpet cleaning",
        description:
            "Deep extraction for carpets, rugs, and stairs — lifts dirt and odours regular vacuuming can't reach.",
        cta: "See pricing",
        href: "#pricing",
    },
    {
        icon: Truck,
        title: "Move-In / Move-Out",
        description:
            "A detailed clean before keys change hands — empty cabinets, inside appliances, baseboards, the works.",
        cta: "Contact us",
        href: "/contact",
    },
    {
        icon: Building2,
        title: "Commercial cleaning",
        description:
            "Scheduled cleaning for offices, lobbies, and shared spaces — sanitized, spotless, and always presentable.",
        cta: "Get a quote",
        href: "/booking?category=commercial",
    },
    {
        icon: Stethoscope,
        title: "Dental & clinic cleaning",
        description:
            "Clinical-grade sanitizing for waiting rooms, reception, and treatment areas — built around infection-control standards.",
        cta: "Get a quote",
        href: "/booking?category=commercial&type=clinic",
        highlight: true,
    },
];

export function Offer() {
    return (
        <section id="offer" className="scroll-mt-28">
            <div className="bg-linear-to-b from-grayish to-sea-mist px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-10 xl:px-12">
                <div className="flex flex-col items-start gap-4 text-left">
                    <Eyebrow>WHAT WE OFFER</Eyebrow>
                    <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                        We provide services for you
                    </h2>
                    <p className="max-w-2xl text-sm text-ink-soft sm:text-base">
                        Six ways we keep your space spotless — every one backed by the same satisfaction guarantee.
                    </p>
                </div>

                <div className="mt-12 grid justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {CARDS.map(({ icon: Icon, title, description, cta, href, highlight }) => (
                        <div
                            key={title}
                            className={`flex min-h-[240px] w-full max-w-[360px] flex-col gap-4 rounded-card border p-6 sm:max-w-none xl:max-w-none ${highlight
                                    ? "border-pine bg-pine text-white"
                                    : "border-line bg-card text-ink"
                                }`}
                        >
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${highlight ? "bg-white/15 text-white" : "bg-sea-mist/60 text-pine"
                                    }`}
                            >
                                <Icon className="h-5 w-5" />
                            </span>

                            <div className="flex-1 space-y-2">
                                <h3 className="font-semibold">{title}</h3>
                                <p className={`text-sm ${highlight ? "text-celadon" : "text-ink-soft"}`}>
                                    {description}
                                </p>
                            </div>

                            <a
                                href={href}
                                className={`text-sm font-semibold hover:underline ${highlight ? "text-mint-bright" : "text-pine"
                                    }`}
                            >
                                {cta} →
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
