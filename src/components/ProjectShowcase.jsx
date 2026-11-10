import { motion } from "framer-motion";
import MotionReveal from "./MotionReveal";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    number: "01",
    name: "Expense Tracker",
    description:
      "Aplikasi pencatatan keuangan untuk membantu pengguna mencatat transaksi, mengelompokkan kategori, memantau arus kas, dan mengelola akun melalui dashboard yang responsif.",
    image: "/assets/showcase/expense-dashboard.png",
    technologies: ["React", "TypeScript", "Node.js", "Gin", "PostgreSQL"],
    liveUrl: "https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app",
    repositoryUrl: "https://github.com/ardsyputra/expense-tracker",
  },
  {
    number: "02",
    name: "Overtime Request System",
    description:
      "Sistem pengajuan lembur berbasis web yang memudahkan karyawan membuat permintaan, atasan melakukan evaluasi, dan proses persetujuan tercatat secara terstruktur.",
    image: "/assets/images/employee-overtime-genz.svg",
    technologies: ["PHP", "Laravel", "MySQL"],
    liveUrl: undefined,
    repositoryUrl: "https://github.com/dachi01-afk/Overtime-Request-System",
  },
  {
    number: "03",
    name: "Proof of Reserve",
    description:
      "Prototype keamanan blockchain yang menunjukkan bagaimana hash, SHA-256, dan struktur data Merkle Tree dapat digunakan untuk menjaga integritas serta transparansi bukti cadangan.",
    image: "/assets/images/blockchain.png",
    technologies: ["Python", "SHA-256", "Merkle Tree", "CouchDB"],
    liveUrl: undefined,
    repositoryUrl: "https://github.com/ardsyputra/Blockchain",
  },
];

export default function ProjectShowcase() {
  return (
    <section
      id="project"
      className="relative overflow-hidden bg-[#f8fafc] py-28 text-[#0f172a]"
    >
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, rgba(37,99,235,0.04) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/15 bg-white px-5 py-2 text-xs font-satoshi font-bold uppercase tracking-[0.18em] text-[#2563eb]/75 shadow-sm mx-auto mb-4"
          >
            Selected work · 2026
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-clash font-black text-[#0f172a] tracking-tight leading-[1.1] text-4xl md:text-5xl lg:text-6xl"
          >
            Project yang telah<br />
            <span className="text-[#2563eb]">saya bangun</span>
          </motion.h2>
        </motion.div>

        <MotionReveal
          stagger
          staggerChildren={0.12}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
        >
          {projects.map((project) => (
            <div key={project.number} className="flex">
              <ProjectCard {...project} />
            </div>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}