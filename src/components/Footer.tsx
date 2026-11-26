import { useState } from "react";
import { PAGE_GUTTER } from "./Navbar";
import { SocialIcon, type SocialLink } from "../components/SocialIcon";
import { scrollToSection } from "@/lib/smoothScroll";
import { useInView } from "@/lib/useView";

const ABOUT =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.";

const LINK_COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
    {
        title: "Company",
        links: [
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
            { label: "Lorem Ipsum", href: "#" },
        ],
    },
];

const SOCIALS: SocialLink[] = [
    { name: "twitter", url: "#" },
    { name: "facebook", url: "#" },
    { name: "instagram", url: "#" },
    { name: "github", url: "#" },
];

const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        scrollToSection(href);
    }
};

type MicBounds = { top: number; bottom: number; right: number };

const NO_PADDING: MicBounds = { top: 0, bottom: 0, right: 0 };

function transparentPadding(img: HTMLImageElement): MicBounds {
    try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return NO_PADDING;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, w, h).data;
        let minY = h;
        let maxY = -1;
        let maxX = -1;
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                if (data[(y * w + x) * 4 + 3] > 10) {
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                    if (x > maxX) maxX = x;
                }
            }
        }
        if (maxY < 0) return NO_PADDING;
        return {
            top: minY / h,
            bottom: (h - 1 - maxY) / h,
            right: (w - 1 - maxX) / w,
        };
    } catch {
        return NO_PADDING;
    }
}

export default function Footer() {
    const [mic, setMic] = useState<MicBounds>(NO_PADDING);
    const micContent = Math.max(0.2, 1 - mic.top - mic.bottom);
    const { ref, inView } = useInView<HTMLDivElement>(0.15);
    const show = inView ? "animate-fade-up" : "opacity-0";

    return (
        <footer id="contact" className="relative overflow-hidden bg-brand-dark">
            <div ref={ref} className={`relative ${PAGE_GUTTER}`}>
                <div className="grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,32%)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,24%)] lg:gap-8 lg:py-12">
                    <div className={`sm:col-span-2 md:col-span-1 ${show}`}>
                        <img
                            src="/images/logo.png"
                            alt="True Words Media"
                            className="h-14 w-auto object-contain sm:h-16 xl:h-[72px]"
                        />
                        <p className="mt-6 max-w-sm font-body text-[12px] leading-relaxed text-white/80 xl:text-[13px]">
                            {ABOUT}
                        </p>
                        <div className="mt-8 flex items-center gap-6">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.name}
                                    className="text-white transition-colors hover:text-brand-gold"
                                >
                                    <SocialIcon name={s.name} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {LINK_COLUMNS.map((col, i) => (
                        <div
                            key={col.title}
                            className={`md:pt-6 lg:pl-[25%] ${i === 0 ? "[animation-delay:150ms]" : "[animation-delay:250ms]"} ${show}`}
                        >
                            <h4 className="font-body text-[12px] font-bold text-white xl:text-[14px]">
                                {col.title}
                            </h4>
                            <ul className="mt-6 space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLink(e, link.href)}
                                            className="font-body text-[11px] text-white transition-colors hover:text-brand-gold xl:text-[13px]"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-white/30" />

                <p className="py-5 text-center font-body text-[11px] text-white xl:text-[13px]">
                    © Copyright {new Date().getFullYear()}, All Rights Reserved
                </p>
            </div>

            <img
                src="/images/FooterMic.png"
                alt=""
                aria-hidden="true"
                onLoad={(e) => setMic(transparentPadding(e.currentTarget))}
                style={{
                    height: `calc(100% / ${micContent})`,
                    translate: `${mic.right * 100}% ${mic.bottom * 100}%`,
                }}
                className={`pointer-events-none absolute bottom-0 right-0 hidden w-auto max-w-none lg:block ${inView ? "animate-slide-from-right [animation-delay:300ms]" : "opacity-0"}`}
            />
        </footer>
    );
}