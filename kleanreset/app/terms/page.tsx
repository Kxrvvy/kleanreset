
// ✏️ Set LAST_UPDATED below before publishing.

import type { Metadata } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { pageSeo } from "@/lib/seo";

export const metadata: Metadata = pageSeo({
  title: "Terms & Conditions | Kleanreset Cleaning Services",
  description:
    "The terms governing use of kleanreset.com and the booking-request process for Kleanreset's residential and commercial cleaning services in Edmonton, AB.",
  path: "/terms",
});

const LAST_UPDATED = "07/08/2026";

const CONTACT = {
  email: "kleanReset29@gmail.com",
  phones: "780 220 5497 / 780 245 6205",
  phoneHref: "7802205497",
  address: "80 Ave Northwest, Edmonton, AB, Canada, T5T 3A6",
};

// Shared class strings for a clean, readable legal document.
const h2 = "mt-12 font-display text-2xl font-bold text-ink";
const p = "mt-3 leading-relaxed text-ink-soft";
const ul = "mt-3 list-disc space-y-1.5 pl-5 text-ink-soft";

export default function TermsPage() {
  return (
    <div className="bg-paper">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-24 md:pt-36">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-ink-soft">
          <strong className="font-semibold text-ink">Kleanreset</strong>
          <br />
          Last updated: {LAST_UPDATED}
        </p>

        <p className={`${p} mt-6`}>
          These Terms &amp; Conditions (“Terms”) govern your use of kleanreset.com (the
          “Site”) and any booking request or inquiry you submit through it. By submitting
          a booking request, contact inquiry, or otherwise using the Site, you agree to
          these Terms. If you do not agree, please do not use the Site.
        </p>

        {/* 1 */}
        <h2 className={h2}>1. About this service</h2>
        <p className={p}>
          Kleanreset provides residential and commercial cleaning services in and around
          Edmonton, Alberta. These Terms apply to the website and to the booking-request
          process described below; they do not replace any separate agreement made
          directly between you and Kleanreset regarding the cleaning work itself.
        </p>

        {/* 2 */}
        <h2 className={h2}>2. This Site takes booking requests — it does not confirm bookings</h2>
        <p className={p}>
          This is the most important thing to understand about how the Site works.
          Submitting the booking form is a <strong className="font-semibold text-ink">
          request for service, not a confirmed appointment</strong>. When you submit a
          request:
        </p>
        <ul className={ul}>
          <li>
            You provide your preferred date, arrival time, and details about the space to
            be cleaned.
          </li>
          <li>
            You receive an automatic email acknowledging that we’ve received your
            request. This acknowledgement is not a confirmation.
          </li>
          <li>
            A member of our team reviews your request against our actual availability and
            follows up — usually by email or phone — to confirm your preferred time, or to
            propose an alternative if we’re unavailable.
          </li>
        </ul>
        <p className={p}>
          No appointment is confirmed, and no cleaning will take place, until you have
          heard back from us directly confirming a specific date and time.
        </p>

        {/* 3 */}
        <h2 className={h2}>3. Pricing and estimates</h2>
        <ul className={ul}>
          <li>
            Standard, Deep, Carpet, and Airbnb Turnover cleaning are priced automatically
            based on the details you provide (e.g. bedrooms, bathrooms, room count), plus
            5% GST. The price shown to you when you submit your request is a firm estimate
            based on the information you gave us.
          </li>
          <li>
            Commercial cleaning is shown as a rough, non-binding estimate. The final price
            is confirmed by our team after reviewing your space and requirements.
          </li>
          <li>All prices are in Canadian dollars (CAD).</li>
          <li>
            Final pricing may be adjusted if the actual condition or size of the space
            differs materially from what was described in your request (for example,
            significantly more clutter, mess, or square footage than indicated). We will
            let you know before beginning any work that would change the originally
            estimated price.
          </li>
        </ul>

        {/* 4 */}
        <h2 className={h2}>4. Scheduling, cancellation, and rescheduling</h2>
        <ul className={ul}>
          <li>
            We ask that you provide as much notice as possible if you need to cancel or
            reschedule a confirmed appointment.
          </li>
          <li>
            We request at least 24 hours’ notice for cancellations or rescheduling.
            Cancellations made with less notice may be subject to a cancellation fee — you
            will be advised of this at the time your appointment is confirmed, if
            applicable.
          </li>
          <li>
            If our team is unable to access the property at the confirmed time through no
            fault of Kleanreset (e.g. no one available to provide access, incorrect
            address, or the access method provided doesn’t work), a trip fee may apply.
          </li>
        </ul>

        {/* 5 */}
        <h2 className={h2}>5. Access to your property</h2>
        <p className={p}>By confirming a booking, you agree to:</p>
        <ul className={ul}>
          <li>
            Provide accurate access instructions (e.g. someone present, key location,
            lockbox, gate code) and ensure they work as described
          </li>
          <li>Disclose any pets, so we can prepare appropriately</li>
          <li>
            Disclose any known hazards, fragile or high-value items, or areas you would
            like our team to avoid
          </li>
          <li>Ensure the property is reasonably safe for our team to work in</li>
        </ul>
        <p className={p}>
          Kleanreset is not responsible for damage to items that were not disclosed as
          fragile or high-value, or for delays caused by inaccurate access information.
        </p>

        {/* 6 */}
        <h2 className={h2}>6. Our commitment to you</h2>
        <p className={p}>
          We aim to complete every job to the standard described on our Services page. If
          you’re not satisfied with any part of a completed cleaning, contact us within
          24 hours of the service and we will return to address the specific issue at no
          additional cost.
        </p>
        <p className={p}>
          This commitment applies to the quality of the cleaning work performed and does
          not cover pre-existing conditions, normal wear, or issues unrelated to the
          service provided.
        </p>

        {/* 7 */}
        <h2 className={h2}>7. Payment</h2>
        <p className={p}>
          Payment is arranged directly with Kleanreset and is not processed through this
          website. Payment terms (timing and accepted methods) will be confirmed with you
          when your appointment is booked.
        </p>

        {/* 8 */}
        <h2 className={h2}>8. Liability</h2>
        <p className={p}>
          Kleanreset carries insurance for the services we provide. If you believe damage
          occurred as a direct result of our work, please contact us within 48 hours of
          the service so we can investigate and address it. Except where prohibited by
          law, Kleanreset’s liability for any claim relating to a service is limited to
          the cost of the service in question.
        </p>
        <p className={p}>
          Nothing in these Terms limits any liability that cannot be limited or excluded
          under Alberta or Canadian law.
        </p>

        {/* 9 */}
        <h2 className={h2}>9. Right to refuse or discontinue service</h2>
        <p className={p}>
          We reserve the right to decline a booking request, or to discontinue a service
          in progress, if:
        </p>
        <ul className={ul}>
          <li>The property poses a health or safety risk to our team</li>
          <li>
            The scope of work is materially different from what was described in the
            request
          </li>
          <li>We’re unable to safely or reasonably access the property</li>
        </ul>
        <p className={p}>
          We will make reasonable efforts to communicate with you if this occurs.
        </p>

        {/* 10 */}
        <h2 className={h2}>10. Photos of completed work</h2>
        <p className={p}>
          From time to time, we may photograph completed jobs (e.g. for the “Our Work”
          section of this Site) for promotional purposes. We do not include identifying
          personal information, and we take reasonable steps to avoid photographing
          personal belongings or identifying details of your space without your
          knowledge. If you would prefer photos not be taken during your service, let us
          know when booking.
        </p>

        {/* 11 */}
        <h2 className={h2}>11. Changes to these Terms</h2>
        <p className={p}>
          We may update these Terms from time to time. The “Last updated” date at the top
          of this page reflects the most recent revision. Continued use of the Site after
          changes are posted constitutes acceptance of the updated Terms.
        </p>

        {/* 12 */}
        <h2 className={h2}>12. Governing law</h2>
        <p className={p}>
          These Terms are governed by the laws of the Province of Alberta and the federal
          laws of Canada applicable therein.
        </p>

        {/* 13 */}
        <h2 className={h2}>13. Contact us</h2>
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
