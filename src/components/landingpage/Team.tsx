import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";
import { SocialIcon, type SocialLink } from "../SocialIcon";


export type TeamMember = {
    name: string;
    image: string;
    socials: SocialLink[];
};

const DEFAULT_SOCIALS: SocialLink[] = [
    { name: "twitter", url: "#" },
    { name: "pinterest", url: "#" },
    { name: "instagram", url: "#" },
    { name: "youtube", url: "#" },
];

export const TEAM: TeamMember[] = [
    { name: "Member 1", image: "", socials: DEFAULT_SOCIALS },
    { name: "Member 2", image: "", socials: DEFAULT_SOCIALS },
    { name: "Member 3", image: "", socials: DEFAULT_SOCIALS },
    { name: "Member 4", image: "", socials: DEFAULT_SOCIALS },
];

const DELAYS = [
    "[animation-delay:100ms]",
    "[animation-delay:250ms]",
    "[animation-delay:400ms]",
    "[animation-delay:550ms]",
];

export default function Team({ members = TEAM }: { members?: TeamMember[] }) {
    const head = useInView<HTMLDivElement>(0.3);
    const grid = useInView<HTMLDivElement>(0.2);

    return (
        <section id="team" className={`py-16 lg:py-24 ${PAGE_GUTTER}`}>
            <div
                ref={head.ref}
                className={`mx-auto max-w-3xl text-center ${head.inView ? "animate-fade-up" : "opacity-0"}`}
            >
                <h2 className="font-heading text-[40px] uppercase leading-none tracking-[0.03em] text-brand-black sm:text-[52px] xl:text-[60px]">
                    The Voice Behind The Mic
                </h2>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-brand-black xl:text-[15px]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry&apos;s standard dummy text ever since 1966, when
                    designers at Letraset and James Mosley.
                </p>
            </div>

            <div
                ref={grid.ref}
                className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-[2%]"
            >
                {members.map((m, i) => (
                    <article
                        key={m.name + i}
                        className={`group relative aspect-[181/228] overflow-hidden rounded-[16px] bg-[#d9d9d9] ${grid.inView ? `animate-fade-up ${DELAYS[i % DELAYS.length]}` : "opacity-0"
                            }`}
                    >
                        {m.image && (
                            <img
                                src={m.image}
                                alt={m.name}
                                loading="lazy"
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        )}

                        <div className="absolute inset-x-0 bottom-[7%] flex justify-center gap-3">
                            {m.socials.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`${m.name} on ${s.name}`}
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-brown text-white transition-transform hover:-translate-y-1 xl:h-9 xl:w-9"
                                >
                                    <SocialIcon name={s.name} className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}