import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import MagneticButton from "../components/MagneticButton";

const email = "ardsyputra@gmail.com";
const contacts = [
  { label: "Email", value: email, icon: Mail, href: `mailto:${email}`, color: "#B94D32" },
  { label: "LinkedIn", value: "linkedin.com/in/ardsyputra", icon: ArrowUpRight, href: "https://www.linkedin.com/in/ardsyputra", color: "#2563EB" },
  { label: "GitHub", value: "github.com/ardsyputra", icon: FaGithub, href: "https://github.com/ardsyputra", color: "#34433c" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";
  const { scrollYProgress } = useScroll();
  const float = useTransform(scrollYProgress, [0, 1], [22, -22]);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const tiltNote = (event) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    rotateX.set(((event.clientY - bounds.top) / bounds.height - 0.5) * -9);
    rotateY.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 11);
  };
  const resetNoteTilt = () => { rotateX.set(0); rotateY.set(0); };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="contact-editorial relative min-h-screen overflow-hidden">
      <motion.div className="contact-glow absolute -top-40 -right-40 h-[620px] w-[620px] rounded-full blur-[100px] pointer-events-none" style={{ y: float }} />
      <motion.div className="contact-orbit" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 46, repeat: Infinity, ease: "linear" }}><span /></motion.div>

      <div className="section-inner relative z-10">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="contact-heading mb-16"
        >
          <span className="text-kicker block mb-4">06 / Mari berkolaborasi</span>
          <h2 className="text-section-title">Punya ide?<br /><span>Mari wujudkan.</span></h2>
          <p className={`mt-5 text-body-lg max-w-xl ${isDark ? "text-slate-400" : "text-slate-600"}`}>
            Saya terbuka untuk peluang kerja, proyek freelance, dan kolaborasi produk digital.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {contacts.map(({ label, value, icon: Icon, href, color }, index) => (
              <MagneticButton
                key={label}
                as="a"
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                strength={0.16}
                maxDistance={9}
                className="contact-link flex items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface-alt)] p-5 transition-colors"
                style={{ "--contact-delay": `${index * 80}ms` }}
              >
                <span className="contact-link-icon" style={{ color, backgroundColor: `${color}15` }}><Icon size={19} /></span>
                <span className="min-w-0"><span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)]">{label}</span><span className="block truncate font-medium">{value}</span></span>
                <ArrowUpRight className="contact-link-arrow ml-auto" size={17} aria-hidden="true" />
              </MagneticButton>
            ))}
            <button type="button" className="copy-email" onClick={copyEmail}>
              {copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Email tersalin" : "Salin alamat email"}
            </button>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="contact-note"
            onMouseMove={tiltNote}
            onMouseLeave={resetNoteTilt}
            style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
          >
            <motion.div className="contact-3d-object" aria-hidden="true" animate={reduceMotion ? undefined : { y: [0, -10, 0], rotateZ: [0, 8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <span className="contact-3d-ring contact-3d-ring-one" /><span className="contact-3d-ring contact-3d-ring-two" /><span className="contact-3d-core" />
            </motion.div>
            <span className="contact-note-index">CATATAN TERBUKA <i>01—03</i></span>
            <h3>Mari mulai dengan percakapan.</h3>
            <p>Ceritakan kebutuhan Anda. Saya akan membalas lewat email untuk membicarakan langkah berikutnya.</p>
            <MagneticButton as="a" href={`mailto:${email}?subject=Kolaborasi%20proyek`} strength={0.2} maxDistance={12} className="btn btn-primary">
              Kirim email <ArrowUpRight size={16} />
            </MagneticButton>
            <span className="contact-note-scribble" aria-hidden="true">↗</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
