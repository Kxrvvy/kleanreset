import Image from "next/image";
import { Eyebrow } from "../ui/eyebrow";
import { Button } from "../ui/button";

// `image` paths point at real photos in public/ — swap any time.
const SERVICES = [
    {
        image: "/ourWork/Work2/6.jpg",
        title: "Home cleaning",
        description:
            "Regular upkeep that keeps your home fresh, tidy, and welcoming between deep cleans.",
    },
    {
        image: "/ourWork/Work2/8.jpg",
        title: "Deep cleaning",
        description:
            "A top-to-bottom reset for move-ins, spring cleans, and the corners no one ever gets to.",
    },
    {
        image: "/ourWork/Work3/8.jpg",
        title: "Commercial cleaning",
        description:
            "Scheduled cleaning for offices, lobbies, and shared spaces — sanitized, spotless, and always presentable.",
    },
    {
        image: "/vacation_rental.jpg",
        title: "Airbnb Turnovers",
        description:
            "Fast turnovers between stays — rooms reset, linens refreshed, and essentials restocked for a five-star welcome.",
    },
];

export function Services() {
    return (
        <section>
            <div className="flex flex-col items-center justify-center gap-6 bg-sea-mist/20 px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-10 xl:px-12">
                <Eyebrow>OUR SERVICES</Eyebrow>

                <div className="space-y-5">
                    <h2 className="font-display text-[clamp(2.5rem,6vw,3.5rem)] font-extrabold leading-tight text-ink text-center">
                        One team for every kind of clean
                    </h2>

                    <p className="mx-auto max-w-2xl text-center text-ink-soft">
                        From weekly home upkeep to clinical-grade office sanitizing — pick what you need, and we handle the rest.
                    </p>
                </div>

                <div className="grid w-full max-w-6xl gap-6 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                    {SERVICES.map(({ image, title, description }) => (
                        <a
                            key={title}
                            href="/services"
                            className="group flex flex-col overflow-hidden rounded-card border border-line bg-card transition-all duration-200 hover:-translate-y-1 hover:border-pine/30 hover:shadow-md"
                        >
                            <div className="relative aspect-[16/10] w-full overflow-hidden bg-sea-mist/60">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                                />
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-6">
                                <h3 className="font-semibold text-ink">{title}</h3>
                                <p className="flex-1 text-sm text-ink-soft">{description}</p>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-pine">
                                    Explore service
                                    <span
                                        aria-hidden
                                        className="transition-transform group-hover:translate-x-0.5"
                                    >
                                        →
                                    </span>
                                </span>
                            </div>
                        </a>
                    ))}
                </div>

                <Button href="/services" className="mt-2">
                    View all services →
                </Button>
            </div>
        </section>
    );
}
