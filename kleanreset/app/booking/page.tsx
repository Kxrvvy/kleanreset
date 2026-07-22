// app/booking/page.tsx
import { BookingForm } from "@/components/booking/bookingForm";

export const metadata = {
  title: "Book your cleaning — Kleanreset",
};

export default function BookingPage() {
  return (
    <div className="bg-paper">
      <div className="px-4 pt-20 text-center sm:px-6 md:px-8 md:pt-28 lg:px-10 xl:px-12">
        <h1 className="font-display text-4xl font-extrabold text-ink sm:text-5xl md:text-6xl">
          Book your cleaning service
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-ink-soft">
          Tell us about your space and when you&apos;d like us there.
        </p>
      </div>
      <BookingForm />
    </div>
  );
}