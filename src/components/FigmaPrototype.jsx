import { ExternalLink, Play, Sparkles } from "lucide-react";
import { toast } from "sonner";
import texture from "../assets/images/texture.avif";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import TiltCard from "./TiltCard";

export default function FigmaPrototype({
  number,
  title,
  category,
  description,
  video,
  fallbackFrame,
  figmaUrl,
  role = "UI/UX Designer",
  tools = ["Figma", "Wireframe", "Prototype"],
  challenge,
  solution,
}) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <section
      id={`project-${number}`}
      className={`relative min-h-screen overflow-hidden py-28 scroll-mt-24 transition-colors duration-500 cyber-grid ${
        isDark ? "bg-[#090d16] text-[#f8fafc]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Left: Info & Context */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-5 py-2 text-xs font-black uppercase text-white shadow-md">
              <Sparkles size={14} />
              <span>FIGMA PROTOTYPE ✦ UI/UX</span>
            </div>

            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#2563eb]">
              {category}
            </p>

            <h2 className="font-clash font-black leading-[0.94] text-5xl sm:text-6xl md:text-7xl">
              {number}
              <span className="mx-3 text-[#f97316]">/</span>
              {title}
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {description}
            </p>

            {/* Quick Meta Grid */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              {[
                ["Role", role],
                ["Tools", tools.join(", ")],
                ["Discipline", category.split(" / ").pop()],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={`rounded-[22px] p-4 border backdrop-blur-md transition-all ${
                    isDark
                      ? "bg-slate-900/60 border-white/10"
                      : "bg-white/80 border-slate-200/90 shadow-sm"
                  }`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black text-[#2563eb]">{value}</p>
                </div>
              ))}
            </div>

            {/* Open Prototype CTA */}
            <motion.a
              href={figmaUrl}
              onClick={() => toast.success(`Membuka prototype Figma: ${title}`)}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="genz-btn mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_15px_30px_rgba(37,99,235,0.35)] cursor-interactive"
            >
              <span>Buka Interactive Prototype</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>

          {/* Right: 3D Video Showcase Container */}
          <TiltCard
            maxTilt={8}
            className={`overflow-hidden rounded-[36px] p-3 sm:p-4 border backdrop-blur-2xl transition-all shadow-2xl ${
              isDark
                ? "bg-slate-900/70 border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                : "bg-white/90 border-slate-200 shadow-xl"
            }`}
          >
            {/* Top Browser Bar */}
            <div className="mb-3 flex items-center justify-between px-3 py-1">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#f97316]" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className={`ml-2 text-[11px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Interactive Preview
                </span>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#f97316] uppercase tracking-wider">
                <Play size={10} className="fill-current" /> Live Reel
              </span>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[24px] bg-black">
              <video
                className="h-full w-full object-contain"
                controls
                autoPlay
                muted
                loop
                playsInline
                poster={fallbackFrame}
              >
                <source src={video} type="video/mp4" />
                Browser Anda belum mendukung pemutaran video prototype.
              </video>
            </div>
          </TiltCard>
        </div>

        {/* Challenge & Solution Bento Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <TiltCard
            maxTilt={6}
            className={`rounded-[28px] p-7 sm:p-8 border backdrop-blur-xl shadow-lg ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2 text-[#f97316]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
              <p className="text-xs font-black uppercase tracking-widest">01 / Challenge</p>
            </div>
            <h4 className="mt-2 text-xl font-black">Tantangan Desain</h4>
            <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {challenge}
            </p>
          </TiltCard>

          <TiltCard
            maxTilt={6}
            className={`rounded-[28px] p-7 sm:p-8 border backdrop-blur-xl shadow-lg ${
              isDark ? "bg-slate-900/50 border-white/10" : "bg-white/80 border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2 text-[#2563eb]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb]" />
              <p className="text-xs font-black uppercase tracking-widest">02 / Solution</p>
            </div>
            <h4 className="mt-2 text-xl font-black">Solusi UI/UX</h4>
            <p className={`mt-3 text-sm sm:text-base leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {solution}
            </p>
          </TiltCard>
        </div>

        {/* Methodologies Step Ribbon */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {["User Research & User Flow", "Wireframe & Design System", "Interactive Prototype Testing"].map(
            (step, index) => (
              <div
                key={step}
                className={`flex items-center gap-3.5 rounded-2xl p-4 border transition-colors ${
                  isDark
                    ? "bg-slate-900/40 border-white/10 text-slate-200"
                    : "bg-white border-slate-200 text-slate-800 shadow-sm"
                }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f97316] text-xs font-black text-white">
                  0{index + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold">{step}</span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
