"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate,
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
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

/* ─── Stat Card with CountUp ──────────────────────────── */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0];
  index: number;
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const numeric = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const hasPlus = stat.value.includes("+");
  const decimals = numeric % 1 !== 0 ? 1 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.82, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: 0.72 + index * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.04, y: -3 }}
      className="glass border border-border/40 rounded-2xl p-4 text-center hover:border-primary/30 transition-colors cursor-default"
    >
      <div className="text-2xl sm:text-3xl font-bold gradient-text tabular-nums leading-none mb-1">
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
          <span>
            {stat.value}
            {stat.suffix}
          </span>
        )}
      </div>
      <div className="text-[11px] text-muted-foreground leading-tight">
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* Mouse-tracking values */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 38, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 38, damping: 24 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  /* Spotlight that follows cursor */
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
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px] animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-500/8 blur-[120px] animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/4 blur-[180px]" />
        <div className="absolute inset-0 grid-pattern opacity-[0.022]" />
        <motion.div
          className="absolute inset-0"
          style={{ background: spotlight }}
        />
      </div>

      {/* ── Content ───────────────────────────────── */}
      <motion.div
        style={{ y, opacity: heroOpacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16"
      >
        <div className="w-full text-center">

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.72 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.82, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="relative inline-block mb-5"
            style={{ perspective: "900px" }}
          >
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl scale-[1.4] pointer-events-none" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1.5 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, hsl(252 87% 63% / 0.85) 90deg, hsl(271 91% 65% / 0.85) 180deg, hsl(199 89% 48% / 0.85) 270deg, transparent 360deg)",
                }}
              />
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
            <span className="absolute bottom-2 right-2 flex h-4 w-4 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-background" />
            </span>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
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
            transition={{ duration: 0.82, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[1.04] mb-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
          >
            <span className="text-foreground">
              {personal.name.split(" ")[0]}
            </span>
            <span className="gradient-text">
              {personal.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Role — TypeAnimation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="h-9 sm:h-10 lg:h-12 flex items-center justify-center mb-5"
          >
            <TypeAnimation
              sequence={[
                "Full Stack Engineer",      2800,
                "MERN Stack Developer",     2800,
                "React Specialist",         2800,
                "API Architect",            2800,
                "Node.js Developer",        2800,
              ]}
              wrapper="span"
              speed={55}
              deletionSpeed={70}
              repeat={Infinity}
              className="gradient-text font-bold text-xl sm:text-2xl lg:text-3xl"
              cursor
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.46 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-7"
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-5"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/45 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              View Projects
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
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

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.60 }}
            className="flex items-center justify-center gap-3 mb-9"
          >
            {[
              { href: personal.github,   icon: Github,   label: "GitHub"   },
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

          {/* Stats with CountUp */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.66 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
          >
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
