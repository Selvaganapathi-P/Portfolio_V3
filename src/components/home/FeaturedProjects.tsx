"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/resume";
import { BrowserFrame } from "@/components/ui/BrowserFrame";

const PROJECT_ACCENTS: Record<string, { accent: string; glow: string; border: string }> = {
  "educore-erp":       { accent: "hsl(168 74% 43%)",  glow: "rgba(22,163,114,0.12)",  border: "rgba(22,163,114,0.25)"  },
  "ecommerce-website": { accent: "hsl(252 87% 63%)",  glow: "rgba(139,92,246,0.12)",  border: "rgba(139,92,246,0.25)"  },
  studiopro:           { accent: "hsl(199 89% 52%)",  glow: "rgba(14,165,233,0.12)",  border: "rgba(14,165,233,0.25)"  },
  kidzoo:              { accent: "hsl(142 71% 45%)",  glow: "rgba(34,197,94,0.12)",   border: "rgba(34,197,94,0.25)"   },
  cinevault:           { accent: "hsl(24 95% 55%)",   glow: "rgba(249,115,22,0.12)",  border: "rgba(249,115,22,0.25)"  },
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
  live:      { label: "Live",       dot: "bg-emerald-400", text: "text-emerald-400" },
  completed: { label: "Completed",  dot: "bg-sky-400",     text: "text-sky-400"     },
  wip:       { label: "In Progress",dot: "bg-amber-400",   text: "text-amber-400"   },
};

/* ─── Single project row ──────────────────────────────── */
function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  const colors  = PROJECT_ACCENTS[project.slug] ?? PROJECT_ACCENTS["ecommerce-website"];
  const status  = STATUS[project.status];
  const flip    = index % 2 === 1; // alternate layout
  const screenshot = SCREENSHOTS[project.slug];

  const metrics = project.metrics
    ? Object.entries(project.metrics).slice(0, 3)
    : [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      {/* Glow orb — follows accent colour */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-4 rounded-3xl pointer-events-none z-0"
        style={{ background: colors.glow, filter: "blur(40px)" }}
      />

      <div
        className="relative z-10 rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          border: `1px solid ${hovered ? colors.border : "rgba(255,255,255,0.06)"}`,
          background: "hsl(var(--card))",
          boxShadow: hovered ? `0 32px 80px -16px ${colors.glow}` : "none",
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          initial={{ scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute top-0 left-0 right-0 h-[2px] origin-left z-20"
          style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }}
        />

        <div className={`flex flex-col lg:flex-row ${flip ? "lg:flex-row-reverse" : ""} min-h-[340px]`}>

          {/* ── Preview side ──────────────────────── */}
          <div className="lg:w-[55%] p-4 flex flex-col justify-center bg-black/20">
            <BrowserFrame
              screenshotSrc={screenshot}
              liveUrl={project.live ?? undefined}
              title={project.title}
              accent={colors.accent}
              height={260}
              embedBlocked={EMBED_BLOCKED.has(project.slug)}
            />
          </div>

          {/* ── Info side ─────────────────────────── */}
          <div className="lg:w-[45%] p-7 lg:p-9 flex flex-col justify-between">
            <div>
              {/* Index + status row */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className="text-[11px] font-mono uppercase tracking-widest font-semibold"
                  style={{ color: colors.accent }}
                >
                  {project.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${project.status === "live" ? "animate-pulse" : ""}`} />
                  <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
                </div>
              </div>

              {/* Giant watermark number */}
              <div className="relative mb-3">
                <span
                  className="absolute -top-6 -left-1 text-[88px] font-black leading-none select-none pointer-events-none"
                  style={{ color: colors.glow, WebkitTextStroke: `1px ${colors.border}` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-2xl lg:text-3xl font-bold text-foreground leading-tight pt-8">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Metrics strip */}
              {metrics.length > 0 && (
                <div className="flex gap-4 mb-5 pb-5 border-b border-border/30">
                  {metrics.map(([key, val]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold" style={{ color: colors.accent }}>{val}</div>
                      <div className="text-[10px] text-muted-foreground capitalize leading-tight">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech chips */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.slice(0, 5).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-[11px] rounded-lg font-mono text-muted-foreground transition-colors duration-200"
                    style={{
                      background: hovered ? `${colors.glow}` : "hsl(var(--secondary))",
                      border: `1px solid ${hovered ? colors.border : "hsl(var(--border) / 0.5)"}`,
                    }}
                  >
                    {t}
                  </span>
                ))}
                {project.techStack.length > 5 && (
                  <span className="px-2.5 py-1 text-[11px] rounded-lg font-mono text-muted-foreground bg-secondary border border-border/50">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.accent}cc)`,
                  boxShadow: hovered ? `0 8px 24px ${colors.glow}` : "none",
                }}
              >
                Case Study
                <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
              <div className="flex items-center gap-1 ml-auto">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <Github size={15} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Section ─────────────────────────────────────────── */
export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Projects I&apos;ve
              <span className="gradient-text"> Built</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="self-start sm:self-auto group flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-muted-foreground border border-border/40 hover:border-primary/40 hover:text-primary glass transition-all"
          >
            All projects
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Project rows */}
        <div className="flex flex-col gap-6">
          {featured.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
