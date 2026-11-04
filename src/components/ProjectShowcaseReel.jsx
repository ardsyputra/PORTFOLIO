import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import overtime from "../assets/images/website.png";
import blockchain from "../assets/images/blockchain.png";
import expenseDashboard from "../assets/showcase/expense-dashboard.png";
import campus from "../assets/showcase/campus-01.png";
import food from "../assets/showcase/food-01.png";

const slides = [
  { number: "01", name: "Expense Tracker", type: "GitHub Web App", image: expenseDashboard, color: "#F97316" },
  { number: "02", name: "Campus Information", type: "Figma Prototype", image: campus, color: "#2563EB" },
  { number: "03", name: "Food Discovery", type: "Figma Prototype", image: food, color: "#F97316" },
  { number: "04", name: "Overtime System", type: "Laravel Web App", image: overtime, color: "#2563EB" },
  { number: "05", name: "Blockchain Security", type: "Research Prototype", image: blockchain, color: "#F97316" },
];

export default function ProjectShowcaseReel() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const slide = slides[active];

  return (
    <section className="relative min-h-[70vh] overflow-hidden bg-[#F7F4ED] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#1E3A8A]/50">Selected work</p>
            <h2 className="mt-3 text-5xl font-black text-[#1E3A8A] md:text-6xl">Project Reel</h2>
          </div>
          <span className="hidden rounded-full border border-[#1E3A8A]/15 px-5 py-3 text-xs font-bold text-[#1E3A8A] md:block">
            Auto showcase / 2026
          </span>
        </div>

        <div className="relative h-[520px] overflow-hidden rounded-[44px] bg-[#1E3A8A] shadow-[0_40px_100px_rgba(30,58,138,.25)] md:h-[620px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.number}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <img src={slide.image} alt={slide.name} className="absolute inset-0 h-full w-full object-cover opacity-55" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#101F52]/95 via-[#101F52]/55 to-transparent" />
            </motion.div>
          </AnimatePresence>

          <motion.div
            key={`copy-${slide.number}`}
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="absolute bottom-10 left-6 right-6 z-10 md:bottom-16 md:left-16 md:right-auto md:max-w-xl"
          >
            <span className="mb-5 inline-flex rounded-full px-5 py-2 text-sm font-black text-white" style={{ backgroundColor: slide.color }}>
              {slide.number} / {slide.type}
            </span>
            <h3 className="text-5xl font-black leading-[0.95] text-white md:text-7xl">{slide.name}</h3>
          </motion.div>

          <div className="absolute right-6 top-6 z-10 flex gap-2 md:right-10 md:top-10">
            {slides.map((item, index) => (
              <button
                key={item.number}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Tampilkan project ${item.number}`}
                className={`h-2 rounded-full transition-all ${index === active ? "w-9 bg-[#F97316]" : "w-2 bg-white/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
