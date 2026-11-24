import { scrollToSection } from "@/lib/smoothScroll";
import { ArrowIcon, PAGE_GUTTER } from "../Navbar";

const REVIEW_AVATARS = [
    "/images/banner-reviews1.png",
    "/images/banner-reviews2.png",
    "/images/banner-reviews3.png",
    "/images/banner-reviews4.png",
];

const HERO_VIDEO = "/videos/Bg4.mp4";
const HERO_VIDEO_POSTER = "";
const HERO_VIDEO_OPACITY = 1;

export default function Hero() {
    return (
        <section
            id="home"
            className={`relative flex min-h-[100svh] items-center overflow-hidden bg-brand-dark pt-32 pb-16 sm:pt-36 lg:pt-[174px] lg:pb-16 ${PAGE_GUTTER}`}
        >
            <video
                className="pointer-events-none absolute inset-0 h-full w-full bg-brand-dark object-cover"
                style={{ opacity: HERO_VIDEO_OPACITY }}
                src={HERO_VIDEO}
                poster={HERO_VIDEO_POSTER || undefined}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
            />

            <div className="relative z-10 grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-8">
                <div>
                    <span className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-brand-black px-4 py-1.5 font-body text-[10px] font-medium uppercase tracking-wide text-brand-black [animation-delay:200ms] sm:text-[11px] 2xl:text-[13px]">
                        <style>{`
                          @keyframes rec-blink { 0%, 55% { opacity: 1; } 70%, 90% { opacity: 0.15; } 100% { opacity: 1; } }
                         `}</style>
                        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 motion-safe:animate-ping" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500 motion-safe:animate-[rec-blink_1.2s_ease-in-out_infinite]" />
                        </span>
                        Motion Designer &amp; Creative Technologist
                    </span>

                    <h1 className="mt-[1.5vh] font-heading font-normal uppercase leading-[0.95] tracking-[0.03em] text-brand-black">
                        <span className="block animate-fade-up text-[14vw] [animation-delay:350ms] sm:text-[12vw] lg:text-[min(8.5vw,13vh)]">
                            I Bring
                        </span>
                        <span className="block animate-fade-up text-[22vw] text-brand-brown [animation-delay:500ms] sm:text-[17vw] lg:text-[min(13.5vw,21vh)]">
                            Idea To
                        </span>
                        <span className="block animate-fade-up text-[14vw] [animation-delay:650ms] sm:text-[9vw] lg:text-[min(7vw,11.5vh)]">
                            Life In Motion
                        </span>
                    </h1>

                    <p className="mt-[1.5vh] max-w-[34rem] animate-fade-up font-body text-base leading-relaxed text-brand-black/70 [animation-delay:800ms] lg:text-[clamp(14px,2.3vh,20px)] 2xl:max-w-[34rem]">
                        Let everyone question and understand your product, marketing, and revenue
                        data.
                    </p>

                    <div className="mt-[2.5vh] flex animate-fade-up flex-wrap items-center gap-8 [animation-delay:950ms]">
                        <a
                            href="#latest-podcast"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#latest-podcast");
                            }}
                            className="group flex items-center gap-4 rounded-full bg-brand-button py-2.5 pl-6 pr-2.5 font-body text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-brand-brown 2xl:text-[15px]"
                        >
                            View My Work
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-brand-black transition-transform duration-300 group-hover:rotate-45">
                                <ArrowIcon className="h-3.5 w-3.5" />
                            </span>
                        </a>

                        <a
                            href="#visual-marketing"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection("#visual-marketing");
                            }}
                            className="group flex items-center gap-2 font-body text-[13px] font-medium uppercase italic tracking-wide text-brand-brown 2xl:text-[15px]"
                        >
                            Watch Reels
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-brown transition-colors group-hover:bg-brand-brown group-hover:text-white">
                                <svg viewBox="0 0 24 24" className="ml-0.5 h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
                                    <path d="M6 4l14 8-14 8z" />
                                </svg>
                            </span>
                        </a>
                    </div>

                    <div className="mt-[3vh] flex animate-fade-up items-center gap-4 [animation-delay:1100ms]">
                        <div className="flex -space-x-4">
                            {REVIEW_AVATARS.map((src, i) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt={`Reviewer ${i + 1}`}
                                    className="h-12 w-12 rounded-full border-2 border-neutral-700 object-cover 2xl:h-14 2xl:w-14"
                                />
                            ))}
                        </div>
                        <p className="font-body text-lg font-medium text-brand-black 2xl:text-xl">
                            450+ Reviews
                        </p>
                    </div>
                </div>

                <div className="flex justify-center lg:justify-end">
                    {/* <img
                        src="/images/Hero.png"
                        alt="Vintage microphone with books, headphones and coffee"
                        className="w-full max-w-[520px] animate-zoom-in object-contain [animation-delay:400ms] lg:max-h-[80vh] lg:w-auto lg:max-w-full"
                    /> */}
                </div>
            </div>
        </section>
    );
}