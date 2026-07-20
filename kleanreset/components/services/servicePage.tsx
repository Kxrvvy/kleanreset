import { Hero } from "@/components/services/hero";
import { PillsNav } from "@/components/services/pillsNav";
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
            <PillsNav />
            <Offer />
            <DentalFeature />
            <Pricing />
            <HowItWorks />
            <section className="px-gutter py-16 md:py-24">
                <TalkToUs />
            </section>
            <CTA />
        </>
    );
}
