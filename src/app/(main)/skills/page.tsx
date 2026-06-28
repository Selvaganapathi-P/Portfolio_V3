"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { skills, techStack } from "@/data/resume";
import { SkillCategorySkeleton, TechIconSkeleton } from "@/components/ui/skeleton";

const categories = [
  { key: "languages", label: "Languages", items: skills.languages, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
  { key: "backend",   label: "Backend",   items: skills.backend,   color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { key: "frontend",  label: "Frontend",  items: skills.frontend,  color: "text-blue-500",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  { key: "database",  label: "Database",  items: skills.database,  color: "text-orange-500",  bg: "bg-orange-500/10",  border: "border-orange-500/20" },
  { key: "tools",     label: "Tools & Platforms", items: skills.tools, color: "text-violet-500", bg: "bg-violet-500/10", border: "border-violet-500/20" },
];

const techIconMap: Record<string, string> = {
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "React.js":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "MongoDB":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Git":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "HTML5":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "CSS3":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Firebase":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
};

function SkillBar({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className={`text-xs font-semibold ${color}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, hsl(var(--primary)), hsl(271 91% 65%))" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function SkillsPage() {
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
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Expertise</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Technical
              <span className="gradient-text"> Skills</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              A breakdown of my technical expertise across the full MERN stack and related tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skill Categories */}
      <section className="section">
        <div className="container">
          {!mounted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[0, 1, 2, 3].map((i) => <SkillCategorySkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {categories.map((cat, ci) => (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: ci * 0.08, duration: 0.5 }}
                  className="glass border border-border/40 rounded-2xl p-7"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${cat.bg} ${cat.border} border text-xs font-semibold ${cat.color} mb-6`}>
                    {cat.label}
                  </div>
                  <div className="space-y-5">
                    {cat.items.map((skill, i) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        delay={ci * 0.08 + i * 0.06}
                        color={cat.color}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tech Stack Icons — lazy loaded when scrolled into view */}
      <section className="section border-t border-border/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Stack</span>
            </div>
            <h2 className="text-3xl font-bold">
              Full Tech <span className="gradient-text">Stack</span>
            </h2>
          </motion.div>

          {!mounted ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {Array.from({ length: 16 }).map((_, i) => <TechIconSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
              {techStack.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.03, duration: 0.4 }}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="glass border border-border/40 rounded-xl p-4 flex flex-col items-center gap-2.5 hover:border-primary/30 transition-colors group cursor-default"
                >
                  {techIconMap[tech.name] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={techIconMap[tech.name]}
                      alt={tech.name}
                      className="w-9 h-9"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: tech.color }}
                    >
                      {tech.name.slice(0, 2)}
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground text-center group-hover:text-foreground transition-colors leading-tight">
                    {tech.name.replace(".js", "").replace("Authentication", "Auth")}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
