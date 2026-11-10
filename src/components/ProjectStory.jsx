import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Globe2,
  Lightbulb,
  Monitor,
  MonitorPlay,
  Smartphone,
  Workflow,
  Sparkles,
} from "lucide-react";
import texture from "../assets/images/texture.avif";
import { useTheme } from "../context/ThemeContext";
import TiltCard from "./TiltCard";

export default function ProjectStory({
  number,
  name,
  category,
  description,
  screenshot,
  screenshots,
  previewGroups,
  liveUrl,
  repositoryUrl,
  learnings = [],
  process = [],
}) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const previewImages = screenshots?.length ? screenshots : screenshot ? [screenshot] : [];
  const initialMode = previewGroups ? "desktop" : "default";
  const [previewMode, setPreviewMode] = useState(initialMode);
  const activeGroup = previewGroups ? previewGroups[previewMode] || [] : previewImages;
  const previewItems = activeGroup.map((item) =>
    typeof item === "string" ? { src: item, label: "" } : item
  );

  // Directional smooth slide state
  const [[page, direction], setPage] = useState([0, 0]);
  const activePreview =
    previewItems.length > 0
      ? ((page % previewItems.length) + previewItems.length) % previewItems.length
      : 0;

  const paginate = (newDirection) => {
    setPage(([curr]) => [curr + newDirection, newDirection]);
  };

  const goToIndex = (index) => {
    const dir = index > activePreview ? 1 : -1;
    setPage([index, dir]);
  };

  const changePreviewMode = (mode) => {
    setPreviewMode(mode);
    setPage([0, 0]);
  };

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 70 : dir < 0 ? -70 : 0,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 26 },
        opacity: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        filter: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 70 : dir > 0 ? -70 : 0,
      opacity: 0,
      scale: 0.96,
      filter: "blur(6px)",
      transition: {
        x: { type: "spring", stiffness: 300, damping: 26 },
        opacity: { duration: 0.28 },
        scale: { duration: 0.28 },
        filter: { duration: 0.28 },
      },
    }),
  };

  return (
    <section
      id={`project-${number}`}
      className={`relative overflow-hidden py-24 scroll-mt-24 transition-colors duration-500 cyber-grid ${
        isDark ? "bg-[#090d16] text-[#f8fafc]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />
      <div className={`absolute inset-x-0 top-0 h-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-3">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.32em] text-[#2563eb]"
            >
              <Sparkles size={14} className="text-[#f97316]" />
              <span>{number} / PROJECT DEEP DIVE</span>
            </motion.div>
            <motion.h2
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mt-1 text-4xl sm:text-6xl font-black font-clash tracking-tight"
            >
              {name}
            </motion.h2>
          </div>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`w-fit rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider border shadow-sm ${
              isDark
                ? "bg-slate-900 border-white/15 text-blue-400"
                : "bg-white border-slate-200 text-blue-700"
            }`}
          >
            {category}
          </motion.span>
        </motion.div>

        {/* Story Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.28fr_.72fr]">
          {/* Main Visual & Documentation Panel */}
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className={`rounded-[32px] border p-6 sm:p-8 backdrop-blur-xl transition-all shadow-xl ${
              isDark ? "bg-slate-900/60 border-white/10" : "bg-white/85 border-slate-200"
            }`}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[#f97316]">
                <MonitorPlay size={20} />
                <span className="text-xs font-black uppercase tracking-wider">Visual Gallery &amp; Flow</span>
              </div>

              {/* Desktop / Mobile Switcher Tabs */}
              {previewGroups && (
                <div
                  className={`flex rounded-full p-1 border transition-colors ${
                    isDark ? "bg-slate-950/80 border-white/10" : "bg-slate-100 border-slate-200"
                  }`}
                  aria-label="Mode tampilan dokumentasi"
                >
                  <button
                    type="button"
                    onClick={() => changePreviewMode("desktop")}
                    aria-pressed={previewMode === "desktop"}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
                      previewMode === "desktop"
                        ? "bg-[#2563eb] text-white shadow-md scale-105"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Monitor size={14} /> Desktop
                  </button>
                  <button
                    type="button"
                    onClick={() => changePreviewMode("mobile")}
                    aria-pressed={previewMode === "mobile"}
                    className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-300 ${
                      previewMode === "mobile"
                        ? "bg-[#f97316] text-white shadow-md scale-105"
                        : isDark
                        ? "text-slate-400 hover:text-white"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Smartphone size={14} /> Mobile
                  </button>
                </div>
              )}
            </div>

            <h3 className="mt-6 text-2xl sm:text-3xl font-black">
              Pengenalan &amp; Arsitektur
            </h3>
            <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {description}
            </p>

            {/* Gallery Viewport with Smooth Slide & Crossfade */}
            <div
              className={`mt-6 overflow-hidden rounded-[24px] border p-2 sm:p-3 transition-colors ${
                isDark ? "bg-slate-950/80 border-white/10" : "bg-slate-100/90 border-slate-200"
              }`}
            >
              {previewItems.length ? (
                <div className="relative flex min-h-[380px] sm:min-h-[460px] max-h-[580px] items-center justify-center overflow-hidden rounded-[18px] bg-black/10">
                  <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                      key={previewItems[activePreview]?.src}
                      custom={direction}
                      variants={reduceMotion ? undefined : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="w-full h-full flex items-center justify-center p-2"
                    >
                      <motion.div
                        initial={reduceMotion ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="image-reveal"
                      >
                        <img
                          src={previewItems[activePreview]?.src}
                          alt={`${name} preview ${activePreview + 1}`}
                          className="max-h-[520px] w-auto max-w-full object-contain rounded-lg shadow-lg"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Previous / Next buttons with Smooth Hover */}
                  {previewItems.length > 1 && (
                    <>
                      <motion.button
                        type="button"
                        onClick={() => paginate(-1)}
                        whileHover={{ scale: 1.12, x: -3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Preview sebelumnya"
                        className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white shadow-xl backdrop-blur-md hover:bg-black/85 transition-colors cursor-interactive z-10"
                      >
                        <ChevronLeft size={20} />
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => paginate(1)}
                        whileHover={{ scale: 1.12, x: 3 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Preview berikutnya"
                        className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white shadow-xl backdrop-blur-md hover:bg-black/85 transition-colors cursor-interactive z-10"
                      >
                        <ChevronRight size={20} />
                      </motion.button>
                    </>
                  )}

                  {/* Counter badge */}
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/75 px-3 py-1.5 text-xs font-black text-white backdrop-blur shadow-md z-10">
                    {activePreview + 1} / {previewItems.length}
                  </span>

                  {previewItems[activePreview]?.label && (
                    <motion.span
                      key={previewItems[activePreview].label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-3 left-3 rounded-full bg-blue-600/90 px-3.5 py-1.5 text-xs font-black text-white backdrop-blur shadow-md z-10"
                    >
                      {previewItems[activePreview].label}
                    </motion.span>
                  )}
                </div>
              ) : (
                <div className="grid aspect-video place-items-center rounded-[18px] text-xs font-bold text-slate-400">
                  Preview tangkapan layar akan segera hadir
                </div>
              )}

              {/* Indicator dots with smooth expansion */}
              {previewItems.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-1.5 pb-1">
                  {previewItems.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => goToIndex(index)}
                      aria-label={`Buka preview ${index + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activePreview === index
                          ? "w-8 bg-[#f97316] shadow-[0_0_12px_rgba(249,115,22,0.5)]"
                          : isDark
                          ? "w-2 bg-slate-700 hover:bg-slate-500"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.article>

          {/* Right: Learnings & Process Panels */}
          <div className="flex flex-col gap-6">
            {/* Learnings Card */}
            <TiltCard
              maxTilt={8}
              className={`rounded-[32px] p-7 sm:p-8 text-white shadow-xl ${
                isDark
                  ? "bg-gradient-to-br from-blue-900/80 to-indigo-950 border border-blue-500/30"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
              }`}
            >
              <div className="flex items-center gap-2 text-amber-300">
                <Lightbulb size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Key Learnings</span>
              </div>
              <h3 className="mt-3 text-2xl font-black">
                Apa yang dipelajari
              </h3>
              <ul className="mt-5 space-y-3.5">
                {learnings.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed text-blue-50">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#f97316]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </TiltCard>

            {/* Workflow Card */}
            <TiltCard
              maxTilt={8}
              className={`rounded-[32px] p-7 sm:p-8 border backdrop-blur-xl shadow-lg ${
                isDark ? "bg-slate-900/60 border-white/10" : "bg-white/85 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2 text-[#2563eb]">
                <Workflow size={20} />
                <span className="text-xs font-black uppercase tracking-widest">Execution Process</span>
              </div>
              <h3 className="mt-3 text-2xl font-black">
                Tahapan Pengembangan
              </h3>
              <div className="mt-5 flex flex-col gap-2.5">
                {process.map((step, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3.5 rounded-2xl px-4 py-3 border transition-colors ${
                      isDark
                        ? "bg-slate-950/60 border-white/5 text-slate-200"
                        : "bg-slate-50 border-slate-100 text-slate-800"
                    }`}
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#f97316] text-[11px] font-black text-white">
                      0{index + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold">{step}</span>
                  </div>
                ))}
              </div>
            </TiltCard>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="genz-btn inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_12px_24px_rgba(249,115,22,0.3)] cursor-interactive"
            >
              <Globe2 size={16} />
              <span>Buka Live Demo</span>
              <ArrowUpRight size={16} />
            </motion.a>
          )}

          {repositoryUrl && (
            <motion.a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-wider border transition-all cursor-interactive ${
                isDark
                  ? "bg-slate-900 border-white/15 text-slate-200 hover:bg-slate-800"
                  : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm"
              }`}
            >
              <GitBranch size={16} />
              <span>Lihat Source Code GitHub</span>
              <ArrowUpRight size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </section>
  );
}
