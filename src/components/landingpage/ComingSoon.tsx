import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";
import FlipCard from "./FlipCard";
import { useEffect, useState } from "react";


const COUNTDOWN_UNITS = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hrs" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

function useCountdown(start: string, end: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const startMs = new Date(start).getTime();
  const endMs = new Date(end).getTime();
  const pad = (n: number) => String(n).padStart(2, "0");

  if (now >= endMs) return { status: "ended" as const, days: "00", hours: "00", minutes: "00", seconds: "00" };
  if (now >= startMs) return { status: "live" as const, days: "00", hours: "00", minutes: "00", seconds: "00" };

  const total = Math.floor((startMs - now) / 1000);
  return {
    status: "upcoming" as const,
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
  };
}

type Props = {
  start?: string;
  end?: string;
  host?: string;
  guest?: string;
  background?: string;
};

const BG_OPACITY = 0.8;

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const toClock = (d: Date) => {
  const h = d.getHours() % 12 || 12;
  return { hour: String(h).padStart(2, "0"), period: d.getHours() < 12 ? "AM" : "PM" };
};

export default function ComingSoon({
  start = "2026-11-25T13:00",
  end = "2026-11-25T15:00",
  host = "Jhon Smith",
  guest = "Ane Rodnik",
  background = "/images/ComingSoon-BG.png",
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  const startDate = new Date(start);
  const day = String(startDate.getDate()).padStart(2, "0");
  const month = MONTHS[startDate.getMonth()];
  const from = toClock(startDate);
  const endDate = new Date(end);
  const to = toClock(endDate);
  const fromMin = String(startDate.getMinutes()).padStart(2, "0");
  const toMin = String(endDate.getMinutes()).padStart(2, "0");
  const countdown = useCountdown(start, end);

  const v = (real: string, placeholder = "--") => (inView ? real : placeholder);

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

  const CARD = "text-[22px] leading-[1.9] md:text-[2.3cqw]";
  const LABEL =
    "font-body text-sm font-medium uppercase tracking-[0.3em] text-white/80 md:text-[1.1cqw]";

  return (
    <section id="upcoming-podcast" className={`py-16 lg:py-24 ${PAGE_GUTTER}`}>
      <div
        ref={ref}
        className="@container relative isolate flex flex-col items-center overflow-hidden rounded-[20px] bg-brand-dark px-6 pt-10 text-white md:block md:aspect-[909/397] md:p-0"
      >
        <img
          src={background}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ opacity: BG_OPACITY }}
        />

        <p
          className={`pl-[0.4em] font-body text-base font-medium uppercase leading-none tracking-[0.4em] md:absolute md:left-1/2 md:top-[7%] md:-translate-x-1/2 md:whitespace-nowrap md:text-[2.1cqw] ${reveal(0)}`}
        >
          Coming Soon
        </p>

        <div
          className={`relative mt-4 flex w-full max-w-[340px] items-center justify-center bg-[url('/images/Heading-bg-strap.png')] bg-[length:100%_100%] bg-center bg-no-repeat py-4 md:absolute md:left-1/2 md:top-[16%] md:mt-0 md:h-[9cqw] md:w-[36cqw] md:max-w-none md:-translate-x-1/2 md:py-0 ${reveal(150)}`}
        >
          <h2 className="font-heading text-[clamp(36px,12vw,52px)] uppercase leading-none tracking-[0.03em] text-brand-brown md:text-[7.3cqw]">
            Podcast
          </h2>
        </div>

        <div className="mt-8 flex w-full flex-wrap justify-center gap-x-10 gap-y-6 md:contents">
          <div className={`text-center md:absolute md:left-[6%] md:top-[45%] md:text-left ${reveal(300)}`}>
            <p className={LABEL}>Date</p>
            <div className="mt-2 flex items-center justify-center gap-1.5 md:mt-[0.6cqw] md:justify-start md:gap-[0.5cqw]">
              <FlipCard value={v(day)} delay={300} className={CARD} />
              <FlipCard value={v(month, "---")} delay={450} className={CARD} />
            </div>
            <p className="mt-2 font-body text-sm font-medium tracking-wider text-white/80 md:mt-[0.7cqw] md:text-[1.2cqw]">
              {from.hour}:{fromMin} {from.period} – {to.hour}:{toMin} {to.period}
            </p>
          </div>

          <div className={`text-center md:absolute md:right-[6%] md:top-[45%] md:text-right ${reveal(400)}`}>
            <p className={LABEL}>{countdown.status === "live" ? "Live Now" : countdown.status === "ended" ? "Episode Ended" : "Starts In"}</p>

            {countdown.status === "upcoming" ? (
              <div className="mt-2 flex items-start justify-center gap-1.5 md:mt-[0.6cqw] md:justify-end md:gap-[0.5cqw]">
                {COUNTDOWN_UNITS.map((u, i) => (
                  <div key={u.key} className="flex items-start gap-1.5 md:gap-[0.5cqw]">
                    {i > 0 && (
                      <span className={`${CARD} font-body font-bold text-white/60`}>:</span>
                    )}
                    <div className="flex flex-col items-center">
                      <FlipCard value={v(countdown[u.key])} delay={500 + i * 120} className={CARD} />
                      <span className="mt-1 font-body text-[9px] font-medium uppercase tracking-[0.2em] text-white/60 md:mt-[0.4cqw] md:text-[0.8cqw]">
                        {u.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-brown px-4 py-1.5 font-body text-sm font-semibold uppercase tracking-widest md:mt-[0.6cqw] md:px-[1.2cqw] md:py-[0.5cqw] md:text-[1.3cqw]">
                {countdown.status === "live" && (
                  <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                )}
                {countdown.status === "live" ? "On Air" : "Stay tuned for the next one"}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-4 px-2 md:contents">
          <div
            className={`text-center md:absolute md:left-[12.5%] md:top-[76%] md:-translate-x-1/2 ${reveal(500)}`}
          >
            <p className="font-capetown text-xl leading-none md:text-[2.1cqw]">Hosted By</p>
            <p className="mt-1 font-heading text-xl uppercase tracking-[0.03em] sm:text-2xl md:mt-[0.4cqw] md:whitespace-nowrap md:text-[2.6cqw]">
              {host}
            </p>
          </div>
          <div
            className={`text-center md:absolute md:left-[88%] md:top-[76%] md:-translate-x-1/2 ${reveal(600)}`}
          >
            <p className="font-capetown text-xl leading-none md:text-[2.1cqw]">Guest Star</p>
            <p className="mt-1 font-heading text-xl uppercase tracking-[0.03em] sm:text-2xl md:mt-[0.4cqw] md:whitespace-nowrap md:text-[2.6cqw]">
              {guest}
            </p>
          </div>
        </div>

        <img
          src="/images/Comingsoon-Banner-mic.png"
          alt="Studio microphone"
          className={`relative z-10 mt-6 h-64 w-auto object-contain md:absolute md:bottom-0 md:left-[51%] md:mt-0 md:h-[60%] md:-translate-x-1/2 ${
            inView ? "animate-fade-up [animation-delay:250ms]" : "opacity-0"
          }`}
        />
      </div>
    </section>
  );
}