"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { personal, stats } from "@/data/resume";

const ROLES = [
  "Full Stack Engineer",
  "MERN Stack Developer",
  "React Specialist",
  "API Architect",
  "Node.js Developer",
];

/* ─── Role Switcher ─────────────────────────────────────
   Smooth vertical crossfade with blur — more refined
   than character-by-character typing.
──────────────────────────────────────────────────────── */
function RoleSwitcher() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-8 sm:h-9 lg:h-11 overflow-hidden select-none" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 26, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -26, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center gradient-text font-bold text-xl sm:text-2xl lg:text-3xl"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────── */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* Mouse-tracking values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 38, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 24 });

  /* Avatar 3-D tilt */
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  /* Ambient spotlight that follows cursor */
  const spotX = useTransform(springX, [-0.5, 0.5], [28, 72]);
  const spotY = useTransform(springY, [-0.5, 0.5], [28, 72]);
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX}% ${spotY}%, hsl(252 87% 63% / 0.07), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background ──────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Atmosphere orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/8 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/4 blur-[180px]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 grid-pattern opacity-[0.022]" />

        {/* Mouse-driven spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: spotlight }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <motion.div
        style={{ y, opacity: heroOpacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16"
      >
        <div className="w-full text-center">

          {/* Avatar — 3-D tilt on mouse move */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block mb-5"
            style={{ perspective: "900px" }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              {/* Glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-[1.4] pointer-events-none" />

              {/* Rotating border — subtler than before */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, hsl(252 87% 63% / 0.85) 90deg, hsl(271 91% 65% / 0.85) 180deg, hsl(199 89% 48% / 0.85) 270deg, transparent 360deg)",
                }}
              />

              {/* Photo */}
              <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-background bg-secondary">
                <Image
                  src="/avatar.jpg"
                  alt={personal.name}
                  width={176}
                  height={176}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            </motion.div>

            {/* Online indicator */}
            <span className="absolute bottom-2 right-2 flex h-4 w-4 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
            </span>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-muted-foreground mb-5"
          >
            <span className="flex items-center gap-1.5 text-emerald-500 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              {personal.availabilityNote}
            </span>
            <span className="w-px h-3 bg-border" />
            <span>Tamil Nadu, India</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.04] mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <span className="text-foreground">{personal.name.split(" ")[0]}</span>
            <span className="gradient-text">{personal.name.split(" ").slice(1).join(" ")}</span>
          </motion.h1>

          {/* Role — smooth crossfade instead of typing */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mb-5"
          >
            <RoleSwitcher />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.44 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-7"
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-5"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              View Projects
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl glass border border-border/60 text-foreground font-semibold text-sm hover:border-primary/40 hover:bg-primary/5 transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              Get in Touch
            </Link>
            <a
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-muted-foreground text-sm hover:text-foreground transition-colors"
            >
              <Download size={15} />
              Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="flex items-center justify-center gap-3 mb-9"
          >
            {[
              { href: personal.github, icon: Github, label: "GitHub" },
              { href: personal.linkedin, icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg glass border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <Icon size={15} />
                {label}
                <ExternalLink
                  size={11}
                  className="opacity-0 group-hover:opacity-50 transition-opacity"
                />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.64 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.70 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="glass border border-border/40 rounded-2xl p-4 text-center hover:border-primary/25 transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-bold gradient-text tabular-nums">
                  {stat.value}
                  <span className="text-base sm:text-lg">{stat.suffix}</span>
                </div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-tight">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — mouse/scroll metaphor instead of "SCROLL" text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            className="w-1 h-1.5 rounded-full bg-primary/70"
          />
        </div>
      </motion.div>
    </section>
  );
}
