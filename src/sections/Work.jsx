import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { useTheme } from "../context/ThemeContext";
import expenseDashboard from "../assets/showcase/expense-dashboard.png";
import overtime from "../assets/images/employee-overtime-genz.svg";
import blockchain from "../assets/images/blockchain.png";
import campus from "../assets/showcase/campus-01.png";
import food from "../assets/showcase/food-01.png";
import campusVideo from "../assets/video sistem informasi.mp4";
import foodVideo from "../assets/Video Kuliner.mp4";

const projects = [
  {
    number: "01",
    category: "Full-Stack Finance Product",
    name: "Expense Tracker",
    description:
      "Aplikasi pencatatan keuangan dengan dashboard transaksi interaktif, pengelompokan kategori pengeluaran, sistem autentikasi pengguna, dan manajemen akun melalui arsitektur REST API yang terintegrasi.",
    problem: "Pengguna kesulitan mencatat dan memantau arus kas keuangan pribadi secara terstruktur, sehingga perlu solusi yang membantu mengelompokkan transaksi dan mengelola akun secara terpadu.",
    role: "Full-Stack Developer",
    contribution:
      "Merancang dan membangun full-stack application dengan React (frontend) dan Go/Gin (backend), PostgreSQL sebagai database, JWT untuk autentikasi, Redis untuk caching, serta Docker untuk containerisasi. Melakukan implementasi CRUD transaksi, kategori, dan akun, serta memastikan reliabilitas sistem.",
    system: "Antarmuka React berkomunikasi dengan REST API Go/Gin. PostgreSQL menyimpan transaksi, kategori, dan akun; JWT menangani autentikasi, Redis mendukung caching, dan Docker menyatukan kebutuhan layanan.",
    challenge: "Pencatatan perlu tetap ringkas sambil menjaga data transaksi, kategori, dan akun tersusun konsisten di seluruh aplikasi.",
    outcome: "Satu alur terpadu untuk menambahkan, mengelompokkan, dan meninjau transaksi keuangan pribadi.",
    image: expenseDashboard,
    imagePosition: "right",
    technologies: ["Next.js", "Go", "Gin", "PostgreSQL", "JWT", "Redis", "Docker"],
    liveUrl: "https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app",
    repositoryUrl: "https://github.com/ardsyputra/expense-tracker",
  },
  {
    number: "02",
    category: "Human Resources Management",
    name: "Employee Overtime System",
    description:
      "Sistem pengajuan lembur berbasis web yang memudahkan karyawan membuat permintaan lembur, atasan melakukan evaluasi, dan admin memproses persetujuan dengan data yang tercatat secara transparan dan terstruktur.",
    problem: "Proses pengajuan dan persetujuan lembur masih dilakukan secara manual dan tertutup, sehingga sulit dilacak, divalidasi, dan direkap dengan konsisten.",
    role: "Full-Stack Developer",
    contribution:
      "Mengembangkan sistem berbasis PHP dan Laravel dengan MySQL. Menerapkan workflow multi-role untuk karyawan, atasan, dan admin, lengkap dengan form pengajuan, status persetujuan, serta rekap data lembur yang mudah dipahami pengguna operasional.",
    system: "Aplikasi Laravel dengan MySQL menghubungkan tiga peran: karyawan mengajukan lembur, atasan meninjau, lalu admin mengelola data dan rekap pengajuan.",
    challenge: "Setiap pengajuan perlu memiliki status dan penanggung jawab yang jelas agar proses persetujuan dapat dilacak dari awal hingga selesai.",
    outcome: "Workflow pengajuan lembur yang terdokumentasi dengan akses dan tugas berbeda untuk tiap peran.",
    image: overtime,
    imagePosition: "left",
    technologies: ["PHP", "Laravel", "MySQL"],
    repositoryUrl: "https://github.com/dachi01-afk/Overtime-Request-System",
  },
  {
    number: "03",
    category: "Blockchain Security Research",
    name: "Proof of Reserve",
    description:
      "Prototype keamanan blockchain yang menunjukkan bagaimana hash cryptographic SHA-256 dan struktur data Merkle Tree digunakan untuk menjaga integritas serta transparansi bukti cadangan (Proof of Reserve) dengan database CouchDB.",
    problem: "Integritas data pengiriman logistik dan bukti cadangan rentan terhadap manipulasi, sehingga diperlukan mekanisme verifikasi data yang anti-tamper dan transparan.",
    role: "Blockchain Developer",
    contribution:
      "Mengimplementasikan algoritma hashing SHA-256, struktur data Merkle Tree, dan integrasi CouchDB untuk prototype verifikasi integritas data. Membangun antarmuka prototype yang menampilkan hasil verifikasi dan deteksi perubahan data secara terukur.",
    system: "Data dicatat di CouchDB, diringkas menggunakan SHA-256, lalu dihubungkan dalam Merkle Tree. Prototype menampilkan hasil pemeriksaan untuk membantu melihat perubahan pada data.",
    challenge: "Perubahan pada satu bagian data harus dapat diketahui melalui proses verifikasi integritas yang mudah diperiksa.",
    outcome: "Prototype Proof of Reserve yang memperlihatkan pemeriksaan hash dan status validasi data.",
    image: blockchain,
    imagePosition: "right",
    technologies: ["Laravel", "CouchDB", "Merkle Tree", "SHA-256", "Python"],
    repositoryUrl: "https://github.com/ardsyputra/Blockchain",
  },
  {
    number: "04",
    category: "UI/UX Design · Figma Prototype",
    name: "Sistem Informasi UNPRI",
    description:
      "Merancang pengalaman digital Sistem Informasi UNPRI yang membantu mahasiswa, dosen, dan staf akademik menjalankan alur informasi kampus secara lebih cepat, terstruktur, dan mudah dipahami.",
    problem: "Pengguna membutuhkan akses cepat ke informasi akademik dengan navigasi yang jelas, hierarki informasi konsisten, serta alur yang tidak membingungkan.",
    role: "UI/UX Designer",
    contribution:
      "Merancang sistem antarmuka responsif dengan struktur dashboard terpusat, akses fitur utama yang jelas, komponen reusable, dan prototype interaktif end-to-end menggunakan Figma.",
    system: "Prototype Figma menyusun informasi akademik dalam dashboard terpusat dengan akses fitur yang menyesuaikan kebutuhan mahasiswa, dosen, dan staf.",
    challenge: "Informasi akademik perlu mudah ditemukan tanpa membuat navigasi dashboard terasa padat atau membingungkan.",
    outcome: "Rangkaian layar dan prototype interaktif untuk menjelajahi alur informasi kampus.",
    image: campus,
    imagePosition: "left",
    technologies: ["Figma", "Wireframe", "Prototype", "Design System"],
    repositoryUrl:
      "https://www.figma.com/proto/0YpUAkCsi3ZUM98AEo8EyE/Ardiansyah-Putra--223303030227-?node-id=2-41&t=tsoLfjZgb8uZDJW8-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=73%3A14",
  },
  {
    number: "05",
    category: "UI/UX Design · Food Discovery App",
    name: "Kuliner Hemat",
    description:
      "Merancang aplikasi Kuliner Hemat untuk membantu pengguna menemukan kuliner terjangkau melalui pencarian rekomendasi yang cepat, visual menarik, dan alur pemesanan yang sederhana.",
    problem: "Pengguna kesulitan membandingkan pilihan kuliner berdasarkan lokasi, harga, dan preferensi dalam satu pengalaman mobile yang ringkas.",
    role: "UI/UX Designer",
    contribution:
      "Membuat alur pencarian dan rekomendasi dengan kartu makanan visual, filter kebutuhan, detail kuliner, serta navigasi mobile yang konsisten dan mudah digunakan melalui prototype Figma interaktif.",
    system: "Prototype mobile menghubungkan pencarian dan filter dengan rekomendasi, detail tempat makan, dan alur pemesanan yang ringkas.",
    challenge: "Pengguna perlu membandingkan pilihan berdasarkan lokasi, harga, dan preferensi tanpa melewati banyak langkah.",
    outcome: "Prototype aplikasi penemuan kuliner yang menggabungkan rekomendasi dan detail pilihan dalam satu alur mobile.",
    image: food,
    imagePosition: "right",
    technologies: ["Figma", "Mobile UI", "Prototype", "User Flow"],
    repositoryUrl:
      "https://www.figma.com/proto/0YpUAkCsi3ZUM98AEo8EyE/Ardiansyah-Putra--223303030227-?node-id=903-217&p=f&viewport=-561%2C423%2C0.46&t=RCE15uJxA3hXxwhx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=903%3A217&page-id=314%3A107",
  },
];

const projectMedia = {
  "Expense Tracker": {
    liveUrl: "https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app",
    groups: [
      {
        key: "desktop",
        label: "Desktop",
        images: [
          "/assets/expense-tracker/dasboard.png",
          "/assets/expense-tracker/transaction.png",
          "/assets/expense-tracker/categories.png",
          "/assets/expense-tracker/add-transaction.png",
          "/assets/expense-tracker/add-categories.png",
          "/assets/expense-tracker/settings.png",
          "/assets/expense-tracker/login.png",
          "/assets/expense-tracker/register.png",
        ],
      },
      {
        key: "mobile",
        label: "Mobile",
        images: [
          "/assets/expense-tracker/capture-mobile-dashboard.png",
          "/assets/expense-tracker/capture-mobile-transactions.png",
          "/assets/expense-tracker/capture-mobile-categories.png",
          "/assets/expense-tracker/capture-mobile-add-transaction.png",
          "/assets/expense-tracker/capture-mobile-add-category.png",
          "/assets/expense-tracker/capture-mobile-settings.png",
          "/assets/expense-tracker/capture-mobile-login.png",
          "/assets/expense-tracker/capture-mobile-register.png",
          "/assets/expense-tracker/live-mobile-dashboard.png",
          "/assets/expense-tracker/live-mobile-transactions.png",
          "/assets/expense-tracker/live-mobile-categories.png",
          "/assets/expense-tracker/live-mobile-add-transaction.png",
          "/assets/expense-tracker/live-mobile-add-category.png",
          "/assets/expense-tracker/live-mobile-settings.png",
          "/assets/expense-tracker/live-mobile-login.png",
          "/assets/expense-tracker/live-mobile-register.png",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-56.jpeg",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-56-1.jpeg",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-56-2.jpeg",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-57.jpeg",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-57-1.jpeg",
          "/assets/expense-tracker/whatsapp-image-2026-11-04-at-13-22-57-2.jpeg",
        ],
      },
    ],
  },
  "Employee Overtime System": {
    images: [
      "/assets/overtime/01-login.png",
      "/assets/overtime/02-register.png",
      "/assets/overtime/03-lupa-password.png",
      "/assets/overtime/04-admin-dashboard.png",
      "/assets/overtime/05-admin-pegawai.png",
      "/assets/overtime/06-admin-position.png",
      "/assets/overtime/07-admin-department.png",
      "/assets/overtime/08-admin-history.png",
      "/assets/overtime/10-admin-report.png",
      "/assets/overtime/11-profile.png",
      "/assets/overtime/12-atasan-dashboard.png",
      "/assets/overtime/13-atasan-pengajuan.png",
      "/assets/overtime/14-atasan-approval.png",
      "/assets/overtime/17-atasan-history.png",
      "/assets/overtime/19-profile-atasan.png",
      "/assets/overtime/20-pegawai-dashboard.png",
      "/assets/overtime/21-pegawai-penugasan.png",
      "/assets/overtime/25-profile-pegawai.png",
    ],
  },
  "Proof of Reserve": {
    images: ["/assets/blockchain/blockchain.png", "/assets/blockchain/01-validasi-resi-awal.png", "/assets/blockchain/02-detail-resi-valid.png", "/assets/blockchain/03-resi-tidak-valid.png"],
  },
  "Sistem Informasi UNPRI": {
    video: campusVideo,
  },
  "Kuliner Hemat": {
    video: foodVideo,
  },
};

export default function Work() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <section id="work" className={`relative min-h-screen overflow-hidden ${
      isDark ? "bg-[#0B1120] text-[#F7F4ED]" : "bg-[#F7F4ED] text-[#0F172A]"
    }`}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundSize: "28px 28px", backgroundImage: `linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)"` }} />

      <div className="section-inner relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-18"
        >
          <span className="text-kicker block mb-3">02 / Karya pilihan</span>
          <h2 className="text-section-title font-black">Project yang<br /><span className="text-[#1E3A8A]">saya bangun</span></h2>
          <div className="mt-6 flex justify-center">
            <div className="divider-accent w-24" />
          </div>
        </motion.div>

        <motion.div
          className="work-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div><span>STUDI KASUS PILIHAN</span>
          <p>Dari sistem operasional hingga pengalaman mobile, setiap karya memperlihatkan proses, keputusan, dan layar yang membentuk hasil akhirnya.</p></div>
          <span className="work-intro-count">05 <i>PROJECTS</i></span>
        </motion.div>

        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard key={project.number} index={index} total={projects.length} {...project} gallery={projectMedia[project.name]} />
          ))}
        </div>

        {projects.length > 0 && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mt-16 text-center"
          >
            <div className="divider-accent w-24 mx-auto" />
            <p className="mt-6 text-meta">Semua proyek di atas dibangun dengan pendekatan yang berfokus pada keandalan, kegunaan, dan keberlanjutan sistem.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
