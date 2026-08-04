"use client";

import { useMemo, memo } from "react";
import { Particles, ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions, Engine } from "@tsparticles/engine";

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

/**
 * ParticleField
 * ─────────────
 * Interactive constellation particle background using tsparticles.
 * Particles connect when near each other and react to mouse movement.
 * Extremely subtle so it adds depth without distracting from content.
 */
function ParticleCanvas() {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        color: { value: "#818cf8" },
        links: {
          color: "#818cf8",
          distance: 140,
          enable: true,
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
          random: true,
          straight: false,
        },
        number: {
          density: { enable: true, width: 1200, height: 800 },
          value: 50,
        },
        opacity: {
          value: { min: 0.03, max: 0.15 },
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        shape: { type: "circle" },
        size: {
          value: { min: 1, max: 2.5 },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
          onClick: {
            enable: true,
            mode: "push",
          },
        },
        modes: {
          grab: {
            distance: 160,
            links: { opacity: 0.25 },
          },
          push: { quantity: 2 },
        },
      },
    }),
    []
  );

  return (
    <Particles
      id="tsparticles-bg"
      className="fixed inset-0 z-[0] pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      options={options}
    />
  );
}

export const ParticleField = memo(function ParticleField() {
  return (
    <ParticlesProvider init={particlesInit}>
      <ParticleCanvas />
    </ParticlesProvider>
  );
});
