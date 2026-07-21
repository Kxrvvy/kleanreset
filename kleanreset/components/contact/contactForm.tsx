// components/contact/ContactForm.tsx
"use client";
//
// Client component: holds form state and handles submission.
// For now submitContact() just logs — swap its body for the real
// API call when the email pipeline exists.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ContactPayload } from "@/types/booking";

type Status = "idle" | "submitting" | "success" | "error";

// STUB — replace body with a fetch to /api/contact once email is wired.
async function submitContact(payload: ContactPayload): Promise<void> {
  console.log("Contact submission:", payload);
  // Simulate a network round-trip so the loading state is visible.
  await new Promise((r) => setTimeout(r, 800));
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  // One handler for every text field — keyed by the input's `name`.
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContact({
        ...form,
        submittedAt: new Date().toISOString(),
      });
      setStatus("success");
      setForm({ fullName: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  // Success state replaces the form.
  if (status === "success") {
    return (
      <div className="rounded-card border border-line bg-card p-8 text-center">
        <h3 className="font-display text-2xl font-bold text-pine">
          Message sent
        </h3>
        <p className="mt-3 text-ink-soft">
          Thanks for reaching out — we&apos;ve received your message and will get
          back to you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-pine hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card border border-line bg-card p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName">
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={inputCls}
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@example.com"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Phone" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="780 123 4567"
            className={inputCls}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field
          label="What can we help with?"
          htmlFor="message"
          hint="Tell us what you'd like cleaned, or ask us anything."
        >
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="e.g. I'd like a quote for a move-out clean on a 2-bedroom condo..."
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Something went wrong sending your message. Please try again, or email
          us directly.
        </p>
      )}

      <Button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}

// ── Small local helpers ──────────────────────────────────────

const inputCls =
  "w-full rounded-card border border-line bg-field px-4 py-2.5 text-sm " +
  "text-ink placeholder:text-ink-soft/60 focus:border-pine focus:outline-none " +
  "focus:ring-2 focus:ring-mint/30";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-semibold text-ink"
      >
        {label}
      </label>
      {hint && <p className="mb-2 text-xs text-ink-soft">{hint}</p>}
      {children}
    </div>
  );
}