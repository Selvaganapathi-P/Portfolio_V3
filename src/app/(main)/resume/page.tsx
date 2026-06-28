"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personal, experience, education, skills, projects } from "@/data/resume";
import {
  Download,
  Mail,
  MapPin,
  Github,
  Linkedin,
  Phone,
  Briefcase,
  GraduationCap,
  Code2,
  FolderOpen,
  ExternalLink,
} from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <section className="section border-b border-border/30">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-primary" />
                <span className="text-xs text-primary font-mono uppercase tracking-widest">Resume</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">
                Curriculum <span className="gradient-text">Vitae</span>
              </h1>
              <p className="text-muted-foreground">Last updated: June 2026</p>
            </motion.div>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              href="/resume/selvaganapathi-resume.pdf"
              download="Selvaganapathi_P_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 print:hidden"
            >
              <Download size={16} />
              Download PDF
            </motion.a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-4xl">

          {/* ── Header Card with Photo ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass border border-border/40 rounded-2xl p-8 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6 mb-6">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-primary/20 ring-4 ring-primary/5 bg-secondary">
                  <Image
                    src="/avatar.jpg"
                    alt={personal.name}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-top"
                    priority
                  />
                </div>
                {/* Online dot */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background" />
              </div>

              {/* Name, title, contacts */}
              <div className="flex-1 min-w-0">
                {/* Name on ONE line */}
                <h2 className="text-2xl sm:text-3xl font-bold mb-1 whitespace-nowrap">
                  {personal.name}
                </h2>
                <p className="text-primary font-medium text-lg mb-4">{personal.title}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-primary flex-shrink-0" />
                    {personal.location}
                  </span>
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Mail size={13} className="text-primary flex-shrink-0" />
                    {personal.email}
                  </a>
                  <span className="flex items-center gap-1.5">
                    <Phone size={13} className="text-primary flex-shrink-0" />
                    {personal.phone}
                  </span>
                  <a
                    href={personal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Github size={13} className="text-primary flex-shrink-0" />
                    GitHub
                  </a>
                  <a
                    href={personal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  >
                    <Linkedin size={13} className="text-primary flex-shrink-0" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-5">
              {personal.summary}
            </p>
          </motion.div>

          {/* ── Experience ───────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-primary" />
              <h3 className="text-xl font-bold">Experience</h3>
            </div>
            <div className="glass border border-border/40 rounded-2xl p-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div>
                      <p className="font-bold text-foreground">{exp.role}</p>
                      <p className="text-primary font-medium">{exp.company} · {exp.location}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                        <span className="text-primary flex-shrink-0 mt-0.5">•</span>{r}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Projects ─────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <FolderOpen size={16} className="text-primary" />
              <h3 className="text-xl font-bold">Projects</h3>
            </div>
            <div className="space-y-4">
              {projects.map((p) => (
                <div key={p.id} className="glass border border-border/40 rounded-2xl p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="font-bold text-foreground">{p.title}</p>
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Github size={12} />
                        {p.github.replace("https://github.com/", "")}
                      </a>
                    )}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <ExternalLink size={12} />
                        {p.live.replace("https://", "").replace(/\/$/, "")}
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.techStack.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground border border-border/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Education ────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={16} className="text-primary" />
              <h3 className="text-xl font-bold">Education</h3>
            </div>
            <div className="glass border border-border/40 rounded-2xl p-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div>
                      <p className="font-bold text-foreground">{edu.institution}</p>
                      <p className="text-primary font-medium">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground mt-1">CGPA: {edu.cgpa}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {edu.coursework.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 text-xs rounded bg-secondary text-muted-foreground border border-border/50"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Skills ───────────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 size={16} className="text-primary" />
              <h3 className="text-xl font-bold">Skills</h3>
            </div>
            <div className="glass border border-border/40 rounded-2xl p-6 space-y-4">
              {[
                { label: "Languages", items: skills.languages.map((s) => s.name) },
                { label: "Frontend",  items: skills.frontend.map((s) => s.name)  },
                { label: "Backend",   items: skills.backend.map((s) => s.name)   },
                { label: "Database",  items: skills.database.map((s) => s.name)  },
                { label: "Tools",     items: skills.tools.map((s) => s.name)     },
              ].map((group) => (
                <div key={group.label} className="flex flex-wrap gap-2 items-start">
                  <span className="text-xs font-semibold text-muted-foreground w-20 flex-shrink-0 pt-1">
                    {group.label}:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>
      </section>
    </div>
  );
}
