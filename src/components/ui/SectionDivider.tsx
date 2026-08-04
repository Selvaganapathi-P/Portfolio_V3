"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface SectionDividerProps {
  /** "wave" | "line" | "dots" */
  variant?: "wave" | "line" | "dots";
  className?: string;
}

/**
 * SectionDivider
 * ──────────────
 * Animated section separators. Animates in on scroll.
 * Three styles: wave, line with gradient, and dots.
 */
export const SectionDivider = memo(function SectionDivider({
  variant = "line",
  className = "",
}: SectionDividerProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative w-full overflow-hidden py-4 ${className}`}>
        <motion.svg
          viewBox="0 0 1200 60"
          fill="none"
          className="w-full h-8 sm:h-12"
          preserveAspectRatio="none"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.path
            d="M0 30 Q150 0 300 30 T600 30 T900 30 T1200 30"
            stroke="url(#wave-gradient)"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="20%" stopColor="hsl(252 87% 63% / 0.5)" />
              <stop offset="50%" stopColor="hsl(271 91% 65% / 0.6)" />
              <stop offset="80%" stopColor="hsl(199 89% 52% / 0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className={`flex items-center justify-center gap-2 py-8 ${className}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{
              background:
                i === 2
                  ? "hsl(252 87% 63%)"
                  : `hsl(252 87% 63% / ${0.2 + i * 0.1})`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              delay: i * 0.08,
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </div>
    );
  }

  // Default: animated gradient line
  return (
    <div ref={ref} className={`flex items-center justify-center py-6 ${className}`}>
      <motion.div
        className="h-px w-full max-w-lg"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(252 87% 63% / 0.4), hsl(271 91% 65% / 0.5), hsl(199 89% 52% / 0.4), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
});
