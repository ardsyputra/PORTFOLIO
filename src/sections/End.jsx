import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function End() {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <footer id="footer" className={`relative min-h-[400px] overflow-hidden ${
      isDark ? "bg-[#0B1120] text-[#F7F4ED]" : "bg-[#F7F4ED] text-[#0F172A]"
    }`}>
      <div className="section-inner relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-10 border-b border-[var(--border)]"
        >
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[var(--ink-muted)]">
            <span className="text-[#F97316]">© 2026</span>
            <span>Ardiansyah Putra.</span>
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] text-[10px] font-black uppercase tracking-wider shadow-sm"
          >
            <ArrowUp size={14} /> Kembali ke atas
          </motion.button>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 text-center"
        >
          <a
            href="mailto:ardsyputra@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-5 py-2.5 text-[11px] font-black uppercase tracking-wider shadow-sm hover:bg-[var(--accent-soft)] transition-colors"
          >
            <Mail size={14} /> ardsyputra@gmail.com
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
