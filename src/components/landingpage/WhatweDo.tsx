import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";

export type Service = { title: string; description: string };

export const SERVICES: Service[] = [
    {
        title: "Motion Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        title: "Interactive Design",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        title: "Creative Coding",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
        title: "Visual Storytelling",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
];

const DELAYS = [
    "[animation-delay:150ms]",
    "[animation-delay:300ms]",
    "[animation-delay:450ms]",
    "[animation-delay:600ms]",
];

export default function WhatWeDo({ services = SERVICES }: { services?: Service[] }) {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);
    const show = inView ? "animate-fade-up" : "opacity-0";

    return (
        <section id="visual-marketing" className={`py-12 lg:py-16 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className="rounded-[16px] bg-brand-dark px-6 py-10 text-white sm:px-10 lg:px-[4.5%] lg:py-12"
            >
                <div className={`flex items-center gap-5 sm:gap-4 ${show}`}>
                    <span className="h-px flex-1 bg-white/80" />
                    <h2 className="shrink-0 font-heading text-[40px] uppercase leading-none tracking-[0.03em] sm:text-[48px] xl:text-[56px]">
                        What We Do
                    </h2>
                    <span className="h-px flex-1 bg-white/80" />
                </div>

                <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-8">
                    {services.map((s, i) => (
                        <div key={s.title} className={`${show} ${DELAYS[i % DELAYS.length]}`}>
                            <span className="font-body text-[10px] font-medium xl:text-[12px]">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-2 font-heading text-[20px] uppercase leading-none tracking-[0.03em] xl:text-[26px]">
                                {s.title}
                            </h3>
                            <p className="mt-3 max-w-[16rem] font-body text-[12px] leading-relaxed text-white/85 xl:text-[14px]">
                                {s.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}