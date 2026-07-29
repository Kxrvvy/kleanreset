// app/contact/page.tsx
// Contact = the "Ask a Question" destination. It's for people who need info
// before proceeding (which service fits, availability, non-standard requests).
// Quotes are handled inside the Booking Page, not here.
// Optional ?service= preselects the question topic.

import { Eyebrow } from "@/components/ui/eyebrow";
import { QuestionForm } from "@/components/contact/questionForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Ask a Question — Kleanreset",
  description:
    "Have a question about Kleanreset's cleaning services in Edmonton, AB? Ask about availability, which service fits, or anything else. We reply within 24 hours.",
};

const CONTACT = {
  phones: "780 220 5497 / 780 245 6205",
  phoneHref: "7802205497",
  email: "kleanReset29@gmail.com",
  address: "80 Ave Northwest, Edmonton, AB, T5T 3A6",
  hours: "Mon–Sat, 8am–6pm",
};

// ?service= → preselected topic in the question form.
const SERVICE_TO_TOPIC: Record<string, string> = {
  "move-in-move-out": "Move-In / Move-Out Cleaning",
  decluttering: "Decluttering",
  "vacation-rental": "Vacation Rental Cleaning",
  "dental-clinic": "Dental / Clinic Cleaning",
  commercial: "Commercial / Office Cleaning",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const initialTopic = service ? SERVICE_TO_TOPIC[service] : undefined;

  return (
    <div className="bg-gradient-to-b from-sea-mist/40 to-paper">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:pt-36">
        <div className="max-w-2xl">
          <Eyebrow>ASK A QUESTION</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Have a question?
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Not sure which service is right for you? Want to know if we offer a
            specific cleaning service? Send us a message and we&apos;ll be happy to
            help.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-5 md:items-start">
          {/* Direct contact info */}
          <div className="space-y-6 md:col-span-2">
            <InfoRow icon={Phone} label="Call us" value={CONTACT.phones} href={`tel:+1${CONTACT.phoneHref}`} />
            <InfoRow icon={Mail} label="Email us" value={CONTACT.email} href={`mailto:${CONTACT.email}`} />
            <InfoRow icon={MapPin} label="Location" value={CONTACT.address} />
            <InfoRow icon={Clock} label="Hours" value={CONTACT.hours} />
          </div>

          {/* The inquiry form */}
          <div className="md:col-span-3">
            <QuestionForm initialTopic={initialTopic} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sea-mist/60">
        <Icon className="h-5 w-5 text-pine" />
      </span>
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-ink-soft hover:text-pine hover:underline">
            {value}
          </a>
        ) : (
          <p className="text-sm text-ink-soft">{value}</p>
        )}
      </div>
    </div>
  );
}
