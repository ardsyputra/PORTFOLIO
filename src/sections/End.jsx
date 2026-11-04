import texture from "../assets/images/texture.avif";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function End() {
  const contacts = [
    {
      label: "Email",
      value: "ardsyputra@gmail.com",
      icon: Mail,
      href: "mailto:ardsyputra@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/ardsyputra",
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/ardsyputra",
    },
    {
      label: "Instagram",
      value: "@ard_syputra",
      icon: FaInstagram,
      href: "https://www.instagram.com/ard_syputra",
    },
  ];

  return (
    <section id="contact" className="relative min-h-screen scroll-mt-24 overflow-hidden bg-[#1E3A8A] py-24 text-[#F7F4ED]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />
      <div className="contact-glow absolute -right-40 top-10 h-[560px] w-[560px] rounded-full bg-[#F97316]/20 blur-3xl" />
      <div className="contact-orbit pointer-events-none absolute -right-20 bottom-[-180px] h-[420px] w-[420px] rounded-full border border-[#F7F4ED]/15" />
      <div className="absolute bottom-10 left-10 h-44 w-44 opacity-25" style={{
        backgroundImage: "radial-gradient(#F7F4ED 2px, transparent 2px)",
        backgroundSize: "18px 18px",
      }} />
      <span className="contact-float-label contact-float-label-one absolute left-[6%] top-16 hidden rotate-[-8deg] rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/65 lg:block">
        Full Stack
      </span>
      <span className="contact-float-label contact-float-label-two absolute right-[4%] top-[32%] hidden rotate-[8deg] rounded-full bg-[#F97316] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white lg:block">
        IT Support
      </span>
      <span className="contact-float-label contact-float-label-three absolute bottom-[18%] right-[7%] hidden rotate-[-6deg] rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-white/70 lg:block">
        UI/UX Design
      </span>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center px-6">
        <div className="contact-status mb-8 flex items-center gap-3">
          <span className="contact-status-dot h-3 w-3 rounded-full bg-[#F97316]" />
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#F7F4ED]/55">Available for opportunities</p>
        </div>

        <h2 className="contact-title max-w-5xl text-5xl font-black leading-[0.92] md:text-8xl">
          Let&apos;s create
          <span className="block text-[#F97316]">something great.</span>
        </h2>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="contact-note max-w-xl rounded-[24px] border border-[#1E3A8A]/10 bg-[#F7F4ED] px-7 py-6 text-base font-medium leading-8 text-[#1E3A8A]/80 shadow-[0_18px_50px_rgba(0,0,0,.18)] md:text-lg">
            Terima kasih sudah melihat portfolio saya. Mari terhubung untuk berdiskusi tentang project, kolaborasi, atau kesempatan kerja.
          </p>
          <p className="contact-tagline text-sm font-black uppercase tracking-[0.18em] text-[#F97316]">
            Let&apos;s stay in touch
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {contacts.map(({ label, value, icon: Icon, href }, index) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="contact-card flex items-center gap-4 rounded-[22px] border border-[#1E3A8A]/10 bg-[#F7F4ED] p-5 text-[#1E3A8A] shadow-[0_18px_45px_rgba(9,23,78,.22)]"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="contact-icon grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1E3A8A] text-white" style={{ animationDelay: `${index * 160}ms` }}>
                <Icon size={21} />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#1E3A8A]/45">{label}</span>
                <span className="mt-1 block truncate text-sm font-black text-[#1E3A8A] md:text-base">{value}</span>
              </span>
              <ArrowUpRight size={18} className="ml-auto shrink-0 text-[#F97316]" />
            </a>
          ))}
        </div>

        <div className="contact-role-strip mt-6 flex flex-wrap items-center justify-center gap-3 rounded-[24px] border border-white/10 bg-[#171717]/10 px-5 py-4 md:justify-between">
          {["Open for collaboration", "Project inquiries", "Job opportunities"].map((item, index) => (
            <span key={item} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/70 md:text-xs">
              <span className={`h-2 w-2 rounded-full ${index === 1 ? "bg-[#F7F4ED]" : "bg-[#F97316]"}`} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
