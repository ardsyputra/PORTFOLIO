import "../assets/fonts/fonts.css";

import profile from "../assets/images/profile.png";
import texture from "../assets/images/texture.avif";
import { Code2, Palette, Headphones, ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function About() {
  const reduceMotion = useReducedMotion();
  const focus = [
    {
      title: "Full Stack Developer",
      description: "React, API, database, dan web application",
      icon: Code2,
    },
    {
      title: "IT Support",
      description: "Troubleshooting, sistem, dan dukungan teknis",
      icon: Headphones,
    },
    {
      title: "UI/UX Designer",
      description: "Research, wireframe, prototype, design system",
      icon: Palette,
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen scroll-mt-24 overflow-hidden bg-[#F7F4ED] py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url(${texture})`,
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />
      <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#1E3A8A]/10 blur-3xl" />
      <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-[#F97316]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-end justify-between border-b border-[#1E3A8A]/10 pb-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#F97316]">01 / Introduction</p>
            <h2 className="mt-3 text-5xl font-black text-[#1E3A8A] md:text-7xl">About Me</h2>
          </div>
          <ArrowDown className="mb-2 hidden text-[#1E3A8A]/35 md:block" size={32} />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <motion.div
            drag={!reduceMotion}
            dragConstraints={{ left: -16, right: 16, top: -12, bottom: 12 }}
            dragElastic={0.14}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto flex min-h-[480px] w-full max-w-[620px] cursor-grab items-end justify-center active:cursor-grabbing md:min-h-[620px]"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [-6, 3, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-7 left-4 z-30 rotate-[-8deg] rounded-full bg-[#F97316] px-5 py-3 text-xs font-black uppercase text-white shadow-xl md:left-8"
            >
              Curious mind ✦
            </motion.div>
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, 8, 0], rotate: [7, -2, 7] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[-12px] top-[28%] z-30 rotate-12 rounded-[18px] bg-[#F7F4ED] px-4 py-3 text-xs font-black text-[#1E3A8A] shadow-xl"
            >
              build • test • repeat
            </motion.div>
            <motion.img
              src={profile}
              alt="Ardiansyah Putra"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 max-h-[620px] w-[112%] max-w-none object-contain object-bottom transition duration-700 hover:scale-[1.03]"
            />
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center rounded-full bg-[#F97316] px-5 py-2 text-xs font-black uppercase tracking-[0.18em] text-white">
              Full Stack Developer • IT Support • UI/UX Designer
            </span>

            <h3 className="mt-7 text-4xl font-black leading-[0.98] text-[#1E3A8A] md:text-6xl">
              membangun solusi digital
              <span className="block text-[#F97316]">yang usable dan reliable.</span>
            </h3>

            <div className="mt-8 rounded-[30px] border border-[#1E3A8A]/10 bg-white p-6 shadow-[0_24px_70px_rgba(30,58,138,.10)] md:p-8">
              <p className="text-base leading-8 text-[#171717]/70 md:text-lg">
                Aku mahasiswa Teknik Informatika yang berfokus sebagai <span className="font-black text-[#F97316]">Full Stack Web Developer</span>, IT Support, dan UI/UX Designer. Aku menikmati proses mengubah kebutuhan pengguna menjadi produk digital yang fungsional, mudah digunakan, dan dapat diandalkan.
              </p>
              <p className="mt-4 text-base leading-8 text-[#171717]/70 md:text-lg">
                Dari merancang interface dan prototype hingga membangun frontend, REST API, serta database, aku terbiasa menghubungkan sisi tampilan, logika sistem, dan kebutuhan operasional. Sebagai IT Support, aku juga terbiasa menganalisis masalah teknis dan membantu pengguna menemukan solusi yang tepat.
              </p>
              <div className="mt-6 flex items-center">
                <a
                  href="/CV_Ardiansyah_Putra.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_14px_30px_rgba(249,115,22,.28)] transition hover:-translate-y-1 hover:bg-[#2451A6]"
                  aria-label="Download Resume CV Ardiansyah Putra"
                >
                  <Download size={20} />
                  Download Resume CV
                </a>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {focus.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={reduceMotion ? undefined : { y: -8, rotate: index === 1 ? 1 : -1 }}
                  className="rounded-[22px] border border-[#1E3A8A]/10 bg-[#F2EFE6] p-5 transition-shadow hover:shadow-xl"
                >
                  <Icon size={22} className="text-[#F97316]" />
                  <h4 className="mt-4 font-black text-[#1E3A8A]">{title}</h4>
                  <p className="mt-1 text-xs leading-5 text-[#171717]/55">{description}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                ["05", "Projects"],
                ["07", "Tools shown"],
                ["2026", "Portfolio"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[20px] bg-[#1E3A8A] px-3 py-5 text-center text-white shadow-lg">
                  <p className="text-2xl font-black text-[#F97316] md:text-3xl">{value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/60 md:text-xs">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
