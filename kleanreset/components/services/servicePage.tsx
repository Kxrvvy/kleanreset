import { Hero } from "@/components/services/hero";
import { Offer } from "@/components/services/offer";
import { DentalFeature } from "@/components/services/dentalFeature";
import { Pricing } from "@/components/services/pricing";
import { HowItWorks } from "@/components/services/howItWorks";
import { CTA } from "@/components/services/cta";
import { TalkToUs } from "@/components/ui/TalkToUs";

export default function ServicePage() {
    return (
        <>
            <Hero />
            <Offer />
            <DentalFeature />
            <Pricing />
            <HowItWorks />
            <section className="px-4 py-12 sm:px-6 md:px-8 md:pt-14 md:pb-10 lg:px-10 xl:px-12">
                <TalkToUs />
            </section>
            <CTA />
        </>
    );
}
