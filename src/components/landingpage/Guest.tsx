import { useEffect, useState } from "react";
import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";

export type GuestImages = {
    topLeft?: string;
    bottomLeft?: string;
    right?: string;
};

type Props = {
    images?: GuestImages;
    onSubmit?: (data: { name: string; email: string }) => void;
};

const STEPS = [
    { no: "01", label: "Apply" },
    { no: "02", label: "Intro Call" },
    { no: "03", label: "Go Live" },
];

const SHAPES = [
    {
        key: "topLeft" as const,
        className: "left-0 top-0 h-[47.2%] w-[47.8%] rounded-b-full bg-[#5c5134]",
    },
    {
        key: "bottomLeft" as const,
        className: "left-0 top-[48.8%] h-[48.5%] w-[47.8%] rounded-bl-[60%] bg-[#ae5732]",
    },
    {
        key: "right" as const,
        className: "left-[49.7%] top-0 h-[77.8%] w-[50.3%] rounded-t-full bg-[#fdd073]",
    },
];

const PHOTOS = [
    {
        key: "topLeft" as const,
        frame: "left-0 top-[-21%] h-[68.2%] w-[47.8%] rounded-b-full",
        img: "left-0 w-full",
    },
    {
        key: "bottomLeft" as const,
        frame: "left-0 top-[48.8%] h-[48.5%] w-[47.8%] rounded-bl-[60%]",
        img: "left-[12%] w-[76%]",
    },
    {
        key: "right" as const,
        frame: "left-[49.7%] top-0 h-[77.8%] w-[50.3%] rounded-t-full",
        img: "left-0 w-full",
    },
];

const DEFAULT_IMAGES: GuestImages = {
    topLeft: "/images/guest1.png",
    bottomLeft: "/images/guest2.png",
    right: "/images/guest3.png",
};

const SHAPE_DELAY = 180;
const SHAPE_DURATION = 1100;

const WAVE = Array.from({ length: 64 }, (_, i) => {
    const t = i / 63;
    const spike = Math.exp(-(((i - 10) / 4.5) ** 2));
    const body = 0.32 * Math.exp(-(((i - 30) / 13) ** 2));
    const jitter = 0.75 + 0.25 * Math.abs(Math.sin(i * 2.3));
    const height = Math.min(1, Math.max(0.06, (spike + body) * jitter));
    const hue = 168 + 62 * Math.sin(Math.PI * t);
    return { height, color: `hsl(${hue.toFixed(0)} 85% 58%)` };
});

const randomStart = () => {
    const sign = () => (Math.random() < 0.5 ? -1 : 1);
    const tx = sign() * (30 + Math.random() * 50);
    const ty = sign() * (30 + Math.random() * 50);
    const rot = sign() * (120 + Math.random() * 150);
    const scale = 0.5 + Math.random() * 0.25;
    return `translate(${tx.toFixed(0)}%, ${ty.toFixed(0)}%) rotate(${rot.toFixed(0)}deg) scale(${scale.toFixed(2)})`;
};

export default function NextGuest({ images = DEFAULT_IMAGES, onSubmit }: Props) {
    const text = useInView<HTMLDivElement>(0.3);
    const art = useInView<HTMLDivElement>(0.25);
    const [starts] = useState(() => SHAPES.map(randomStart));
    const [landed, setLanded] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        if (!art.inView || landed) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const wait = reduce ? 0 : SHAPE_DELAY * (SHAPES.length - 1) + SHAPE_DURATION;
        const t = setTimeout(() => setLanded(true), wait);
        return () => clearTimeout(t);
    }, [art.inView, landed]);

    useEffect(() => {
        if (!sent) return;
        const t = setTimeout(() => setSent(false), 5000);
        return () => clearTimeout(t);
    }, [sent]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        onSubmit?.({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
        });
        form.reset();
        setSent(true);
    };

    return (
        <section id="next-guest" className={`relative py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <style>{`
                @keyframes guest-eq { 0%, 100% { transform: scaleY(0.35); } 50% { transform: scaleY(1); } }
                @media (prefers-reduced-motion: reduce) {
                    .guest-anim { animation: none !important; }
                    .guest-move { transition: none !important; }
                }
            `}</style>

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:items-stretch lg:gap-14">
                <div
                    ref={text.ref}
                    className={`max-w-[620px] lg:self-center ${text.inView ? "animate-fade-up" : "opacity-0"}`}
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-brand-black/15 bg-white/60 px-4 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-black">
                        <span className="relative flex h-2 w-2">
                            <span className="guest-anim absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                        </span>
                        On Air · Guest Spots Open
                    </span>

                    <h2 className="mt-5 font-heading uppercase leading-[0.92] text-brand-black">
                        <span className="block text-[28px] sm:text-[34px] xl:text-[40px]">
                            Got A Story Worth Telling?
                        </span>
                        <span className="mt-1 block text-[52px] sm:text-[68px] xl:text-[84px]">
                            Take The{" "}
                            <span className="relative inline-block text-brand-brown">
                                Mic.
                                <svg
                                    viewBox="0 0 120 14"
                                    preserveAspectRatio="none"
                                    aria-hidden="true"
                                    className="absolute -bottom-1 left-0 h-[0.14em] w-full text-brand-gold"
                                >
                                    <path
                                        d="M2 9 C 30 2, 60 13, 118 4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>
                        </span>
                    </h2>

                    <p className="mt-5 font-body text-[13px] leading-relaxed text-brand-black/80 xl:text-[15px]">
                        We&apos;re always looking for founders, creators and everyday people with stories
                        that stick. Drop your details and our producers will reach out to plan your
                        episode.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 flex flex-col gap-1 rounded-[26px] border border-brand-black/10 bg-white/70 p-2 shadow-[0_18px_40px_-20px_rgba(29,22,17,0.35)] backdrop-blur sm:flex-row sm:items-center sm:rounded-full"
                    >
                        <label className="flex h-[48px] min-w-0 flex-1 items-center gap-3 rounded-full px-4 transition-colors focus-within:bg-brand-black/5">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-brown" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <circle cx="12" cy="8" r="4" />
                                <path d="M4 21a8 8 0 0 1 16 0" />
                            </svg>
                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                aria-label="Your name"
                                required
                                className="w-full min-w-0 bg-transparent font-body text-[13px] text-brand-black outline-none placeholder:text-brand-black/45"
                            />
                        </label>
                        <span className="hidden h-6 w-px bg-brand-black/15 sm:block" />
                        <label className="flex h-[48px] min-w-0 flex-1 items-center gap-3 rounded-full px-4 transition-colors focus-within:bg-brand-black/5">
                            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-brand-brown" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <rect x="3" y="5" width="18" height="14" rx="2" />
                                <path d="m3 7 9 6 9-6" />
                            </svg>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                aria-label="Email address"
                                required
                                className="w-full min-w-0 bg-transparent font-body text-[13px] text-brand-black outline-none placeholder:text-brand-black/45"
                            />
                        </label>
                        <button
                            type="submit"
                            className="group flex h-[48px] shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-brand-brown pl-6 pr-1.5 font-body text-[12px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark xl:text-[13px]"
                        >
                            Apply Now
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-45">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M7 17 17 7M8 7h9v9" />
                                </svg>
                            </span>
                        </button>
                    </form>

                    <p role="status" className="mt-3 h-5 pl-4 font-body text-[12px] text-brand-brown">
                        {sent ? "Thanks! Our producers will be in touch soon." : ""}
                    </p>

                    <ol className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                        {STEPS.map((s, i) => (
                            <li key={s.no} className="flex items-center gap-5">
                                <span className="flex items-baseline gap-2">
                                    <span className="font-heading text-[22px] leading-none text-brand-brown">{s.no}</span>
                                    <span className="font-body text-[12px] font-medium uppercase tracking-wider text-brand-black xl:text-[13px]">
                                        {s.label}
                                    </span>
                                </span>
                                {i < STEPS.length - 1 && <span className="h-px w-8 bg-brand-black/25" />}
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="relative lg:[container-type:size]">
                    <div
                        ref={art.ref}
                        className="relative mx-auto aspect-[360/324] w-full max-w-[520px] lg:absolute lg:right-0 lg:top-1/2 lg:w-[min(100cqw,120cqh)] lg:max-w-none lg:-translate-y-1/2"
                    >
                        {SHAPES.map((s, i) => {
                            const delay = i * SHAPE_DELAY;
                            return (
                                <div
                                    key={s.key}
                                    className={`guest-move absolute ${s.className}`}
                                    style={{
                                        transform: art.inView ? "none" : starts[i],
                                        opacity: art.inView ? 1 : 0,
                                        transition: `transform ${SHAPE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 500ms ease ${delay}ms`,
                                    }}
                                />
                            );
                        })}

                        {PHOTOS.map((p, i) => {
                            const src = images[p.key];
                            if (!src) return null;
                            const delay = i * 150;
                            return (
                                <div
                                    key={p.key}
                                    className={`pointer-events-none absolute overflow-hidden ${p.frame}`}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        loading="lazy"
                                        className={`guest-move absolute bottom-0 h-auto max-w-none ${p.img}`}
                                        style={{
                                            opacity: landed ? 1 : 0,
                                            transform: landed ? "translateY(0)" : "translateY(14%)",
                                            transition: `opacity 600ms ease ${delay}ms, transform 800ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
                                        }}
                                    />
                                </div>
                            );
                        })}

                        <div
                            aria-hidden="true"
                            className="guest-move absolute left-[58.6%] top-[70.7%] flex h-[29.3%] w-[41.4%] items-center gap-[1.5px]"
                            style={{
                                opacity: landed ? 1 : 0,
                                transition: "opacity 600ms ease 200ms",
                            }}
                        >
                            {WAVE.map((b, i) => (
                                <span
                                    key={i}
                                    className="guest-anim min-w-0 flex-1 rounded-full"
                                    style={{
                                        height: `${b.height * 100}%`,
                                        backgroundColor: b.color,
                                        animation: `guest-eq ${0.6 + (i % 7) * 0.12}s ease-in-out ${-(i * 0.09)}s infinite`,
                                    }}
                                />
                            ))}
                        </div>

                        <span
                            aria-hidden="true"
                            className="guest-move absolute left-[48.9%] top-[85.5%] flex aspect-square w-[13.3%] items-center justify-center rounded-full bg-[#0a8fd6] text-white shadow-[0_10px_24px_-10px_rgba(10,143,214,0.8)]"
                            style={{
                                transform: `translate(-50%, -50%) scale(${landed ? 1 : 0})`,
                                transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                            }}
                        >
                            <svg viewBox="0 0 24 24" className="ml-[8%] h-[42%] w-[42%]" fill="currentColor">
                                <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}