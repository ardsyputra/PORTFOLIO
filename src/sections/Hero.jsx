import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 70, damping: 18 });
  const smoothY = useSpring(cursorY, { stiffness: 70, damping: 18 });
  const dotX = useSpring(cursorX, { stiffness: 130, damping: 12 });
  const dotY = useSpring(cursorY, { stiffness: 130, damping: 12 });
  const [burstKey, setBurstKey] = useState(0);

  function handlePointerMove(event) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    cursorX.set(event.clientX - rect.left - rect.width / 2);
    cursorY.set(event.clientY - rect.top - rect.height / 2);
  }

  function triggerBurst() {
    if (!reduceMotion) setBurstKey((value) => value + 1);
  }

  return (
    <section
      id="home"
      onPointerMove={handlePointerMove}
      className="hero-paper relative min-h-screen overflow-hidden bg-[#F2EFE6] pt-24 text-[#171717]"
    >
      <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "radial-gradient(#4D6591 1px, transparent 1px)", backgroundSize: "12px 12px" }} />

      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="pointer-events-none absolute left-[calc(50%-110px)] top-[calc(50%-110px)] z-[1] hidden h-[220px] w-[220px] rounded-full bg-[#2451A6]/10 blur-2xl lg:block"
      />
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none absolute left-[calc(50%-9px)] top-[calc(50%-9px)] z-30 hidden h-[18px] w-[18px] rounded-full border-2 border-[#2451A6] lg:block"
      />

      <motion.div className="absolute -right-24 top-28 h-80 w-80 rounded-full bg-[#2451A6]/10 blur-3xl" animate={reduceMotion ? undefined : { scale: [1, 1.16, 1], x: [0, -18, 0] }} transition={{ duration: 6, repeat: Infinity }} />

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { x: [-30, 30, -30], rotate: [-18, 18, -18] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[-90px] top-[38%] z-[2] h-[180px] w-[180px] rounded-full border-[2px] border-[#F97316]/55"
      >
        <span className="absolute right-2 top-2 h-3 w-3 rounded-full bg-[#F97316]" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, -16, 0], rotate: [12, -8, 12] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[7%] top-[36%] z-[2] hidden h-16 w-16 rounded-full border border-[#2451A6]/30 md:block"
      >
        <span className="absolute bottom-[-5px] left-[-5px] h-3 w-3 rounded-full bg-[#2451A6]" />
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1500px] -translate-y-8 flex-col justify-center px-5 pb-24 md:-translate-y-16 md:px-10 lg:-translate-y-20 lg:px-16">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-3 flex items-center justify-between border-b border-[#171717]/20 pb-4 text-xs font-black uppercase tracking-[0.16em] md:text-sm">
          <div className="flex flex-col gap-1">
            <span>Ardiansyah Putra</span>
            <span className="text-[9px] tracking-[0.14em] text-[#171717]/55 md:text-[10px]">
              Fullstack Web Developer · UI UX Designer
            </span>
          </div>
          <div className="flex items-center gap-3 md:gap-5">
            <span>2026</span>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-5 right-5 top-[calc(5rem+34px)] h-[3px] origin-left overflow-hidden bg-[#2451A6]/20 md:left-10 md:right-10 lg:left-16 lg:right-16"
        >
          {!reduceMotion && (
            <span className="hero-divider-flow absolute inset-y-[-1px] w-[36%] bg-[#F97316]" />
          )}
        </motion.div>

        <motion.div
          drag={!reduceMotion}
          dragConstraints={{ left: -60, right: 60, top: -30, bottom: 30 }}
          dragElastic={0.18}
          animate={reduceMotion ? undefined : { rotate: [-6, 4, -6], y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[4%] top-[21%] z-20 hidden cursor-grab items-center gap-2 rounded-full border-2 border-[#171717] bg-[#F97316] px-4 py-3 text-xs font-black uppercase text-white shadow-[5px_5px_0_#171717] active:cursor-grabbing md:flex"
        >
          <Sparkles size={16} />
          Drag me
        </motion.div>

        <motion.h1
          onClick={triggerBurst}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
          className="portfolio-word group relative z-10 mt-5 select-none text-center font-black uppercase leading-[0.69] md:mt-8"
          style={{ fontSize: "clamp(8rem, 16vw, 16rem)" }}
          aria-label="Portfolio"
        >
          {["PORT", "FOLIO"].map((word, wordIndex) => (
            <span key={word} className="block h-[0.76em] overflow-hidden">
              {word.split("").map((letter, index) => (
                <motion.span
                  key={`${word}-${letter}-${index}`}
                  initial={reduceMotion ? false : { y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.12 + (wordIndex * 4 + index) * 0.055,
                    duration: 0.72,
                    ease: "easeInOut",
                  }}
                  whileHover={reduceMotion ? undefined : { color: "#F97316" }}
                  whileTap={reduceMotion ? undefined : { color: "#F97316" }}
                  className="inline-block px-[0.012em] text-[#2451A6]"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <AnimatePresence mode="popLayout">
          <motion.div key={burstKey} className="pointer-events-none absolute inset-0 z-40">
            {burstKey > 0 && Array.from({ length: 12 }).map((_, index) => {
              const angle = (index / 12) * Math.PI * 2;
              return (
                <motion.span
                  key={index}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{ x: Math.cos(angle) * (180 + (index % 3) * 35), y: Math.sin(angle) * (120 + (index % 2) * 30), opacity: 0, scale: 1 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className="absolute left-1/2 top-1/2 grid h-7 w-7 place-items-center rounded-full bg-[#2451A6] text-xs text-white"
                >
                  {index % 3 === 0 ? "✦" : index % 3 === 1 ? "+" : "•"}
                </motion.span>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <motion.a
          href="#about"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.55 }}
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#2451A6]/70 md:bottom-12"
          aria-label="Scroll down to about section"
        >
          <span>Scroll down</span>
          <span className="relative h-8 w-5 rounded-full border border-[#2451A6]/55">
            <motion.span
              animate={reduceMotion ? undefined : { y: [0, 13, 0], opacity: [1, 0.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#F97316]"
            />
          </span>
        </motion.a>
      </div>

      <motion.div
        aria-hidden="true"
        className="hero-marquee pointer-events-none absolute bottom-[112px] left-0 right-0 z-[3] hidden overflow-hidden whitespace-nowrap text-[11px] font-black uppercase tracking-[0.38em] text-[#2451A6]/35 md:block"
      >
        <span className="hero-marquee-track inline-flex min-w-max">
          <span className="pr-16">UI/UX Designer · IT Support · Fullstack Web Developer · Portfolio ·</span>
          <span className="pr-16" aria-hidden="true">UI/UX Designer · IT Support · Fullstack Web Developer · Portfolio ·</span>
          <span className="pr-16" aria-hidden="true">UI/UX Designer · IT Support · Fullstack Web Developer · Portfolio ·</span>
          <span className="pr-16" aria-hidden="true">UI/UX Designer · IT Support · Fullstack Web Developer · Portfolio ·</span>
        </span>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-[86px] left-5 right-5 z-[5] h-[2px] origin-center bg-[#2451A6]/35 md:left-10 md:right-10 lg:left-16 lg:right-16"
      >
        <motion.span
          animate={reduceMotion ? undefined : { scaleX: [0.12, 0.72, 0.12], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-[-3px] h-2 w-[18%] origin-left bg-[#F97316]"
        />
      </motion.div>

      <div className="hero-torn absolute bottom-0 left-0 right-0 z-[6] h-24 bg-[#2451A6]" />
      <div className="absolute bottom-[18px] left-1/2 z-[7] -translate-x-1/2 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.32em] text-white/75 md:text-xs">
        Fullstack Web Developer · IT Support · UI/UX Designer
      </div>
    </section>
  );
}
