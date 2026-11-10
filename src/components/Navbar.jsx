import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const menus = [
  { name: "HOME", link: "#home" },
  { name: "ABOUT", link: "#about" },
  { name: "SKILLS", link: "#skills" },
  { name: "PROJECTS", link: "#work" },
  { name: "EXPERIENCE", link: "#experience" },
  { name: "EDUCATION", link: "#education" },
  { name: "CONTACT", link: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const isClickScrollingRef = useRef(false);
  const clickTimeoutRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24);
    if (isClickScrollingRef.current) return;
    const scrollPos = window.scrollY + Math.min(window.innerHeight * 0.38, 260);
    const documentHeight = document.documentElement.scrollHeight;
    const windowBottom = window.innerHeight + window.scrollY;
    const byId = (id) => document.getElementById(id);
    const documentTop = (element) => element.getBoundingClientRect().top + window.scrollY;

    if (windowBottom >= documentHeight - 40) {
      setActiveSection("contact");
      return;
    }
    const currentSection = [...menus].reverse().find(({ link }) => {
      const section = byId(link.slice(1));
      return section && documentTop(section) <= scrollPos;
    });
    setActiveSection(currentSection?.link.slice(1) ?? "home");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    const raf = requestAnimationFrame(handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, [handleScroll]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    const targetId = link.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    setActiveSection(targetId);
    setIsMenuOpen(false);
    isClickScrollingRef.current = true;
    if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 1250);
    window.dispatchEvent(new CustomEvent("portfolio:navigate", { detail: { target } }));
  };

  const moveIndicator = useCallback(() => {
    const el = linkRefs.current[activeSection];
    const ind = indicatorRef.current;
    const ul = ind?.parentElement;
    if (!el || !ind || !ul) return;
    const elRect = el.getBoundingClientRect();
    const ulRect = ul.getBoundingClientRect();
    ind.style.left = `${elRect.left - ulRect.left}px`;
    ind.style.width = `${elRect.width}px`;
  }, [activeSection]);

  useEffect(() => {
    moveIndicator();
    const ro = new ResizeObserver(moveIndicator);
    const list = indicatorRef.current?.parentElement;
    if (list) ro.observe(list);
    Object.values(linkRefs.current).forEach((link) => link && ro.observe(link));
    window.addEventListener("resize", moveIndicator, { passive: true });
    document.fonts?.ready.then(moveIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  useEffect(() => {
    window.addEventListener("scroll", moveIndicator, { passive: true });
    return () => window.removeEventListener("scroll", moveIndicator);
  }, [moveIndicator]);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`navbar-shell fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(100vw-24px)] ${isScrolled ? "is-scrolled" : "is-at-top"}`}
    >
      <motion.nav
        className={`flex items-center justify-between gap-4 px-4 py-2.5 rounded-xl border transition-colors duration-300 ${
          isDark ? "bg-[#0B1120]/90 border-white/10" : "bg-white/90 border-black/10"
        }`}
        animate={reduceMotion ? undefined : { scale: isScrolled ? 0.985 : 1, y: isScrolled ? -1 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, mass: .7 }}
      >
        {/* Brand */}
        <motion.a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          whileHover={reduceMotion ? undefined : { scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-colors hover:opacity-90 cursor-interactive"
        >
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-sm bg-[#1E3A8A] text-white text-[10px] font-black">
            AP
          </span>
          <span className={`font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
            Ardiansyah<span className="text-[#1E3A8A]">.</span>
          </span>
        </motion.a>

        {/* Menu */}
        <ul className="relative hidden md:flex items-center gap-1">
          {menus.map((item) => {
            const key = item.link.slice(1);
            const isActive = activeSection === key;
            const isHovered = hoveredMenu === item.name;
            return (
              <li key={item.name} onMouseEnter={() => setHoveredMenu(item.name)} className="relative">
                <a
                  ref={(el) => { linkRefs.current[key] = el; }}
                  href={item.link}
                  onClick={(e) => handleNavClick(e, item.link)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-link relative z-10 block px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors duration-200 cursor-interactive ${
                    isActive
                      ? "is-active text-[var(--accent)]"
                      : isDark
                      ? "text-slate-400 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-[#1E3A8A] hover:bg-black/5"
                  }`}
                >
                  {isActive && <motion.span layoutId="navbar-active-glass" className="nav-active-glass" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 280, damping: 27, mass: .72 }} aria-hidden="true" />}
                  {item.name}
                </a>
                {isHovered && !isActive && (
                  <motion.div
                    layoutId="hover-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                    className="absolute inset-0 rounded-lg"
                    style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}
                  />
                )}
              </li>
            );
          })}
          <motion.div ref={indicatorRef} className="nav-indicator" />
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`navbar-theme-toggle p-2 rounded-lg border transition-colors duration-200 cursor-interactive ${
              isDark ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-black/5 border-black/10 text-slate-900 hover:bg-black/10"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                  <Sun size={16} />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.6 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
                  <Moon size={16} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            onClick={() => setIsMenuOpen((p) => !p)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            whileHover={reduceMotion ? undefined : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg border transition-colors duration-200 cursor-interactive"
            style={{ borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)", color: isDark ? "white" : "#0F172A" }}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-[60] bg-black/5 backdrop-blur-sm md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 30 }}
              className={`fixed inset-y-0 right-0 z-[61] w-full sm:w-80 border-l p-6 md:hidden ${isDark ? "bg-[#171a18]/95 border-white/10" : "bg-[#f3efe7]/95 border-black/10"}`}
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-xs uppercase tracking-wider text-[var(--accent)]">Navigasi</span>
                <motion.button onClick={() => setIsMenuOpen(false)} whileTap={{ scale: 0.95 }} className="p-2 rounded-md hover:bg-black/5 cursor-interactive">
                  <X size={16} />
                </motion.button>
              </div>
              <nav className="space-y-1">
                {menus.map((item) => {
                  const key = item.link.slice(1);
                  const isActive = activeSection === key;
                  return (
                    <motion.a
                      key={key}
                      href={item.link}
                      onClick={() => { setIsMenuOpen(false); handleNavClick({ preventDefault() {} }, item.link); }}
                      aria-current={isActive ? "page" : undefined}
                      whileHover={reduceMotion ? undefined : { x: 6 }}
                      whileTap={{ scale: 0.96 }}
                      className={`mobile-nav-link block px-4 py-3 rounded-lg text-sm font-bold transition-colors ${
                        isActive ? "is-active text-white bg-[#1E3A8A]" : "text-slate-600 hover:text-[#1E3A8A] hover:bg-black/5"
                      }`}
                    >
                      {isActive && <motion.span layoutId="mobile-nav-indicator" className="mobile-nav-indicator" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 30 }} aria-hidden="true" />}
                      {item.name}
                    </motion.a>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
}
