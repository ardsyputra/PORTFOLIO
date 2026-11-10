import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import ParticleOrb from "../components/ParticleOrb";

const title = "PORTFOLIO";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [showOpening, setShowOpening] = useState(() => !reduceMotion);

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timeout = window.setTimeout(() => setShowOpening(false), 1750);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <section id="home" className="hero-editorial relative min-h-screen overflow-hidden">
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <AnimatePresence>
        {showOpening && (
          <motion.div className="opening-intro" initial={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }} aria-label="Portfolio">
            <div className="opening-intro-meta"><span>ARDIANSYAH PUTRA</span><span>CREATIVE DEVELOPER <i>·</i> 2026</span></div>
            <h2 aria-label={title}>
              {Array.from(title).map((letter, index) => (
                <motion.span
                  className="opening-letter"
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  initial={{ y: "0.45em", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + index * 0.055, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                >{letter}</motion.span>
              ))}
            </h2>
            <div className="opening-intro-meta opening-intro-bottom"><span>SELECTED WORK &amp; EXPERIMENTS</span><span>01 — 05</span></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showOpening && (
          <motion.div className="hero-inner section-inner" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
            <div className="hero-topline">
              <span><i className="availability-dot" /> OPEN TO OPPORTUNITIES</span>
              <span>MEDAN, INDONESIA <b>·</b> 2026</span>
            </div>

            <div className="hero-portfolio-center">
              <motion.div className="hero-art" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                <ParticleOrb />
                <motion.h1
                  className="hero-portfolio-title"
                  initial={reduceMotion ? false : { opacity: 0, letterSpacing: ".12em" }}
                  animate={{ opacity: 1, letterSpacing: "-.015em" }}
                  transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >PORTFOLIO</motion.h1>
              </motion.div>
            </div>

            <div className="hero-footerline"><span>ARDIANSYAH PUTRA <b></b></span><a href="#about">SCROLL TO EXPLORE <ArrowDown size={13} /></a><span>01 / 05</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
