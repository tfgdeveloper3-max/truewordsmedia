"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";

export type Service = {
    title: string;
    description: string;
    format: string;
    duration: string;
    platforms: string[];
    layout: "wide" | "tall" | "regular";
    video?: string;
    poster?: string;
};

export const SERVICES: Service[] = [
    {
        title: "Brand Films",
        description:
            "Client videos that tell your story — from product launches to company profiles, shot and cut to convert.",
        format: "16:9",
        duration: "60–180s",
        platforms: ["YouTube", "Website", "LinkedIn"],
        layout: "wide",
    },
    {
        title: "Reels & Shorts",
        description:
            "Scroll-stopping vertical edits with hooks in the first 2 seconds, captions and trending audio.",
        format: "9:16",
        duration: "15–60s",
        platforms: ["Instagram", "TikTok", "Shorts"],
        layout: "tall",
    },
    {
        title: "Trailers & Teasers",
        description:
            "Cinematic cut-downs that build hype for launches, events, courses and campaigns.",
        format: "16:9 · 1:1",
        duration: "30–90s",
        platforms: ["YouTube", "Meta"],
        layout: "regular",
    },
    {
        title: "Social Ads",
        description:
            "Performance-focused video ads with multiple hooks and cut-downs, ready to test and scale.",
        format: "4:5 · 9:16",
        duration: "6–30s",
        platforms: ["Meta Ads", "TikTok Ads"],
        layout: "regular",
    },
];

const DELAYS = [
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
    "[animation-delay:450ms]",
    "[animation-delay:600ms]",
];

const LAYOUT_CLASSES: Record<Service["layout"], { card: string; media: string }> = {
    wide: { card: "sm:col-span-2", media: "aspect-video" },
    tall: {
        card: "lg:row-span-2",
        media: "aspect-[4/5] sm:aspect-[9/16] lg:aspect-auto lg:min-h-[320px] lg:flex-1",
    },
    regular: { card: "", media: "aspect-video" },
};

function PlayIcon({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
            <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
        </svg>
    );
}

function ReelSideIcons() {
    return (
        <div className="absolute bottom-10 right-3 flex flex-col items-center gap-3 text-brand-cream/90">
            {[
                "M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3.2 5 6.6 5c2 0 3.4 1.1 4.4 2.5C12 6.1 13.4 5 15.4 5c3.4 0 5.4 3.6 4.1 6.8C19.5 16.4 12 21 12 21Z",
                "M4 5h16v11H8l-4 4V5Z",
                "M4 12l16-8-6 16-3-7-7-1Z",
            ].map((d) => (
                <svg key={d} viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
                    <path d={d} strokeLinejoin="round" />
                </svg>
            ))}
        </div>
    );
}

function Equalizer() {
    return (
        <div className="absolute bottom-10 left-3 flex h-4 items-end gap-[3px]" aria-hidden>
            {["[animation-delay:0ms]", "[animation-delay:200ms]", "[animation-delay:400ms]", "[animation-delay:100ms]"].map(
                (d) => (
                    <span key={d} className={`h-full w-[3px] origin-bottom rounded-full bg-brand-gold animate-eq ${d}`} />
                ),
            )}
        </div>
    );
}

function ServiceCard({ service, index, className }: { service: Service; index: number; className: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const layout = LAYOUT_CLASSES[service.layout];
    const isTall = service.layout === "tall";

    const play = () => videoRef.current?.play().catch(() => { });
    const pause = () => {
        if (!videoRef.current) return;
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    return (
        <article
            onMouseEnter={play}
            onMouseLeave={pause}
            className={`group flex flex-col overflow-hidden rounded-[12px] border border-brand-gold/15 bg-brand-nav transition-colors duration-300 hover:border-brand-gold/50 ${layout.card} ${className}`}
        >
            <div className={`relative w-full overflow-hidden bg-brand-black ${layout.media}`}>
                {service.video ? (
                    <video
                        ref={videoRef}
                        src={service.video}
                        poster={service.poster}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                ) : service.poster ? (
                    <img
                        src={service.poster}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-olive via-brand-black to-brand-brown/70">
                        <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_25%_15%,rgba(231,195,135,0.22),transparent_60%)]" />
                        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--color-brand-cream)_1px,transparent_1px),linear-gradient(90deg,var(--color-brand-cream)_1px,transparent_1px)] [background-size:32px_32px]" />
                    </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/40" />

                <div className="absolute inset-x-3 top-3 flex items-center justify-between font-body text-[10px] font-medium uppercase tracking-[0.12em] text-brand-cream xl:text-[11px]">
                    <span className="flex items-center gap-1.5 rounded-full bg-brand-black/60 px-2.5 py-1 backdrop-blur">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-button" />
                        {service.format}
                    </span>
                    <span className="rounded-full bg-brand-black/60 px-2.5 py-1 backdrop-blur">{service.duration}</span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/50 bg-brand-cream/10 text-brand-cream backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark xl:h-14 xl:w-14">
                        <PlayIcon className="ml-0.5 h-5 w-5" />
                    </span>
                </div>

                {isTall && (
                    <>
                        <ReelSideIcons />
                        <Equalizer />
                    </>
                )}

                <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 font-body text-[10px] text-brand-cream/80">
                    <span>00:00</span>
                    <span className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-brand-cream/20">
                        <span className="absolute inset-y-0 left-0 w-[12%] bg-brand-gold transition-[width] duration-[2500ms] ease-linear group-hover:w-full" />
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-5 xl:p-6">
                <div className="flex items-baseline gap-3">
                    <span className="font-body text-[10px] font-semibold text-brand-gold xl:text-[12px]">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-heading text-[20px] uppercase leading-none tracking-[0.03em] text-brand-cream xl:text-[26px]">
                        {service.title}
                    </h3>
                </div>
                <p className="max-w-[30rem] font-body text-[12px] leading-relaxed text-brand-cream/70 xl:text-[14px]">
                    {service.description}
                </p>
                <ul className="mt-1 flex flex-wrap gap-2">
                    {service.platforms.map((p) => (
                        <li
                            key={p}
                            className="rounded-full border border-brand-taupe/40 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.08em] text-brand-taupe transition-colors group-hover:border-brand-gold/40 group-hover:text-brand-gold xl:text-[11px]"
                        >
                            {p}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

const PROCESS = ["Concept", "Script", "Shoot", "Edit", "Deliver"];

export default function WhatWeDo({ services = SERVICES }: { services?: Service[] }) {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);
    const show = inView ? "animate-fade-up" : "opacity-0";

    return (
        <section id="visual-marketing" className={`py-12 lg:py-16 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className="relative overflow-hidden rounded-[16px] bg-brand-dark px-6 py-10 font-body text-brand-cream sm:px-10 lg:px-[4.5%] lg:py-14"
            >
                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-brown/25 blur-3xl" />

                <div className={`relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between ${show}`}>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-brand-gold" />
                            <span className="capetown-font text-[26px] leading-none text-brand-gold xl:text-[32px]">
                                What We Do
                            </span>
                        </div>
                        <h2 className="mt-4 font-heading text-[40px] uppercase leading-[0.95] tracking-[0.03em] text-brand-cream sm:text-[48px] xl:text-[64px]">
                            Visual
                            <br />
                            <span className="text-brand-gold">Marketing</span>
                        </h2>
                    </div>
                    <p className="max-w-md font-body text-[13px] leading-relaxed text-brand-cream/70 xl:text-[15px]">
                        We make videos for your brand. Client films, trailers, reels and ads, all built
                        to stop the scroll and make people watch to the end.
                    </p>
                </div>

                <div className="relative mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
                    {services.map((s, i) => (
                        <ServiceCard
                            key={s.title}
                            service={s}
                            index={i}
                            className={`${show} ${DELAYS[i % DELAYS.length]}`}
                        />
                    ))}
                </div>

                <div
                    className={`relative mt-10 flex flex-col gap-5 border-t border-brand-gold/15 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-12 ${show} [animation-delay:750ms]`}
                >
                    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[11px] font-medium uppercase tracking-[0.14em] text-brand-taupe xl:text-[12px]">
                        {PROCESS.map((step, i) => (
                            <li key={step} className="flex items-center gap-3">
                                <span>
                                    <span className="text-brand-gold">{String(i + 1).padStart(2, "0")}</span> {step}
                                </span>
                                {i < PROCESS.length - 1 && <span className="h-px w-5 bg-brand-taupe/40" />}
                            </li>
                        ))}
                    </ol>
                    <a
                        href="#contact"
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-brand-button px-5 py-2.5 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-brand-white transition-all hover:scale-[1.03] hover:bg-brand-brown sm:self-auto xl:text-[13px]"
                    >
                        <PlayIcon className="h-3.5 w-3.5" />
                        Start a Project
                    </a>
                </div>
            </div>
        </section>
    );
}