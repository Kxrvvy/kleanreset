// app/privacy/page.tsx


import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Privacy Policy | Kleanreset Cleaning Services",
  description:
    "How Kleanreset collects, uses, shares, and protects the personal information you submit through our Edmonton cleaning booking and contact forms.",
  path: "/privacy",
});

const LAST_UPDATED = "[DATE]";

const CONTACT = {
  email: "kleanReset29@gmail.com",
  phones: "780 220 5497 / 780 245 6205",
  phoneHref: "7802205497",
  address: "80 Ave Northwest, Edmonton, AB, Canada, T5T 3A6",
};

// Shared class strings for a clean, readable legal document.
const h2 = "mt-12 font-display text-2xl font-bold text-ink";
const h3 = "mt-6 font-semibold text-ink";
const p = "mt-3 leading-relaxed text-ink-soft";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-ink-soft";

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:pt-36">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-ink-soft">
          <strong className="font-semibold text-ink">Kleanreset</strong>
          <br />
          Last updated: {LAST_UPDATED}
        </p>

        <p className={`${p} mt-6`}>
          Kleanreset (“we,” “us,” or “our”) operates the website kleanreset.com (the
          “Site”). This policy explains what personal information we collect when you
          use the Site, why we collect it, how it’s used, and the choices you have.
        </p>
        <p className={p}>
          By submitting a booking request or contact inquiry through this Site, you
          agree to the collection and use of information as described here.
        </p>
        <p className={p}>
          This policy is published in accordance with Alberta’s <em>Personal
          Information Protection Act (PIPA)</em>, which requires private-sector
          organizations operating in Alberta to make their privacy practices publicly
          available — this applies regardless of business size.
        </p>

        {/* 1 */}
        <h2 className={h2}>1. Information we collect</h2>
        <p className={p}>
          We collect information only when you actively provide it to us — through the{" "}
          <strong className="font-semibold text-ink">booking form</strong> or the{" "}
          <strong className="font-semibold text-ink">contact form</strong>. We do not
          require an account and do not collect information passively beyond basic
          site-usage analytics (see Section 5).
        </p>

        <h3 className={h3}>1.1 When you submit a booking request</h3>
        <ul className={ul}>
          <li>
            <strong className="font-semibold text-ink">Contact details:</strong> full
            name, email address, phone number
          </li>
          <li>
            <strong className="font-semibold text-ink">Service address:</strong> street
            address, city, province, postal code, and optional landmark
          </li>
          <li>
            <strong className="font-semibold text-ink">Property details</strong>, which
            vary by the type of service requested:
            <ul className="mt-1.5 list-[circle] space-y-1.5 pl-5">
              <li>
                Residential jobs: property type, square footage, number of bedrooms and
                bathrooms, number of floors, whether you have pets
              </li>
              <li>
                Carpet cleaning: number of rooms, whether stairs are included, an
                optional description of the carpets
              </li>
              <li>
                Commercial jobs: business name, business type, building size, number of
                restrooms and meeting rooms, cleaning frequency, and facility details
                (e.g. whether there is a reception area or kitchen)
              </li>
              <li>
                Vacation rental jobs: guest capacity, bedroom/bathroom count, and
                turnover timing (checkout/check-in times, linen and supply needs)
              </li>
            </ul>
          </li>
          <li>
            <strong className="font-semibold text-ink">Scheduling information:</strong>{" "}
            your preferred date and arrival time
          </li>
          <li>
            <strong className="font-semibold text-ink">Access information:</strong> how
            our cleaning team can enter the property (e.g. someone home, key location,
            lockbox, gate code), and any parking or building instructions you provide
          </li>
          <li>
            <strong className="font-semibold text-ink">Additional notes</strong> you
            choose to include (e.g. allergies, fragile items, priority areas)
          </li>
        </ul>

        <h3 className={h3}>1.2 When you submit a general inquiry</h3>
        <ul className={ul}>
          <li>Full name, email address, phone number, and the message you send us</li>
        </ul>

        <h3 className={h3}>1.3 Information we do not collect</h3>
        <p className={p}>
          We do not collect payment card information through this Site — payment is
          arranged directly with the business outside of the website. We do not require
          you to create an account, and we do not knowingly collect information from
          anyone we are aware is under the age of 18.
        </p>

        {/* 2 */}
        <h2 className={h2}>2. How we use your information</h2>
        <p className={p}>We use the information you submit only to:</p>
        <ul className={ul}>
          <li>Respond to your booking request or inquiry</li>
          <li>Confirm, adjust, or follow up on a preferred date and time</li>
          <li>Send you an automatic acknowledgement email when you submit a request</li>
          <li>
            Contact you by phone or email if we need clarification to complete your
            request
          </li>
          <li>
            Improve the services we offer, in aggregate and without identifying you
            individually
          </li>
        </ul>
        <p className={p}>
          <strong className="font-semibold text-ink">
            Submitting a booking request does not create a confirmed appointment.
          </strong>{" "}
          A member of our team reviews each request and follows up — by replying to your
          email or calling the number you provided — to confirm your preferred time or
          offer alternatives.
        </p>

        {/* 3 */}
        <h2 className={h2}>3. How your information is shared</h2>
        <p className={p}>
          <strong className="font-semibold text-ink">
            We do not sell, rent, or trade your personal information to anyone, for any
            purpose.
          </strong>
        </p>
        <p className={p}>
          We share information only with the service providers necessary to operate the
          Site and deliver our service:
        </p>
        <ul className={ul}>
          <li>
            <strong className="font-semibold text-ink">Resend</strong> (email delivery
            service) — processes and delivers the notification and confirmation emails
            generated by your submission. Resend acts as our data processor and does not
            use your information for its own purposes.
          </li>
          <li>
            <strong className="font-semibold text-ink">Vercel</strong> (hosting
            provider) — hosts the Site and its underlying infrastructure.
          </li>
        </ul>
        <p className={p}>
          We may also disclose information if required to do so by law, or if we believe
          in good faith that disclosure is necessary to comply with a legal obligation,
          protect our rights, or protect the safety of our team or customers.
        </p>

        {/* 4 */}
        <h2 className={h2}>4. Data retention</h2>
        <p className={p}>
          We retain booking and inquiry information for as long as reasonably necessary
          to fulfill the purpose it was collected for, maintain business records, and
          comply with applicable tax or legal recordkeeping requirements. If you would
          like your information deleted sooner, see Section 6 below.
        </p>

        {/* 5 */}
        <h2 className={h2}>5. Analytics and cookies</h2>
        <p className={p}>
          This Site uses <strong className="font-semibold text-ink">Vercel Web
          Analytics</strong> and <strong className="font-semibold text-ink">Speed
          Insights</strong> to understand, in aggregate, how visitors use the Site (e.g.
          which pages are viewed, general performance metrics) and to improve site
          performance. These tools are designed to be privacy-friendly: they do not use
          tracking cookies and do not build an individual profile of you as a visitor.
        </p>
        <p className={p}>
          We do not use advertising cookies, and we do not run third-party ad tracking
          on this Site.
        </p>

        {/* 6 */}
        <h2 className={h2}>6. Your rights and choices</h2>
        <p className={p}>
          Under Alberta’s <em>Personal Information Protection Act (PIPA)</em>, you have
          the right to:
        </p>
        <ul className={ul}>
          <li>
            Ask what personal information we hold about you, and how it has been used or
            disclosed
          </li>
          <li>Request a correction to inaccurate or incomplete information</li>
          <li>
            Request that we delete your information, subject to any legal or legitimate
            business reason we may need to retain it (e.g. financial records)
          </li>
          <li>
            Withdraw consent for us to contact you about a request you submitted, subject
            to legal or contractual restrictions and reasonable notice
          </li>
        </ul>
        <p className={p}>
          To make a request, contact us in writing using the details in Section 8.{" "}
          <strong className="font-semibold text-ink">
            If your request is for access to your personal information, we will respond
            within 45 days
          </strong>
          , as required under PIPA — or notify you in writing if we need to extend that
          timeline, and why.
        </p>

        {/* 7 */}
        <h2 className={h2}>7. Changes to this policy</h2>
        <p className={p}>
          We may update this policy from time to time to reflect changes in our
          practices or for legal or operational reasons. The “Last updated” date at the
          top of this page will reflect the most recent revision. We encourage you to
          review this page periodically.
        </p>

        {/* 8 */}
        <h2 className={h2}>8. Contact us</h2>
        <p className={p}>
          If you have questions about this policy or how your information is handled,
          contact us at:
        </p>
        <div className="mt-3 rounded-card border border-line bg-card p-5 text-ink-soft">
          <p className="font-semibold text-ink">Kleanreset</p>
          <p className="mt-1">
            Email:{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-pine underline hover:text-pine-deep"
            >
              {CONTACT.email}
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href={`tel:+1${CONTACT.phoneHref}`}
              className="text-pine underline hover:text-pine-deep"
            >
              {CONTACT.phones}
            </a>
          </p>
          <p>Address: {CONTACT.address}</p>
        </div>
      </div>
    </div>
  );
}
