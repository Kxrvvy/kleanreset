// app/booking/page.tsx
import { BookingForm } from "@/components/booking/bookingForm";

export const metadata = {
  title: "Book your cleaning — Kleanreset",
};

export default function BookingPage() {
  return (
    <div className="bg-paper">
      <div className="pt-28 text-center md:pt-36">
        <h1 className="font-display text-4xl font-extrabold text-ink">
          Book your cleaning service
        </h1>
        <p className="mt-2 text-ink-soft">
          Tell us about your space and when you&apos;d like us there.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}