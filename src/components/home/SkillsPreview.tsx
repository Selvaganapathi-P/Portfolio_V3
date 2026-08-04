"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { techStack, personal } from "@/data/resume";
import { TextReveal } from "@/components/ui/TextReveal";

/* Skill categories with intentional grouping.
   No percentage bars — they're subjective and patronizing. */
const SKILL_CATEGORIES = [
  {
    label: "Language",
    color: "hsl(252 87% 63%)",
    bg: "hsl(252 87% 63% / 0.08)",
    border: "hsl(252 87% 63% / 0.2)",
    skills: ["JavaScript"],
  },
  {
    label: "Frontend",
    color: "hsl(199 89% 52%)",
    bg: "hsl(199 89% 52% / 0.08)",
    border: "hsl(199 89% 52% / 0.2)",
    skills: ["React.js", "HTML5", "CSS3", "Recharts"],
  },
  {
    label: "Backend",
    color: "hsl(142 71% 45%)",
    bg: "hsl(142 71% 45% / 0.08)",
    border: "hsl(142 71% 45% / 0.2)",
    skills: ["Node.js", "Express.js", "REST API Design", "JWT Auth"],
  },
  {
    label: "Database",
    color: "hsl(271 91% 65%)",
    bg: "hsl(271 91% 65% / 0.08)",
    border: "hsl(271 91% 65% / 0.2)",
    skills: ["MongoDB", "Mongoose"],
  },
  {
    label: "Tools & Infra",
    color: "hsl(24 95% 55%)",
    bg: "hsl(24 95% 55% / 0.08)",
    border: "hsl(24 95% 55% / 0.2)",
    skills: ["Git", "Vercel", "Netlify", "Firebase Auth", "Multer", "Postman"],
  },
];

const TECH_ICONS: Record<string, string> = {
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Git": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "HTML5": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Firebase": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
};

export function SkillsPreview() {
  return (
    <section className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-14"
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
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Expertise</span>
            </div>
            <TextReveal
              as="h2"
              style="blur-in"
              stagger={0.06}
              className="text-3xl sm:text-4xl font-bold tracking-tight"
            >
              Technical Skills
            </TextReveal>
          </div>
          <Link
            href="/skills"
            className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group gradient-underline"
          >
            Full overview
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left: Skill categories ──────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {SKILL_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08 }}
              >
                {/* Category label */}
                <div className="flex items-center gap-2 mb-2.5">
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity, delay: ci * 0.5 }}
                  />
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest font-semibold"
                    style={{ color: cat.color }}
                  >
                    {cat.label}
                  </span>
                </div>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, si) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.88 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.06 + si * 0.04 }}
                      whileHover={{
                        scale: 1.08,
                        y: -2,
                        boxShadow: `0 4px 16px ${cat.bg}`,
                      }}
                      className="px-3 py-1.5 text-sm rounded-lg font-medium transition-colors cursor-default border"
                      style={{
                        background: cat.bg,
                        borderColor: cat.border,
                        color: cat.color,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Right: Tech icon grid ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-4 gap-3">
              {techStack.slice(0, 12).map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.78 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    scale: 1.1,
                    y: -4,
                    boxShadow: "0 8px 24px hsl(252 87% 63% / 0.1)",
                  }}
                  className="glass border border-border/40 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/30 transition-all cursor-default group glow-card"
                >
                  {TECH_ICONS[tech.name] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={TECH_ICONS[tech.name]}
                      alt={tech.name}
                      className="w-7 h-7 group-hover:scale-110 transition-transform"
                    />
                  ) : (
                    <motion.div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: tech.color }}
                      whileHover={{ rotate: 10 }}
                    >
                      {tech.name.slice(0, 2)}
                    </motion.div>
                  )}
                  <span className="text-[10px] text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors">
                    {tech.name.replace(".js", "")}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Currently learning / focus */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-5 p-4 rounded-xl glass border border-primary/20 flex items-start gap-3 glow-card"
            >
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 shadow-[0_0_6px_hsl(252_87%_63%)]"
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-0.5">
                  Current Focus
                </p>
                <p className="text-sm text-muted-foreground">
                  {personal.currentFocus} — building production-ready applications.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
