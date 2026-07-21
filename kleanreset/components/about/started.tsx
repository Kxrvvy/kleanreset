import { Eyebrow } from "@/components/ui/eyebrow";

export function Started() {
    return (
        <section>
            <div className="bg-linear-to-b from-grayish to-sea-mist">
                {/* base: single column, fluid padding. md+: two columns + Figma spacing. */}
                <div className="mx-auto grid max-w-350 grid-cols-1 gap-12 px-6 pt-16 pb-16 sm:px-8 md:grid-cols-[3fr_3fr] md:gap-37.5 md:px-20 md:pt-15.75 md:pb-24">
                    {/* Left column */}
                    <div className="space-y-4">
                        <Eyebrow>HOW WE STARTED</Eyebrow>

                        <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                            A small crew with high standards
                        </h2>

                        <div className="space-y-4 text-ink-soft">
                            <p>
                                We noticed the same thing again and again: cleaning services that
                                rushed, cut corners, or never showed up twice the same way. So we
                                started Kleanreset to do the opposite — show up on time, follow a
                                real checklist, and treat every home and workplace like our own.
                            </p>
                            <p>
                                Today we clean homes, Airbnbs, offices, and dental clinics across
                                the area, and we still hold every job to that first-day standard.
                            </p>
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-4">
                        <Eyebrow>WHAT WE BELIEVE</Eyebrow>

                        <h2 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                            Clean should feel effortless — for you
                        </h2>

                        <blockquote className="border-l-2 border-mint pl-4 text-lg font-semibold leading-relaxed text-ink sm:text-[20px]">
                            The best cleaning is the kind you never have to think about, because
                            someone already thought of everything.
                        </blockquote>

                        <p className="text-ink-soft">
                            That means clear pricing, consistent people, and products that are
                            safe for your family, pets, and the planet. No surprises, no pressure
                            — just a space that&apos;s ready when you walk in.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}