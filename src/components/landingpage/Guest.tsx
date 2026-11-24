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

const WAVE_POINTS = (() => {
    const n = 110;
    const pts: string[] = [];
    for (let i = 0; i <= n; i++) {
        const x = (i / n) * 150;
        const spike = 48 * Math.exp(-(((i - 18) / 9) ** 2));
        const pre = 14 * Math.exp(-(((i - 4) / 3) ** 2));
        const tail = 9 * Math.exp(-(((i - 55) / 22) ** 2));
        const amp = Math.max(1.2, spike + pre + tail) * (0.75 + 0.25 * Math.abs(Math.sin(i * 1.9)));
        const y = 50 + (i % 2 === 0 ? -amp : amp);
        pts.push(`${x.toFixed(2)},${y.toFixed(2)}`);
    }
    return pts.join(" ");
})();

function Shape({ src, className }: { src?: string; className: string }) {
    return (
        <div className={`absolute overflow-hidden ${className}`}>
            {src && (
                <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover"
                />
            )}
        </div>
    );
}

export default function NextGuest({ images = {}, onSubmit }: Props) {
    const text = useInView<HTMLDivElement>(0.3);
    const art = useInView<HTMLDivElement>(0.2);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        onSubmit?.({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
        });
        form.reset();
    };

    return (
        <section id="next-guest" className={`py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
                <div
                    ref={text.ref}
                    className={`max-w-[640px] ${text.inView ? "animate-fade-up" : "opacity-0"}`}
                >
                    <h2 className="font-heading uppercase leading-[0.9] text-brand-black">
                        <span className="block text-[26px] sm:text-[30px] xl:text-[34px]">Want To</span>
                        <span className="block text-[44px] sm:text-[56px] xl:text-[64px]">
                            Be Our Next Guest.
                        </span>
                    </h2>
                    <p className="mt-4 font-body text-[13px] leading-relaxed text-brand-black xl:text-[14px]">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                        Ipsum has been the industry&apos;s standard dummy text ever since 1966, when
                        designers at Letraset and James Mosley.Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            className="h-[44px] w-full min-w-0 rounded-full border border-brand-black/70 bg-transparent px-5 font-body text-[13px] text-brand-black outline-none placeholder:text-brand-black/50 focus:border-brand-brown sm:flex-1"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            className="h-[44px] w-full min-w-0 rounded-full border border-brand-black/70 bg-transparent px-5 font-body text-[13px] text-brand-black outline-none placeholder:text-brand-black/50 focus:border-brand-brown sm:flex-1"
                        />
                        <button
                            type="submit"
                            className="group flex h-[44px] shrink-0 items-center justify-between gap-3 whitespace-nowrap rounded-full bg-brand-brown pl-5 pr-1.5 font-body text-[12px] font-medium uppercase tracking-wide text-white transition-opacity hover:opacity-90 xl:text-[13px]"
                        >
                            Subscribe Now
                            <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#e9b77a] text-brand-brown transition-transform group-hover:rotate-45">
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17 17 7M8 7h9v9" />
                                </svg>
                            </span>
                        </button>
                    </form>
                </div>

                <div
                    ref={art.ref}
                    className={`relative mx-auto aspect-[360/324] w-full max-w-[720px] lg:mr-0 ${art.inView ? "animate-fade-up [animation-delay:200ms]" : "opacity-0"}`}
                >
                    <Shape
                        src={images.topLeft}
                        className="left-0 top-0 h-[47.2%] w-[47.8%] rounded-b-full bg-[#5c5134]"
                    />
                    <Shape
                        src={images.bottomLeft}
                        className="left-0 top-[48.8%] h-[48.5%] w-[47.8%] rounded-bl-[60%] bg-[#ae5732]"
                    />
                    <Shape
                        src={images.right}
                        className="left-[49.7%] top-0 h-[77.8%] w-[50.3%] rounded-t-full bg-[#fdd073]"
                    />

                    <svg
                        viewBox="0 0 150 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                        className="absolute left-[58.6%] top-[70.7%] h-[29.3%] w-[41.4%]"
                    >
                        <defs>
                            <linearGradient id="guest-wave" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="#5ef2d0" />
                                <stop offset="45%" stopColor="#4fa8f0" />
                                <stop offset="75%" stopColor="#4a5fe0" />
                                <stop offset="100%" stopColor="#5ef2d0" />
                            </linearGradient>
                        </defs>
                        <polyline
                            points={WAVE_POINTS}
                            fill="none"
                            stroke="url(#guest-wave)"
                            strokeWidth="0.8"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <button
                        type="button"
                        aria-label="Play"
                        className="absolute left-[48.9%] top-[85.5%] flex aspect-square w-[13.3%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a8fd6] text-white transition-transform hover:scale-105"
                    >
                        <svg viewBox="0 0 24 24" className="ml-[8%] h-[42%] w-[42%]" fill="currentColor">
                            <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
} 