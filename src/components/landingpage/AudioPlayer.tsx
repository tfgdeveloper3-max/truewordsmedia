import { useEffect, useRef, useState } from "react";

const PLAY_EVENT = "podcast:play";

const formatTime = (sec: number) => {
    if (!Number.isFinite(sec) || sec < 0) return "00:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

type Props = {
    src: string;
    id: string | number;
    downloadName?: string;
};

export default function AudioPlayer({ src, id, downloadName }: Props) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(0);
    const [duration, setDuration] = useState(0);
    const [muted, setMuted] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const onOtherPlay = (e: Event) => {
            if ((e as CustomEvent).detail !== id) audioRef.current?.pause();
        };
        window.addEventListener(PLAY_EVENT, onOtherPlay);
        return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
    }, [id]);

    const togglePlay = async () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (audio.paused) {
            window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: id }));
            try {
                await audio.play();
            } catch {
                setError(true);
            }
        } else {
            audio.pause();
        }
    };

    const seek = (value: number) => {
        const audio = audioRef.current;
        if (!audio || !duration) return;
        audio.currentTime = value;
        setCurrent(value);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    };

    const progress = duration ? (current / duration) * 100 : 0;

    return (
        <div className="flex items-center gap-3 sm:gap-4">
            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration);
                    setError(false);
                }}
                onError={() => setError(true)}
            />

            <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-brown text-white transition-transform hover:scale-105 disabled:opacity-50"
                disabled={error}
            >
                {playing ? (
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
                        <path d="M7 4l13 8-13 8z" />
                    </svg>
                )}
            </button>

            <span className="w-11 shrink-0 font-body text-xs tabular-nums text-brand-black">
                {formatTime(current)}
            </span>

            <div className="relative h-4 min-w-0 flex-1">
                <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand-black/20" />
                <div
                    className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-brand-brown"
                    style={{ width: `${progress}%` }}
                />
                <div
                    className="pointer-events-none absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-brown"
                    style={{ left: `${progress}%` }}
                />
                <input
                    type="range"
                    min={0}
                    max={duration || 0}
                    step={0.1}
                    value={current}
                    onChange={(e) => seek(Number(e.target.value))}
                    aria-label="Seek"
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
            </div>

            <span className="w-11 shrink-0 font-body text-xs tabular-nums text-brand-black">
                {error ? "--:--" : formatTime(duration)}
            </span>

            <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="shrink-0 text-brand-black transition-colors hover:text-brand-brown"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M4 9h4l5-4v14l-5-4H4z" />
                    {muted ? (
                        <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
                    ) : (
                        <path d="M16 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" />
                    )}
                </svg>
            </button>

            <a
                href={src}
                download={downloadName ?? true}
                aria-label="Download episode"
                className="shrink-0 text-brand-black transition-colors hover:text-brand-brown"
            >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
                </svg>
            </a>
        </div>
    );
}