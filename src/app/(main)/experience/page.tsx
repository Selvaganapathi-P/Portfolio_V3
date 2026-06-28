"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { experience, education } from "@/data/resume";
import { ExperienceCardSkeleton } from "@/components/ui/skeleton";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle,
  Zap,
} from "lucide-react";

export default function ExperiencePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section border-b border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Career</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Experience &
              <span className="gradient-text"> Timeline</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              My professional journey — from internships to independent projects, with real-world impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="section">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Briefcase size={16} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

            {!mounted ? (
              <>{[0, 1].map((i) => <ExperienceCardSkeleton key={i} />)}</>
            ) : (
              experience.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="relative flex gap-6 pb-12"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary border border-primary/20 flex items-center justify-center z-10 shadow-lg shadow-primary/30">
                    <Zap size={16} className="text-primary-foreground" />
                  </div>

                  <div className="flex-1">
                    <div className="glass border border-border/40 rounded-2xl p-7 hover:border-primary/30 transition-colors">
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">{exp.role}</h3>
                          <p className="text-primary font-semibold text-lg">{exp.company}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 items-end">
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary border border-primary/20">
                            {exp.type}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Calendar size={11} />
                            {exp.startDate} – {exp.endDate}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={11} />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-5">{exp.description}</p>

                      <div className="mb-5">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Responsibilities
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((r, j) => (
                            <li key={j} className="flex gap-2.5 text-sm text-muted-foreground">
                              <span className="text-primary mt-1 flex-shrink-0">▸</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-5">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Impact
                        </h4>
                        <ul className="space-y-2">
                          {exp.impact.map((item, j) => (
                            <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                              <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-muted-foreground border border-border/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section border-t border-border/30">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                <GraduationCap size={16} className="text-violet-500" />
              </div>
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 to-transparent" />

            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative flex gap-6 pb-12"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-500 border border-violet-500/20 flex items-center justify-center z-10 shadow-lg shadow-violet-500/30">
                  <GraduationCap size={16} className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="glass border border-border/40 rounded-2xl p-7 hover:border-violet-500/30 transition-colors">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{edu.institution}</h3>
                        <p className="text-violet-500 font-semibold">{edu.degree}</p>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar size={11} />
                          {edu.startDate} – {edu.endDate}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin size={11} />
                          {edu.location}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-semibold">
                        CGPA: {edu.cgpa}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((c) => (
                        <span
                          key={c}
                          className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-muted-foreground border border-border/50"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
