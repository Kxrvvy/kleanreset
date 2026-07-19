// components/layout/Footer.tsx
//
// NO "use client" — this is a server component. It's pure content with
// no state, effects, or event handlers, so it renders to HTML and ships
// zero JS. Contrast with Nav, which needs the browser. This is the split.

import Link from "next/link";
import Image from "next/image";

// Footer link columns, as data. Edit here, not in markup.
const SERVICES = [
  "Residential cleaning",
  "Commercial cleaning",
  "Airbnb cleaning",
  "Carpet cleaning",
  "Deep cleaning",
];

// Business contact details — from the mockup footer.
// CONFIRM these with the client before launch.
const CONTACT = {
  phones: "780 220 5497 / 780 245 6205",
  email: "kleanReset29@gmail.com",
  address: "80 Ave Northwest, Edmonton, AB, Canada, T5T 3A6",
  hours: "Mon–Sat, 8am–6pm",
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-pine-deep text-celadon">
      <div className="mx-auto max-w-6xl px-6 pb-6 pt-15">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <Image
              src="/logo-light.svg"
              alt="Kleanreset"
              width={150}
              height={34}
            />
            <p className="text-sm leading-relaxed text-celadon/80">
              Detailed, dependable cleaning for homes, Airbnbs, dental clinics,
              and offices. Reliable. Detailed. Consistent.
            </p>
          </div>

          {/* Services column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-mint">
              Best Services
            </h3>
            <ul className="space-y-2 text-sm">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-celadon/80 transition-colors hover:text-white"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-mint">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-sm text-celadon/80">
              <li>{CONTACT.phones}</li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="underline transition-colors hover:text-white"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.address}</li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-mint">
              Ready to Book?
            </h3>
            <Link
              href="/booking"
              className="inline-flex items-center justify-center rounded-pill
                         bg-mint px-6 py-2.5 text-sm font-semibold text-pine-deep
                         transition-colors hover:bg-mint-bright"
            >
              Book Now
            </Link>
            <p className="mt-2 text-xs text-celadon/70">
              Free quote · no obligation
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-celadon/60">
          © {year} Kleanreset. All rights reserved.
        </div>
      </div>
    </footer>
  );
}