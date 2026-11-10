import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, GitBranch, Images, ChevronDown, Play, Pause, Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../context/ThemeContext";
import MagneticButton from "../components/MagneticButton";

const screenNames = {
  dasboard: "Dashboard",
  dashboard: "Dashboard",
  transaction: "Transaksi",
  transactions: "Transaksi",
  categories: "Kategori",
  "add-transaction": "Tambah Transaksi",
  "add-categories": "Tambah Kategori",
  "add-category": "Tambah Kategori",
  settings: "Pengaturan",
  login: "Login",
  register: "Register",
  "lupa-password": "Lupa Password",
  "admin-dashboard": "Dashboard Admin",
  "admin-pegawai": "Data Pegawai",
  "admin-position": "Data Jabatan",
  "admin-department": "Data Departemen",
  "admin-history": "Riwayat Admin",
  "admin-report": "Laporan Admin",
  profile: "Profil Pegawai",
  "atasan-dashboard": "Dashboard Atasan",
  "atasan-pengajuan": "Pengajuan Lembur",
  "atasan-approval": "Persetujuan Lembur",
  "atasan-history": "Riwayat Atasan",
  "profile-atasan": "Profil Atasan",
  "pegawai-dashboard": "Dashboard Pegawai",
  "pegawai-penugasan": "Penugasan Pegawai",
  "profile-pegawai": "Profil Pegawai",
  "validasi-resi-awal": "Validasi Resi",
  "detail-resi-valid": "Detail Resi Valid",
  "resi-tidak-valid": "Resi Tidak Valid",
};

function getScreenName(src, index) {
  const filename = decodeURIComponent(src.split("/").pop() || "").replace(/\.[^.]+$/, "");
  const normalized = filename
    .replace(/^\d+-/, "")
    .replace(/^(capture|live)-mobile-/, "")
    .replace(/^mobile-/, "")
    .replace(/^mobile_/, "")
    .toLowerCase();
  if (screenNames[normalized]) return screenNames[normalized];
  if (normalized.startsWith("whatsapp-image")) return `Dokumentasi Tambahan ${String(index + 1).padStart(2, "0")}`;
  if (normalized.startsWith("campus-")) return `Tampilan Kampus ${normalized.slice(-2)}`;
  if (normalized.startsWith("food-")) return `Tampilan Kuliner ${normalized.slice(-2)}`;
  if (normalized === "blockchain") return "Arsitektur Blockchain";
  return normalized.split(/[-_]/).filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join(" ") || `Tampilan ${String(index + 1).padStart(2, "0")}`;
}

export default function ProjectCard({
  number,
  name,
  category,
  description,
  problem,
  technologies = [],
  role,
  contribution,
  system,
  challenge,
  outcome,
  image,
  imagePosition = "right",
  liveUrl,
  repositoryUrl,
  gallery = { images: [] },
  index,
  total,
}) {
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();
  const isDark = theme === "dark";

  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 85, damping: 24, mass: 0.35 });
  const imgMove = useTransform(smoothScrollProgress, [0, 1], [-10, 10]);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [filmStarted, setFilmStarted] = useState(false);
  const [filmPlaying, setFilmPlaying] = useState(false);
  const [filmTime, setFilmTime] = useState(0);
  const [filmDuration, setFilmDuration] = useState(0);
  const filmRef = useRef(null);

  const galleryGroups = gallery.groups?.length
    ? gallery.groups
    : [{ key: "all", label: "Layar proyek", images: gallery.images || [] }];
  const allImages = galleryGroups.flatMap((group) => group.images || []);
  const visibleImages = selectedGroup === "all"
    ? allImages
    : galleryGroups.find((group) => group.key === selectedGroup)?.images || [];

  useEffect(() => {
    const video = filmRef.current;
    if (!video) return undefined;
    const updateTime = () => setFilmTime(video.currentTime || 0);
    const updateDuration = () => setFilmDuration(Number.isFinite(video.duration) ? video.duration : 0);
    const updatePlayback = () => setFilmPlaying(!video.paused && !video.ended);
    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);
    video.addEventListener("durationchange", updateDuration);
    video.addEventListener("play", updatePlayback);
    video.addEventListener("pause", updatePlayback);
    video.addEventListener("ended", updatePlayback);
    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      video.removeEventListener("durationchange", updateDuration);
      video.removeEventListener("play", updatePlayback);
      video.removeEventListener("pause", updatePlayback);
      video.removeEventListener("ended", updatePlayback);
    };
  }, [gallery.video, galleryOpen]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const handleKey = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((index) => (index + 1) % visibleImages.length);
      if (event.key === "ArrowLeft") setLightboxIndex((index) => (index - 1 + visibleImages.length) % visibleImages.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, visibleImages.length]);

  const startFilm = () => {
    const playback = filmRef.current?.play();
    playback?.then(() => setFilmStarted(true)).catch(() => setFilmPlaying(false));
  };
  const toggleFilm = () => {
    if (!filmRef.current) return;
    if (filmRef.current.paused) filmRef.current.play().catch(() => setFilmPlaying(false));
    else filmRef.current.pause();
  };
  const seekFilm = (event) => {
    if (!filmRef.current) return;
    filmRef.current.currentTime = Number(event.target.value);
    setFilmTime(Number(event.target.value));
  };
  const formatTime = (time) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, "0")}`;

  const isLast = index === total - 1;

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.95, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`relative group z-10 ${!isLast ? "mb-24" : "mb-0"} ${
        "flex flex-col lg:flex-row lg:flex-wrap lg:items-stretch"
      }`}
    >
      <div className={`w-full lg:w-1/2 ${imagePosition === "left" ? "order-2 lg:order-2" : "order-1 lg:order-1"} relative`}>
        {/* Number badge overlay on image */}
        <div className="absolute -top-6 -left-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/80 backdrop-blur px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] shadow-lg translate-x-0 sm:translate-x-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
          <span>{number}</span>
        </div>

        <div
          className={`image-reveal relative aspect-[4/5] lg:aspect-[16/11] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] shadow-[0_24px_60px_-20px_rgba(15,23,42,0.12)] ${
            isDark ? "bg-slate-900/40" : "bg-slate-100"
          }`}
          style={{ y: reduceMotion ? 0 : imgMove }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </div>

      <div className={`w-full lg:w-1/2 ${imagePosition === "left" ? "order-1 lg:order-1" : "order-2 lg:order-2"} flex flex-col justify-center py-8 lg:py-0 lg:pl-12`}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface)] px-5 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[var(--accent)] shadow-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span>{category}</span>
        </motion.div>

        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.25 + index * 0.1 }}
          className="mt-0 mb-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1]"
        >
          {name}
        </motion.h2>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.35 + index * 0.1 }}
          className={`text-body leading-relaxed mb-7 max-w-xl ${isDark ? "text-slate-300" : "text-slate-600"}`}
        >
          {description}
        </motion.p>

        {/* Problem solved */}
        {problem && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
            className="mb-7"
          >
            <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--accent-2)] mb-2">Masalah yang dipecahkan</span>
            <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>{problem}</p>
          </motion.div>
        )}

        {/* Technology stack — staggered tags */}
        <div className="mb-7">
          <span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)] mb-3">Teknologi</span>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech, tIdx) => (
              <motion.span
                key={tech}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: 0.5 + tIdx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="tag"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Role + contribution */}
        {role || contribution || system || challenge || outcome ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.65 + index * 0.1 }}
            className={`mb-8 pt-4 border-t border-[var(--border-soft)] ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            {role && (
              <p className="mb-2">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)] block mb-1">Peran saya</span>
                <span className="text-sm font-bold">{role}</span>
              </p>
            )}
            {contribution && (
              <p className="text-sm leading-relaxed">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)] block mb-1">Kontribusi utama</span>
                {contribution}
              </p>
            )}
            {system && <p className="mb-2 text-sm leading-relaxed"><span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)]">Rancangan sistem</span>{system}</p>}
            {challenge && <p className="mb-2 text-sm leading-relaxed"><span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)]">Tantangan</span>{challenge}</p>}
            {outcome && <p className="mb-2 text-sm leading-relaxed"><span className="block text-[11px] font-black uppercase tracking-[0.2em] text-[var(--ink-muted)]">Hasil</span>{outcome}</p>}
          </motion.div>
        ) : null}

        {/* Actions */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.75 + index * 0.1 }}
          className="flex flex-wrap gap-3"
        >
          {repositoryUrl && (
            <MagneticButton as="a" href={repositoryUrl} strength={0.3} maxDistance={14} className="btn btn-outline">
              <GitBranch size={16} /> Repositori
            </MagneticButton>
          )}
          {liveUrl && (
            <MagneticButton as="a" href={liveUrl} strength={0.3} maxDistance={14} className="btn btn-primary">
              Demo langsung <ArrowUpRight size={16} />
            </MagneticButton>
          )}
          {(allImages.length > 0 || gallery.video) && (
            <motion.button
              type="button"
              onClick={() => setGalleryOpen((open) => !open)}
              aria-expanded={galleryOpen}
              whileTap={{ scale: 0.97 }}
              className="btn btn-outline project-gallery-toggle"
            >
              <Images size={16} /> {galleryOpen ? "Tutup galeri" : "Galeri proyek"}
              <motion.span animate={{ rotate: galleryOpen ? 180 : 0 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}><ChevronDown size={15} /></motion.span>
            </motion.button>
          )}
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {galleryOpen && (
          <motion.div
            key="project-gallery"
            layout
            className="project-gallery order-3 w-full basis-full"
            initial={reduceMotion ? false : { opacity: 0, height: 0, y: 12, marginTop: 0, paddingTop: 0, paddingBottom: 0, borderColor: "transparent" }}
            animate={{ opacity: 1, height: "auto", y: 0, marginTop: "2.5rem", paddingTop: "clamp(1.25rem, 3vw, 2.4rem)", paddingBottom: "clamp(1.25rem, 3vw, 2.4rem)", borderColor: "var(--border)" }}
            exit={reduceMotion ? { opacity: 0, height: 0, y: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0, borderColor: "transparent" } : { opacity: 0, height: 0, y: -8, marginTop: 0, paddingTop: 0, paddingBottom: 0, borderColor: "transparent" }}
            transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1], layout: { duration: reduceMotion ? 0 : 0.68, ease: [0.22, 1, 0.36, 1] } }}
          >
            <div className="project-gallery-heading">
              <div><span>{number} / GALERI VISUAL</span><h3>{name} {allImages.length ? "— layar proyek" : "— video proyek"}</h3></div>
              <p>{allImages.length ? `${visibleImages.length} dari ${allImages.length} dokumentasi visual${gallery.video ? " + project film" : ""}` : "Video proyek · tekan tombol play untuk menonton"}</p>
            </div>
            {gallery.groups?.length > 1 && (
              <div className="project-gallery-filters" role="tablist" aria-label={`Filter dokumentasi ${name}`}><button type="button" role="tab" aria-selected={selectedGroup === "all"} className={selectedGroup === "all" ? "is-selected" : ""} onClick={() => { setSelectedGroup("all"); setGalleryIndex(0); setLightboxIndex(null); }}>Semua <span>{allImages.length}</span></button>{galleryGroups.map((group) => <button key={group.key} type="button" role="tab" aria-selected={selectedGroup === group.key} className={selectedGroup === group.key ? "is-selected" : ""} onClick={() => { setSelectedGroup(group.key); setGalleryIndex(0); setLightboxIndex(null); }}>{group.label} <span>{group.images.length}</span></button>)}</div>
            )}
            <div className="project-gallery-showcase">
              {visibleImages.length > 0 && <>
                <div className="project-gallery-carousel">
                  {visibleImages.length > 1 && <button type="button" className="project-gallery-arrow project-gallery-prev" onClick={() => setGalleryIndex((galleryIndex - 1 + visibleImages.length) % visibleImages.length)} aria-label="Foto sebelumnya"><ChevronLeft size={22} /></button>}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figure key={visibleImages[galleryIndex]} className="project-gallery-item" initial={reduceMotion ? false : { opacity: 0, x: 28, scale: .98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, x: -28, scale: .98 }} transition={{ duration: reduceMotion ? 0 : .35, ease: [0.16, 1, 0.3, 1] }}>
                      <button type="button" className="project-gallery-image-button" onClick={() => setLightboxIndex(galleryIndex)} aria-label={"Perbesar dokumentasi " + (galleryIndex + 1) + " dari " + name}>
                        <img src={visibleImages[galleryIndex]} alt={name + " tampilan " + (galleryIndex + 1)} loading="lazy" />
                        <span className="project-gallery-zoom"><Maximize2 size={18} /> Perbesar</span>
                      </button>
                      <figcaption><span>{getScreenName(visibleImages[galleryIndex], galleryIndex)}</span><span>{name}</span></figcaption>
                    </motion.figure>
                  </AnimatePresence>
                  {visibleImages.length > 1 && <button type="button" className="project-gallery-arrow project-gallery-next" onClick={() => setGalleryIndex((galleryIndex + 1) % visibleImages.length)} aria-label="Foto berikutnya"><ChevronRight size={22} /></button>}
                </div>
                <div className="project-gallery-pagination"><span>{String(galleryIndex + 1).padStart(2, "0")} <i>/ {String(visibleImages.length).padStart(2, "0")}</i></span><div>{visibleImages.map((src, dotIndex) => <button key={src} type="button" className={dotIndex === galleryIndex ? "is-current" : ""} onClick={() => setGalleryIndex(dotIndex)} aria-label={"Lihat foto " + (dotIndex + 1)} aria-current={dotIndex === galleryIndex ? "true" : undefined} />)}</div></div>
              </>}
            </div>
            <div className="project-gallery-grid">
              {gallery.video && (
                <motion.figure
                  className="project-gallery-item project-gallery-item-video"
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : (gallery.images?.length || 0) * 0.09, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="project-film-frame">
                    <video ref={filmRef} src={gallery.video} poster={visibleImages[0] || gallery.images?.[0]} playsInline preload="metadata" aria-label={name + " project film"}>
                      Browser tidak mendukung pemutaran video.
                    </video>
                    {!filmStarted && <div className="project-film-play-wrap"><motion.button type="button" className="project-film-play" onClick={startFilm} aria-label={"Putar film " + name} whileHover={reduceMotion ? undefined : { scale: 1.08 }} whileTap={{ scale: .94 }}><Play size={27} fill="currentColor" /></motion.button></div>}
                  </div>
                  {filmStarted && <div className="project-film-controls">
                    <button type="button" onClick={toggleFilm} aria-label={filmPlaying ? "Jeda film" : "Putar film"}>{filmPlaying ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button>
                    <span>{formatTime(filmTime)}</span>
                    <input type="range" min="0" max={filmDuration || 0} step="0.1" value={Math.min(filmTime, filmDuration || 0)} onChange={seekFilm} aria-label="Posisi film" />
                    <span>{formatTime(filmDuration)}</span>
                    <button type="button" onClick={() => filmRef.current?.requestFullscreen?.()} aria-label="Layar penuh"><Maximize2 size={16} /></button>
                  </div>}
                  <figcaption><span>PROJECT FILM</span><span>{name}</span></figcaption>
                </motion.figure>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {createPortal(
        <AnimatePresence>
          {lightboxIndex !== null && <motion.div key="project-lightbox" className="project-lightbox" role="dialog" aria-modal="true" aria-label={"Dokumentasi " + name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightboxIndex(null); }}>
            <div className="project-lightbox-toolbar"><span>{name} <i>{String(lightboxIndex + 1).padStart(2, "0")} / {String(visibleImages.length).padStart(2, "0")}</i></span><button type="button" onClick={() => setLightboxIndex(null)} aria-label="Tutup gambar"><X size={22} /></button></div>
            {visibleImages.length > 1 && <button type="button" className="project-lightbox-arrow project-lightbox-prev" onClick={() => setLightboxIndex((index) => (index - 1 + visibleImages.length) % visibleImages.length)} aria-label="Gambar sebelumnya"><ChevronLeft size={26} /></button>}
            <motion.img key={visibleImages[lightboxIndex]} src={visibleImages[lightboxIndex]} alt={name + " dokumentasi " + (lightboxIndex + 1)} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .3 }} />
            {visibleImages.length > 1 && <button type="button" className="project-lightbox-arrow project-lightbox-next" onClick={() => setLightboxIndex((index) => (index + 1) % visibleImages.length)} aria-label="Gambar berikutnya"><ChevronRight size={26} /></button>}
          </motion.div>}
        </AnimatePresence>,
        document.body
      )}
    </motion.article>
  );
}
