// components/contact/questionForm.tsx
"use client";
//
// Ask-a-question pathway — deliberately simpler than the quote form. Handles
// every "do you offer / which service / can you clean X" inquiry, including
// availability questions, through one free-text message.

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Field,
    inputCls,
    submitInquiry,
    SuccessCard,
    type BaseContact,
} from "@/components/contact/contactShared";

// Optional topic — helps the business triage without forcing a choice.
const TOPICS = [
    "Choosing the right cleaning service",
    "Move-In / Move-Out Cleaning",
    "Decluttering",
    "Vacation Rental Cleaning",
    "Dental / Clinic Cleaning",
    "Commercial / Office Cleaning",
    "Other",
];

export function QuestionForm({ initialTopic }: { initialTopic?: string }) {
    const [base, setBase] = useState<BaseContact>({ fullName: "", email: "", phone: "" });
    const [topic, setTopic] = useState(initialTopic ?? "");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage(null);
        try {
            const composed = topic ? `QUESTION — about: ${topic}\n\n${message.trim()}` : `QUESTION\n\n${message.trim()}`;
            await submitInquiry(base, composed);
            setStatus("success");
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return <SuccessCard onReset={() => { setStatus("idle"); setMessage(""); }} />;
    }

    return (
        <form onSubmit={handleSubmit} className="rounded-card border border-line bg-card p-6 md:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" htmlFor="fullName">
                    <input id="fullName" type="text" required className={inputCls}
                        placeholder="Jane Doe" value={base.fullName}
                        onChange={(e) => setBase((p) => ({ ...p, fullName: e.target.value }))} />
                </Field>
                <Field label="Email" htmlFor="email">
                    <input id="email" type="email" required className={inputCls}
                        placeholder="jane@example.com" value={base.email}
                        onChange={(e) => setBase((p) => ({ ...p, email: e.target.value }))} />
                </Field>
            </div>

            <div className="mt-5">
                <Field label="Phone" htmlFor="phone" optional>
                    <input id="phone" type="tel" className={inputCls}
                        placeholder="780 123 4567" value={base.phone}
                        onChange={(e) => setBase((p) => ({ ...p, phone: e.target.value }))} />
                </Field>
            </div>

            <div className="mt-5">
                <Field label="What is your question about?" htmlFor="topic" optional>
                    <select id="topic" className={inputCls} value={topic}
                        onChange={(e) => setTopic(e.target.value)}>
                        <option value="">Select…</option>
                        {TOPICS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </Field>
            </div>

            <div className="mt-5">
                <Field label="What can we help you with?" htmlFor="message">
                    <textarea id="message" required rows={5} className={`${inputCls} resize-y`}
                        placeholder="Tell us what you'd like to know or what you're looking for help with…"
                        value={message} onChange={(e) => setMessage(e.target.value)} />
                </Field>
            </div>

            {status === "error" && (
                <p className="mt-4 text-sm text-red-600">
                    {errorMessage ?? "Something went wrong. Please try again, or email us directly."}
                </p>
            )}

            <Button type="submit" variant="forest" disabled={status === "submitting"} className="mt-6 w-full">
                {status === "submitting" ? "Sending…" : "Send My Question →"}
            </Button>
        </form>
    );
}
