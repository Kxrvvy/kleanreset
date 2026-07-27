import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";

type ServiceCard = {
    image: string;
    title: string;
    description: string;
    cta: string;
    href: string;
};

// Core, confidently-bookable services. `image` paths resolve to
// public/services/<file> — drop the real photos in using these names.
const PRIMARY: ServiceCard[] = [
    {
        image: "/ourWork/Work4/8.jpg",
        title: "Home cleaning",
        description:
            "Keep your home fresh, comfortable, and ready for everyday living with reliable routine cleaning.",
        cta: "View service",
        href: "#pricing",
    },
    {
        image: "/ourWork/Work2/8.jpg",
        title: "Deep cleaning",
        description:
            "A more detailed clean for spaces that need extra attention — from kitchens and bathrooms to hard-to-reach areas.",
        cta: "View service",
        href: "#pricing",
    },
    {
        image: "/vacation_rental.jpg",
        title: "Airbnb & vacation rental",
        description:
            "Help keep your rental guest-ready with detailed cleaning between stays.",
        cta: "Book this service",
        href: "/booking?category=vacation_rental",
    },
    {
        image: "/ourWork/Work1/3.jpg",
        title: "Carpet cleaning",
        description:
            "Refresh your carpets and help maintain a cleaner, more comfortable space.",
        cta: "View service",
        href: "#pricing",
    },
    {
        image: "/ourWork/Work3/8.jpg",
        title: "Commercial & office",
        description:
            "Professional cleaning for offices and workspaces, tailored to the needs and layout of your business.",
        cta: "Get a quote",
        href: "/booking?category=commercial",
    },
    {
        image: "/ourWork/Work3/21.jpg",
        title: "Dental & clinic",
        description:
            "Detailed cleaning for professional healthcare environments — keeping reception, waiting, and shared areas clean and presentable.",
        cta: "Get a quote",
        href: "/booking?category=commercial&type=clinic",
    },
];

// Request-based services — availability varies, so they're kept visually
// secondary and route to contact rather than a booking flow.
const ADDITIONAL = ["Move-in / move-out", "Decluttering / organizing"];

export function Offer() {
    return (
        <section id="offer" className="scroll-mt-28">
            <div className="bg-linear-to-b from-grayish to-sea-mist px-6 py-16 md:px-gutter md:py-24">
                {/* Full-width with 55px side gutters up to 1600px, then caps and
                    centers so cards don't stretch huge on large/ultrawide monitors. */}
                <div className="mx-auto max-w-[1600px]">
                    <div className="flex flex-col items-start gap-4 text-left">
                        <Eyebrow>WHAT WE OFFER</Eyebrow>
                        <h2 className="max-w-2xl font-display text-4xl font-extrabold leading-tight text-ink md:text-[40px]">
                            Cleaning services for the spaces that matter most
                        </h2>
                        <p className="max-w-2xl text-sm text-ink-soft sm:text-base">
                            From everyday home cleaning to detailed deep cleans, vacation rentals,
                            offices, and professional spaces — choose the service that best fits
                            your needs.
                        </p>
                    </div>

                    {/* Primary services */}
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {PRIMARY.map(({ image, title, description, cta, href }) => (
                            <a
                                key={title}
                                href={href}
                                className="group flex flex-col overflow-hidden rounded-card border border-line bg-card transition-all duration-200 hover:-translate-y-1 hover:border-pine/30 hover:shadow-md"
                            >
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sea-mist/60">
                                    <Image
                                        src={image}
                                        alt={title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col gap-3 p-6">
                                    <h3 className="font-semibold text-ink">{title}</h3>
                                    <p className="flex-1 text-sm text-ink-soft">{description}</p>
                                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-pine">
                                        {cta}
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

                    {/* Additional / request-based services — visually secondary */}
                    <div className="mt-10 rounded-card border border-line bg-paper2 p-6 md:mt-12 md:p-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <Eyebrow>NEED SOMETHING EXTRA?</Eyebrow>
                                <h3 className="font-display text-xl font-bold text-ink">
                                    Additional services, available on request
                                </h3>
                                <p className="max-w-xl text-sm text-ink-soft">
                                    Looking for a move-in / move-out clean, decluttering, or another
                                    cleaning request? Availability may vary depending on your needs and
                                    the space — contact us to check.
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {ADDITIONAL.map((item) => (
                                        <span
                                            key={item}
                                            className="rounded-lg border border-line bg-card px-3 py-1.5 text-xs font-semibold text-ink"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Button
                                href="/contact"
                                variant="forestOutline"
                                className="shrink-0 self-start md:self-auto"
                            >
                                Ask About Availability →
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
