// components/booking/Fields.tsx
"use client";
// Shared input primitives + a labelled-error wrapper. Every section uses these.

import { forwardRef } from "react";
import { useFormContext, type FieldError } from "react-hook-form";

export const fieldCls =
  "w-full rounded-card border border-line bg-field px-4 py-2.5 text-sm text-ink " +
  "placeholder:text-ink-soft/60 focus:border-pine focus:outline-none focus:ring-2 focus:ring-mint/30";

export function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children}
    </label>
  );
}

export function ErrorText({ error }: { error?: FieldError }) {
  if (!error) return null;
  return <p className="mt-1 text-xs text-red-600">{error.message}</p>;
}

export const TextInput = forwardRef<
  HTMLInputElement,
  { label: string } & React.InputHTMLAttributes<HTMLInputElement>
>(function TextInput({ label, ...props }, ref) {
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <input ref={ref} className={fieldCls} {...props} />
    </div>
  );
});

export const NumberInput = forwardRef<
  HTMLInputElement,
  { label: string } & React.InputHTMLAttributes<HTMLInputElement>
>(function NumberInput({ label, ...props }, ref) {
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <input ref={ref} type="number" min={0} className={fieldCls} {...props} />
    </div>
  );
});

export const SelectInput = forwardRef<
  HTMLSelectElement,
  { label: string; options: readonly { value: string; label: string }[] } &
    React.SelectHTMLAttributes<HTMLSelectElement>
>(function SelectInput({ label, options, ...props }, ref) {
  return (
    <div>
      <Label htmlFor={props.name}>{label}</Label>
      <select ref={ref} className={fieldCls} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
});