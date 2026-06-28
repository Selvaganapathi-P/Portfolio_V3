"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Layers, Search, Filter } from "lucide-react";
import { projects } from "@/data/resume";
import { ProjectCardSkeleton } from "@/components/ui/skeleton";

const categories = ["All", "Full Stack", "Frontend"];

const statusColors = {
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  wip: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

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
              A collection of full-stack applications built with the MERN stack, from concept to production deployment.
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

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          {!mounted ? (
            /* Skeleton state */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <ProjectCardSkeleton key={i} />)}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((project, i) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group relative flex flex-col glass border border-border/40 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                    {/* Placeholder image area */}
                    <div className="h-40 bg-gradient-to-br from-primary/5 via-violet-500/5 to-cyan-500/5 border-b border-border/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 grid-pattern opacity-5" />
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Layers size={28} className="text-primary" />
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
                          {project.status === "live" ? "● Live" : project.status === "completed" ? "Completed" : "WIP"}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-xs text-muted-foreground font-mono">
                        {project.year}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h2 className="font-bold text-foreground group-hover:text-primary transition-colors text-lg">
                          {project.title}
                        </h2>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.techStack.length > 4 && (
                          <span className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50">
                            +{project.techStack.length - 4}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                        >
                          Case Study <ArrowRight size={13} />
                        </Link>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ml-auto"
                            aria-label="GitHub"
                          >
                            <Github size={15} />
                          </a>
                        )}
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors ${!project.github ? "ml-auto" : ""}`}
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {mounted && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground"
            >
              <Layers size={48} className="mx-auto mb-4 opacity-20" />
              <p>No projects found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
