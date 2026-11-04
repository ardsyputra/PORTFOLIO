import texture from "../assets/images/texture.avif";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export default function Project1() {
  const project = {
    title: "Expense Tracker",
    category: "Full Stack Finance Product",
    description:
      "Aplikasi pencatatan keuangan dengan dashboard transaksi, kategori pengeluaran, autentikasi, pengaturan akun, dan REST API untuk membantu pengguna mengelola pendapatan serta pengeluaran.",
    role: "Full Stack Developer",
    tools: "React, TypeScript, Node.js, Gin, PostgreSQL",
    platform: "Web Application",
    tags: ["React", "TypeScript", "Node.js", "Gin", "PostgreSQL", "REST API"],
  };

  return (
    <section id="project" className="relative min-h-screen overflow-hidden bg-[#F7F4ED] py-28">
      <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `url(${texture})`, backgroundSize: "260px", backgroundRepeat: "repeat" }} />
      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#1E3A8A]/10 blur-3xl" />
      <div className="absolute right-10 top-24 h-52 w-52 rounded-full border-[18px] border-[#1E3A8A]/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <span className="inline-block rounded-full bg-[#1E3A8A] px-5 py-2 text-sm font-semibold tracking-widest text-[#F7F4ED]">FEATURED PROJECT</span>
            <h2 className="mt-6 text-5xl font-black text-[#1E3A8A] md:text-6xl">01 / Expense Tracker</h2>
          </div>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1E3A8A]/70">{project.category}</p>
            <h1 className="mt-6 text-6xl font-black leading-[0.88] text-[#1E3A8A] md:text-7xl">{project.title}</h1>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#1E3A8A]/10 bg-white px-4 py-2 text-sm font-bold text-[#1E3A8A] shadow-sm">{tag}</span>
              ))}
            </div>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#1E3A8A]/75">{project.description}</p>

            <div className="mt-9 grid grid-cols-2 gap-4">
              {[["Role", project.role], ["Tools", project.tools], ["Platform", project.platform]].map(([label, value]) => (
                <div key={label} className="rounded-[26px] border border-[#1E3A8A]/10 bg-white/80 p-5 shadow-lg backdrop-blur">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A]/45">{label}</p>
                  <h4 className="mt-2 font-black text-[#1E3A8A]">{value}</h4>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://expense-tracker-6hf2tkfxd-putras-projects-cfb47d66.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[#F97316] px-8 py-4 font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                Live Preview <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/ardsyputra/expense-tracker" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-[#1E3A8A]/15 bg-white px-8 py-4 font-black text-[#1E3A8A] shadow-lg transition hover:-translate-y-1 hover:border-[#1E3A8A]">
                View Repository <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[560px] md:min-h-[620px]">
            <div className="absolute inset-12 rounded-full bg-[#1E3A8A]/10 blur-3xl" />
            <div className="expense-shell absolute inset-x-0 top-10 mx-auto w-full max-w-[700px] overflow-hidden rounded-[36px] border border-white/60 bg-[#101F52] p-3 shadow-[0_45px_100px_rgba(30,58,138,.38)]">
              <div className="flex items-center gap-2 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>
              <div className="grid min-h-[500px] grid-cols-[70px_1fr] rounded-[26px] bg-[#F7F4ED] text-[#1E3A8A] md:grid-cols-[150px_1fr]">
                <aside className="border-r border-[#1E3A8A]/10 px-3 py-5 md:px-5">
                  <div className="text-lg font-black">ET</div>
                  <nav className="mt-8 space-y-3 text-xs font-bold md:text-sm">
                    {["Overview", "Transactions", "Categories", "Settings"].map((item, index) => (
                      <div key={item} className={`rounded-xl px-3 py-3 ${index === 0 ? "bg-[#1E3A8A] text-white" : "text-[#1E3A8A]/55"}`}>{item}</div>
                    ))}
                  </nav>
                </aside>
                <main className="p-4 md:p-7">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-[#1E3A8A]/45">Good morning</p>
                      <h3 className="mt-1 text-xl font-black md:text-2xl">Financial Overview</h3>
                    </div>
                    <div className="h-9 w-9 rounded-full bg-[#F97316]" />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                    {[["Balance", "$12,450"], ["Income", "$3,820"], ["Expense", "$1,940"]].map(([label, value], index) => (
                      <div key={label} className={`rounded-[20px] p-4 shadow-sm ${index === 0 ? "col-span-2 bg-[#1E3A8A] text-white md:col-span-1" : "bg-white"}`}>
                        <p className="text-xs opacity-60">{label}</p>
                        <p className="mt-2 text-lg font-black md:text-xl">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-[22px] bg-white p-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-black">Cash Flow</h4>
                      <span className="text-xs font-bold text-[#F97316]">This month</span>
                    </div>
                    <div className="mt-4 h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { month: "Jan", value: 42 }, { month: "Feb", value: 58 }, { month: "Mar", value: 38 },
                          { month: "Apr", value: 76 }, { month: "May", value: 52 }, { month: "Jun", value: 88 },
                        ]}>
                          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#1E3A8A" }} />
                          <Tooltip cursor={{ fill: "#1E3A8A", opacity: 0.05 }} contentStyle={{ borderRadius: 12, border: "none", fontSize: 12 }} />
                          <Bar dataKey="value" fill="#1E3A8A" radius={[5, 5, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div className="absolute bottom-4 left-0 rounded-[24px] bg-[#F97316] px-6 py-4 text-white shadow-2xl md:left-[-30px]">
              <p className="text-xs font-bold opacity-70">Pages</p><p className="text-xl font-black">Dashboard / Auth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
