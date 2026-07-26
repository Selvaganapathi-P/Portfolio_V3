"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experience, education } from "@/data/resume";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  CheckCircle,
  Zap,
} from "lucide-react";
import gsap from "gsap";

function WorkCard({ exp, index, isLast }: { exp: typeof experience[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!lineRef.current || !inView) return;
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      { scaleY: 1, duration: 1.2, ease: "power3.out", delay: 0.3 + index * 0.1 }
    );
  }, [inView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline line */}
      {!isLast && (
        <div
          ref={lineRef}
          className="absolute left-5 top-12 bottom-0 w-px origin-top"
          style={{
            background: "linear-gradient(to bottom, hsl(var(--primary) / 0.5), transparent)",
            transformOrigin: "top",
          }}
        />
      )}

      {/* Icon */}
      <motion.div
        className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-primary border border-primary/30 flex items-center justify-center mt-1 z-10 shadow-lg shadow-primary/30"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <Zap size={16} className="text-primary-foreground" />
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/50"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.9, delay: index * 0.12 + 0.2 }}
          />
        )}
      </motion.div>

      {/* Card */}
      <div className="flex-1 pb-12">
        <motion.div
          className="glass border border-border/40 rounded-2xl p-7 hover:border-primary/30 transition-all duration-300"
          whileHover={{ y: -3, boxShadow: "0 20px 60px -12px hsl(var(--primary) / 0.1)" }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-foreground text-xl leading-tight">{exp.role}</h3>
              <p className="text-primary font-semibold text-lg mt-0.5">{exp.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                {exp.type}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar size={11} />
                {exp.startDate} – {exp.endDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
            <MapPin size={11} />
            {exp.location}
          </div>

          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>

          {/* Responsibilities */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Responsibilities
            </h4>
            <ul className="space-y-2">
              {exp.responsibilities.map((r, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.12 + 0.4 + j * 0.07 }}
                  className="flex gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-1.5 flex-shrink-0 text-xs">▸</span>
                  {r}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div className="mb-5">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Impact
            </h4>
            <ul className="space-y-2">
              {exp.impact.map((item, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.12 + 0.55 + j * 0.07 }}
                  className="flex gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {exp.technologies.map((tech, k) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.12 + 0.5 + k * 0.04 }}
                  className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-muted-foreground border border-border/50 font-mono hover:border-primary/30 hover:text-foreground transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function EduCard({ edu, index }: { edu: typeof education[0]; index: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative flex gap-6 pb-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-500 border border-violet-500/20 flex items-center justify-center z-10 shadow-lg shadow-violet-500/30">
        <GraduationCap size={16} className="text-white" />
      </div>

      <div className="flex-1">
        <motion.div
          className="glass border border-border/40 rounded-2xl p-7 hover:border-violet-500/30 transition-all duration-300"
          whileHover={{ y: -2 }}
        >
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

          {mounted && (
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-semibold">
                CGPA: {edu.cgpa}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {edu.coursework.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 text-xs rounded-lg bg-secondary text-muted-foreground border border-border/50 hover:border-primary/30 transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ExperiencePage() {
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Briefcase size={16} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Work Experience</h2>
            </div>
          </motion.div>

          <div className="relative">
            {experience.map((exp, i) => (
              <WorkCard
                key={exp.id}
                exp={exp}
                index={i}
                isLast={i === experience.length - 1}
              />
            ))}
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
              <EduCard key={edu.id} edu={edu} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
