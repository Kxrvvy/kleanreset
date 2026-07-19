// components/ui/Button.tsx
//
// One button, four looks, two underlying elements.
// Renders <Link> when given href (navigation), <button> otherwise (actions).

import Link, { type LinkProps } from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "pine" | "mint" | "outline" | "ghost";
type Size = "sm" | "md";

const base =
    "inline-flex items-center justify-center gap-2 rounded-pill font-semibold " +
    "transition-colors focus-visible:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-mint focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

// Record<Variant, string> forces all four variants to be defined.
const variants: Record<Variant, string> = {
    pine: "bg-pine text-white hover:bg-pine-deep",
    mint: "bg-mint text-pine-deep hover:bg-mint-bright",
    outline: "bg-card text-ink border border-line hover:bg-paper",
    ghost: "text-ink hover:bg-paper",
};

const sizes: Record<Size, string> = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-5 py-2.5",
};

type StyleProps = {
    variant?: Variant;
    size?: Size;
    className?: string;
    children: ReactNode;
};

// Two fully separate prop shapes. The `href` field is what tells them apart.
type LinkButtonProps = StyleProps &
    LinkProps &
    Omit<ComponentProps<"a">, keyof LinkProps | "className" | "children">;

type NativeButtonProps = StyleProps &
    Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: LinkButtonProps | NativeButtonProps) {
    const cls = `${base} ${variants[props.variant ?? "pine"]} ${sizes[props.size ?? "md"]
        } ${props.className ?? ""}`;

    // href present → render a Link.
    if (props.href !== undefined) {
        const { variant, size, className, children, ...linkProps } = props;
        void variant; void size; void className; // mark as intentionally unused
        return (
            <Link className={cls} {...linkProps}>
                {children}
            </Link>
        );
    }

    // No href → render a native button.
    const { variant, size, className, children, href, ...buttonProps } = props;
    void variant; void size; void className; void href;
    return (
        <button className={cls} {...buttonProps}>
            {children}
        </button>
    );
}