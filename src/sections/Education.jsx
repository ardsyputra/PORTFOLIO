import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const education = [
  {
    period: "Sep 2022 - Agu 2026",
    degree: "Sarjana Teknik Informatika",
    institution: "Universitas Prima Indonesia - Medan",
    detail: "IPK 3,94 / 4,00. Tugas akhir: Implementasi Metode Proof of Reserve pada Sistem Pengiriman Barang untuk Menjaga Integritas Data.",
    icon: GraduationCap,
    mark: "S1",
  },
  {
    period: "Jul 2019 - Jun 2021",
    degree: "Teknik Komputer dan Jaringan",
    institution: "SMK Telkom Medan",
    detail: "Pendidikan kejuruan bidang komputer dan jaringan.",
    icon: BookOpen,
    mark: "SMK",
  },
];

export default function Education() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  return (
    <section id="education" className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0B1120] text-[#F7F4ED]" : "bg-[#F7F4ED] text-[#0F172A]"}`}>
      <div className="section-inner relative z-10">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }} className="mb-14 text-center">
          <span className="text-kicker mb-3 block">Pendidikan</span>
          <h2 className="text-section-title">Fondasi untuk<br /><span className="text-[#1E3A8A]">terus bertumbuh.</span></h2>
        </motion.header>
        <div className="education-list mx-auto max-w-4xl">
          {education.map((item, index) => {
            const Icon = item.icon;
            return <motion.article key={item.degree} initial={reduceMotion ? false : { opacity: 0, x: index % 2 ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .62, delay: index * .12 }} className="education-card">
              <div className="education-card-icon"><Icon size={21} /></div>
              <div className="education-card-copy"><span className="education-period">{item.period}</span><h3>{item.degree}</h3><p className="education-institution">{item.institution}</p><p className="education-detail">{item.detail}</p></div>
              <span className="education-mark">{item.mark}</span>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
