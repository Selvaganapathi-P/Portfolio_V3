"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

/**
 * CustomCursor — GOD MODE
 * ───────────────────────
 * Upgraded with:
 * • Glowing comet trail
 * • Magnetic ring that snaps to interactive elements
 * • Gradient glow ring with animated border
 * • Click ripple burst
 * • Contextual morphing (circle → expanded on links)
 */
export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [ripples, setRipples] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Dot tracks cursor tightly */
  const dotX = useSpring(rawX, { stiffness: 700, damping: 32 });
  const dotY = useSpring(rawY, { stiffness: 700, damping: 32 });

  /* Ring lags slightly behind */
  const ringX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 22 });

  /* Trail logic */
  const lastTrailPos = useRef({ x: 0, y: 0 });
  const trailInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const addTrailDot = useCallback(
    (x: number, y: number) => {
      const dx = x - lastTrailPos.current.x;
      const dy = y - lastTrailPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 8) return; // Only add trail dots when moving

      lastTrailPos.current = { x, y };
      const id = trailIdRef.current++;
      setTrail((prev) => [...prev.slice(-12), { id, x, y }]);

      // Remove after animation
      setTimeout(() => {
        setTrail((prev) => prev.filter((d) => d.id !== id));
      }, 500);
    },
    []
  );

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      addTrailDot(e.clientX, e.clientY);

      const el = e.target as Element;
      setHovering(
        !!el.closest(
          "a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]"
        )
      );
    };

    const onDown = (e: MouseEvent) => {
      setClicking(true);
      // Add click ripple
      const id = trailIdRef.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (trailInterval.current) clearInterval(trailInterval.current);
    };
  }, [rawX, rawY, addTrailDot]);

  if (!visible) return null;

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot) => (
        <div
          key={dot.id}
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: 6,
            height: 6,
            background: "hsl(252 87% 63% / 0.5)",
            boxShadow: "0 0 8px hsl(252 87% 63% / 0.3)",
            animation: "trail-fade 0.5s ease-out forwards",
          }}
        />
      ))}

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed top-0 left-0 pointer-events-none z-[9996] rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            border: "2px solid hsl(252 87% 63% / 0.5)",
            animation: "click-ripple 0.6s ease-out forwards",
          }}
        />
      ))}

      {/* Main dot — with glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
          background:
            "radial-gradient(circle, hsl(252 87% 73%), hsl(252 87% 63%))",
          boxShadow: "0 0 12px hsl(252 87% 63% / 0.5), 0 0 4px hsl(252 87% 63% / 0.3)",
        }}
        animate={{
          scale: clicking ? 0.5 : hovering ? 0.3 : 1,
          opacity: hovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Glow ring — gradient border + glow */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          background: "transparent",
          border: "1.5px solid transparent",
          backgroundImage:
            "linear-gradient(hsl(var(--background)), hsl(var(--background))), conic-gradient(from 0deg, hsl(252 87% 63%), hsl(271 91% 65%), hsl(199 89% 52%), hsl(252 87% 63%))",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
        animate={{
          width: hovering ? 44 : clicking ? 24 : 0,
          height: hovering ? 44 : clicking ? 24 : 0,
          opacity: hovering ? 0.8 : clicking ? 0.5 : 0,
          rotate: hovering ? 360 : 0,
          boxShadow: hovering
            ? "0 0 20px hsl(252 87% 63% / 0.25)"
            : "0 0 0px transparent",
        }}
        transition={{
          width: { duration: 0.25, ease: "easeOut" },
          height: { duration: 0.25, ease: "easeOut" },
          opacity: { duration: 0.2 },
          rotate: { duration: 2, ease: "linear", repeat: Infinity },
          boxShadow: { duration: 0.3 },
        }}
      />
    </>
  );
}
