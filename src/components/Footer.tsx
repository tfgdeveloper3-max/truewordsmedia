import { useState } from "react";
import { PAGE_GUTTER } from "./Navbar";
import { SocialIcon, type SocialLink } from "../components/SocialIcon";
import { scrollToSection } from "@/lib/smoothScroll";
import { useInView } from "@/lib/useView";

const INTRO =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis. Netus sodales in volutpat ullamcorper amet adipiscing fermentum.";

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

function bottomPaddingRatio(img: HTMLImageElement): number {
    try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return 0;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, w, h).data;
        for (let y = h - 1; y >= 0; y--) {
            for (let x = 0; x < w; x++) {
                if (data[(y * w + x) * 4 + 3] > 10) return (h - 1 - y) / h;
            }
        }
    } catch {
       
    }
    return 0;
}

export default function Footer() {
    const [micOffset, setMicOffset] = useState(0);
    const { ref, inView } = useInView<HTMLDivElement>(0.15);
    const show = inView ? "animate-fade-up" : "opacity-0";

    return (
        <footer id="contact" className="relative overflow-hidden bg-brand-footer">
            <div ref={ref} className={`relative ${PAGE_GUTTER}`}>
                <div className={`flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between lg:py-12 ${show}`}>
                    <img
                        src="/images/Logo2.png"
                        alt="True Words Media"
                        className="h-24 w-24 rounded-full object-cover lg:h-28 lg:w-28"
                    />
                    <div className="max-w-md lg:mr-[5%] xl:max-w-lg">
                        <p className="font-body text-[12px] leading-relaxed text-brand-black/70 xl:text-[14px]">
                            {INTRO}
                        </p>
                        <a
                            href="#upcoming-podcast"
                            onClick={(e) => handleLink(e, "#upcoming-podcast")}
                            className="mt-5 inline-block rounded-full bg-brand-button px-8 py-3 font-body text-[12px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-brand-brown xl:text-[13px]"
                        >
                            Get Started
                        </a>
                    </div>
                </div>

                <hr className="border-brand-black/10" />

                <div className="grid gap-10 py-10 sm:grid-cols-2 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,32%)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,24%)] lg:gap-8 lg:py-12">
                    <div className={`[animation-delay:150ms] ${show}`}>
                        <h3 className="font-body text-[18px] font-medium text-brand-black xl:text-[22px]">
                            About True Words Media
                        </h3>
                        <p className="mt-4 font-body text-[12px] leading-relaxed text-brand-black/70 xl:text-[13px]">
                            {ABOUT}
                        </p>
                        <div className="mt-6 flex items-center gap-6">
                            {SOCIALS.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.name}
                                    className="text-brand-black transition-colors hover:text-brand-brown"
                                >
                                    <SocialIcon name={s.name} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {LINK_COLUMNS.map((col, i) => (
                        <div
                            key={col.title}
                            className={`lg:pl-[25%] ${i === 0 ? "[animation-delay:250ms]" : "[animation-delay:350ms]"} ${show}`}
                        >
                            <h4 className="font-body text-[12px] font-bold text-brand-black xl:text-[14px]">
                                {col.title}
                            </h4>
                            <ul className="mt-5 space-y-4">
                                {col.links.map((link, j) => (
                                    <li key={j}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => handleLink(e, link.href)}
                                            className="font-body text-[11px] text-brand-black transition-colors hover:text-brand-brown xl:text-[13px]"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-brand-black/10" />

                <p className="py-5 text-center font-body text-[11px] text-brand-black xl:text-[13px]">
                    © Copyright {new Date().getFullYear()}, All Rights Reserved
                </p>
            </div>

            <img
                src="/images/FooterMic.png"
                alt=""
                aria-hidden="true"
                onLoad={(e) => setMicOffset(bottomPaddingRatio(e.currentTarget))}
                style={{ translate: `0 ${micOffset * 100}%` }}
                className={`pointer-events-none absolute bottom-0 right-0 hidden h-[min(88%,38vw)] w-auto object-contain object-bottom lg:block ${inView ? "animate-slide-from-right [animation-delay:300ms]" : "opacity-0"
                    }`}
            />
        </footer>
    );
}