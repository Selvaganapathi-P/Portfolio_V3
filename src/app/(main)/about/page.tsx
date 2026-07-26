"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { personal, education, stats } from "@/data/resume";
import {
  GraduationCap,
  MapPin,
  Mail,
  Github,
  Linkedin,
  Calendar,
  BookOpen,
  Target,
  Zap,
  Heart,
  Code2,
} from "lucide-react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const values = [
  { icon: Code2,   title: "Clean Code",     description: "Every line should be intentional. Readable, maintainable, and scalable." },
  { icon: Zap,     title: "Performance",    description: "Fast UIs and efficient APIs. Performance is a feature, not an afterthought." },
  { icon: Target,  title: "Problem First",  description: "Understanding the real problem before writing the first line of code." },
  { icon: Heart,   title: "User Focused",   description: "Building for humans. Great UX is the foundation of great software." },
];

function AnimatedStat({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.4 });
  const numeric = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const hasPlus = stat.value.includes("+");
  const decimals = numeric % 1 !== 0 ? 1 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, y: -2 }}
      className="glass border border-border/40 rounded-2xl p-6 text-center hover:border-primary/25 transition-colors cursor-default"
    >
      <div className="text-3xl font-bold gradient-text mb-1">
        {inView ? (
          <CountUp
            start={0}
            end={numeric}
            duration={2.2}
            decimals={decimals}
            suffix={hasPlus ? "+" + stat.suffix : stat.suffix}
            useEasing
          />
        ) : (
          <span>{stat.value}{stat.suffix}</span>
        )}
      </div>
      <div className="text-xs text-muted-foreground">{stat.label}</div>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <div className="min-h-screen">
      {/* Hero with parallax */}
      <section ref={heroRef} className="section border-b border-border/30 relative overflow-hidden">
        {/* Parallax background orbs */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-primary/6 blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-violet-500/6 blur-[80px]" />
        </motion.div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-px bg-primary" />
                <span className="text-xs text-primary font-mono uppercase tracking-widest">About</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Building the web,
                <br />
                <span className="gradient-text">one stack at a time.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                {personal.summary}
              </p>
            </motion.div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {[
                { icon: MapPin,    text: personal.location },
                { icon: Mail,     text: personal.email,        href: `mailto:${personal.email}` },
                { icon: Github,   text: "Selvaganapathi-P",     href: personal.github },
                { icon: Linkedin, text: "LinkedIn",             href: personal.linkedin },
              ].map((item) => (
                <div key={item.text}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <item.icon size={14} />
                      {item.text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon size={14} />
                      {item.text}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats with CountUp */}
      <section className="py-16 border-b border-border/30">
        <div className="container">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <AnimatedStat key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Story + Values */}
      <section className="section border-b border-border/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                My <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I&apos;m a MERN Stack Developer from Dharmapuri, Tamil Nadu, with a passion for building
                  web applications that are both functional and beautifully crafted. My journey into
                  software development began during my B.Tech in Information Technology at R P Sarathy
                  Institute of Technology.
                </p>
                <p>
                  During my internship at GT Software, I worked on production-grade applications —
                  developing authentication systems, integrating REST APIs, and working with MongoDB to
                  build real-world full-stack solutions. This hands-on experience shaped my approach
                  to software development.
                </p>
                <p>
                  I&apos;ve built projects ranging from e-commerce platforms with role-based access control
                  to photography studio booking systems and real-time cinema seat booking applications —
                  each one expanding my understanding of what it takes to ship quality software.
                </p>
                <p>
                  Currently, I&apos;m actively looking for full-time opportunities where I can contribute
                  to meaningful products and continue growing as an engineer.
                </p>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                What I <span className="gradient-text">Value</span>
              </h2>
              <div className="space-y-4">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 4 }}
                    className="flex gap-4 glass border border-border/40 rounded-xl p-4 hover:border-primary/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                      <v.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                      <p className="text-sm text-muted-foreground">{v.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <div className="container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Education</span>
            </div>
            <h2 className="text-3xl font-bold mb-10">
              Academic <span className="gradient-text">Background</span>
            </h2>
          </motion.div>

          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -2 }}
              className="glass border border-border/40 rounded-2xl p-8 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <GraduationCap size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-xl">{edu.institution}</h3>
                    <p className="text-primary font-medium">{edu.degree}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm text-muted-foreground text-right">
                  <span className="flex items-center gap-1.5 justify-end">
                    <Calendar size={13} />
                    {edu.startDate} – {edu.endDate}
                  </span>
                  <span className="flex items-center gap-1.5 justify-end">
                    <MapPin size={13} />
                    {edu.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-sm font-semibold">
                  CGPA: {edu.cgpa}
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <BookOpen size={14} />
                  Relevant Coursework
                </div>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((c) => (
                    <span
                      key={c}
                      className="px-3 py-1 rounded-lg bg-secondary text-sm text-muted-foreground border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
