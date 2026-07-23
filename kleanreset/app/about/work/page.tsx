import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { WorkFeed } from "@/components/work/workFeed";
import { workJobs } from "@/lib/workData";

export const metadata: Metadata = {
  title: "Our Work | Kleanreset",
  description: "Recent cleans from the Kleanreset crew around Edmonton.",
};

export default function WorkPage() {
  return (
    <Section bg="paper" className="pt-30 md:pt-36">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="flex justify-center">
          <Eyebrow>OUR WORK</Eyebrow>
        </div>
        <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          Recent jobs, from the crew
        </h1>
        <p className="mt-3 text-ink-soft">
          A running feed of homes, and commercials we&apos;ve cleaned around Edmonton.
        </p>
      </div>

      <WorkFeed jobs={workJobs} />
    </Section>
  );
}
