"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  CheckCircle,
  AlertTriangle,
  Cpu,
  BarChart2,
  Lightbulb,
  Target,
} from "lucide-react";
import type { Project } from "@/types";

interface Props {
  project: Project;
}

export function ProjectDetail({ project }: Props) {
  return (
    <div className="min-h-screen">
      {/* Back */}
      <section className="pt-8 pb-0 border-b border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>
          </motion.div>

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="pb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                  project.status === "live"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                }`}
              >
                {project.status === "live" ? "● Live" : "Completed"}
              </span>
              <span className="px-2.5 py-1 text-xs rounded-full bg-secondary text-muted-foreground border border-border/50">
                {project.category}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-6">{project.subtitle}</p>

            <div className="flex flex-wrap items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-border/40 text-sm text-foreground hover:border-primary/40 transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder image */}
      <div className="h-64 sm:h-80 bg-gradient-to-br from-primary/5 via-violet-500/5 to-cyan-500/5 border-b border-border/30 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-5" />
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Layers size={40} className="text-primary" />
        </div>
      </div>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.longDescription}</p>
              </motion.div>

              {/* Problem / Solution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass border border-border/40 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-amber-500" />
                    <h3 className="font-semibold">Problem</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="glass border border-border/40 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb size={16} className="text-emerald-500" />
                    <h3 className="font-semibold">Solution</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.solution}</p>
                </motion.div>
              </div>

              {/* Architecture */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={18} className="text-primary" />
                  <h2 className="text-xl font-bold">Architecture</h2>
                </div>
                <div className="glass border border-border/40 rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.architecture}</p>
                </div>
              </motion.div>

              {/* Features */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={18} className="text-primary" />
                  <h2 className="text-xl font-bold">Key Features</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {project.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Challenges */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <Target size={18} className="text-primary" />
                  <h2 className="text-xl font-bold">Engineering Challenges</h2>
                </div>
                <div className="space-y-3">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="flex gap-3 glass border border-border/40 rounded-xl p-4">
                      <span className="text-primary font-mono text-sm font-bold flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-muted-foreground">{c}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass border border-border/40 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 size={16} className="text-primary" />
                  <h3 className="font-semibold">Project Metrics</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground capitalize">
                        {k.replace(/([A-Z])/g, " $1")}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass border border-border/40 rounded-2xl p-6"
              >
                <h3 className="font-semibold mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-lg bg-primary/10 text-primary border border-primary/20 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass border border-border/40 rounded-2xl p-6 space-y-3"
              >
                <h3 className="font-semibold mb-4">Links</h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github size={15} />
                    View Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
