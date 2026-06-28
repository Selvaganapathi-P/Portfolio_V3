"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
  Code2,
  Terminal,
  ExternalLink,
} from "lucide-react";
import { personal, stats } from "@/data/resume";

const typingStrings = [
  "Full Stack Engineer",
  "MERN Stack Developer",
  "React Specialist",
  "API Architect",
  "MongoDB Expert",
  "Node.js Developer",
];

function TypingAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = typingStrings[currentIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setCurrentIndex((i) => (i + 1) % typingStrings.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, currentIndex]);

  return (
    <span className="gradient-text font-bold">
      {displayed}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
}

function FloatingCode() {
  const snippets = [
    { code: "const api = express()", delay: 0, x: -20, y: -10 },
    { code: "db.find({ active: true })", delay: 1, x: 10, y: -5 },
    { code: "useState<User>(null)", delay: 2, x: -15, y: 5 },
    { code: "JWT.verify(token)", delay: 0.5, x: 15, y: 10 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {snippets.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.5, 0.5, 0],
            y: [20, s.y, s.y - 10, -20],
            x: [0, s.x, s.x + 5],
          }}
          transition={{
            duration: 6,
            delay: s.delay + 2,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="absolute font-mono text-xs text-primary/40 bg-primary/5 px-2 py-1 rounded border border-primary/10"
          style={{
            left: `${15 + i * 20}%`,
            top: `${30 + (i % 2) * 30}%`,
          }}
        >
          {s.code}
        </motion.div>
      ))}
    </div>
  );
}

// Stable particle data — generated once on mount, never during SSR
type Particle = { w: number; h: number; left: string; top: string; color: string; duration: number; delay: number };

function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        w: Math.random() * 3 + 1,
        h: Math.random() * 3 + 1,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color:
          i % 3 === 0 ? "hsl(252 87% 63% / 0.4)"
          : i % 3 === 1 ? "hsl(271 91% 65% / 0.4)"
          : "hsl(199 89% 48% / 0.4)",
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: p.w, height: p.h, left: p.left, top: p.top, background: p.color }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-violet-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px]" />

        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.03]" />

        <ParticleBackground />
        <FloatingCode />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16"
      >
        <div className="w-full text-center">

          {/* ── Avatar Photo ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block mb-4"
          >
            <div className="absolute inset-0 rounded-full bg-primary/25 blur-2xl scale-150 pointer-events-none" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, hsl(252 87% 63%), hsl(271 91% 65%), hsl(199 89% 48%), hsl(252 87% 63%))",
              }}
            />
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-background bg-secondary">
              <Image
                src="/avatar.jpg"
                alt={personal.name}
                width={144}
                height={144}
                className="w-full h-full object-cover object-top"
                priority
              />
            </div>
            <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
            </span>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-muted-foreground mb-4"
          >
            <Sparkles size={14} className="text-primary" />
            <span>MERN Stack Developer</span>
            <span className="w-px h-3 bg-border" />
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              {personal.availabilityNote}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.05] mb-3 flex items-baseline justify-center gap-4"
          >
            <span className="inline-flex text-foreground">{personal.name.split(" ")[0]}</span>
            <span className="inline-flex gradient-text">{personal.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Typing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-3 h-9"
          >
            <TypingAnimation />
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-5"
          >
            {personal.tagline}
          </motion.p>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-5"
          >
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary" />
              {personal.location}
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5">
              <Code2 size={14} className="text-primary" />
              {personal.currentFocus}
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="flex items-center gap-1.5">
              <Terminal size={14} className="text-violet-500" />
              B.Tech IT — CGPA 8.1
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-5"
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
            >
              View Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/60 text-foreground font-medium text-sm hover:border-primary/30 hover:bg-primary/5 transition-all hover:-translate-y-0.5"
            >
              Get in Touch
            </Link>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              <Download size={16} />
              Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <Github size={16} />
              GitHub
              <ExternalLink size={12} className="opacity-50" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
            >
              <Linkedin size={16} />
              LinkedIn
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="glass border border-border/40 rounded-xl p-4 text-center"
              >
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                  <span className="text-sm">{stat.suffix}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
