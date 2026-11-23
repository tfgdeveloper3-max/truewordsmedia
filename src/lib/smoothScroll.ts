import Lenis from "lenis";

let lenis: Lenis | null = null;
let rafId = 0;

export function initSmoothScroll() {
    if (lenis) return () => { };

    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
    });

    const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        lenis = null;
    };
}

export function scrollToSection(target: string | number, offset = -100) {
    if (lenis) {
        lenis.scrollTo(target, { offset });
        return;
    }
    if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
    } else {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    }
}