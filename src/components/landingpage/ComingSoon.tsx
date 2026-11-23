import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";

type Props = {
    date?: string;
    time?: string;
    host?: string;
    guest?: string;
};

export default function ComingSoon({
    date = "25 November",
    time = "1pm TO 3pm",
    host = "Jhon Smith",
    guest = "Ane Rodnik",
}: Props) {
    const { ref, inView } = useInView<HTMLDivElement>(0.25);

    const DELAYS: Record<number, string> = {
        0: "[animation-delay:0ms]",
        150: "[animation-delay:150ms]",
        300: "[animation-delay:300ms]",
        400: "[animation-delay:400ms]",
        500: "[animation-delay:500ms]",
        600: "[animation-delay:600ms]",
    };
    const reveal = (delay: number) =>
        inView ? `animate-fade-up ${DELAYS[delay]}` : "opacity-0";

    return (
        <section id="upcoming-podcast" className={`py-16 lg:py-24 ${PAGE_GUTTER}`}>
            <div
                ref={ref}
                className="@container relative flex flex-col items-center overflow-hidden rounded-[20px] bg-brand-olive px-6 pt-10 text-white md:block md:aspect-[909/397] md:p-0"
            >
                <p
                    className={`font-capetown text-[34px] leading-none md:absolute md:left-1/2 md:top-[6%] md:-translate-x-1/2 md:text-[3.6cqw] ${reveal(0)}`}
                >
                    Coming Soon
                </p>

                <div
                    className={`relative mt-4 flex w-full max-w-[420px] items-center justify-center bg-[url('/images/Heading-bg-strap.png')] bg-[length:100%_100%] bg-center bg-no-repeat py-4 md:absolute md:left-1/2 md:top-[17%] md:mt-0 md:h-[11.5cqw] md:w-[46cqw] md:max-w-none md:-translate-x-1/2 md:py-0 ${reveal(150)}`}
                >
                    <h2 className="-skew-x-12 font-heading text-[64px] uppercase leading-none tracking-[0.03em] text-brand-olive md:text-[9.5cqw]">
                        Podcast
                    </h2>
                </div>

                <div className="mt-8 flex w-full justify-center gap-6 md:contents">
                    <div
                        className={`md:absolute md:left-[21%] md:top-[50%] ${reveal(300)}`}
                    >
                        <p className="font-body text-lg font-light italic md:text-[2cqw]">Date</p>
                        <p className="mt-1 rounded-lg bg-brand-brown px-3 py-1 font-body text-lg md:mt-[0.6cqw] md:rounded-[0.9cqw] md:px-[0.8cqw] md:py-[0.35cqw] md:text-[2.3cqw]">
                            {date}
                        </p>
                    </div>
                    <div
                        className={`md:absolute md:left-[64%] md:top-[50%] ${reveal(400)}`}
                    >
                        <p className="font-body text-lg font-light italic md:text-[2cqw]">Time</p>
                        <p className="mt-1 rounded-lg bg-brand-brown px-3 py-1 font-body text-lg md:mt-[0.6cqw] md:rounded-[0.9cqw] md:px-[0.8cqw] md:py-[0.35cqw] md:text-[2.3cqw]">
                            {time}
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex w-full justify-between px-2 md:contents">
                    <div
                        className={`text-center md:absolute md:left-[12.5%] md:top-[74%] md:-translate-x-1/2 ${reveal(500)}`}
                    >
                        <p className="font-capetown text-xl leading-none md:text-[2.1cqw]">Hosted By</p>
                        <p className="mt-1 whitespace-nowrap font-heading text-2xl uppercase tracking-[0.03em] md:mt-[0.4cqw] md:text-[2.6cqw]">
                            {host}
                        </p>
                    </div>
                    <div
                        className={`text-center md:absolute md:left-[88%] md:top-[74%] md:-translate-x-1/2 ${reveal(600)}`}
                    >
                        <p className="font-capetown text-xl leading-none md:text-[2.1cqw]">Guest Star</p>
                        <p className="mt-1 whitespace-nowrap font-heading text-2xl uppercase tracking-[0.03em] md:mt-[0.4cqw] md:text-[2.6cqw]">
                            {guest}
                        </p>
                    </div>
                </div>

                <img
                    src="/images/Comingsoon-Banner-mic.png"
                    alt="Studio microphone"
                    className={`relative z-10 mt-6 h-64 w-auto object-contain md:absolute md:bottom-0 md:left-[51%] md:mt-0 md:h-[60%] md:-translate-x-1/2 ${inView ? "animate-fade-up [animation-delay:250ms]" : "opacity-0"
                        }`}
                />
            </div>
        </section>
    );
}