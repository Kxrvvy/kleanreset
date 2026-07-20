import { Eyebrow } from "@/components/ui/eyebrow";

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-br from-sea-mist to-grayish">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-gutter pt-28 pb-16 text-center md:pt-32 md:pb-20">
                    <Eyebrow>A SERVICE THAT CREATES SATISFACTION</Eyebrow>

                    <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-ink md:text-6xl">
                        Cleaning <span className="text-pine">services.</span>
                    </h1>

                    <p className="max-w-xl text-lg text-ink-soft">
                        Let us handle the mess — from a single deep clean to a recurring
                        schedule, explore every way we keep homes, Airbnbs, and workplaces
                        spotless.
                    </p>
                </div>
            </div>
        </section>
    );
}
