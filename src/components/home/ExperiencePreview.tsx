"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Briefcase, MapPin, Calendar } from "lucide-react";
import { experience } from "@/data/resume";
import { TextReveal } from "@/components/ui/TextReveal";

function TimelineItem({ exp, index, isLast }: { exp: typeof experience[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-6"
    >
      {/* Animated timeline line */}
      {!isLast && (
        <motion.div
          className="absolute left-5 top-12 bottom-0 w-px origin-top"
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.1, delay: index * 0.12 + 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(to bottom, hsl(252 87% 63% / 0.5), transparent)",
          }}
        />
      )}

      {/* Icon with pulse on reveal */}
      <motion.div
        className="relative flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center mt-1 z-10"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.12 + 0.1, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Briefcase size={16} className="text-primary" />
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/40"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.7, opacity: 0 }}
            transition={{ duration: 0.8, delay: index * 0.12 + 0.2 }}
          />
        )}
        {/* Secondary ripple */}
        {inView && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-primary/20"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 2.2, opacity: 0 }}
            transition={{ duration: 1.1, delay: index * 0.12 + 0.35 }}
          />
        )}
      </motion.div>

      {/* Content */}
      <div className="flex-1 pb-12">
        <motion.div
          className="glass border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 glow-card"
          whileHover={{ y: -3, transition: { duration: 0.25 } }}
        >
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-foreground text-lg leading-tight">{exp.role}</h3>
              <p className="text-primary font-semibold mt-0.5">{exp.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <motion.span
                className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                {exp.type}
              </motion.span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Calendar size={11} />
                {exp.startDate} – {exp.endDate}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <MapPin size={11} />
            {exp.location}
          </div>

          <ul className="space-y-2 mb-5">
            {exp.responsibilities.map((r, j) => (
              <motion.li
                key={j}
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.12 + 0.4 + j * 0.07 }}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <motion.span
                  className="text-primary mt-1.5 flex-shrink-0 text-xs"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.12 + 0.45 + j * 0.07, type: "spring", bounce: 0.5 }}
                >
                  ▸
                </motion.span>
                {r}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {exp.technologies.map((tech, k) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.12 + 0.5 + k * 0.04 }}
                whileHover={{ scale: 1.08, y: -1 }}
                className="px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50 font-mono hover:border-primary/30 hover:text-primary/80 transition-colors cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function ExperiencePreview() {
  return (
    <section className="section bg-secondary/20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                className="w-6 h-px bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Career</span>
            </div>
            <TextReveal
              as="h2"
              style="blur-in"
              stagger={0.06}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Work Experience
            </TextReveal>
          </div>
          <Link
            href="/experience"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group gradient-underline"
          >
            Full timeline
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="max-w-3xl">
          {experience.map((exp, i) => (
            <TimelineItem
              key={exp.id}
              exp={exp}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
