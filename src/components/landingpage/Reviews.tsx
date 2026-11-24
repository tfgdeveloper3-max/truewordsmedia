import { useInView } from "@/lib/useView";
import { PAGE_GUTTER } from "../Navbar";
import { REVIEWS, type Review } from "@/data/reviews";

const Stars = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5 text-brand-star" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
            <svg
                key={i}
                viewBox="0 0 24 24"
                className={`h-3.5 w-3.5 ${i < rating ? "" : "opacity-25"}`}
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            </svg>
        ))}
    </div>
);

function ReviewCard({ review, index }: { review: Review; index: number }) {
    const { ref, inView } = useInView<HTMLElement>(0.3);
    const even = index % 2 === 1;

    const animation = inView
        ? even
            ? "animate-slide-from-left"
            : "animate-slide-from-right"
        : "opacity-0";

    return (
        <article
            ref={ref}
            className={`flex items-center gap-5 rounded-[16px] border border-brand-black/30 bg-brand-cream p-4 shadow-[0_2px_6px_rgba(28,23,13,0.08)] sm:gap-6 sm:px-5 ${even
                    ? "flex-row-reverse lg:ml-[16%] lg:w-[84%]"
                    : "lg:w-[100%]"
                } ${animation}`}
        >
            <img
                src={review.image}
                alt={review.name}
                loading="lazy"
                className={`shrink-0 rounded-full object-cover ${even ? "h-20 w-20 sm:h-[76px] sm:w-[76px]" : "h-20 w-20 sm:h-[92px] sm:w-[92px]"
                    }`}
            />

            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                    <h3
                        className={`font-heading uppercase leading-none tracking-[0.03em] text-brand-black ${even ? "text-[18px] xl:text-[22px]" : "text-[20px] xl:text-[24px]"
                            }`}
                    >
                        {review.name}
                    </h3>
                    <Stars rating={review.rating} />
                </div>
                <p
                    className={`mt-2 font-body leading-snug text-brand-black/60 ${even ? "text-[10px] xl:text-[12px]" : "text-[11px] xl:text-[13px]"
                        }`}
                >
                    {review.text}
                </p>
            </div>
        </article>
    );
}

export default function Reviews({ reviews = REVIEWS }: { reviews?: Review[] }) {
    const head = useInView<HTMLDivElement>(0.3);
    const mic = useInView<HTMLDivElement>(0.2);

    return (
        <section id="reviews" className={`overflow-x-clip py-7 lg:py-9 ${PAGE_GUTTER}`}>
            <div
                ref={head.ref}
                className={`mx-auto max-w-3xl text-center ${head.inView ? "animate-fade-up" : "opacity-0"}`}
            >
                <h2 className="font-heading text-[40px] uppercase leading-none tracking-[0.03em] text-brand-black sm:text-[52px] xl:text-[60px]">
                    What Listeners Are Saying
                </h2>
                <p className="mt-3 font-body text-[13px] leading-relaxed text-brand-black xl:text-[15px]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry&apos;s standard dummy text ever since 1966, when
                    designers at Letraset and James Mosley.
                </p>
            </div>

            <div className="mt-10 grid items-center gap-12 lg:mt-14 lg:grid-cols-[42%_1fr] lg:gap-[5%] lg:px-[2%]">
                <div
                    ref={mic.ref}
                    className={`relative mx-auto w-full max-w-[460px] lg:max-w-none ${mic.inView ? "animate-zoom-in" : "opacity-0"
                        }`}
                >
                    <div className="relative aspect-[372/397]">
                        <div className="absolute inset-x-0 bottom-0 h-[70%] rounded-t-full bg-brand-taupe" />
                        <img
                            src="/images/Mic-Listenersays.png"
                            alt="Studio microphone"
                            loading="lazy"
                            className="absolute bottom-0 left-[10%] h-full w-auto max-w-none object-contain"
                        />
                    </div>
                </div>

                <div className="space-y-5">
                    {reviews.map((r, i) => (
                        <ReviewCard key={r.id} review={r} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}