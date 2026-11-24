"use client";

import { useEffect, useRef, useState } from "react";
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
        video: "/videos/Brand-Film.mp4",
    },
    {
        title: "Reels & Shorts",
        description:
            "Scroll-stopping vertical edits with hooks in the first 2 seconds, captions and trending audio.",
        format: "9:16",
        duration: "15–60s",
        platforms: ["Instagram", "TikTok", "Shorts"],
        layout: "tall",
        video: "/videos/Reel.mp4",
    },
    {
        title: "Trailers & Teasers",
        description:
            "Cinematic cut-downs that build hype for launches, events, courses and campaigns.",
        format: "16:9 · 1:1",
        duration: "30–90s",
        platforms: ["YouTube", "Meta"],
        layout: "regular",
        video: "/videos/Video-Trailer.mp4",
    },
    {
        title: "Social Ads",
        description:
            "Performance-focused video ads with multiple hooks and cut-downs, ready to test and scale.",
        format: "4:5 · 9:16",
        duration: "6–30s",
        platforms: ["Meta Ads", "TikTok Ads"],
        layout: "regular",
        video: "/videos/Social-Add.mp4",
    },
];

const DELAYS = [
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
    "[animation-delay:450ms]",
    "[animation-delay:600ms]",
];

const LAYOUT_CLASSES: Record<Service["layout"], { card: string; desc: string; title: string }> = {
    wide: {
        card: "w-[85%] sm:w-[48%] md:w-[44%] lg:col-span-2 lg:row-span-2",
        desc: "",
        title: "lg:text-[30px] xl:text-[36px]",
    },
    tall: {
        card: "w-[62%] sm:w-[30%] md:w-[27%] lg:row-span-2",
        desc: "lg:hidden xl:line-clamp-3",
        title: "",
    },
    regular: {
        card: "w-[85%] sm:w-[48%] md:w-[44%]",
        desc: "lg:hidden 2xl:line-clamp-2",
        title: "",
    },
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
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col items-center gap-3 text-brand-cream/90">
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
        <div className="absolute left-3 top-12 flex h-4 items-end gap-[3px]" aria-hidden>
            {["[animation-delay:0ms]", "[animation-delay:200ms]", "[animation-delay:400ms]", "[animation-delay:100ms]"].map(
                (d) => (
                    <span key={d} className={`h-full w-[3px] origin-bottom rounded-full bg-brand-gold animate-eq ${d}`} />
                ),
            )}
        </div>
    );
}

function ServiceCard({ service, index, className }: { service: Service; index: number; className: string }) {
    const cardRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);
    const [playing, setPlaying] = useState(false);
    const layout = LAYOUT_CLASSES[service.layout];
    const isTall = service.layout === "tall";

    const play = () => videoRef.current?.play().catch(() => { });
    const pause = () => {
        const v = videoRef.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
        if (barRef.current) barRef.current.style.width = "0%";
    };

    const onTimeUpdate = () => {
        const v = videoRef.current;
        const bar = barRef.current;
        if (!v || !bar || !v.duration) return;
        bar.style.width = `${(v.currentTime / v.duration) * 100}%`;
    };

    useEffect(() => {
        const el = cardRef.current;
        const v = videoRef.current;
        if (!el || !v || !window.matchMedia("(hover: none)").matches) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    v.play().catch(() => { });
                } else {
                    v.pause();
                    v.currentTime = 0;
                }
            },
            { threshold: 0.6 },
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <article
            ref={cardRef}
            onMouseEnter={play}
            onMouseLeave={pause}
            className={`group relative h-[340px] shrink-0 snap-start overflow-hidden rounded-[12px] border border-brand-gold/15 bg-brand-black transition-colors duration-300 hover:border-brand-gold/50 sm:h-[360px] md:h-[380px] lg:h-auto lg:w-auto ${layout.card} ${className}`}
        >
            {service.video ? (
                <video
                    ref={videoRef}
                    src={`${service.video}#t=0.1`}
                    poster={service.poster}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={`${service.title} sample`}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onTimeUpdate={onTimeUpdate}
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
                </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-black/95 via-brand-black/30 to-brand-black/40" />

            <div className="absolute inset-x-3 top-3 flex items-center justify-between font-body text-[10px] font-medium uppercase tracking-[0.12em] text-brand-cream xl:text-[11px]">
                <span className="flex items-center gap-1.5 rounded-full bg-brand-black/60 px-2.5 py-1 backdrop-blur">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-button" />
                    {service.format}
                </span>
                <span className="rounded-full bg-brand-black/60 px-2.5 py-1 backdrop-blur">{service.duration}</span>
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span
                    className={`flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/50 bg-brand-cream/10 text-brand-cream backdrop-blur transition-all duration-300 xl:h-14 xl:w-14 ${playing ? "scale-75 opacity-0" : "opacity-100"
                        }`}
                >
                    <PlayIcon className="ml-0.5 h-5 w-5" />
                </span>
            </div>

            {isTall && (
                <>
                    <ReelSideIcons />
                    <Equalizer />
                </>
            )}

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 xl:gap-2.5 xl:p-5">
                <div className="flex items-baseline gap-2.5">
                    <span className="font-body text-[10px] font-semibold text-brand-gold xl:text-[12px]">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                        className={`font-heading text-[18px] uppercase leading-none tracking-[0.03em] text-brand-cream sm:text-[20px] xl:text-[22px] ${layout.title}`}
                    >
                        {service.title}
                    </h3>
                </div>
                <p
                    className={`line-clamp-2 max-w-[30rem] font-body text-[12px] leading-relaxed text-brand-cream/75 xl:text-[13px] ${layout.desc}`}
                >
                    {service.description}
                </p>
                <ul className="flex flex-wrap gap-1.5">
                    {service.platforms.map((p) => (
                        <li
                            key={p}
                            className="rounded-full border border-brand-cream/25 bg-brand-black/40 px-2 py-0.5 font-body text-[9px] uppercase tracking-[0.08em] text-brand-cream/80 backdrop-blur transition-colors group-hover:border-brand-gold/50 group-hover:text-brand-gold xl:text-[10px]"
                        >
                            {p}
                        </li>
                    ))}
                </ul>
            </div>

            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-brand-cream/10">
                <span ref={barRef} className="absolute inset-y-0 left-0 w-0 bg-brand-gold transition-[width] duration-300 ease-linear" />
            </span>
        </article>
    );
}

const PROCESS = ["Concept", "Script", "Shoot", "Edit", "Deliver"];

export default function WhatWeDo({ services = SERVICES }: { services?: Service[] }) {
    const { ref, inView } = useInView<HTMLDivElement>(0.2);
    const show = inView ? "animate-fade-up" : "opacity-0";

    return (
        <section id="visual-marketing" className={`py-8 lg:py-12 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className="relative overflow-hidden rounded-[16px] bg-brand-dark px-6 py-8 font-body text-brand-cream sm:px-10 lg:px-[4.5%] lg:py-10"
            >
                <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-brown/25 blur-3xl" />

                <div className={`relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between ${show}`}>
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="h-px w-10 bg-brand-gold" />
                            <span className="capetown-font text-[22px] leading-none text-brand-gold sm:text-[26px] xl:text-[30px]">
                                What We Do
                            </span>
                        </div>
                        <h2 className="mt-3 font-heading text-[34px] uppercase leading-[0.95] tracking-[0.03em] text-brand-cream sm:text-[42px] lg:text-[48px] xl:text-[56px]">
                            Visual <span className="text-brand-gold">Marketing</span>
                        </h2>
                    </div>
                    <p className="max-w-md font-body text-[13px] leading-relaxed text-brand-cream/70 xl:text-[15px]">
                        We make videos for your brand. Client films, trailers, reels and ads, all built
                        to stop the scroll and make people watch to the end.
                    </p>
                </div>

                <p className={`relative mt-5 font-body text-[10px] uppercase tracking-[0.14em] text-brand-taupe lg:hidden ${show}`}>
                    Swipe to explore →
                </p>

                <div className="relative -mx-6 mt-3 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-1 [scrollbar-width:none] sm:-mx-10 sm:scroll-px-10 sm:px-10 [&::-webkit-scrollbar]:hidden lg:mx-0 lg:mt-8 lg:grid lg:h-[460px] lg:grid-cols-4 lg:grid-rows-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0 xl:h-[520px] 2xl:h-[580px]">
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
                    className={`relative mt-6 flex flex-col gap-4 border-t border-brand-gold/15 pt-5 sm:flex-row sm:items-center sm:justify-between lg:mt-8 lg:pt-6 ${show} [animation-delay:750ms]`}
                >
                    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 font-body text-[10px] font-medium uppercase tracking-[0.14em] text-brand-taupe sm:text-[11px] xl:text-[12px]">
                        {PROCESS.map((step, i) => (
                            <li key={step} className="flex items-center gap-3">
                                <span>
                                    <span className="text-brand-gold">{String(i + 1).padStart(2, "0")}</span> {step}
                                </span>
                                {i < PROCESS.length - 1 && <span className="h-px w-4 bg-brand-taupe/40 sm:w-5" />}
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