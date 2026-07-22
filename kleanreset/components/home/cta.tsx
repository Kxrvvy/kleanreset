import { Button } from "../ui/button";

export function CTA() {
    return (
        <section>
            <div className="bg-grayish px-4 py-16 sm:px-6 md:px-8 md:py-10 lg:px-10 xl:px-12">
                <div className="mx-auto flex w-full max-w-[980px] flex-col items-center justify-center gap-4 rounded-[32px] bg-pine-deep px-6 py-12 text-center sm:px-8 md:px-12 lg:px-16">
                    <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                        Ready for a spotless space?
                    </h2>

                    <p className="max-w-md text-celadon">
                        Book your first clean or grab a free quote today — reliable, detailed, consistent cleaning you can trust.
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
                            Free Quote
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
