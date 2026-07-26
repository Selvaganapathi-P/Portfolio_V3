"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
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

/* ─── Stat Card ───────────────────────────────────────── */
function StatCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const numeric = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
  const hasPlus  = stat.value.includes("+");
  const decimals = numeric % 1 !== 0 ? 1 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 text-center"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="text-2xl sm:text-3xl font-bold tabular-nums leading-none mb-1"
        style={{
          background: "linear-gradient(135deg,#a78bfa,#818cf8,#67e8f9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {inView ? (
          <CountUp
            start={0} end={numeric} duration={2.2}
            decimals={decimals}
            suffix={hasPlus ? "+" + stat.suffix : stat.suffix}
            useEasing
          />
        ) : (
          <span>{stat.value}{stat.suffix}</span>
        )}
      </div>
      <div className="text-[11px] text-white/45 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const imgY        = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY    = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#05030f]"
    >

      {/* ── Right-side portrait ─────────────────────── */}
      {/* Container: right 50% on lg, full width (behind overlay) on mobile */}
      <motion.div
        style={{ y: imgY }}
        className="absolute inset-y-0 right-0 w-full lg:w-[52%] pointer-events-none"
      >
        <Image
          src="/professional_avatar.jpeg"
          alt={personal.name}
          fill
          priority
          quality={92}
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 52vw"
        />

        {/* Gradient mask — left edge fades into dark bg (desktop) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05030f] via-[#05030f]/55 to-transparent lg:block hidden" />
        {/* Mobile: heavy full overlay so text is readable */}
        <div className="absolute inset-0 bg-[#05030f]/75 lg:hidden" />
        {/* Bottom fade for both */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05030f]/80 via-transparent to-[#05030f]/20" />
        {/* Top-right corner subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-bl from-[#05030f]/30 via-transparent to-transparent" />
      </motion.div>

      {/* Accent glow behind image */}
      <div className="absolute right-[15%] top-1/3 w-72 h-72 rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute right-[25%] bottom-1/4 w-48 h-48 rounded-full bg-cyan-500/8 blur-[80px] pointer-events-none" />

      {/* ── Content — left half ──────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24"
      >
        <div className="max-w-xl lg:max-w-[48%]">

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm text-white/60 mb-7"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              {personal.availabilityNote}
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span>Tamil Nadu, India</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            <span className="text-white">{personal.name.split(" ")[0]}</span>{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#a78bfa 0%,#818cf8 50%,#67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {personal.name.split(" ").slice(1).join(" ")}
            </span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="h-9 sm:h-10 flex items-center mb-5"
          >
            <TypeAnimation
              sequence={[
                "Full Stack Engineer",  2800,
                "MERN Stack Developer", 2800,
                "React Specialist",     2800,
                "API Architect",        2800,
                "Node.js Developer",    2800,
              ]}
              wrapper="span"
              speed={55}
              deletionSpeed={70}
              repeat={Infinity}
              className="font-bold text-xl sm:text-2xl"
              style={{
                background: "linear-gradient(135deg,#a78bfa,#67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              cursor
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="text-base sm:text-lg text-white/50 leading-relaxed mb-8 max-w-md"
          >
            {personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden hover:-translate-y-0.5 active:translate-y-0 transition-transform"
              style={{
                background: "linear-gradient(135deg,hsl(252 87% 63%),hsl(271 91% 65%))",
                boxShadow: "0 8px 30px rgba(139,92,246,0.4)",
              }}
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              View Projects
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white/80 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.13)",
              }}
            >
              Get in Touch
            </Link>

            <a
              href="/resume"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              <Download size={14} />
              Resume
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.58 }}
            className="flex items-center gap-3 mb-10"
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
                className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/45 hover:text-white transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Icon size={14} />
                {label}
                <ExternalLink size={11} className="opacity-0 group-hover:opacity-40 transition-opacity" />
              </a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.64 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
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
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          <motion.div
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            className="w-1 h-1.5 rounded-full bg-white/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
