"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/data/resume";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const PROJECT_ACCENTS: Record<
  string,
  { accent: string; bg: string; border: string; number: string }
> = {
  "ecommerce-website": {
    accent: "hsl(252 87% 63%)",
    bg: "hsl(252 87% 63% / 0.06)",
    border: "hsl(252 87% 63% / 0.35)",
    number: "hsl(252 87% 63% / 0.22)",
  },
  studiopro: {
    accent: "hsl(199 89% 52%)",
    bg: "hsl(199 89% 52% / 0.06)",
    border: "hsl(199 89% 52% / 0.35)",
    number: "hsl(199 89% 52% / 0.22)",
  },
  kidzoo: {
    accent: "hsl(142 71% 45%)",
    bg: "hsl(142 71% 45% / 0.06)",
    border: "hsl(142 71% 45% / 0.35)",
    number: "hsl(142 71% 45% / 0.22)",
  },
  cinevault: {
    accent: "hsl(24 95% 55%)",
    bg: "hsl(24 95% 55% / 0.06)",
    border: "hsl(24 95% 55% / 0.35)",
    number: "hsl(24 95% 55% / 0.22)",
  },
};

const SCREENSHOTS: Record<string, string> = {
  "ecommerce-website": "/previews/ecommerce.png",
  studiopro: "/previews/studiopro.png",
  kidzoo: "/previews/kidzoo.png",
  cinevault: "/previews/cinevault.png",
};

/* Sites that send X-Frame-Options: DENY — iframe embedding blocked */
const EMBED_BLOCKED = new Set(["kidzoo"]);

const DEFAULT_ACCENT = {
  accent: "hsl(252 87% 63%)",
  bg: "hsl(252 87% 63% / 0.06)",
  border: "hsl(252 87% 63% / 0.35)",
  number: "hsl(252 87% 63% / 0.22)",
};

const statusConfig = {
  live: { label: "● Live", classes: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
  completed: { label: "Completed", classes: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  wip: { label: "In Progress", classes: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
};

export function FeaturedProjects() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">
                Featured Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Projects I&apos;ve
              <span className="gradient-text"> Built</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            All projects
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Cards */}
        {!mounted ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featured.map((project, i) => {
              const colors =
                PROJECT_ACCENTS[project.slug] ?? DEFAULT_ACCENT;
              const status = statusConfig[project.status];
              const screenshot = SCREENSHOTS[project.slug];

              return (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`group relative flex flex-col rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                    i === 0 ? "lg:col-span-2" : ""
                  }`}
                  style={{ borderColor: "hsl(var(--border) / 0.5)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      colors.border;
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px -12px ${colors.bg}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "hsl(var(--border) / 0.5)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "";
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                    }}
                  />

                  {/* Browser Frame Preview */}
                  <div className="p-3 pb-0">
                    <BrowserFrame
                      screenshotSrc={screenshot}
                      liveUrl={project.live ?? undefined}
                      title={project.title}
                      accent={colors.accent}
                      height={i === 0 ? 200 : 160}
                      embedBlocked={EMBED_BLOCKED.has(project.slug)}
                    />
                  </div>

                  {/* Card body */}
                  <div className="relative p-6 flex flex-col flex-1">
                    {/* Large index number */}
                    <div
                      className="absolute top-2 right-5 text-[72px] font-black leading-none select-none pointer-events-none transition-all duration-500 opacity-20 group-hover:opacity-60"
                      style={{
                        color: colors.number,
                        filter: `drop-shadow(0 0 20px ${colors.accent})`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="text-[10px] font-mono uppercase tracking-widest font-semibold"
                        style={{ color: colors.accent }}
                      >
                        {project.category}
                      </div>
                      <span
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${status.classes}`}
                      >
                        {status.label}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2.5">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack
                        .slice(0, i === 0 ? 6 : 4)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[11px] rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      {project.techStack.length > (i === 0 ? 6 : 4) && (
                        <span className="px-2 py-0.5 text-[11px] rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono">
                          +{project.techStack.length - (i === 0 ? 6 : 4)}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                        style={{ color: colors.accent }}
                      >
                        Case Study
                        <ArrowRight
                          size={13}
                          className="group-hover:translate-x-0.5 transition-transform"
                        />
                      </Link>
                      <div className="flex items-center gap-1 ml-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <Github size={14} />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live Demo"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Mobile "view all" */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            View all projects <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
