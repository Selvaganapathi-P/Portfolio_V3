"use client";

import { type ReactNode } from "react";
import { motion, type Variant } from "framer-motion";
import { useInView } from "react-intersection-observer";

type RevealStyle = "fade-up" | "slide-in" | "blur-in" | "clip-reveal";

interface TextRevealProps {
  children: ReactNode;
  /** Animation style (default "fade-up") */
  style?: RevealStyle;
  /** Delay before animation starts in ms */
  delay?: number;
  /** Stagger between each word in seconds (default 0.04) */
  stagger?: number;
  className?: string;
  /** Element to render (default "div") */
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

const variantMap: Record<RevealStyle, { hidden: Variant; visible: Variant }> = {
  "fade-up": {
    hidden: { opacity: 0, y: 20, filter: "blur(0px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "slide-in": {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  "blur-in": {
    hidden: { opacity: 0, filter: "blur(10px)", y: 8 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  "clip-reveal": {
    hidden: { opacity: 0, y: 24, rotateX: 45 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
};

/**
 * TextReveal
 * ──────────
 * Splits text children into words and animates each word
 * into view with a stagger when scrolled into the viewport.
 * Supports React element children (renders them as single blocks).
 */
export function TextReveal({
  children,
  style: revealStyle = "fade-up",
  delay = 0,
  stagger = 0.04,
  className = "",
  as: Tag = "div",
}: TextRevealProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const variants = variantMap[revealStyle];

  // Flatten children into word tokens
  const words = extractWords(children);

  return (
    <Tag
      ref={ref}
      className={`${className}`}
      style={{ perspective: revealStyle === "clip-reveal" ? 800 : undefined }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={variants}
          transition={{
            duration: 0.5,
            delay: delay / 1000 + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
          {/* Preserve space between words */}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
}

/** Extract words from React children, handling both strings and elements. */
function extractWords(children: ReactNode): string[] {
  if (typeof children === "string") {
    return children.split(/\s+/).filter(Boolean);
  }

  if (Array.isArray(children)) {
    return children.flatMap((child) => extractWords(child));
  }

  // For React elements, stringify or return as-is
  if (children && typeof children === "object" && "props" in children) {
    const props = (children as React.ReactElement).props as Record<string, unknown>;
    const childContent = props?.children;
    if (typeof childContent === "string") {
      return childContent.split(/\s+/).filter(Boolean);
    }
    if (childContent) {
      return extractWords(childContent as ReactNode);
    }
  }

  if (typeof children === "number") {
    return [String(children)];
  }

  return [];
}
