"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight, Search, X } from "lucide-react";
import { projects } from "@/data/resume";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const categories = ["All", "Full Stack", "Frontend"];

const PROJECT_ACCENTS: Record<string, { accent: string; glow: string; border: string }> = {
  "educore-erp":       { accent: "hsl(168 74% 43%)",  glow: "rgba(22,163,114,0.10)",  border: "rgba(22,163,114,0.3)"  },
  "ecommerce-website": { accent: "hsl(252 87% 63%)",  glow: "rgba(139,92,246,0.10)",  border: "rgba(139,92,246,0.3)"  },
  studiopro:           { accent: "hsl(199 89% 52%)",  glow: "rgba(14,165,233,0.10)",  border: "rgba(14,165,233,0.3)"  },
  kidzoo:              { accent: "hsl(142 71% 45%)",  glow: "rgba(34,197,94,0.10)",   border: "rgba(34,197,94,0.3)"   },
  cinevault:           { accent: "hsl(24 95% 55%)",   glow: "rgba(249,115,22,0.10)",  border: "rgba(249,115,22,0.3)"  },
};

const SCREENSHOTS: Record<string, string> = {
  "educore-erp":       "/previews/educore.png",
  "ecommerce-website": "/previews/ecommerce.png",
  studiopro:           "/previews/studiopro.png",
  kidzoo:              "/previews/kidzoo.png",
  cinevault:           "/previews/cinevault.png",
};

const EMBED_BLOCKED = new Set(["kidzoo", "educore-erp"]);

const STATUS = {
  live:      { label: "Live",        cls: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25" },
  completed: { label: "Completed",   cls: "text-sky-500 bg-sky-500/10 border-sky-500/25"             },
  wip:       { label: "In Progress", cls: "text-amber-500 bg-amber-500/10 border-amber-500/25"       },
};

/* ─── Expandable project card ─────────────────────────── */
function ProjectCard({
  project,
  globalIndex,
  isActive,
  onToggle,
}: {
  project: typeof projects[0];
  globalIndex: number;
  isActive: boolean;
  onToggle: () => void;
}) {
  const colors     = PROJECT_ACCENTS[project.slug] ?? PROJECT_ACCENTS["ecommerce-website"];
  const status     = STATUS[project.status];
  const screenshot = SCREENSHOTS[project.slug];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      {/* Hover/active glow */}
      <div
        className="absolute -inset-1 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ background: colors.glow, filter: "blur(24px)", opacity: isActive ? 1 : 0 }}
      />

      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer"
        style={{
          border: `1px solid ${isActive ? colors.border : "hsl(var(--border) / 0.5)"}`,
          background: "hsl(var(--card))",
        }}
        onClick={onToggle}
      >
        {/* ── Collapsed header row ─────────────── */}
        <div className="flex items-center gap-4 px-5 py-4 sm:px-7 sm:py-5">
          {/* Number */}
          <span
            className="text-2xl sm:text-3xl font-black tabular-nums leading-none flex-shrink-0 w-10 transition-colors duration-300"
            style={{ color: isActive ? colors.accent : "hsl(var(--border))" }}
          >
            {String(globalIndex + 1).padStart(2, "0")}
          </span>

          {/* Screenshot thumbnail */}
          {screenshot && (
            <div className="hidden sm:block w-20 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-border/40">
              <Image
                src={screenshot}
                alt={project.title}
                width={80}
                height={48}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-foreground text-base sm:text-lg truncate">{project.title}</h2>
              <span
                className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border flex-shrink-0 ${status.cls}`}
              >
                {project.status === "live" ? "● " : ""}{status.label}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <span className="text-xs text-muted-foreground font-mono">{project.category}</span>
              <span className="text-border">·</span>
              <div className="flex gap-1 flex-wrap">
                {project.techStack.slice(0, 3).map((t) => (
                  <span key={t} className="text-[10px] text-muted-foreground font-mono">{t}</span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">+{project.techStack.length - 3}</span>
                )}
              </div>
            </div>
          </div>

          {/* Expand chevron */}
          <motion.div
            animate={{ rotate: isActive ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300"
            style={{
              background: isActive ? colors.glow : "hsl(var(--secondary))",
              border: `1px solid ${isActive ? colors.border : "hsl(var(--border) / 0.4)"}`,
            }}
          >
            <ArrowUpRight size={14} style={{ color: isActive ? colors.accent : undefined }} className={isActive ? "" : "text-muted-foreground"} />
          </motion.div>
        </div>

        {/* ── Expanded panel ───────────────────── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Divider */}
              <div className="mx-5 sm:mx-7 h-px" style={{ background: colors.border }} />

              <div className="flex flex-col lg:flex-row gap-0">
                {/* Browser preview */}
                <div className="lg:w-[58%] p-4 sm:p-6" onClick={(e) => e.stopPropagation()}>
                  <BrowserFrame
                    screenshotSrc={screenshot}
                    liveUrl={project.live ?? undefined}
                    title={project.title}
                    accent={colors.accent}
                    height={260}
                    embedBlocked={EMBED_BLOCKED.has(project.slug)}
                  />
                </div>

                {/* Info */}
                <div className="lg:w-[42%] p-5 sm:p-6 lg:p-7 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    {project.metrics && (
                      <div className="flex gap-4 mb-5">
                        {Object.entries(project.metrics).slice(0, 3).map(([k, v]) => (
                          <div key={k}>
                            <div className="text-base font-bold" style={{ color: colors.accent }}>{v}</div>
                            <div className="text-[10px] text-muted-foreground capitalize">{k.replace(/([A-Z])/g, " $1").trim()}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech chips */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.techStack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-[11px] rounded-lg font-mono text-muted-foreground"
                          style={{ background: colors.glow, border: `1px solid ${colors.border}` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 flex-wrap" onClick={(e) => e.stopPropagation()}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:-translate-y-0.5 transition-transform"
                      style={{ background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`, boxShadow: `0 6px 20px ${colors.glow}` }}
                    >
                      Case Study <ArrowUpRight size={13} />
                    </Link>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border/40">
                        <Github size={15} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors border border-border/40">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Page ────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [mounted, setMounted]           = useState(false);
  const [activeCategory, setCategory]   = useState("All");
  const [search, setSearch]             = useState("");
  const [activeId, setActiveId]         = useState<string | null>(projects[0]?.id ?? null);

  useEffect(() => { setMounted(true); }, []);

  const filtered = projects.filter((p) => {
    const matchCat    = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">

      {/* ── Header ──────────────────────────────── */}
      <section className="section border-b border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Work</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Projects I&apos;ve
              <span className="gradient-text"> Built</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Full-stack applications built with the MERN stack — from concept to production, with live previews.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mt-8"
          >
            {/* Search */}
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or tech…"
                className="w-full pl-8 pr-8 py-2 text-sm bg-secondary/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3.5 py-1.5 text-sm rounded-lg border font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30 glass"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Count */}
            <span className="text-xs text-muted-foreground ml-auto">
              {filtered.length} project{filtered.length !== 1 ? "s" : ""}
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── Project list ────────────────────────── */}
      <section className="section">
        <div className="container max-w-4xl">
          {!mounted ? (
            <div className="flex flex-col gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 glass border border-border/40 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-24 text-muted-foreground"
                >
                  <div className="text-5xl mb-4 opacity-20">🔍</div>
                  <p className="text-lg font-medium mb-1">No projects found</p>
                  <p className="text-sm">Try a different search or filter</p>
                </motion.div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filtered.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      globalIndex={i}
                      isActive={activeId === project.id}
                      onToggle={() => setActiveId(activeId === project.id ? null : project.id)}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
