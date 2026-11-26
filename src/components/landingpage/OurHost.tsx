import { useCallback, useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/lib/smoothScroll";
import { useInView } from "@/lib/useView";
import { ArrowIcon, PAGE_GUTTER } from "../Navbar";
import { HOST, type Host } from "@/data/Host";

const DoubleCheck = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
    >
        <path d="M2 12.5l4.5 4.5L15 8.5" />
        <path d="M11 16l1 1 9-9.5" />
    </svg>
);

const SoundIcon = ({ muted }: { muted: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
    >
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {muted ? (
            <>
                <path d="M23 9l-6 6" />
                <path d="M17 9l6 6" />
            </>
        ) : (
            <>
                <path d="M15.5 8.5a5 5 0 010 7" />
                <path d="M19 5a10 10 0 010 14" />
            </>
        )}
    </svg>
);

export default function OurHost({ host = HOST }: { host?: Host }) {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);
    const show = inView ? "animate-fade-up" : "opacity-0";

    const videoRef = useRef<HTMLVideoElement>(null);
    const videoInViewRef = useRef(false);   
    const unlockedRef = useRef(false);   
    const wantSoundRef = useRef(true); 
    const [muted, setMuted] = useState(true);

    const applyAudio = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;

        const shouldHaveSound =
            videoInViewRef.current && unlockedRef.current && wantSoundRef.current;

        v.muted = !shouldHaveSound;
        setMuted(v.muted);

        if (v.paused) {
            v.play().catch(() => {
                v.muted = true;
                setMuted(true);
                v.play().catch(() => { });
            });
        }
    }, []);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = true;
        v.play().catch(() => { });
    }, [host.video]);

    useEffect(() => {
        const events = ["pointerdown", "keydown", "touchstart"] as const;
        const remove = () =>
            events.forEach((e) => window.removeEventListener(e, unlock));
        function unlock() {
            unlockedRef.current = true;
            applyAudio();
            remove();
        }
        events.forEach((e) =>
            window.addEventListener(e, unlock, { passive: true })
        );
        return remove;
    }, [applyAudio]);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                videoInViewRef.current = entry.isIntersecting;
                applyAudio();
            },
            { threshold: 0.5 } 
        );
        io.observe(v);
        return () => io.disconnect();
    }, [applyAudio]);

    const toggleSound = () => {
        const v = videoRef.current;
        if (!v) return;
        unlockedRef.current = true;
        wantSoundRef.current = v.muted; 
        applyAudio();
    };

    const handleMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (host.moreLink.startsWith("#")) {
            e.preventDefault();
            scrollToSection(host.moreLink);
        }
    };

    return (
        <section id="our-hosts" className={`py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className="grid items-center gap-8 rounded-[20px] bg-brand-dark p-4 text-white sm:p-5 md:grid-cols-[minmax(0,40%)_1fr] md:gap-8 lg:grid-cols-[minmax(0,32%)_1fr_auto] lg:gap-10 xl:gap-14"
            >
                <div className={`relative overflow-hidden rounded-[16px] border-2 border-white ${show}`}>
                    <video
                        ref={videoRef}
                        src={host.video}
                        poster={host.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        aria-label={host.name}
                        className="aspect-[288/212] w-full object-fit"
                    />

                    <button
                        type="button"
                        onClick={toggleSound}
                        onPointerDown={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        aria-label={muted ? "Unmute video" : "Mute video"}
                        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                    >
                        <SoundIcon muted={muted} />
                    </button>
                </div>

                <div className={`px-2 [animation-delay:150ms] lg:px-0 ${show}`}>
                    <h2 className="font-heading text-[30px] uppercase leading-none tracking-[0.03em] sm:text-[36px] xl:text-[44px]">
                        Hi, I&apos;m {host.name}
                    </h2>
                    <p className="mt-3 max-w-[34rem] font-body text-[13px] leading-relaxed text-white/90 xl:text-[15px]">
                        {host.bio}
                    </p>

                    <div className="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
                        <a
                            href={host.moreLink}
                            onClick={handleMore}
                            className="group flex items-center gap-4 rounded-full bg-brand-button py-2.5 pl-5 pr-2.5 font-body text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-brand-brown"
                        >
                            More About Me
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-brand-black transition-transform duration-300 group-hover:rotate-45">
                                <ArrowIcon className="h-3.5 w-3.5" />
                            </span>
                        </a>

                        <span className="translate-y-3 -rotate-0 capetown-font text-[30px] leading-none xl:text-[38px]">
                            {host.signature}
                        </span>
                    </div>
                </div>

                <ul
                    className={`space-y-4 border-white/50 px-2 pb-2 font-body md:col-span-2 md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0 md:gap-y-3 lg:col-span-1 lg:block lg:space-y-4 text-[13px] font-semibold [animation-delay:300ms] lg:self-center lg:border-l lg:py-6 lg:pl-8 lg:pr-6 xl:pr-10 xl:text-[14px] ${show}`}
                >
                    {host.highlights.map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                            <DoubleCheck />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}