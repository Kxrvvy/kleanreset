"use client";


import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";


const LINKS = [
    {href: "/", label: "Home"},
    {href: "/services", label: "Services"},
    {href: "/about", label: "About"},
    {href: "/contact", label: "Contact"},
] as const;

export function Nav () {
    const pathname = usePathname();
    const [isOpen, setIsOpen] =useState(false);
    const [scrolled, setScrolled] = useState(false);

    const onBookingPage = pathname === "/booking";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
            <nav
                className={`mx-auto flex max-w-6xl justify-between gap-4 rounded-pill px-5 py-3 transition-all duration-300 ${
                    scrolled
                        ? "border border-line bg-card/70 shadow-sm backdrop-blur-md"
                        : "border border-transparent bg-transparent"
                }`}
            >
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Image
                        src="/kleanreset.png"
                        alt="Kleanreset"
                        width={46}
                        height={46}
                    />
                    <span className="font-display text-lg font-bold">Kleanreset</span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-8 text-ink md:flex font-bold">
                    {LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return(
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`transition-colors hover:text-pine ${isActive ? "text-mint" : "text-ink"}`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Desktop CTAs */}
                <div className="hidden items-center gap-2 md:flex">
                    <Button href="/contact" variant="outline" size="sm">
                        Get a Quote
                    </Button>

                    {!onBookingPage && (
                        <Button href="/booking" size="sm">
                            Book Now
                        </Button>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    type="button"
                    onClick={() => setIsOpen((open) => !open)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav-panel"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    className="flex h-9 w-9 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
                >
                    <span
                        className={`h-0.5 w-6 rounded-full bg-ink transition-transform ${
                            isOpen ? "translate-y-2 rotate-45" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 w-6 rounded-full bg-ink transition-opacity ${
                            isOpen ? "opacity-0" : ""
                        }`}
                    />
                    <span
                        className={`h-0.5 w-6 rounded-full bg-ink transition-transform ${
                            isOpen ? "-translate-y-2 -rotate-45" : ""
                        }`}
                    />
                </button>
            </nav>

            {/* Mobile dropdown panel */}
            {isOpen && (
                <div
                    id="mobile-nav-panel"
                    className="mx-auto mt-2 flex max-w-6xl flex-col gap-1 rounded-card border border-line bg-card p-4 shadow-lg md:hidden"
                >
                    {LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`rounded-card px-3 py-2.5 text-sm font-medium hover:bg-sea-mist/40 hover:text-pine ${
                                    isActive ? "text-pine" : "text-ink-soft"
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className="mt-2 flex flex-col gap-2 border-t border-line pt-3">
                        <Button
                            href="/booking?intent=quote"
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setIsOpen(false)}
                        >
                            Get a Quote
                        </Button>

                        {!onBookingPage && (
                            <Button
                                href="/booking"
                                size="sm"
                                className="w-full"
                                onClick={() => setIsOpen(false)}
                            >
                                Book Now
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </header>
    )

}
