import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * LenisSmoothScroll
 * - Aktifkan smooth scroll halus di seluruh halaman (Lenis pada window).
 * - Sinkronkan scroll progress indicator (bar di ujung atas halaman).
 * - Nonaktifkan sendiri pada layar sentuh agar scroll native tetap nyaman.
 * - Hancurkan instance Lenis saat unmount (aman di React StrictMode).
 */
export default function LenisSmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const progressRef = useRef(null);

  function raf(time) {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !isTouch && !prefersReducedMotion,
      smoothTouch: false,
      touchMultiplier: 2,
      lerp: 0.085,
      infinite: false,
    });

    lenisRef.current = lenis;

    const onScroll = ({ scroll, limit }) => {
      if (!progressRef.current) return;
      const progress = limit > 0 ? Math.min(Math.max(scroll / limit, 0), 1) : 0;
      progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const onNavigate = (event) => {
      const target = event.detail?.target;
      if (!target) return;
      lenis.scrollTo(target, {
        offset: 0,
        duration: prefersReducedMotion ? 0 : 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };

    lenis.on("scroll", onScroll);
    window.addEventListener("portfolio:navigate", onNavigate);
    onScroll({ scroll: lenis.scroll, limit: lenis.limit });

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("portfolio:navigate", onNavigate);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 -z-10" />
      <div
        ref={progressRef}
        className="scroll-progress fixed top-0 left-0 z-[10000] h-[3px] w-full bg-[#1E3A8A]"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#38BDF8] opacity-60 blur-[6px]" />
      </div>
      <div className="min-h-[100dvh] relative" data-lenis style={{ overscrollBehavior: "contain" }}>
        {children}
      </div>
    </>
  );
}
