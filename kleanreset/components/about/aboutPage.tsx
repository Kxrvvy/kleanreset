import { Hero } from "@/components/about/hero";
import { Started } from "@/components/about/started";
import { Commercial } from "@/components/about/commercial";
import { Expect } from "@/components/about/expect";
import { CTA } from "@/components/about/cta";


export default function AboutPage() {
    return(
        <>
            <Hero />
            <Started />
            <Commercial />
            <Expect />
            <CTA />
        </>
    );
}