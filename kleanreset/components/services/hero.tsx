import { Eyebrow } from "@/components/ui/eyebrow";
import { PillsNav } from "./pillsNav";

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-b from-sea-mist to-grayish">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-gutter pt-38 pb-16 text-center md:pt-55 md:pb-32">
                    <Eyebrow>A SERVICE THAT CREATES SATISFACTION</Eyebrow>

                    <h1 className="font-display text-5xl font-extrabold leading-[1.05] text-ink md:text-7xl">
                        Cleaning <span className="text-pine">services.</span>
                    </h1>

                    <p className="max-w-xl text-lg text-ink-soft">
                        Let us handle the mess — from a single deep clean to a recurring
                        schedule, explore every way we keep homes, Airbnbs, and workplaces
                        spotless.
                    </p>
                </div>

                <PillsNav />
            </div>
        </section>
    );
}
