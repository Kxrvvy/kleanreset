import { Button } from "../ui/button";

export function CTA() {
    return (
        <section>
            <div className="bg-grayish py-16 md:py-10">
                <div className="mx-auto flex h-75 w-287.5 flex-col items-center justify-center gap-4 rounded-[40px] bg-pine-deep px-36.25 text-center">
                    <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                        Come see the difference
                    </h2>

                    <p className="max-w-md text-celadon">
                        Book your first clean or grab a free quote today — and find out what “done right” actually feels like.
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
                        <Button href="/booking" variant="mint">
                            Book Now →
                        </Button>
                        <Button
                            href="/booking"
                            variant="outline"
                            className="border-white/40! bg-transparent! text-white! hover:bg-white/10!"
                        >
                            Free Quote
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
