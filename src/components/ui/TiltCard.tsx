"use client";

import { useRef, useState, type ReactNode, type CSSProperties } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  /** Max tilt in degrees (default 8) */
  maxTilt?: number;
  /** Spotlight/glare opacity (default 0.12) */
  glareOpacity?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * TiltCard
 * ────────
 * Adds a 3D perspective tilt that follows the mouse,
 * plus a radial spotlight + subtle glare overlay.
 */
export function TiltCard({
  children,
  maxTilt = 8,
  glareOpacity = 0.12,
  className = "",
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  const springRotateX = useSpring(rotateX, { stiffness: 260, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 260, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -maxTilt * 2);
    rotateY.set((px - 0.5) * maxTilt * 2);
    spotlightX.set(px * 100);
    spotlightY.set(py * 100);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
    spotlightX.set(50);
    spotlightY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 900,
        transformStyle: "preserve-3d",
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {children}

        {/* Spotlight overlay */}
        {hovering && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-20"
            style={{
              background: `radial-gradient(
                circle at ${spotlightX.get()}% ${spotlightY.get()}%,
                rgba(255,255,255,${glareOpacity}),
                transparent 60%
              )`,
              opacity: hovering ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
