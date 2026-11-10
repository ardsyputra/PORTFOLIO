import { motion, useReducedMotion } from "framer-motion";
import { Code2, Laptop } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const experience = [
  {
    period: "Mar - Agu 2025",
    role: "Web Developer (Magang)",
    organization: "DISKOMINFO Medan",
    detail: "Mengembangkan frontend sistem pengajuan lembur karyawan dengan Laravel, Blade, dan Tailwind CSS: login, dashboard, pengajuan, persetujuan, dan riwayat. Menguji aplikasi serta memperbaiki bug bersama tim menggunakan Git dan GitHub.",
    icon: Code2,
  },
  {
    period: "Sep - Des 2024",
    role: "IT Support (Magang)",
    organization: "BTN Syariah - Banda Aceh",
    detail: "Menangani kebutuhan teknis pengguna terkait sistem dan perangkat kerja, membantu pengembangan website informasi rumah KPR, serta mengelola dan memvalidasi data peserta pembiayaan.",
    icon: Laptop,
  },
  {
    period: "Agu - Okt 2020",
    role: "IT Support (Magang)",
    organization: "Arnet Witel - Medan",
    detail: "Memantau performa server, membantu troubleshooting jaringan dan perangkat kantor, memelihara sistem operasional, serta mendukung pengguna saat menghadapi kendala teknis.",
    icon: Laptop,
  },
];

export default function Experience() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  return (
    <section id="experience" className={`relative min-h-screen overflow-hidden ${isDark ? "bg-[#0B1120] text-[#F7F4ED]" : "bg-[#F7F4ED] text-[#0F172A]"}`}>
      <div className="section-inner relative z-10">
        <motion.header initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .65 }} className="mb-14 text-center">
          <span className="text-kicker mb-3 block">Pengalaman kerja</span>
          <h2 className="text-section-title">Belajar lewat<br /><span className="text-[#1E3A8A]">pengalaman nyata.</span></h2>
        </motion.header>
        <div className="experience-timeline mx-auto max-w-4xl">
          {experience.map((item, index) => {
            const Icon = item.icon;
            return <motion.article key={item.organization} initial={reduceMotion ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .6, delay: index * .1 }} className="experience-card">
              <div className="experience-card-mark"><Icon size={19} /></div>
              <div className="experience-card-copy"><span className="experience-period">{item.period}</span><h3>{item.role}</h3><p className="experience-org">{item.organization}</p><p className="experience-detail">{item.detail}</p></div>
              <span className="experience-index">0{index + 1}</span>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
