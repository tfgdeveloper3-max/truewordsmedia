import { PAGE_GUTTER } from "../Navbar";

export type Brand = {
    name: string;
    logo: string;
};

type Props = {
    brands?: Brand[];
    title?: string;
    duration?: number;
    direction?: "left" | "right";
};

const DEFAULT_BRANDS: Brand[] = [
    { name: "Amazon", logo: "/images/Amazon.png" },
    { name: "Google", logo: "/images/Google.png" },
    { name: "Netflix", logo: "/images/Netflix.png" },
    { name: "Spotify", logo: "/images/Spotify.png" },
    { name: "YouTube", logo: "/images/Youtube.png" },
    { name: "Zoom", logo: "/images/Zoom.png" },
];

export default function BrandMarquee({
    brands = DEFAULT_BRANDS,
    duration = 28,
    direction = "left",
}: Props) {
    const repeat = Math.max(1, Math.ceil(8 / Math.max(brands.length, 1)));
    const row = Array.from({ length: repeat }, () => brands).flat();

    return (
        <section
            id="brands"
            className={`relative pt-4 pb-4 sm:pt-6 sm:pb-4 lg:pt-6 lg:pb-4 ${PAGE_GUTTER}`}
        >
            <style>{`
                @keyframes brand-marquee {
                    from { transform: translate3d(0, 0, 0); }
                    to   { transform: translate3d(-50%, 0, 0); }
                }
                .brand-track {
                    animation: brand-marquee var(--brand-duration, 28s) linear infinite;
                    animation-direction: var(--brand-direction, normal);
                }
                .brand-marquee:hover .brand-track,
                .brand-marquee:focus-within .brand-track {
                    animation-play-state: paused;
                }
                @media (prefers-reduced-motion: reduce) {
                    .brand-track { animation: none !important; }
                }
            `}</style>

            <div className="mx-auto w-full max-w-[1240px] 2xl:max-w-[1320px]">
                <div className="mb-6 flex items-center gap-4 sm:mb-8">
                </div>

                <div
                    className="brand-marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] sm:[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
                    style={
                        {
                            "--brand-duration": `${duration}s`,
                            "--brand-direction": direction === "right" ? "reverse" : "normal",
                        } as React.CSSProperties
                    }
                >
                    <div className="brand-track flex w-max">
                        {[0, 1].map((copy) => (
                            <ul
                                key={copy}
                                aria-hidden={copy === 1}
                                className="flex shrink-0 items-center"
                            >
                                {row.map((b, i) => (
                                    <li
                                        key={`${copy}-${b.name}-${i}`}
                                        className="flex h-12 shrink-0 items-center px-6 sm:h-14 sm:px-9 lg:px-12 xl:px-14"
                                    >
                                        <img
                                            src={b.logo}
                                            alt={copy === 0 && i < brands.length ? b.name : ""}
                                            loading="lazy"
                                            draggable={false}
                                            className="h-6 w-auto max-w-[110px] select-none object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-7 sm:max-w-[130px] lg:h-8 lg:max-w-[150px]"
                                        />
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}