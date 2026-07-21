import {Hero} from "@/components/home/hero";
import {HomeIntro} from "@/components/home/homeIntro";
import {Services} from "@/components/home/services";
import {Why} from "@/components/home/why";
import {How} from "@/components/home/how";
import {CTA} from "@/components/home/cta";
import { TalkToUs } from "@/components/ui/TalkToUs";

export default function HomePage() {
    return (
        <>
            <Hero />
            <HomeIntro />
            <Services />
            <Why />
            <How />
            <section className="px-gutter py-12 md:pt-14 md:pb-10 bg-paper">
                <TalkToUs />
            </section>
            <CTA />
        </>
    )
}
