import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section>
            <div className="mx-auto max-w-6xl px-gutter py-16 md:py-24">
                <div className="flex flex-col items-center gap-4 rounded-card bg-pine px-8 py-12 text-center">
                    <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                        Book the service you need
                    </h2>

                    <p className="max-w-md text-celadon">
                        Get a free, same-day quote — no obligation, no pressure. We&apos;ll
                        confirm your preferred date within 24 hours.
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                        <Button href="/booking" variant="mint">
                            Book Now →
                        </Button>
                        <Button
                            href="/contact"
                            variant="outline"
                            className="border-white/40! bg-transparent! text-white! hover:bg-white/10!"
                        >
                            Get a free quote
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
