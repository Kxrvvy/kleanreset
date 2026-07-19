import { Eyebrow } from "../ui/eyebrow";
import { Button } from "../ui/button";
import { Home, Footprints, Building2, RefreshCw } from "lucide-react";

const SERVICES = [
    {
        icon: Home,
        title: "Home cleaning",
        description:
            "Regular upkeep that keeps your home fresh, tidy, and welcoming between deep cleans.",
    },
    {
        icon: Footprints,
        title: "Deep cleaning",
        description:
            "A top-to-bottom reset for move-ins, spring cleans, and the corners no one ever gets to.",
    },
    {
        icon: Building2,
        title: "Commercial cleaning",
        description:
            "Scheduled cleaning for offices, lobbies, and shared spaces — sanitized, spotless, and always presentable.",
    },
    {
        icon: RefreshCw,
        title: "Airbnb Turnovers",
        description:
            "Fast turnovers between stays — rooms reset, linens refreshed, and essentials restocked for a five-star welcome.",
    },
];

export function Services() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-sea-mist/20 px-gutter py-16 md:py-15">
                <Eyebrow>OUR SERVICES</Eyebrow>

                <div className="space-y-6">
                    <h1 className="font-display text-4xl font-extrabold leading-tight text-ink text-center md:text-[40px]">
                        <span>
                            One team for every kind of
                        </span>
                        <br />
                        <span>
                            clean
                        </span>
                    </h1>

                    <p className="text-center text-ink-soft">
                        <span>
                            From weekly home upkeep to clinical-grade office sanitizing — pick what you
                        </span>
                        <br />
                        <span>
                            need, and we handle the rest.
                        </span>
                    </p>
                </div>

                <div className="grid w-full max-w-6xl justify-items-center gap-50 pt-6 sm:grid-cols-2 md:grid-cols-4">
                    {SERVICES.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="flex h-57.5 w-79.75 flex-col gap-4 rounded-card border border-line bg-card p-6"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sea-mist/60 text-pine">
                                <Icon className="h-5 w-5" />
                            </span>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-ink">{title}</h3>
                                <p className="text-sm text-ink-soft">{description}</p>
                            </div>

                            <a href="/services" className="text-sm font-semibold text-pine hover:underline">
                                Learn more
                            </a>
                        </div>
                    ))}
                </div>

                <Button href="/services" className="mt-2">
                    View all services →
                </Button>
            </div>
        </section>
    );
}
