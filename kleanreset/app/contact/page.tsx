// app/contact/page.tsx
// General-purpose contact page. Not tied to any service — handles any
// inquiry (move-in/out, decluttering, dental questions, quote clarifications).

import { Eyebrow } from "@/components/ui/eyebrow";
import { ContactForm } from "@/components/contact/contactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact — Kleanreset",
  description:
    "Get in touch with Kleanreset for quotes, questions, or specialty cleaning like move-in/out and decluttering in Edmonton, AB.",
};

const CONTACT = {
  phones: "780 220 5497 / 780 245 6205",
  email: "kleanReset29@gmail.com",
  address: "80 Ave Northwest, Edmonton, AB, T5T 3A6",
  hours: "Mon–Sat, 8am–6pm",
};

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-sea-mist/40 to-paper">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-28 md:pt-36">
        {/* Intro */}
        <div className="max-w-2xl">
          <Eyebrow>Get in touch</Eyebrow>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
            Questions? Let&apos;s talk.
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            Whether you need a quote for a move-out clean, want help decluttering,
            or just aren&apos;t sure what service fits — send us a message or reach
            out directly. We reply within 24 hours.
          </p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-5 md:items-start">
          {/* Direct contact info */}
          <div className="space-y-6 md:col-span-2">
            <InfoRow icon={Phone} label="Call us" value={CONTACT.phones} />
            <InfoRow
              icon={Mail}
              label="Email us"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            <InfoRow icon={MapPin} label="Location" value={CONTACT.address} />
            <InfoRow icon={Clock} label="Hours" value={CONTACT.hours} />
          </div>

          {/* The form */}
          <div className="md:col-span-3">
            <ContactForm />
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