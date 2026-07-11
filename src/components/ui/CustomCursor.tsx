"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  /* Dot tracks cursor tightly */
  const dotX = useSpring(rawX, { stiffness: 700, damping: 32 });
  const dotY = useSpring(rawY, { stiffness: 700, damping: 32 });

  /* Ring lags slightly behind */
  const ringX = useSpring(rawX, { stiffness: 220, damping: 24 });
  const ringY = useSpring(rawY, { stiffness: 220, damping: 24 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(hover: none)").matches;
    if (isTouchDevice) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      const el = e.target as Element;
      setHovering(!!el.closest("a, button, [role='button'], input, select, textarea, label, [data-cursor-hover]"));
    };

    const onDown = () => setClicking(true);
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
    };
  }, [rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: 10,
          height: 10,
        }}
        animate={{
          scale: clicking ? 0.6 : hovering ? 0.3 : 1,
          opacity: hovering ? 0.5 : 1,
        }}
        transition={{ duration: 0.1 }}
      />

      {/* Ring — expands on interactive hover */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-primary/60"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 36 : clicking ? 20 : 0,
          height: hovering ? 36 : clicking ? 20 : 0,
          opacity: hovering ? 0.7 : clicking ? 0.5 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
    </>
  );
}
