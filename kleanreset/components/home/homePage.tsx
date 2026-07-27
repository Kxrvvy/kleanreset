import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trustBar";
import { HomeIntro } from "@/components/home/homeIntro";
import { Services } from "@/components/home/services";
import { Why } from "@/components/home/why";
import { How } from "@/components/home/how";
import { CTA } from "@/components/home/cta";
import { TalkToUs } from "@/components/ui/TalkToUs";

// Conversion-focused flow:
// Hero → Trust bar → Services → About → Why → How → Final CTA
// → compact contact (near footer, so it never interrupts the booking journey).
// (Testimonials section is built but temporarily removed until real reviews exist.)
export default function HomePage() {
    return (
        <>
            <Hero />
            {/*<TrustBar />*/}
            <Services />
            <HomeIntro />
            <Why />
            <How />
            <CTA />
            <section className="bg-paper px-4 pb-12 pt-4 sm:px-6 md:px-8 md:pb-14 lg:px-10 xl:px-12">
                <TalkToUs />
            </section>
        </>
    )
}
