import { Eyebrow } from "@/components/ui/eyebrow";

export function Started() {
    return (
        <section>
            <div className="bg-linear-to-b from-grayish to-sea-mist">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 pt-16 pb-16 sm:px-6 md:grid-cols-2 md:gap-8 md:px-8 md:pt-20 md:pb-24 lg:px-10 xl:px-12">
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