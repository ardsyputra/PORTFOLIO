import { Code2, Palette, Headphones, Download, ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import ParticlePortrait from "../components/ParticlePortrait";

const focusAreas = [
  { title: "Full-Stack Development", desc: "Membangun aplikasi web dari antarmuka hingga API dan database yang saling terhubung.", icon: Code2 },
  { title: "Web Development", desc: "Membuat pengalaman web yang responsif, cepat, dan nyaman di berbagai perangkat.", icon: Palette },
  { title: "IT Support", desc: "Menjaga sistem tetap andal melalui pemeliharaan dan pemecahan masalah teknis.", icon: Headphones },
];

export default function About() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const paraSlow = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const paraMid = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const paraFast = useTransform(scrollYProgress, [0, 1], [0, -48]);

  return (
    <section id="about" className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0B1120] text-[#F7F4ED]" : "bg-[#F7F4ED] text-[#0F172A]"}`}>
      <motion.div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border border-[var(--border)]" style={{ y: paraSlow }} />
      <motion.div className="pointer-events-none absolute bottom-28 right-24 h-56 w-56 rounded-full border border-[var(--border)]" style={{ y: paraMid }} />
      <motion.div className="pointer-events-none absolute left-44 top-52 h-40 w-40 rounded-full border border-[var(--border)] opacity-60" style={{ y: paraFast }} />
      <div className="section-inner relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-6">
            <motion.div initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }} viewport={{ once: true }} transition={{ duration: .9 }} className="overflow-hidden rounded-[30px] border border-[var(--border)] shadow-2xl"><ParticlePortrait /></motion.div>
          </div>
          <div className="relative flex flex-col justify-center lg:col-span-6">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}>
              <span className="text-kicker mb-3 block">Tentang Saya</span>
              <h2 className="text-section-title">Lulusan Teknik Informatika yang <span className="text-[#1E3A8A]">membangun produk digital.</span></h2>
              <div className="divider-accent mt-6 w-20" />
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7, delay: .12 }} className="mt-6">
              <p className={`text-body-lg mb-5 leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>Saya lulusan Teknik Informatika yang menikmati proses membangun produk digital dari awal: merancang antarmuka yang jelas, mengembangkan frontend yang responsif, hingga menyiapkan backend dan database yang andal.</p>
              <p className={`text-body-lg leading-relaxed ${isDark ? "text-slate-300" : "text-slate-600"}`}>Saya tertarik pada full-stack development, web, dan dukungan sistem. Setiap proyek menjadi kesempatan untuk belajar, menguji ide, dan menyempurnakan solusi sesuai kebutuhan penggunanya.</p>
            </motion.div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/CV_Ardiansyah_Putra.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline"><Download size={16} /> Unduh CV</a>
              <a href="#contact" className="btn btn-primary">Hubungi Saya <ArrowRight size={16} /></a>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map(({ title, desc, icon: Icon }, index) => <motion.article key={title} initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .55, delay: index * .08 }} className="card p-8">
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-soft)] text-[var(--accent)]"><Icon size={22} /></div>
            <h3 className="mb-3 text-lg font-bold">{title}</h3><p className="text-sm leading-relaxed">{desc}</p>
          </motion.article>)}
        </div>
      </div>
    </section>
  );
}
