import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Check } from "lucide-react";



const TRUST = [
    "Eco-friendly products",
    "100% satisfaction guarantee",
    "Vetted & insured cleaners",
];



export function Hero() {
    return (
        <section className="overflow-x-clip">
            <div
                className="relative bg-paper bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/bg_hero.png')" }}
            >
            {/* Subtle dark gradient behind the text area — improves headline
                readability over the bright photo without a solid box. Darkens
                the top on mobile (where the copy sits) and the left on desktop. */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-charcoal/45 via-charcoal/10 to-transparent lg:bg-linear-to-r lg:from-charcoal/45 lg:via-charcoal/10 lg:to-transparent"
            />
            <div className="relative z-10 mx-auto grid max-w-[1228px] content-center gap-10 px-4 pt-28 pb-16 min-h-[630px] sm:px-6 md:px-8 md:min-h-[710px] lg:min-h-[750px] lg:grid-cols-[minmax(0,1fr)_minmax(300px,540px)] lg:grid-rows-[auto_auto] lg:gap-x-16 lg:gap-y-6 lg:px-8 lg:pb-8 xl:gap-x-16 xl:px-12 min-[1440px]:min-h-[820px]">
                {/* Intro text */}
                <div className="space-y-5 md:space-y-6 lg:col-start-1 lg:row-start-1">
                    <Eyebrow tone="gold">RESIDENTIAL & COMMERCIAL CLEANING</Eyebrow>

                    <h1 className="font-display text-[clamp(2.25rem,5.4vw,3.9rem)] font-extrabold leading-[1.06] text-white lg:leading-[1.05]">
                        <span className="block">
                            Let us handle the
                            <br className="hidden sm:block" />
                            mess.
                        </span>
                        <span className="block text-forest">You enjoy the clean.</span>
                    </h1>

                    <p className="max-w-xl text-base text-white/90 sm:text-lg font-sans">
                        Reliable, detailed cleaning for Homes, Airbnbs, and offices — done right, every single time.
                    </p>
                </div>

                {/* Image cluster — 3 picture holders.
                    Fluid on phones (fits the viewport width), fixed staggered
                    sizes on desktop. Sits between the text and the buttons on
                    mobile; moves into its own column on desktop. */}
                <div className="mx-auto w-full max-w-[360px] sm:max-w-[440px] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:max-w-none lg:self-center">
                    <div className="flex items-stretch justify-center gap-3 sm:gap-4 lg:items-center">
                        {/* Large tile */}
                        <div className="relative aspect-[3/4] w-[54%] shrink-0 overflow-hidden rounded-card border border-white/20 bg-charcoal shadow-lg lg:aspect-auto lg:h-[380px] lg:w-[220px]">
                            <Image
                                src="/ourWork/Work2/6.jpg"
                                alt="Kleanreset cleaning work"
                                fill
                                className="object-cover"
                                sizes="(min-width:1024px) 220px, 50vw"
                            />
                        </div>

                        {/* Two smaller, staggered tiles */}
                        <div className="flex flex-1 flex-col gap-3 sm:gap-4 lg:flex-none lg:gap-4">
                            <div className="relative flex-1 overflow-hidden rounded-card border border-white/20 bg-charcoal shadow-lg lg:h-[270px] lg:w-[180px] lg:flex-none lg:-translate-y-1">
                                <Image
                                    src="/ourWork/Work2/8.jpg"
                                    alt="Kleanreset cleaning work"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width:1024px) 180px, 40vw"
                                />
                            </div>
                            <div className="relative flex-1 overflow-hidden rounded-card border border-white/20 bg-charcoal shadow-lg lg:h-[180px] lg:w-[180px] lg:flex-none lg:translate-y-1">
                                <Image
                                    src="/ourWork/Work3/9.jpg"
                                    alt="Kleanreset cleaning work"
                                    fill
                                    className="object-cover"
                                    sizes="(min-width:1024px) 180px, 40vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions: buttons + trust */}
                <div className="space-y-5 md:space-y-6 lg:col-start-1 lg:row-start-2">
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                        <Button href="/booking" variant="forest" className="w-full sm:w-auto">
                            Book Now →
                        </Button>
                        <Button href="/contact" variant="forestOutline" className="w-full sm:w-auto">
                            Ask a Question →
                        </Button>
                    </div>

                    <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-1">
                        {TRUST.map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-1.5 font-mono text-xs text-white/75"
                            >
                                <Check className="h-4 w-4 shrink-0 text-teal" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
        </section>
    );
}