import { useEffect, useState } from "react";
import { scrollToSection } from "../lib/smoothScroll";

const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Latest Podcast", href: "#latest-podcast" },
    { label: "Visual Marketing", href: "#visual-marketing" },
    { label: "Our Hosts", href: "#our-hosts" },
    { label: "Reviews", href: "#reviews" },
    { label: "Upcoming Podcast", href: "#upcoming-podcast" },
];

const LOGO_SRC = "/images/logo.png";

export const PAGE_GUTTER = "px-4 sm:px-6 lg:px-10 xl:px-14";

export const ArrowIcon = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
    </svg>
);

export default function Navbar() {
    const [active, setActive] = useState("#home");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(
            Boolean
        ) as Element[];
        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(`#${entry.target.id}`);
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setActive(href);
        setOpen(false);
        scrollToSection(href);
    };

    return (
        <header className={`fixed inset-x-0 top-4 z-50 animate-fade-down sm:top-5 ${PAGE_GUTTER}`}>
            <nav className="flex w-full items-center justify-between rounded-full bg-brand-nav py-2 pl-4 pr-4 shadow-lg sm:pl-8 sm:pr-8 xl:pr-10">
                <a href="#home" onClick={(e) => handleClick(e, "#home")} className="shrink-0">
                    <img
                        src={LOGO_SRC}
                        alt="True Words Media"
                        className="h-14 w-auto object-contain sm:h-16 xl:h-[72px]"
                    />
                </a>

                <ul className="hidden items-center gap-6 xl:flex 2xl:gap-10">
                    {NAV_LINKS.map((link) => {
                        const isActive = active === link.href;
                        return (
                            <li key={link.href}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleClick(e, link.href)}
                                    className={`whitespace-nowrap font-body text-[13px] uppercase tracking-wide transition-colors 2xl:text-[15px] hover:text-brand-gold ${isActive ? "font-bold italic text-brand-gold" : "font-normal text-white"
                                        }`}
                                >
                                    {link.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>

                <button
                    type="button"
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-white xl:hidden"
                >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        {open ? (
                            <path d="M6 6l12 12M18 6 6 18" />
                        ) : (
                            <path d="M4 7h16M4 12h16M4 17h16" />
                        )}
                    </svg>
                </button>
            </nav>

            <div
                className={`mt-3 w-full overflow-hidden rounded-3xl bg-brand-nav transition-all duration-300 xl:hidden ${open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
                    }`}
            >
                <ul className="flex flex-col py-4">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`block px-8 py-3 font-body text-sm uppercase tracking-wide transition-colors hover:text-brand-gold ${active === link.href ? "font-bold italic text-brand-gold" : "text-white"
                                    }`}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}