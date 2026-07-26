"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
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
  const hasPlus = stat.value.includes("+");
  const decimals = numeric % 1 !== 0 ? 1 : 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-4 text-center"
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.1)",
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
      <div className="text-[11px] text-white/50 leading-tight">{stat.label}</div>
    </motion.div>
  );
}

/* ─── Hero ────────────────────────────────────────────── */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef });
  /* Parallax: bg moves down 20% as user scrolls (element is 120% tall) */
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fadeY = useTransform(scrollYProgress, [0, 0.55], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* Mouse tilt on the glass panel */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 36, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 36, damping: 22 });
  const tiltX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const tiltY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Full-screen photo — CSS bg for reliable coverage ── */}
      <motion.div
        className="absolute z-0"
        style={{
          /* Oversized so parallax travel never shows empty edges */
          top: "-10%",
          left: 0,
          right: 0,
          bottom: "-10%",
          y: bgY,
          backgroundImage: "url('/professional_avatar.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* ── Overlay stack ─────────────────────────────── */}
      {/* Left-heavy vignette: text readable, photo visible on right */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/88 via-black/60 to-black/15" />
      {/* Bottom fade into next section */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/65 via-transparent to-black/25" />
      {/* Brand colour wash */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-br from-violet-950/45 via-transparent to-cyan-950/20" />
      {/* Film grain */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
        }}
      />

      {/* ── Content ───────────────────────────────────── */}
      <motion.div
        style={{ y: fadeY, opacity: heroOpacity }}
        className="relative z-10 w-full px-6 sm:px-12 lg:px-20 xl:px-28 py-16"
      >
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d", perspective: "1200px" }}
          className="w-full max-w-xl"
        >
          {/* Frosted glass panel */}
          <div
            className="rounded-3xl p-8 sm:p-10"
            style={{
              background: "rgba(6, 4, 16, 0.52)",
              backdropFilter: "blur(32px) saturate(160%)",
              WebkitBackdropFilter: "blur(32px) saturate(160%)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
            }}
          >
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm text-white/65 mb-6"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                {personal.availabilityNote}
              </span>
              <span className="w-px h-3 bg-white/20" />
              <span>Tamil Nadu, India</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold tracking-tight leading-[1.06] mb-4"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.5rem)" }}
            >
              <span className="text-white">{personal.name.split(" ")[0]}</span>{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {personal.name.split(" ").slice(1).join(" ")}
              </span>
            </motion.h1>

            {/* Role — TypeAnimation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="h-9 flex items-center mb-5"
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
                className="font-bold text-lg sm:text-xl"
                style={{
                  background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                cursor
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="text-sm sm:text-base text-white/55 leading-relaxed mb-7"
            >
              {personal.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-5"
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white overflow-hidden hover:-translate-y-0.5 active:translate-y-0 transition-transform"
                style={{
                  background: "linear-gradient(135deg, hsl(252 87% 63%), hsl(271 91% 65%))",
                  boxShadow: "0 8px 32px rgba(139,92,246,0.45)",
                }}
              >
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                View Projects
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white/85 hover:text-white hover:-translate-y-0.5 active:translate-y-0 transition-all"
                style={{ background: "rgba(255,255,255,0.09)", border: "1px solid rgba(255,255,255,0.14)" }}
              >
                Get in Touch
              </Link>

              <a
                href="/resume"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-white/45 hover:text-white/75 transition-colors"
              >
                <Download size={14} />
                Resume
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.58 }}
              className="flex items-center gap-3 mb-7"
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
                  className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-white/50 hover:text-white transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}
                >
                  <Icon size={14} />
                  {label}
                  <ExternalLink size={11} className="opacity-0 group-hover:opacity-45 transition-opacity" />
                </a>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.64 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              {stats.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center p-1.5"
          style={{ border: "1px solid rgba(255,255,255,0.18)" }}
        >
          <motion.div
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            className="w-1 h-1.5 rounded-full bg-white/45"
          />
        </div>
      </motion.div>
    </section>
  );
}
