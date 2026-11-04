import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, GitBranch, Globe2, Lightbulb, Monitor, MonitorPlay, Smartphone, Workflow } from "lucide-react";
import texture from "../assets/images/texture.avif";

export default function ProjectStory({ number, name, category, description, screenshot, screenshots, previewGroups, liveUrl, repositoryUrl, learnings, process }) {
  const [previewMode, setPreviewMode] = useState(previewGroups ? "desktop" : "default");
  const previewImages = screenshots?.length ? screenshots : screenshot ? [screenshot] : [];
  const activeGroup = previewGroups?.[previewMode] ?? previewImages;
  const previewItems = activeGroup.map((item) => typeof item === "string" ? { src: item, label: "" } : item);
  const [activePreview, setActivePreview] = useState(0);
  const reduceMotion = useReducedMotion();
  const showPrevious = () => setActivePreview((current) => (current - 1 + previewItems.length) % previewItems.length);
  const showNext = () => setActivePreview((current) => (current + 1) % previewItems.length);
  const changePreviewMode = (mode) => {
    setPreviewMode(mode);
    setActivePreview(0);
  };

  return (
    <section id={`project-${number}`} className="relative overflow-hidden bg-[#F2EFE6] py-24 text-[#171717] scroll-mt-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-[#2451A6]/20" />
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#2451A6]/55">{number} / Project Story</p>
            <h2 className="mt-3 text-4xl font-black text-[#2451A6] md:text-6xl">{name}</h2>
          </div>
          <span className="w-fit rounded-full border border-[#2451A6]/15 bg-white px-5 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#2451A6]">
            {category}
          </span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, x: -50 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[32px] border border-[#2451A6]/10 bg-white p-5 shadow-[0_24px_70px_rgba(36,81,166,.10)] md:p-7"
          >
            <div className="flex items-center gap-3 text-[#F97316]">
              <MonitorPlay size={22} />
              <p className="text-xs font-black uppercase tracking-[0.24em]">Tentang Project</p>
            </div>
            <h3 className="mt-5 text-3xl font-black text-[#2451A6] md:text-4xl">Pengenalan</h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#171717]/65 md:text-lg">{description}</p>

            {previewGroups && (
              <div className="mt-6 flex w-fit rounded-full border border-[#2451A6]/10 bg-white p-1.5 shadow-sm" aria-label="Mode tampilan dokumentasi">
                <button
                  type="button"
                  onClick={() => changePreviewMode("desktop")}
                  aria-pressed={previewMode === "desktop"}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition-all ${
                    previewMode === "desktop" ? "bg-[#2451A6] text-white shadow-md" : "text-[#2451A6]/55 hover:text-[#2451A6]"
                  }`}
                >
                  <Monitor size={16} /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => changePreviewMode("mobile")}
                  aria-pressed={previewMode === "mobile"}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-black transition-all ${
                    previewMode === "mobile" ? "bg-[#F97316] text-white shadow-md" : "text-[#2451A6]/55 hover:text-[#2451A6]"
                  }`}
                >
                  <Smartphone size={16} /> Mobile
                </button>
              </div>
            )}

            <div className="mt-8 overflow-hidden rounded-[24px] border border-[#2451A6]/10 bg-[#2451A6]/5 p-2 md:p-3">
              {previewItems.length ? (
                <>
                  <div className="relative overflow-hidden rounded-[18px] border border-[#2451A6]/10 bg-white shadow-lg">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={previewItems[activePreview].src}
                        src={previewItems[activePreview].src}
                        alt={`${name} documentation preview ${activePreview + 1}`}
                        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, x: 24 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02, x: -24 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`mx-auto bg-[#EEF2F8] object-contain ${
                          previewMode === "mobile"
                            ? "block h-auto max-h-[680px] w-auto max-w-full object-contain"
                            : "aspect-[16/10] w-full"
                        }`}
                      />
                    </AnimatePresence>

                    {previewItems.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={showPrevious}
                          aria-label="Preview sebelumnya"
                          className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#2451A6]/90 text-white shadow-xl backdrop-blur transition hover:-translate-x-1 hover:bg-[#2451A6]"
                        >
                          <ChevronLeft size={22} />
                        </button>
                        <button
                          type="button"
                          onClick={showNext}
                          aria-label="Preview berikutnya"
                          className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-[#2451A6]/90 text-white shadow-xl backdrop-blur transition hover:translate-x-1 hover:bg-[#2451A6]"
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}

                    <span className="absolute bottom-3 right-3 rounded-full bg-[#171717]/80 px-4 py-2 text-xs font-black text-white shadow-lg backdrop-blur">
                      {activePreview + 1} / {previewItems.length}
                    </span>
                    {previewItems[activePreview].label && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-[#2451A6] shadow-lg">
                        {previewItems[activePreview].label}
                      </span>
                    )}
                  </div>

                  {previewItems.length > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2" aria-label="Navigasi dokumentasi">
                      {previewItems.map((item, index) => (
                        <button
                          key={item.src}
                          type="button"
                          onClick={() => setActivePreview(index)}
                          aria-label={`Buka preview ${index + 1}`}
                          aria-current={activePreview === index ? "true" : undefined}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            activePreview === index ? "w-10 bg-[#F97316] shadow-[0_4px_12px_rgba(249,115,22,.35)]" : "w-2.5 bg-[#2451A6]/20 hover:bg-[#2451A6]/50"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="grid aspect-video place-items-center rounded-[18px] border border-dashed border-[#2451A6]/20 bg-white text-center text-sm font-bold text-[#2451A6]/45">
                  Website preview akan ditambahkan
                </div>
              )}
            </div>
          </motion.article>

          <div className="grid gap-6">
            <motion.article
              initial={reduceMotion ? false : { opacity: 0, x: 50 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[32px] bg-[#2451A6] p-7 text-white md:p-9"
            >
              <div className="flex items-center gap-3 text-[#F97316]">
                <Lightbulb size={22} />
                <p className="text-xs font-black uppercase tracking-[0.24em]">Refleksi</p>
              </div>
              <h3 className="mt-5 text-2xl font-black md:text-3xl">Apa yang dipelajari</h3>
              <ul className="mt-6 space-y-4">
                {learnings.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-white/75 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F97316]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>

            <article className="rounded-[32px] border border-[#2451A6]/10 bg-white p-7 md:p-9">
              <div className="flex items-center gap-3 text-[#2451A6]">
                <Workflow size={22} />
                <p className="text-xs font-black uppercase tracking-[0.24em]">Development</p>
              </div>
              <h3 className="mt-5 text-2xl font-black text-[#2451A6] md:text-3xl">Proses Project</h3>
              <div className="mt-6 grid gap-3">
                {process.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-2xl bg-[#F2EFE6] px-4 py-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F97316] text-xs font-black text-white">0{index + 1}</span>
                    <span className="text-sm font-black text-[#2451A6] md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-[#F97316] px-7 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-1">
              Live Preview <Globe2 size={18} /><ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          )}
          <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full border border-[#2451A6]/20 bg-white px-7 py-4 text-sm font-black text-[#2451A6] shadow-sm transition hover:-translate-y-1 hover:border-[#2451A6]">
            <GitBranch size={18} /> Repository GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
