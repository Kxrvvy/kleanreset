// components/contact/contactShared.tsx
"use client";
//
// Shared building blocks for the two Contact pathways (quote + question).
// Both post the same {fullName, email, phone, message, submittedAt} shape to
// /api/contact — the structured quote/question fields are composed into
// `message`, so the existing API + email layer works unchanged.

import type { ReactNode } from "react";

export const inputCls =
    "w-full rounded-card border border-line bg-field px-4 py-2.5 text-sm " +
    "text-ink placeholder:text-ink-soft/60 focus:border-pine focus:outline-none " +
    "focus:ring-2 focus:ring-mint/30";

export type BaseContact = {
    fullName: string;
    email: string;
    phone: string;
};

export async function submitInquiry(base: BaseContact, message: string) {
    const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            fullName: base.fullName,
            email: base.email,
            phone: base.phone,
            message,
            submittedAt: new Date().toISOString(),
        }),
    });
    const result = await res.json();
    if (!res.ok || !result.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
    }
}

export function Field({
    label,
    htmlFor,
    hint,
    optional,
    children,
}: {
    label: string;
    htmlFor: string;
    hint?: string;
    optional?: boolean;
    children: ReactNode;
}) {
    return (
        <div>
            <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
                {label}
                {optional && <span className="ml-1 font-normal text-ink-soft">(optional)</span>}
            </label>
            {hint && <p className="mb-2 text-xs text-ink-soft">{hint}</p>}
            {children}
        </div>
    );
}

export function SuccessCard({ onReset }: { onReset: () => void }) {
    return (
        <div className="rounded-card border border-line bg-card p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-pine">Request received</h3>
            <p className="mt-3 text-ink-soft">
                Thanks for reaching out — we&apos;ve got your details and will get back to
                you within 24 hours.
            </p>
            <button
                type="button"
                onClick={onReset}
                className="mt-6 text-sm font-semibold text-pine hover:underline"
            >
                Send another
            </button>
        </div>
    );
}
