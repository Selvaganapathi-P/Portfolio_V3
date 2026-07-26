"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Layers, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/data/resume";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const categories = ["All", "Full Stack", "Frontend"];

const statusColors = {
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  wip: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

const PROJECT_ACCENTS: Record<string, { accent: string; bg: string; border: string }> = {
  "ecommerce-website": { accent: "hsl(252 87% 63%)", bg: "hsl(252 87% 63% / 0.06)", border: "hsl(252 87% 63% / 0.3)" },
  studiopro:           { accent: "hsl(199 89% 52%)", bg: "hsl(199 89% 52% / 0.06)", border: "hsl(199 89% 52% / 0.3)" },
  kidzoo:              { accent: "hsl(142 71% 45%)", bg: "hsl(142 71% 45% / 0.06)", border: "hsl(142 71% 45% / 0.3)" },
  cinevault:           { accent: "hsl(24 95% 55%)",  bg: "hsl(24 95% 55% / 0.06)",  border: "hsl(24 95% 55% / 0.3)"  },
};

const SCREENSHOTS: Record<string, string> = {
  "ecommerce-website": "/previews/ecommerce.png",
  studiopro: "/previews/studiopro.png",
  kidzoo:    "/previews/kidzoo.png",
  cinevault: "/previews/cinevault.png",
};

/* ─── Mobile Embla carousel ─────────────────────────── */
function ProjectCarousel({ items }: { items: typeof projects }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex">
          {items.map((project) => {
            const colors = PROJECT_ACCENTS[project.slug] ?? PROJECT_ACCENTS["ecommerce-website"];
            const screenshot = SCREENSHOTS[project.slug];
            return (
              <div key={project.id} className="flex-[0_0_90%] min-w-0 pl-4">
                <MobileProjectCard
                  project={project}
                  colors={colors}
                  screenshot={screenshot}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Nav buttons */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          className="p-2 rounded-full glass border border-border/40 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          className="p-2 rounded-full glass border border-border/40 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ─── Single card (shared by grid & carousel) ───────── */
function MobileProjectCard({
  project,
  colors,
  screenshot,
}: {
  project: typeof projects[0];
  colors: { accent: string; bg: string; border: string };
  screenshot?: string;
}) {
  return (
    <article className="glass border border-border/40 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
      <div className="p-3 pb-0">
        <BrowserFrame
          screenshotSrc={screenshot}
          liveUrl={project.live ?? undefined}
          title={project.title}
          accent={colors.accent}
          height={180}
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="font-bold text-foreground text-base">{project.title}</h2>
          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${statusColors[project.status]}`}>
            {project.status === "live" ? "● Live" : project.status === "completed" ? "Done" : "WIP"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techStack.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-3 border-t border-border/40">
          <Link href={`/projects/${project.slug}`} className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.accent }}>
            Case Study <ArrowRight size={13} />
          </Link>
          <div className="flex items-center gap-1 ml-auto">
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Github size={14} /></a>}
            {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><ExternalLink size={14} /></a>}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Page ───────────────────────────────────────────── */
export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => { setMounted(true); }, []);

  const filtered = projects.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
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
              Full-stack applications built with the MERN stack — from concept to production deployment, with live demos you can explore right here.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 mt-8"
          >
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or tech..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-secondary/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} className="text-muted-foreground" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border/40 text-muted-foreground hover:text-foreground hover:border-primary/30 glass"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid (desktop) / Carousel (mobile) */}
      <section className="section">
        <div className="container">
          {!mounted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-72 glass border border-border/40 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* Mobile: Embla Carousel */}
              <div className="block sm:hidden">
                <ProjectCarousel items={filtered} />
              </div>

              {/* Desktop: Grid */}
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden sm:grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
              >
                {filtered.map((project, i) => {
                  const colors = PROJECT_ACCENTS[project.slug] ?? PROJECT_ACCENTS["ecommerce-website"];
                  const screenshot = SCREENSHOTS[project.slug];

                  return (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="group relative flex flex-col glass border border-border/40 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = colors.border;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -12px ${colors.bg}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "hsl(var(--border) / 0.4)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "";
                      }}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                        style={{ background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)` }}
                      />

                      {/* Browser Preview */}
                      <div className="p-3 pb-0">
                        <BrowserFrame
                          screenshotSrc={screenshot}
                          liveUrl={project.live ?? undefined}
                          title={project.title}
                          accent={colors.accent}
                          height={220}
                        />
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <div className="text-[10px] font-mono uppercase tracking-widest font-semibold mb-1" style={{ color: colors.accent }}>
                              {project.category} · {project.year}
                            </div>
                            <h2 className="font-bold text-foreground text-lg">{project.title}</h2>
                          </div>
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border flex-shrink-0 ${statusColors[project.status]}`}>
                            {project.status === "live" ? "● Live" : project.status === "completed" ? "Completed" : "WIP"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono">
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono">
                              +{project.techStack.length - 5}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                          <Link href={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-sm font-medium transition-colors" style={{ color: colors.accent }}>
                            Case Study <ArrowRight size={13} />
                          </Link>
                          {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-auto" aria-label="GitHub">
                              <Github size={15} />
                            </a>
                          )}
                          {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ${!project.github ? "ml-auto" : ""}`} aria-label="Live Demo">
                              <ExternalLink size={15} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {mounted && filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground">
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>No projects found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
