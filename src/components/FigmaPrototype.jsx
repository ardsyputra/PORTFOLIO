import { ExternalLink } from "lucide-react";
import { toast } from "sonner";
import texture from "../assets/images/texture.avif";

export default function FigmaPrototype({
  number,
  title,
  category,
  description,
  video,
  fallbackFrame,
  figmaUrl,
  role = "UI/UX Designer",
  tools = ["Figma", "Wireframe", "Prototype"],
  challenge,
  solution,
  variant = "dark",
}) {
  const isLight = variant === "light";
  return (
    <section
      id={`project-${number}`}
      className={`relative min-h-screen overflow-hidden py-28 ${isLight ? "bg-white text-[#1E3A8A]" : "bg-[#1E3A8A] text-[#F7F4ED]"}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: `url(${texture})`, backgroundSize: "280px", backgroundRepeat: "repeat" }}
      />
      <div className={`absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full blur-3xl ${isLight ? "bg-[#F97316]/10" : "bg-[#F97316]/10"}`} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <span className="inline-flex rounded-full bg-[#F97316] px-5 py-2 text-sm font-black text-white">FIGMA / UI UX</span>
            <p className={`mt-8 text-xs font-bold uppercase tracking-[0.35em] ${isLight ? "text-[#1E3A8A]/55" : "text-[#F7F4ED]/50"}`}>{category}</p>
            <h2 className="mt-4 text-5xl font-black leading-[0.92] md:text-7xl">{number}<span className="mx-3 text-[#F97316]">/</span>{title}</h2>
            <p className={`mt-8 max-w-xl text-lg leading-8 ${isLight ? "text-[#1E3A8A]/70" : "text-[#F7F4ED]/70"}`}>{description}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[["Role", role], ["Tools", tools.join(", ")], ["Focus", category.split(" / ").pop()]].map(([label, value]) => (
                <div key={label} className={`rounded-[20px] p-4 backdrop-blur ${isLight ? "border border-[#1E3A8A]/10 bg-white shadow-lg" : "border border-white/10 bg-white/[0.06]"}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] ${isLight ? "text-[#1E3A8A]/45" : "text-[#F7F4ED]/45"}`}>{label}</p>
                  <p className={`mt-2 text-sm font-black leading-5 ${isLight ? "text-[#1E3A8A]" : "text-white"}`}>{value}</p>
                </div>
              ))}
            </div>
            <a href={figmaUrl} onClick={() => toast.info(`Opening ${title}`, { description: "Prototype link opened in a new tab." })} target="_blank" rel="noopener noreferrer" className={`mt-9 inline-flex items-center gap-2 rounded-full px-8 py-4 font-black transition hover:-translate-y-1 ${isLight ? "bg-[#1E3A8A] text-white shadow-xl" : "bg-[#F7F4ED] text-[#1E3A8A]"}`}>
              Open Figma Prototype <ExternalLink size={17} />
            </a>
          </div>

          <div className={`overflow-hidden rounded-[32px] p-3 shadow-[0_40px_100px_rgba(30,58,138,.18)] ${isLight ? "border border-[#1E3A8A]/10 bg-[#F7F4ED]" : "border border-white/10 bg-[#F7F4ED]"}`}>
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="h-3 w-3 rounded-full bg-[#F97316]" />
              <span className="h-3 w-3 rounded-full bg-[#1E3A8A]/30" />
              <span className="h-3 w-3 rounded-full bg-[#1E3A8A]/15" />
              <span className="ml-3 text-xs font-bold text-[#1E3A8A]/45">Prototype Playback</span>
            </div>
            <video className="aspect-video w-full rounded-[22px] bg-[#111]" controls autoPlay muted loop playsInline poster={fallbackFrame}>
              <source src={video} type="video/mp4" />
              Your browser does not support prototype video playback.
            </video>
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <article className={`rounded-[28px] p-7 ${isLight ? "border border-[#1E3A8A]/10 bg-white shadow-lg" : "border border-white/10 bg-white/[0.06]"}`}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F97316]">01 / Challenge</p>
            <p className={`mt-4 text-base leading-7 ${isLight ? "text-[#1E3A8A]/70" : "text-[#F7F4ED]/75"}`}>{challenge}</p>
          </article>
          <article className={`rounded-[28px] p-7 ${isLight ? "border border-[#1E3A8A]/10 bg-white shadow-lg" : "border border-white/10 bg-white/[0.06]"}`}>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[#F97316]">02 / Solution</p>
            <p className={`mt-4 text-base leading-7 ${isLight ? "text-[#1E3A8A]/70" : "text-[#F7F4ED]/75"}`}>{solution}</p>
          </article>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {["User Research & Flow", "Wireframe & UI System", "Interactive Prototype"].map((step, index) => (
            <div key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#F7F4ED] px-5 py-4 text-[#1E3A8A]">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#F97316] text-xs font-black text-white">0{index + 1}</span>
              <span className="text-sm font-black">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
