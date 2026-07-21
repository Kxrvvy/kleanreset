import { Hero } from "@/components/home/hero";
import { HomeIntro } from "@/components/home/homeIntro";
import { Services } from "@/components/home/services";
import { Why } from "@/components/home/why";
import { How } from "@/components/home/how";
import { CTA } from "@/components/home/cta";
import { TalkToUs } from "@/components/ui/TalkToUs";

export default function HomePage() {
    return (
        <>
            <Hero />
            <HomeIntro />
            <Services />
            <Why />
            <How />
            <section className="bg-paper px-4 py-12 sm:px-6 md:px-8 md:pt-14 md:pb-10 lg:px-10 xl:px-12">
                <TalkToUs />
            </section>
            <CTA />
        </>
    )
}
