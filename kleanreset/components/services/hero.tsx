import { Eyebrow } from "@/components/ui/eyebrow";
import { PillsNav } from "./pillsNav";

export function Hero() {
    return (
        <section>
            <div className="bg-linear-to-b from-sea-mist to-grayish">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 pb-16 pt-30 text-center sm:px-6 md:px-8 md:pt-40 md:pb-28 lg:px-10 lg:pt-50 lg:pb-40 xl:px-12">
                    
                    <Eyebrow>A SERVICE THAT CREATES SATISFACTION</Eyebrow>
                    
                    <h1 className="font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl md:text-6xl lg:text-7xl">
                        Cleaning <span className="text-pine">services.</span>
                    </h1>

                    <p className="max-w-xl text-base text-ink-soft sm:text-lg md:text-xl">
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
