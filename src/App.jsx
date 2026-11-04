import Navbar from "./components/Navbar";

import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";

import Project1 from "./sections/project1";
import Project3 from "./sections/project3";
import Project4 from "./sections/project4";
import End from "./sections/End";
import MotionReveal from "./components/MotionReveal";
import FigmaPrototype from "./components/FigmaPrototype";
import ProjectStory from "./components/ProjectStory";


export default function App() {
  return (
    <>

      {/* NAVBAR */}
      <Navbar />


      {/* HERO */}
      <MotionReveal><Hero /></MotionReveal>


      {/* ABOUT */}
      <MotionReveal><About /></MotionReveal>


      {/* SKILLS */}
      <MotionReveal><Skills /></MotionReveal>


      {/* PROJECT 1 */}
      <MotionReveal><Project1 /></MotionReveal>
      <MotionReveal>
        <ProjectStory
          number="01"
          name="Expense Tracker"
          category="Full Stack Finance Product"
          description="Aplikasi pencatatan keuangan untuk membantu pengguna mencatat transaksi, mengelompokkan kategori, memantau arus kas, dan mengelola akun melalui dashboard yang responsif."
          liveUrl="https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app"
          repositoryUrl="https://github.com/ardsyputra/expense-tracker"
          previewGroups={{
            desktop: [
              { src: "/assets/expense-tracker/login.png", label: "Login" },
              { src: "/assets/expense-tracker/register.png", label: "Register" },
              { src: "/assets/expense-tracker/dasboard.png", label: "Dashboard" },
              { src: "/assets/expense-tracker/transaction.png", label: "Transactions" },
              { src: "/assets/expense-tracker/add-transaction.png", label: "Add Transaction" },
              { src: "/assets/expense-tracker/categories.png", label: "Categories" },
              { src: "/assets/expense-tracker/add-categories.png", label: "Add Category" },
              { src: "/assets/expense-tracker/settings.png", label: "Settings" },
            ],
            mobile: [
              { src: "/assets/expense-tracker/live-mobile-login.png", label: "Login" },
              { src: "/assets/expense-tracker/live-mobile-register.png", label: "Register" },
              { src: "/assets/expense-tracker/live-mobile-dashboard.png", label: "Dashboard" },
              { src: "/assets/expense-tracker/live-mobile-transactions.png", label: "Transactions" },
              { src: "/assets/expense-tracker/live-mobile-add-transaction.png", label: "Add Transaction" },
              { src: "/assets/expense-tracker/live-mobile-categories.png", label: "Categories" },
              { src: "/assets/expense-tracker/live-mobile-add-category.png", label: "Add Category" },
              { src: "/assets/expense-tracker/live-mobile-settings.png", label: "Settings" },
            ],
          }}
          learnings={[
            "Menyusun struktur full-stack yang konsisten antara React, REST API, Node.js, Gin, dan PostgreSQL.",
            "Merancang dashboard keuangan yang informatif tanpa membuat visual terlalu padat.",
            "Mengelola autentikasi, CRUD transaksi, kategori, serta state aplikasi secara terstruktur.",
          ]}
          process={["Analisis kebutuhan dan alur keuangan", "Membangun UI dashboard dan komponen responsif", "Implementasi API, database, autentikasi, dan testing"]}
        />
      </MotionReveal>
      {/* PROJECT 3 */}
      <MotionReveal><Project3 /></MotionReveal>
      <MotionReveal>
        <ProjectStory
          number="02"
          name="Overtime Request System"
          category="Full Stack HR Management"
          description="Sistem pengajuan lembur berbasis web yang memudahkan karyawan membuat permintaan, atasan melakukan evaluasi, dan proses persetujuan tercatat secara terstruktur."
          repositoryUrl="https://github.com/dachi01-afk/Overtime-Request-System"
          screenshots={[
            "/assets/overtime/01-login.png",
            "/assets/overtime/02-register.png",
            "/assets/overtime/04-admin-dashboard.png",
            "/assets/overtime/05-admin-pegawai.png",
            "/assets/overtime/06-admin-position.png",
            "/assets/overtime/07-admin-department.png",
            "/assets/overtime/08-admin-history.png",
            "/assets/overtime/10-admin-report.png",
            "/assets/overtime/12-atasan-dashboard.png",
            "/assets/overtime/13-atasan-pengajuan.png",
            "/assets/overtime/14-atasan-approval.png",
            "/assets/overtime/20-pegawai-dashboard.png",
            "/assets/overtime/21-pegawai-penugasan.png",
            "/assets/overtime/11-profile.png",
            "/assets/overtime/25-profile-pegawai.png",
          ]}
          learnings={[
            "Memahami alur approval multi-role dan kebutuhan validasi pada sistem kerja.",
            "Merancang form, status, serta tabel yang mudah dipahami oleh pengguna operasional.",
            "Menghubungkan proses frontend dengan backend Laravel dan MySQL secara terukur.",
          ]}
          process={["Mapping kebutuhan karyawan dan approver", "Perancangan workflow dan interface", "Pengembangan CRUD, status approval, dan database"]}
        />
      </MotionReveal>
      {/* PROJECT 4 */}
      <MotionReveal><Project4 /></MotionReveal>
      <MotionReveal>
        <ProjectStory
          number="03"
          name="Blockchain Security"
          category="Security Research Prototype"
          description="Prototype keamanan blockchain yang menunjukkan bagaimana hash, SHA-256, dan struktur data dapat digunakan untuk menjaga integritas serta transparansi bukti cadangan."
          repositoryUrl="https://github.com/ardsyputra/Blockchain"
          screenshots={[
            "/assets/blockchain/01-validasi-resi-awal.png",
            "/assets/blockchain/02-detail-resi-valid.png",
            "/assets/blockchain/03-resi-tidak-valid.png",
          ]}
          learnings={[
            "Memahami hubungan hash cryptographic dengan integritas dan deteksi perubahan data.",
            "Mengimplementasikan alur verifikasi data Proof of Reserve dengan pendekatan yang mudah dipahami.",
            "Menampilkan data riset melalui antarmuka prototype yang jelas dan terukur.",
          ]}
          process={["Pengumpulan dan analisis konsep keamanan blockchain", "Perancangan proses verifikasi dan struktur data", "Implementasi prototype, pengujian hash, dan visualisasi hasil"]}
        />
      </MotionReveal>
      {/* FIGMA PROJECT 1 */}
      <MotionReveal>
        <FigmaPrototype
          number="04"
          title="Sistem Informasi UNPRI"
          category="UI/UX Design / University Information System"
          description="Merancang pengalaman digital Sistem Informasi UNPRI yang membantu mahasiswa, dosen, dan akademik menjalankan alur informasi kampus secara lebih cepat, terstruktur, dan mudah dipahami."
          video="/videos/campus-prototype.mp4"
          fallbackFrame="/assets/campus-01.png"
          figmaUrl="https://www.figma.com/@ardsyputra"
          role="UI/UX Designer"
          tools={["Figma", "Wireframe", "Prototype", "Design System"]}
          challenge="Pengguna membutuhkan akses cepat ke informasi akademik dengan navigasi yang jelas, hierarki informasi konsisten, serta alur yang tidak membingungkan."
          solution="Dibuat sistem antarmuka responsif dengan struktur dashboard terpusat, akses fitur utama yang jelas, komponen reusable, dan prototype interaktif end-to-end."
        />
      </MotionReveal>

      {/* FIGMA PROJECT 2 */}
      <MotionReveal>
        <FigmaPrototype
          number="05"
          title="Kuliner Hemat"
          variant="light"
          category="UI/UX Design / Food Discovery App"
          description="Merancang aplikasi Kuliner Hemat untuk membantu pengguna menemukan kuliner terjangkau melalui pencarian rekomendasi yang cepat, visual menarik, dan alur pemesanan yang sederhana."
          video="/videos/food-prototype.mp4"
          fallbackFrame="/assets/food-01.png"
          figmaUrl="https://www.figma.com/proto/0YpUAkCsi3ZUM98AEo8EyE/Ardiansyah-Putra--223303030227-?node-id=903-217&p=f&viewport=-561%2C423%2C0.46&t=RCE15uJxA3hXxwhx-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=903%3A217&page-id=314%3A107"
          role="UI/UX Designer"
          tools={["Figma", "Mobile UI", "Prototype", "User Flow"]}
          challenge="Pengguna kesulitan membandingkan pilihan kuliner berdasarkan lokasi, harga, dan preferensi dalam satu pengalaman mobile yang ringkas."
          solution="Dibuat alur pencarian dan rekomendasi dengan kartu makanan visual, filter kebutuhan, detail kuliner, serta navigasi mobile yang konsisten dan mudah digunakan."
        />
      </MotionReveal>

      {/* CONTACT / END */}
      <MotionReveal direction="zoom"><End /></MotionReveal>

    </>
  );
}