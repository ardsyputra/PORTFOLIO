import texture from "../assets/images/texture.avif";
import overtime from "../assets/images/employee-overtime-genz.svg";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import TiltCard from "../components/TiltCard";
import { GitBranch, ArrowUpRight, Sparkles } from "lucide-react";

export default function Project3() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const project = {
    category: "Full Stack HR Management",
    title: "Employee Overtime System",
    description:
      "Membangun sistem pengajuan lembur karyawan berbasis web untuk membantu proses pengajuan penugasan, monitoring real-time, approval berjenjang, dan manajemen rekap data lembur secara transparan.",
    tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "GitHub"],
    role: "Full Stack Developer",
    framework: "Laravel",
    database: "MySQL",
    platform: "Web Application",
  };

  return (
    <section
      id="project-02"
      className={`relative min-h-screen py-28 overflow-hidden transition-colors duration-500 cyber-grid ${
        isDark ? "bg-[#090d16] text-[#f8fafc]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left Details */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider shadow-lg">
              <Sparkles size={14} className="text-amber-300" />
              <span>CASE STUDY ✦ 02</span>
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#2563eb]">
              {project.category}
            </p>

            <h1 className="text-4xl sm:text-6xl font-black font-clash leading-none tracking-tight">
              Employee<br />
              <span className="text-[#2563eb]">Overtime</span><br />
              System
            </h1>

            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, tIdx) => (
                <motion.span
                  key={tag}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.45 + tIdx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold border transition-colors ${
                    isDark
                      ? "bg-slate-900 border-white/10 text-cyan-400"
                      : "bg-white border-blue-200 text-blue-700 shadow-sm"
                  }`}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <p className={`text-base sm:text-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {project.description}
            </p>

            {/* Meta Cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                ["Role", project.role],
                ["Framework", project.framework],
                ["Database", project.database],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={`rounded-[22px] p-4 border backdrop-blur-md ${
                    isDark
                      ? "bg-slate-900/60 border-white/10"
                      : "bg-white/80 border-slate-200 shadow-sm"
                  }`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {label}
                  </p>
                  <h4 className="mt-1 font-black text-xs sm:text-sm text-[#2563eb]">{value}</h4>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <motion.a
                href="https://github.com/dachi01-afk/Overtime-Request-System"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="genz-btn inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_15px_30px_rgba(249,115,22,0.3)] cursor-interactive"
              >
                <GitBranch size={16} />
                <span>Lihat Repository GitHub</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right 3D Visual Showcase */}
          <TiltCard
            maxTilt={12}
            className={`relative flex items-center justify-center p-8 sm:p-12 rounded-[40px] border backdrop-blur-2xl transition-all shadow-2xl ${
              isDark
                ? "bg-slate-900/60 border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                : "bg-gradient-to-br from-blue-50 to-indigo-50 border-slate-200/90 shadow-xl"
            }`}
          >
            {/* Gen Z Floating Stickers with Smooth Float */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.08, y: -4 }}
              className="cursor-interactive absolute -top-3 -left-3 bg-[#f97316] text-white px-5 py-2.5 rounded-full shadow-xl rotate-[-8deg] font-black text-xs z-30 transition-shadow hover:shadow-2xl"
            >
              Laravel &amp; MySQL ⚡
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              whileHover={{ scale: 1.08, y: -4 }}
              className={`cursor-interactive absolute bottom-6 -right-3 rounded-2xl px-5 py-3 shadow-xl rotate-[6deg] font-black text-xs z-30 border transition-shadow hover:shadow-2xl ${
                isDark ? "bg-slate-800 border-white/10 text-cyan-400" : "bg-white border-slate-200 text-blue-600"
              }`}
            >
              Multi-Role Approval Flow ✦
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full flex items-center justify-center"
            >
              <motion.div
                initial={reduceMotion ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="image-reveal"
              >
                <img
                  src={overtime}
                  alt="Employee Overtime System UI"
                  className="w-full max-w-[500px] h-auto object-contain drop-shadow-[0_25px_50px_rgba(37,99,235,0.25)]"
                />
              </motion.div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
