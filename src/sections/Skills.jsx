import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Code2, Palette, Headphones, Wrench } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import Marquee from "../components/Marquee";
import Tag from "../components/ui/Tag";

const categories = [
  {
    number: "01",
    title: "Frontend",
    icon: Code2,
    color: "#2563eb",
    techs: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Next.js", "HTML5", "CSS3"],
  },
  {
    number: "02",
    title: "Backend",
    icon: Wrench,
    color: "#f97316",
    techs: ["Node.js", "Go", "Gin", "Laravel", "PHP", "REST API", "PostgreSQL", "MySQL", "CouchDB"],
  },
  {
    number: "03",
    title: "Design & Tools",
    icon: Palette,
    color: "#8b5cf6",
    techs: ["Figma", "VS Code", "GitHub", "Git", "Docker", "Laragon", "Jupyter"],
  },
  {
    number: "04",
    title: "IT Support",
    icon: Headphones,
    color: "#10b981",
    techs: ["Hardware", "Operating Systems", "Network", "Technical Documentation", "User Assistance", "System Maintenance"],
  },
];

const marqueeTechs = [
  "React", "TypeScript", "Next.js", "Node.js", "Go", "Gin", "Laravel",
  "PostgreSQL", "MySQL", "CouchDB", "Figma", "GitHub", "Docker", "Git",
  "REST API", "Tailwind CSS", "Laragon", "Jupyter",
];

export default function Skills() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll();
  const paraSlow = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const paraMid = useTransform(scrollYProgress, [0, 1], [0, 30]);

  return (
    <section id="skills" className={`relative min-h-screen overflow-hidden ${
      isDark ? "bg-[#090d16] text-[#f8fafc]" : "bg-[#f8fafc] text-[#0f172a]"
    }`}>
      {/* Decorative parallax */}
      <motion.div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full border border-[var(--border-inverse)]/30 backdrop-blur pointer-events-none"
        style={{
          background: isDark ? "rgba(37, 99, 235, 0.05)" : "rgba(30, 58, 138, 0.05)",
          transform: `translate3d(0, ${paraSlow}px, 0)`,
        }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 7 }}
      />
      <motion.div
        className="absolute bottom-32 right-32 w-48 h-48 rounded-full border border-[var(--border-inverse)]/30 backdrop-blur pointer-events-none"
        style={{
          background: isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(139, 92, 246, 0.05)",
          transform: `translate3d(0, ${paraMid}px, 0)`,
        }}
        animate={{ scale: 1 }}
        transition={{ repeat: Infinity, ease: "easeInOut", duration: 8 }}
      />

      <div className="section-inner relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="text-kicker block mb-3">Keahlian</span>
          <h2 className="text-section-title font-black">Skills &amp;<br /><span className="text-[#1E3A8A]">Teknologi</span></h2>
        </motion.div>

        {/* Animated technology marquee */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-16 overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--surface)] px-6 py-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <span className="skills-explore-label">Explore</span>
            <div className="skills-marquee-viewport h-[44px] min-w-0 flex-1 overflow-hidden">
              <Marquee speed={22}>
                {marqueeTechs.map((tech, i) => (
                  <span key={i} className="skills-marquee-item inline-flex items-center gap-2 whitespace-nowrap px-3 py-2 text-sm font-bold border rounded-full">
                    {tech}
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </motion.div>

        {/* Category cards with staggered tags + connecting lines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {categories.map((cat, cIdx) => (
            <motion.div
              key={cat.title}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: 0.15 + cIdx * 0.12 }}
              className="relative"
            >
              {/* Decorative number watermark */}
              <span className="absolute -top-6 -right-4 text-[60px] font-black select-none pointer-events-none opacity-[0.03] leading-none">{cat.number}</span>

              <div className="relative rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-alt)] p-7 sm:p-9 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                    <cat.icon size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg tracking-tight">{cat.title}</h3>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)] mt-0.5">Technology stack</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {cat.techs.map((tech, tIdx) => (
                    <Tag
                      key={tech}
                      label={tech}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.45, delay: 0.45 + tIdx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    />
                  ))}
                </div>

                {/* Connecting line under tag list */}
                <div className="mt-4 h-[1px] bg-[var(--border-soft)] w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
