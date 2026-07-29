import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { PillsNav } from "./pillsNav";

// Service coverage — reinforces breadth without becoming a second nav.
const COVERAGE = ["Residential", "Airbnb", "Commercial", "Dental & Clinic"];

// Real business photos (public/ourWork). Swap these paths for the strongest
// available shots any time — one large primary + two supporting.
const PHOTOS = {
    primary: "/ourWork/Work2/6.jpg",
    supportA: "/ourWork/Work3/3.jpg",
    supportB: "/ourWork/Work1/2.jpg",
};

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-b from-sea-mist to-grayish">
                <div className="mx-auto grid max-w-[1192px] items-center gap-10 px-4 pb-14 pt-28 sm:px-6 md:px-8 md:pt-32 md:pb-16 lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)] lg:gap-24 lg:px-10 lg:pt-30 lg:pb-20 xl:px-12">
                    {/* Left — messaging & conversion */}
                    <div className="flex flex-col gap-5 md:gap-6">
                        <Eyebrow>A SERVICE THAT CREATES SATISFACTION</Eyebrow>

                        <h1 className="max-w-xl font-display text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold leading-[1.08] text-ink">
                            Cleaning services that make your space{" "}
                            <span className="text-pine">feel like new.</span>
                        </h1>

                        <p className="max-w-[560px] text-base text-ink-soft sm:text-lg">
                            From routine home cleaning to deep cleaning, Airbnb turnovers, and
                            professional commercial spaces, we help keep your environment clean,
                            comfortable, and ready for what matters most.
                        </p>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                            <Button href="/booking" variant="forest" className="w-full sm:w-auto">
                                Book Now →
                            </Button>
                            <Button href="/contact" variant="forestOutline" className="w-full sm:w-auto">
                                Ask a Question →
                            </Button>
                        </div>

                        {/* Coverage — muted inline labels, not buttons */}
                        <ul className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 pt-1 text-sm font-medium text-ink-soft sm:justify-start">
                            {COVERAGE.map((item, i) => (
                                <li key={item} className="flex items-center gap-2">
                                    {i > 0 && <span aria-hidden className="text-mint">•</span>}
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — authentic service photography */}
                    <div className="relative">
                        {/* Primary featured photo */}
                        <div className="relative aspect-[16/11] w-full overflow-hidden rounded-card bg-sea-mist/60 shadow-sm">
                            <Image
                                src={PHOTOS.primary}
                                alt="Kleanreset cleaning a bright, freshly finished space"
                                fill
                                priority
                                className="object-cover"
                                sizes="(min-width:1024px) 620px, 100vw"
                            />

                            {/* Single subtle floating info card */}
                            <div className="absolute bottom-3 left-3 max-w-[220px] rounded-card bg-card/95 px-4 py-3 shadow-md backdrop-blur-sm">
                                <p className="font-display text-sm font-bold text-pine">
                                    Professional cleaning services
                                </p>
                                <p className="mt-0.5 text-xs text-ink-soft">
                                    Homes • Workplaces • Specialized spaces
                                </p>
                            </div>
                        </div>

                        {/* Two supporting photos */}
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sea-mist/60 shadow-sm">
                                <Image
                                    src={PHOTOS.supportA}
                                    alt="A spotless room after a Kleanreset deep clean"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width:1024px) 300px, 50vw"
                                />
                            </div>
                            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sea-mist/60 shadow-sm">
                                <Image
                                    src={PHOTOS.supportB}
                                    alt="Detailed cleaning work by the Kleanreset crew"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width:1024px) 300px, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <PillsNav />
            </div>
        </section>
    );
}
