"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, RotateCcw, Mic2, Bot } from "lucide-react";
import { personal } from "@/data/resume";

const SCRIPT_LINES = [
  "Hey! Welcome to my portfolio.",
  "I'm Selvaganapathi, a passionate MERN Stack and AI developer from Tamil Nadu, India.",
  "I love building modern web applications, AI-powered products, and real-world software that solves meaningful problems.",
  "My expertise includes React, Node.js, Express, MongoDB, REST APIs, authentication systems, and AI integration.",
  "I enjoy turning creative ideas into professional products — clean UIs, scalable backends, smooth experiences.",
  "Feel free to explore my projects, view my resume, or ask me anything about my skills and experience.",
  "I'm always excited to learn, build, and collaborate on innovative ideas.",
  "Thanks for visiting my portfolio, and I hope you enjoy exploring my work.",
];

const CHAR_SPEED = 38;
const LINE_PAUSE = 1600;
const BAR_COUNT = 28;

function Waveform({ speaking }: { speaking: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-8" aria-hidden>
      {Array.from({ length: BAR_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full"
          style={{
            background:
              i % 3 === 0
                ? "hsl(199 89% 58%)"
                : i % 3 === 1
                  ? "hsl(252 87% 68%)"
                  : "hsl(271 91% 70%)",
          }}
          animate={
            speaking
              ? {
                  height: [
                    `${8 + Math.random() * 8}px`,
                    `${20 + Math.random() * 14}px`,
                    `${8 + Math.random() * 8}px`,
                  ],
                }
              : { height: "4px" }
          }
          transition={
            speaking
              ? {
                  duration: 0.4 + (i % 5) * 0.08,
                  repeat: Infinity,
                  repeatType: "mirror",
                  delay: (i % 7) * 0.05,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

export function AiAvatarCard() {
  const [playing, setPlaying] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const pauseRef = useRef(false);
  pauseRef.current = !playing;

  // Typing engine
  useEffect(() => {
    if (!playing || done) return;
    const currentLine = SCRIPT_LINES[lineIndex];

    if (charIndex < currentLine.length) {
      const t = setTimeout(() => {
        setDisplayed(currentLine.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    }

    // Line finished — pause then advance
    const t = setTimeout(() => {
      if (pauseRef.current) return;
      if (lineIndex + 1 < SCRIPT_LINES.length) {
        setCompleted((prev) => [...prev, currentLine]);
        setLineIndex((l) => l + 1);
        setCharIndex(0);
        setDisplayed("");
      } else {
        setDone(true);
        setPlaying(false);
      }
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [playing, done, lineIndex, charIndex]);

  const handlePlay = useCallback(() => {
    if (done) return;
    setPlaying((p) => !p);
  }, [done]);

  const handleReset = useCallback(() => {
    setPlaying(false);
    setLineIndex(0);
    setCharIndex(0);
    setDisplayed("");
    setCompleted([]);
    setDone(false);
  }, []);

  const progress = done
    ? 100
    : Math.round(((lineIndex + charIndex / (SCRIPT_LINES[lineIndex]?.length || 1)) / SCRIPT_LINES.length) * 100);

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/5 blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-violet-500/8 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/20 text-sm text-cyan-400 mb-4">
            <Bot size={14} />
            <span>AI Avatar Presenter</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Meet{" "}
            <span className="gradient-text">{personal.name.split(" ")[0]}</span>
          </h2>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid lg:grid-cols-[380px_1fr] gap-6 items-stretch"
        >
          {/* ── Left: Photo card ───────────────────────── */}
          <div className="relative rounded-2xl overflow-hidden glass border border-cyan-500/20 min-h-[460px]">
            {/* Blue LED ambient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-cyan-950/30 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-violet-500/5 z-10 pointer-events-none" />

            {/* Photo */}
            <Image
              src="/ai_avatar.jpeg"
              alt={personal.name}
              fill
              className="object-cover object-top"
              sizes="380px"
              priority
            />

            {/* Cinematic top scan-line */}
            {playing && (
              <motion.div
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-20 pointer-events-none"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Bottom overlay: waveform + controls */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
              {/* Waveform */}
              <div className="mb-3 flex justify-center">
                <Waveform speaking={playing} />
              </div>

              {/* Controls row */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlay}
                  disabled={done}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-cyan-500/30"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause size={16} className="text-black" /> : <Play size={16} className="text-black ml-0.5" />}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center w-9 h-9 rounded-full glass border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw size={14} />
                </button>

                {/* Progress bar */}
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-center gap-1 text-xs text-cyan-400">
                  <Mic2 size={12} />
                  <span>{progress}%</span>
                </div>
              </div>
            </div>

            {/* LIVE badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-cyan-500/30 text-xs font-semibold text-cyan-400 tracking-wide">
              <span className="relative flex h-1.5 w-1.5">
                <span className={`absolute inline-flex h-full w-full rounded-full bg-cyan-400 ${playing ? "animate-ping opacity-75" : "opacity-0"}`} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>
              {playing ? "SPEAKING" : done ? "DONE" : "AI READY"}
            </div>
          </div>

          {/* ── Right: Script panel ─────────────────────── */}
          <div className="relative rounded-2xl glass border border-border/40 p-6 flex flex-col min-h-[460px]">
            {/* Idle state */}
            {!playing && !done && completed.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full glass border border-cyan-500/30 flex items-center justify-center">
                  <Bot size={28} className="text-cyan-400" />
                </div>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Press <span className="text-cyan-400 font-medium">Play</span> to hear{" "}
                  <span className="text-foreground font-medium">{personal.name.split(" ")[0]}</span> introduce himself.
                </p>
                <button
                  onClick={() => setPlaying(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium text-sm transition-colors shadow-lg shadow-cyan-500/25"
                >
                  <Play size={14} />
                  Start Presentation
                </button>
              </motion.div>
            )}

            {/* Active / done state */}
            {(playing || done || completed.length > 0) && (
              <div className="flex-1 flex flex-col justify-end gap-3 overflow-hidden">
                {/* Completed lines (scroll history) */}
                <div className="flex-1 flex flex-col justify-end gap-2 overflow-hidden">
                  <AnimatePresence initial={false}>
                    {completed.slice(-4).map((line, i) => (
                      <motion.p
                        key={line}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.35 - i * 0.05, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="text-sm text-muted-foreground leading-relaxed line-clamp-2"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Current typing line */}
                {!done && (
                  <motion.div
                    key={lineIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20"
                  >
                    <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                      {displayed}
                      {playing && (
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                          className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle"
                        />
                      )}
                    </p>
                  </motion.div>
                )}

                {/* Done state */}
                {done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center"
                  >
                    <p className="text-emerald-400 font-medium text-sm">Presentation complete ✓</p>
                    <button
                      onClick={handleReset}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw size={11} />
                      Play again
                    </button>
                  </motion.div>
                )}

                {/* Line indicators */}
                <div className="flex items-center gap-1.5 pt-1">
                  {SCRIPT_LINES.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-300"
                      style={{
                        flex: i === lineIndex && !done ? 2 : 1,
                        background:
                          i < lineIndex || done
                            ? "hsl(199 89% 58%)"
                            : i === lineIndex
                              ? "hsl(252 87% 68%)"
                              : "hsl(var(--border))",
                        opacity: i < lineIndex || done ? 1 : i === lineIndex ? 1 : 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
