import { EPISODES, type Episode } from "@/data/episodes";
import { useInView } from "@/lib/useView";
import { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import { ArrowIcon, PAGE_GUTTER } from "../Navbar";

const PAGE_SIZE = 3;

function EpisodeCard({ ep }: { ep: Episode }) {
    const { ref, inView } = useInView<HTMLElement>(0.2);

    return (
        <article
            ref={ref}
            className={`grid items-center gap-6 md:grid-cols-[minmax(0,28%)_1fr] lg:grid-cols-[minmax(0,28%)_1fr_auto] lg:gap-10 ${inView ? "animate-fade-up" : "opacity-0"
                }`}
        >
            <div className="relative overflow-hidden rounded-[22px] md:h-full md:min-h-[200px] md:self-stretch">
                <img
                    src={ep.image}
                    alt={ep.title}
                    loading="lazy"
                    className="aspect-[265/200] w-full object-cover transition-transform duration-500 hover:scale-105 md:absolute md:inset-0 md:aspect-auto md:h-full"
                />
            </div>

            <div className="min-w-0">
                <h3 className="font-heading text-[30px] uppercase leading-none tracking-[0.03em] text-brand-black xl:text-[38px]">
                    {ep.title}
                </h3>
                <p className="mt-4 max-w-[34rem] font-body text-[13px] leading-relaxed text-brand-black xl:text-[15px]">
                    {ep.description}
                </p>
                <div className="mt-4 max-w-[34rem]">
                    <AudioPlayer
                        id={ep.id}
                        src={ep.audio}
                        downloadName={`episode-${ep.episode}-session-${ep.session}.mp3`}
                    />
                </div>
            </div>

            <ul className="space-y-4 border-brand-black/60 font-body text-[12px] font-semibold text-brand-black md:col-span-2 lg:col-span-1 lg:min-w-[230px] lg:self-stretch lg:border-l lg:py-6 lg:pl-6 xl:min-w-[280px] xl:text-[13px]">
                <li className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-brand-brown" />
                    {ep.show}
                </li>
                <li className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-brand-brown" />
                    Episode # {ep.episode}&nbsp;&nbsp;-&nbsp;&nbsp;Session # {ep.session}
                </li>
                <li className="flex items-center gap-3">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-brand-brown" />
                    Posted on {ep.postedOn}
                </li>
            </ul>
        </article>
    );
}

export default function LatestPodcast({ episodes = EPISODES }: { episodes?: Episode[] }) {
    const [visible, setVisible] = useState(PAGE_SIZE);
    const { ref, inView } = useInView<HTMLDivElement>(0.3);
    const hasMore = visible < episodes.length;

    return (
        <section id="latest-podcast" className={`py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className={`mx-auto max-w-3xl text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
            >
                <h2 className="font-heading text-[40px] uppercase leading-none tracking-[0.03em] text-brand-black sm:text-[52px] xl:text-[60px]">
                    Latest Podcast Episodes
                </h2>
                <p className="mt-4 font-body text-[13px] leading-relaxed text-brand-black xl:text-[15px]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry&apos;s Library in London is simply dummy text of the
                    printing and typesetting industry.
                </p>
            </div>

            <div className="mt-10 space-y-10 lg:mt-14 lg:space-y-8">
                {episodes.slice(0, visible).map((ep) => (
                    <EpisodeCard key={ep.id} ep={ep} />
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    disabled={!hasMore}
                    className="group flex items-center gap-4 rounded-full bg-brand-button py-2.5 pl-6 pr-2.5 font-body text-[13px] font-medium uppercase tracking-wide text-white transition-colors hover:bg-brand-brown disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {hasMore ? "Show More Episodes" : "No More Episodes"}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-brand-black transition-transform duration-300 group-hover:rotate-45">
                        <ArrowIcon className="h-3.5 w-3.5" />
                    </span>
                </button>
            </div>
        </section>
    );
}