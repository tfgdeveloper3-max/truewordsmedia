import { useEffect, useState } from "react";

type Props = {
    value: string;
    /** Wait this many ms before flipping to a new value (for staggered reveals) */
    delay?: number;
    className?: string;
};

/** Shared glass styling for every half of the card */
const GLASS = "bg-white/10 backdrop-blur-md";
/** Moving leaves are a little denser so the value behind them doesn't show through */
const LEAF = "bg-[#2a241b]/85 backdrop-blur-xl";

/** One half of the card: shows the top or bottom half of the text */
function Half({ text, part, extra = "" }: { text: string; part: "top" | "bottom"; extra?: string }) {
    return (
        <div
            className={`absolute inset-x-0 h-1/2 overflow-hidden ${part === "top" ? "top-0 rounded-t-[inherit]" : "bottom-0 rounded-b-[inherit]"
                } ${extra}`}
        >
            <span
                className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${part === "top" ? "top-0" : "bottom-0"
                    }`}
            >
                {text}
            </span>
        </div>
    );
}

/**
 * Glassmorphism flip card. Whenever `value` changes, the old value flips
 * down to reveal the new one, like a split-flap clock.
 */
export default function FlipCard({ value, delay = 0, className = "" }: Props) {
    const [current, setCurrent] = useState(value);
    const [previous, setPrevious] = useState(value);
    const [flipping, setFlipping] = useState(false);
    const [flipKey, setFlipKey] = useState(0);

    useEffect(() => {
        if (value === current) return;
        const start = setTimeout(() => {
            setPrevious(current);
            setCurrent(value);
            setFlipping(true);
            setFlipKey((k) => k + 1);
        }, delay);
        return () => clearTimeout(start);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (!flipping) return;
        const end = setTimeout(() => setFlipping(false), 650);
        return () => clearTimeout(end);
    }, [flipping, flipKey]);

    return (
        <div
            className={`relative rounded-[10px] font-body font-bold tabular-nums text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-white/20 [perspective:400px] ${className}`}
            aria-label={value}
            role="img"
        >
            {/* Invisible text keeps the card wide enough for its value */}
            <span className="invisible block px-[0.35em] text-center">{value}</span>

            {/* Static halves: new value on top, old value below until the flip lands */}
            <Half text={current} part="top" extra={GLASS} />
            <Half text={flipping ? previous : current} part="bottom" extra={`${GLASS} border-t border-black/40`} />

            {/* Moving leaves */}
            {flipping && (
                <div key={flipKey}>
                    <Half text={previous} part="top" extra={`${LEAF} origin-bottom animate-flip-top [backface-visibility:hidden]`} />
                    <Half
                        text={current}
                        part="bottom"
                        extra={`${LEAF} border-t border-black/40 origin-top animate-flip-bottom [backface-visibility:hidden]`}
                    />
                </div>
            )}

            {/* Shine + hinge line */}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-b from-white/15 to-transparent to-50%" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/50" />
        </div>
    );
}