import { EPISODES, type Episode } from "@/data/episodes";
import { useInView } from "@/lib/useView";
import { useEffect, useRef, useState } from "react";
import { PLAY_EVENT } from "./AudioPlayer";
import { PAGE_GUTTER } from "../Navbar";


export const SHOW = {
    title: "True Words Podcast",
    author: "Rhea Monroe",
    cover: "/images/Podcast-BG.jpg",
    description:
        "Honest conversations about stories, creativity and the people behind them. New episodes every week.",
};

const PLAYER_ID = "spotify-style-player";

const fmt = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return "--:--";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
};

const PlayIcon = ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z" />
    </svg>
);
const PauseIcon = ({ className = "h-5 w-5" }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <rect x="6" y="4" width="4" height="16" rx="1" />
        <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
);
const PrevIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M6 5h2v14H6zM20 5.5v13a1 1 0 0 1-1.55.83L9 13a1.2 1.2 0 0 1 0-2l9.45-6.33A1 1 0 0 1 20 5.5z" />
    </svg>
);
const NextIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M16 5h2v14h-2zM4 5.5v13a1 1 0 0 0 1.55.83L15 13a1.2 1.2 0 0 0 0-2L5.55 4.67A1 1 0 0 0 4 5.5z" />
    </svg>
);
const ShuffleIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
);
const RepeatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
        <path d="M17 2l4 4-4 4" />
        <path d="M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4" />
        <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </svg>
);
const VolumeIcon = ({ muted }: { muted: boolean }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" />
        {muted ? (
            <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
        ) : (
            <path d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
        )}
    </svg>
);
const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
);

const Equalizer = () => (
    <span className="flex h-4 items-end gap-[2px]" aria-label="Now playing">
        {["[animation-delay:0ms]", "[animation-delay:300ms]", "[animation-delay:150ms]", "[animation-delay:450ms]"].map((d) => (
            <span key={d} className={`h-full w-[3px] origin-bottom animate-eq rounded-sm bg-brand-gold ${d}`} />
        ))}
    </span>
);

function Slider({
    value,
    max,
    onChange,
    label,
}: {
    value: number;
    max: number;
    onChange: (v: number) => void;
    label: string;
}) {
    const pct = max ? Math.min(100, (value / max) * 100) : 0;
    return (
        <div className="group relative h-4 w-full">
            <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20" />
            <div
                className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white transition-colors group-hover:bg-brand-gold"
                style={{ width: `${pct}%` }}
            />
            <div
                className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                style={{ left: `${pct}%` }}
            />
            <input
                type="range"
                min={0}
                max={max || 0}
                step={max > 1 ? 0.1 : 0.01}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-label={label}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
        </div>
    );
}

export default function PodcastPlayer({ episodes = EPISODES }: { episodes?: Episode[] }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const autoplay = useRef(false);

    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const [muted, setMuted] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [following, setFollowing] = useState(false);
    const [durations, setDurations] = useState<Record<number, number>>({});

    const { ref, inView } = useInView<HTMLDivElement>(0.15);
    const ep = episodes[index];

    useEffect(() => {
        const loaders = episodes.map((e) => {
            const a = new Audio();
            a.preload = "metadata";
            a.onloadedmetadata = () => setDurations((d) => ({ ...d, [e.id]: a.duration }));
            a.src = e.audio;
            return a;
        });
        return () => loaders.forEach((a) => a.removeAttribute("src"));
    }, [episodes]);

    useEffect(() => {
        const onOther = (e: Event) => {
            if ((e as CustomEvent).detail !== PLAYER_ID) audioRef.current?.pause();
        };
        window.addEventListener(PLAY_EVENT, onOther);
        return () => window.removeEventListener(PLAY_EVENT, onOther);
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.volume = volume;
        audioRef.current.muted = muted;
    }, [volume, muted]);

    const startPlayback = () => {
        const a = audioRef.current;
        if (!a) return;
        window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: PLAYER_ID }));
        a.play().catch(() => setPlaying(false));
    };

    useEffect(() => {
        setCurrent(0);
        if (autoplay.current) startPlayback();
    }, [index]);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) startPlayback();
        else a.pause();
    };

    const playAt = (i: number) => {
        if (i === index) return toggle();
        autoplay.current = true;
        setIndex(i);
    };

    const next = () => {
        if (episodes.length < 2) return;
        let i = (index + 1) % episodes.length;
        if (shuffle) {
            do i = Math.floor(Math.random() * episodes.length);
            while (i === index);
        }
        autoplay.current = true;
        setIndex(i);
    };

    const prev = () => {
        const a = audioRef.current;
        if (a && a.currentTime > 3) {
            a.currentTime = 0;
            return;
        }
        autoplay.current = true;
        setIndex((index - 1 + episodes.length) % episodes.length);
    };

    const seek = (v: number) => {
        if (!audioRef.current) return;
        audioRef.current.currentTime = v;
        setCurrent(v);
    };

    const onEnded = () => {
        if (repeat && audioRef.current) {
            audioRef.current.currentTime = 0;
            startPlayback();
        } else next();
    };

    if (!ep) return null;

    return (
        <section id="listen" className={`py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <audio
                ref={audioRef}
                src={ep.audio}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={onEnded}
                onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            />

            <div
                ref={ref}
                className={`overflow-hidden rounded-[24px] bg-brand-dark text-white shadow-[0_30px_80px_-20px_rgba(28,21,13,0.6)] ${inView ? "animate-fade-up" : "opacity-0"
                    }`}
            >
                <div className="bg-linear-to-b from-brand-brown via-brand-brown/60 to-brand-dark px-5 pt-8 pb-6 sm:px-8 lg:px-10 lg:pt-12">
                    <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:gap-8 md:text-left">
                        <img
                            src={SHOW.cover}
                            alt={SHOW.title}
                            className="h-44 w-44 shrink-0 rounded-xl object-contain p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:h-52 sm:w-52 lg:h-60 lg:w-60"
                        />
                        <div className="min-w-0">
                            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                                Podcast
                            </p>
                            <h2 className="mt-2 font-heading text-[44px] uppercase leading-[0.95] tracking-[0.03em] sm:text-[64px] lg:text-[88px]">
                                {SHOW.title}
                            </h2>
                            <p className="mt-3 max-w-xl font-body text-sm text-white/75">{SHOW.description}</p>
                            <p className="mt-3 font-body text-sm font-semibold">
                                {SHOW.author}
                                <span className="font-normal text-white/70">
                                    {" "}
                                    • {episodes.length} episode{episodes.length === 1 ? "" : "s"}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-center gap-5 md:justify-start">
                        <button
                            type="button"
                            onClick={toggle}
                            aria-label={playing ? "Pause" : "Play"}
                            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-black shadow-lg transition-transform hover:scale-105 active:scale-95"
                        >
                            {playing ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="ml-0.5 h-6 w-6" />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFollowing((f) => !f)}
                            className={`rounded-full border px-5 py-1.5 font-body text-xs font-semibold uppercase tracking-wider transition-colors ${following
                                    ? "border-brand-gold text-brand-gold"
                                    : "border-white/60 text-white hover:border-white"
                                }`}
                        >
                            {following ? "Following" : "Follow"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShuffle((s) => !s)}
                            aria-label="Shuffle"
                            aria-pressed={shuffle}
                            className={`transition-colors ${shuffle ? "text-brand-gold" : "text-white/70 hover:text-white"}`}
                        >
                            <ShuffleIcon />
                        </button>
                    </div>
                </div>

                <div className="px-3 pb-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-[28px_minmax(0,1fr)_52px] items-center gap-4 border-b border-white/10 px-3 pb-2 font-body text-xs uppercase tracking-wider text-white/50 md:grid-cols-[32px_minmax(0,3fr)_minmax(0,1fr)_64px]">
                        <span className="text-center">#</span>
                        <span>Episode</span>
                        <span className="hidden md:block">Posted</span>
                        <span className="flex justify-end">
                            <ClockIcon />
                        </span>
                    </div>

                    <ul className="mt-2">
                        {episodes.map((e, i) => {
                            const isCurrent = i === index;
                            return (
                                <li key={e.id}>
                                    <button
                                        type="button"
                                        onClick={() => playAt(i)}
                                        className={`group grid w-full grid-cols-[28px_minmax(0,1fr)_52px] items-center gap-4 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10 md:grid-cols-[32px_minmax(0,3fr)_minmax(0,1fr)_64px] ${isCurrent ? "bg-white/5" : ""
                                            }`}
                                    >
                                        <span className="flex justify-center font-body text-sm text-white/60">
                                            {isCurrent && playing ? (
                                                <span className="group-hover:hidden"><Equalizer /></span>
                                            ) : (
                                                <span className="group-hover:hidden">{i + 1}</span>
                                            )}
                                            <span className="hidden text-white group-hover:block">
                                                {isCurrent && playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                                            </span>
                                        </span>

                                        <span className="flex min-w-0 items-center gap-3">
                                            <img src={e.image} alt="" className="h-11 w-11 shrink-0 rounded-md object-cover" />
                                            <span className="min-w-0">
                                                <span
                                                    className={`block truncate font-body text-sm font-semibold ${isCurrent ? "text-brand-gold" : "text-white"
                                                        }`}
                                                >
                                                    {e.title}
                                                </span>
                                                <span className="block truncate font-body text-xs text-white/60">
                                                    {e.show} • Episode {e.episode}, Session {e.session}
                                                </span>
                                            </span>
                                        </span>

                                        <span className="hidden truncate font-body text-xs text-white/60 md:block">
                                            {e.postedOn}
                                        </span>
                                        <span className="text-right font-body text-xs tabular-nums text-white/60">
                                            {fmt(durations[e.id] ?? NaN)}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="grid items-center gap-4 border-t border-white/10 bg-black/30 px-4 py-4 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] lg:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <img src={ep.image} alt="" className="h-12 w-12 shrink-0 rounded-md object-cover" />
                        <div className="min-w-0">
                            <p className="truncate font-body text-sm font-semibold">{ep.title}</p>
                            <p className="truncate font-body text-xs text-white/60">{ep.show}</p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                        <div className="flex items-center gap-5">
                            <button
                                type="button"
                                onClick={() => setShuffle((s) => !s)}
                                aria-label="Shuffle"
                                aria-pressed={shuffle}
                                className={shuffle ? "text-brand-gold" : "text-white/60 hover:text-white"}
                            >
                                <ShuffleIcon />
                            </button>
                            <button type="button" onClick={prev} aria-label="Previous" className="text-white/80 hover:text-white">
                                <PrevIcon />
                            </button>
                            <button
                                type="button"
                                onClick={toggle}
                                aria-label={playing ? "Pause" : "Play"}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-black transition-transform hover:scale-105"
                            >
                                {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="ml-0.5 h-4 w-4" />}
                            </button>
                            <button type="button" onClick={next} aria-label="Next" className="text-white/80 hover:text-white">
                                <NextIcon />
                            </button>
                            <button
                                type="button"
                                onClick={() => setRepeat((r) => !r)}
                                aria-label="Repeat episode"
                                aria-pressed={repeat}
                                className={repeat ? "text-brand-gold" : "text-white/60 hover:text-white"}
                            >
                                <RepeatIcon />
                            </button>
                        </div>
                        <div className="flex w-full items-center gap-2">
                            <span className="w-10 text-right font-body text-[11px] tabular-nums text-white/60">{fmt(current)}</span>
                            <Slider value={current} max={duration} onChange={seek} label="Seek" />
                            <span className="w-10 font-body text-[11px] tabular-nums text-white/60">{fmt(duration)}</span>
                        </div>
                    </div>

                    <div className="hidden items-center justify-end gap-2 md:flex">
                        <button
                            type="button"
                            onClick={() => setMuted((m) => !m)}
                            aria-label={muted ? "Unmute" : "Mute"}
                            className="text-white/70 hover:text-white"
                        >
                            <VolumeIcon muted={muted || volume === 0} />
                        </button>
                        <div className="w-28">
                            <Slider
                                value={muted ? 0 : volume}
                                max={1}
                                onChange={(v) => {
                                    setVolume(v);
                                    setMuted(v === 0);
                                }}
                                label="Volume"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}