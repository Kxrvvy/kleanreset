import {Hero} from "@/components/home/hero";
import {HomeIntro} from "@/components/home/homeIntro";
import {Services} from "@/components/home/services";
import {Why} from "@/components/home/why";
{/*import {How} from "@/components/home/how";
import {CTA} from "@/components/home/cta";*/}

export default function HomePage() {
    return (
        <>
            <Hero />
            <HomeIntro />
            <Services />
            <Why />
            {/*<How />
            <CTA />*/}
        </>
    )
}
