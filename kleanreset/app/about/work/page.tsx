import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { WorkPortfolio } from "@/components/work/workPortfolio";
import { workProjects } from "@/lib/workData";

export const metadata: Metadata = {
  title: "Our Work | Kleanreset",
  description:
    "Real cleaning projects completed by Kleanreset around Edmonton — see the homes and spaces we've cleaned for our clients.",
};

export default function WorkPage() {
  return (
    <>
      {/* Hero — value-focused intro, kept spacious but not tall */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 pt-30 pb-10 text-center md:pt-36 md:pb-12">
          <div className="flex justify-center">
            <Eyebrow>OUR WORK</Eyebrow>
          </div>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Real spaces. Real cleaning. Real results.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-soft">
            See examples of the homes and spaces we&apos;ve cleaned for our clients
            around Edmonton.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button href="/booking" variant="forest" className="w-full sm:w-auto">
              Book Now →
            </Button>
            <Button href="/contact" variant="forestOutline" className="w-full sm:w-auto">
              Have a Question?
            </Button>
          </div>
        </div>
      </section>

      {/* Portfolio — filters + project cards */}
      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 pb-20 md:pb-24">
          <WorkPortfolio projects={workProjects} />
        </div>
      </section>
    </>
  );
}
