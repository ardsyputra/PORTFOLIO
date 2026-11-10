import texture from "../assets/images/texture.avif";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import TiltCard from "../components/TiltCard";
import { Globe2, GitBranch, ArrowUpRight, Sparkles } from "lucide-react";

export default function Project1() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const project = {
    title: "Expense Tracker",
    category: "Full Stack Finance Product",
    description:
      "Aplikasi pencatatan keuangan dengan dashboard transaksi interaktif, pengelompokan kategori pengeluaran, sistem autentikasi pengguna, manajemen akun, dan arsitektur REST API berkecepatan tinggi.",
    role: "Full Stack Developer",
    tools: "React, TypeScript, Node.js, Gin, PostgreSQL",
    platform: "Web Application",
    tags: ["React", "TypeScript", "Node.js", "Gin", "PostgreSQL", "REST API"],
  };

  return (
    <section
      id="project"
      className={`relative min-h-screen overflow-hidden py-28 transition-colors duration-500 cyber-grid ${
        isDark ? "bg-[#090d16] text-[#f8fafc]" : "bg-[#f8fafc] text-[#0f172a]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "240px", backgroundRepeat: "repeat" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className={`mb-16 flex items-end justify-between border-b pb-8 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.35em] text-[#2563eb]">
              <Sparkles size={14} className="text-[#f97316]" />
              <span>FEATURED PROJECT ✦ 01</span>
            </div>
            <h2 className="mt-3 font-clash font-black tracking-tight text-4xl sm:text-6xl">
              01 / Expense Tracker
            </h2>
          </div>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left Details */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#2563eb]">
              {project.category}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-clash leading-none tracking-tight">
              {project.title}
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

            {/* Meta Bento */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              {[
                ["Role", project.role],
                ["Tools", project.tools],
                ["Platform", project.platform],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={`rounded-[22px] p-4 border backdrop-blur-md ${
                    isDark
                      ? "bg-slate-900/60 border-white/10"
                      : "bg-white/80 border-slate-200/90 shadow-sm"
                  }`}
                >
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {label}
                  </p>
                  <h4 className="mt-1 font-black text-sm text-[#2563eb]">{value}</h4>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3.5 pt-4">
              <motion.a
                href="https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="genz-btn inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_12px_24px_rgba(37,99,235,0.3)] cursor-interactive"
              >
                <Globe2 size={16} />
                <span>Live Demo</span>
                <ArrowUpRight size={16} />
              </motion.a>

              <motion.a
                href="https://github.com/ardsyputra/expense-tracker"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs font-black uppercase tracking-wider border transition-all cursor-interactive ${
                  isDark
                    ? "bg-slate-900 border-white/10 text-slate-200 hover:bg-slate-800"
                    : "bg-white border-slate-200 text-slate-800 hover:bg-slate-100 shadow-sm"
                }`}
              >
                <GitBranch size={16} />
                <span>View Repository</span>
                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>

          {/* Right: 3D Interactive Mock UI */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.85 }}
          >
            <TiltCard
              maxTilt={10}
              className={`overflow-hidden rounded-[36px] border p-3 sm:p-4 backdrop-blur-2xl shadow-2xl transition-all image-reveal ${
                isDark
                  ? "bg-[#0b1329] border-blue-500/30 shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
                  : "bg-[#101F52] border-blue-900/40 shadow-[0_35px_80px_rgba(30,58,138,0.25)]"
              }`}
            >
            {/* Top window dots */}
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              <span className="ml-2 text-[10px] font-bold text-white/60 tracking-wider">
                Expense Tracker Dashboard
              </span>
            </div>

            {/* Inner Dashboard View */}
            <div className={`grid min-h-[480px] grid-cols-[64px_1fr] sm:grid-cols-[130px_1fr] rounded-[24px] text-slate-900 transition-colors ${
              isDark ? "bg-slate-900 text-slate-100" : "bg-[#f8fafc] text-slate-900"
            }`}>
              <aside className={`border-r px-2 sm:px-4 py-5 ${isDark ? "border-slate-800" : "border-slate-200"}`}>
                <div className="text-lg font-black text-[#2563eb]">ET.</div>
                <nav className="mt-8 space-y-2 text-[11px] sm:text-xs font-bold">
                  {["Overview", "Transactions", "Categories", "Settings"].map((item, index) => (
                    <div
                      key={item}
                      className={`rounded-xl px-2.5 py-2.5 transition-colors ${
                        index === 0
                          ? "bg-[#2563eb] text-white shadow-sm"
                          : isDark
                          ? "text-slate-400 hover:text-slate-200"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </nav>
              </aside>

              <main className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-[11px] font-bold ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Financial Dashboard
                    </p>
                    <h3 className="mt-0.5 text-lg sm:text-xl font-black">
                      Overview Saldo
                    </h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#f97316] shadow-md flex items-center justify-center text-white text-xs font-black">
                    AP
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    ["Total Balance", "$12,450", true],
                    ["Income", "$3,820", false],
                    ["Expense", "$1,940", false],
                  ].map(([label, value, isHighlight]) => (
                    <div
                      key={label}
                      className={`rounded-[18px] p-3.5 shadow-sm border ${
                        isHighlight
                          ? "col-span-2 sm:col-span-1 bg-[#2563eb] text-white border-blue-400/40"
                          : isDark
                          ? "bg-slate-800/80 border-slate-700/80 text-slate-100"
                          : "bg-white border-slate-200/80 text-slate-900"
                      }`}
                    >
                      <p className={`text-[10px] uppercase font-bold ${isHighlight ? "text-blue-100" : isDark ? "text-slate-400" : "text-slate-500"}`}>
                        {label}
                      </p>
                      <p className="mt-1 text-base sm:text-lg font-black">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Cash Flow Chart */}
                <div className={`mt-4 rounded-[20px] p-4 border ${
                  isDark ? "bg-slate-800/60 border-slate-700/70" : "bg-white border-slate-200"
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-xs sm:text-sm">Cash Flow Analytics</h4>
                    <span className="text-[10px] font-bold text-[#f97316] uppercase tracking-wider">
                      This Month
                    </span>
                  </div>
                  <div className="mt-3 h-32 sm:h-36">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { month: "Jan", value: 42 },
                          { month: "Feb", value: 58 },
                          { month: "Mar", value: 38 },
                          { month: "Apr", value: 76 },
                          { month: "May", value: 52 },
                          { month: "Jun", value: 88 },
                        ]}
                      >
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 10, fill: isDark ? "#94a3b8" : "#64748b" }}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(37, 99, 235, 0.1)" }}
                          contentStyle={{
                            borderRadius: 12,
                            border: "none",
                            fontSize: 11,
                            backgroundColor: isDark ? "#0f172a" : "#ffffff",
                            color: isDark ? "#f8fafc" : "#0f172a",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                          }}
                        />
                        <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </main>
            </div>
          </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
