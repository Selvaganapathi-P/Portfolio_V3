"use client";

import { memo } from "react";

/**
 * AuroraBackground
 * ─────────────────
 * Renders 5 large, animated gradient blobs that slowly drift and morph,
 * creating an ethereal aurora / mesh-gradient effect.
 * 100% CSS — no canvas, no JS animation loop.
 * GPU-accelerated: only `transform` and `opacity` are animated.
 */
export const AuroraBackground = memo(function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Blob 1 — top-left violet */}
      <div
        className="aurora-blob absolute"
        style={{
          width: "55vw",
          height: "55vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "-10%",
          left: "-12%",
          background:
            "radial-gradient(circle at 40% 40%, hsl(271 91% 65% / 0.35), hsl(252 87% 63% / 0.15), transparent 70%)",
          animation: "aurora-drift-1 18s ease-in-out infinite alternate",
        }}
      />

      {/* Blob 2 — top-right cyan */}
      <div
        className="aurora-blob absolute"
        style={{
          width: "45vw",
          height: "45vw",
          maxWidth: 580,
          maxHeight: 580,
          top: "-5%",
          right: "-8%",
          background:
            "radial-gradient(circle at 60% 30%, hsl(199 89% 52% / 0.3), hsl(187 72% 55% / 0.12), transparent 70%)",
          animation: "aurora-drift-2 22s ease-in-out infinite alternate",
        }}
      />

      {/* Blob 3 — center violet-pink */}
      <div
        className="aurora-blob absolute"
        style={{
          width: "50vw",
          height: "50vw",
          maxWidth: 640,
          maxHeight: 640,
          top: "20%",
          left: "25%",
          background:
            "radial-gradient(circle at 50% 50%, hsl(280 70% 55% / 0.22), hsl(252 87% 63% / 0.1), transparent 70%)",
          animation: "aurora-drift-3 20s ease-in-out infinite alternate",
        }}
      />

      {/* Blob 4 — bottom-left emerald */}
      <div
        className="aurora-blob absolute"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: 520,
          maxHeight: 520,
          bottom: "-8%",
          left: "5%",
          background:
            "radial-gradient(circle at 35% 65%, hsl(168 74% 43% / 0.2), hsl(142 71% 45% / 0.08), transparent 70%)",
          animation: "aurora-drift-4 24s ease-in-out infinite alternate",
        }}
      />

      {/* Blob 5 — bottom-right warm */}
      <div
        className="aurora-blob absolute"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: 460,
          maxHeight: 460,
          bottom: "5%",
          right: "0%",
          background:
            "radial-gradient(circle at 60% 60%, hsl(24 95% 55% / 0.15), hsl(252 87% 63% / 0.08), transparent 70%)",
          animation: "aurora-drift-5 19s ease-in-out infinite alternate",
        }}
      />

      {/* Soft noise overlay to blend the blobs */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, transparent 40%, rgba(5,3,15,0.6) 100%)",
        }}
      />
    </div>
  );
});
