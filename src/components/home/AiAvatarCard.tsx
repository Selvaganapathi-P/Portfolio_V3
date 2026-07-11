"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Bot, Mic2, Zap } from "lucide-react";
import { personal } from "@/data/resume";

const SCRIPT_LINES = [
  "Hey! Welcome to my portfolio.",
  "I'm Selvaganapathi, a passionate MERN Stack and AI developer from Tamil Nadu, India.",
  "I love building modern web applications, AI-powered products, and real-world software that solves meaningful problems.",
  "My expertise includes React, Node.js, Express, MongoDB, REST APIs, authentication systems, and AI integration.",
  "I enjoy turning creative ideas into professional products — clean UIs, scalable backends, and smooth experiences.",
  "Feel free to explore my projects, view my resume, or ask me anything about my skills and experience.",
  "I'm always excited to learn, build, and collaborate on innovative ideas.",
  "Thanks for visiting my portfolio, and I hope you enjoy exploring my work.",
];
const CHAR_SPEED = 36;
const BAR_COUNT = 30;

/* ─── Waveform ──────────────────────────────────────────── */
function Waveform({ speaking }: { speaking: boolean }) {
  const heights = useRef(
    Array.from({ length: BAR_COUNT }, (_, i) => ({
      min: 4 + (i % 4) * 2,
      max: 14 + (i % 6) * 5,
      dur: 0.3 + (i % 5) * 0.07,
      delay: (i % 7) * 0.04,
    }))
  );
  return (
    <div className="flex items-end gap-[2px] h-9" aria-hidden>
      {heights.current.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 3,
            background:
              i % 3 === 0
                ? "hsl(199 89% 65%)"
                : i % 3 === 1
                  ? "hsl(252 87% 72%)"
                  : "hsl(271 91% 74%)",
          }}
          animate={
            speaking
              ? { height: [`${h.min}px`, `${h.max}px`, `${h.min}px`] }
              : { height: "3px" }
          }
          transition={
            speaking
              ? { duration: h.dur, repeat: Infinity, repeatType: "mirror", delay: h.delay, ease: "easeInOut" }
              : { duration: 0.35 }
          }
        />
      ))}
    </div>
  );
}

/* ─── HUD corner bracket ────────────────────────────────── */
function HudCorner({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const classes: Record<string, string> = {
    tl: "top-2.5 left-2.5 border-t-[2px] border-l-[2px]",
    tr: "top-2.5 right-2.5 border-t-[2px] border-r-[2px]",
    bl: "bottom-2.5 left-2.5 border-b-[2px] border-l-[2px]",
    br: "bottom-2.5 right-2.5 border-b-[2px] border-r-[2px]",
  };
  return (
    <div
      className={`absolute w-5 h-5 border-cyan-400 z-30 pointer-events-none ${classes[pos]}`}
    />
  );
}

/* ─── Main component ────────────────────────────────────── */
export function AiAvatarCard() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [completed, setCompleted] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  // stable refs for callbacks that read current state
  const playingRef = useRef(false);
  playingRef.current = playing;
  const lineIndexRef = useRef(0);
  lineIndexRef.current = lineIndex;
  const mutedRef = useRef(false);
  mutedRef.current = muted;

  /* advance to next line (stable, reads via refs) */
  const advanceLine = useCallback(() => {
    const idx = lineIndexRef.current;
    if (idx + 1 < SCRIPT_LINES.length) {
      setCompleted((prev) => [...prev, SCRIPT_LINES[idx]]);
      setLineIndex(idx + 1);
      setCharIndex(0);
      setDisplayed("");
    } else {
      setDone(true);
      setPlaying(false);
      if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    }
  }, []);

  /* ── Voice synthesis ──────────────────────────────────── */
  useEffect(() => {
    if (!playing || done || muted) return;
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const utter = new SpeechSynthesisUtterance(SCRIPT_LINES[lineIndex]);
    utter.rate = 0.9;
    utter.pitch = 0.82;
    utter.volume = 1;

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleTerms = ["zira", "samantha", "victoria", "karen", "susan", "hazel", "fiona", "linda", "jenny", "aria", "cortana"];
      const preferredNames = ["Google UK English Male", "Microsoft David", "David Desktop", "Daniel", "Alex", "Fred", "Google US English"];
      let voice: SpeechSynthesisVoice | null = null;
      for (const name of preferredNames) {
        voice = voices.find((v) => v.name.includes(name)) ?? null;
        if (voice) break;
      }
      if (!voice) {
        voice =
          voices.find(
            (v) =>
              v.lang.startsWith("en") &&
              !femaleTerms.some((n) => v.name.toLowerCase().includes(n))
          ) ?? null;
      }
      return voice;
    };

    const voice = pickVoice();
    if (voice) utter.voice = voice;

    utter.onend = () => {
      if (!playingRef.current) return;
      setDisplayed(SCRIPT_LINES[lineIndexRef.current]);
      setCharIndex(SCRIPT_LINES[lineIndexRef.current].length);
      setTimeout(() => { if (playingRef.current) advanceLine(); }, 380);
    };
    utter.onerror = () => {
      if (playingRef.current) setTimeout(advanceLine, 1500);
    };

    // Chrome long-utterance bug workaround
    const resumeTimer = setInterval(() => {
      if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    }, 5000);

    window.speechSynthesis.speak(utter);
    return () => {
      clearInterval(resumeTimer);
      window.speechSynthesis.cancel();
    };
  }, [lineIndex, playing, done, muted, advanceLine]);

  /* ── Typewriter ───────────────────────────────────────── */
  useEffect(() => {
    if (!playing || done) return;
    const line = SCRIPT_LINES[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => {
        setDisplayed(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, CHAR_SPEED);
      return () => clearTimeout(t);
    }
    // Muted mode: advance after pause when typing finishes
    if (muted) {
      const t = setTimeout(() => {
        if (playingRef.current) advanceLine();
      }, 1600);
      return () => clearTimeout(t);
    }
  }, [playing, done, lineIndex, charIndex, muted, advanceLine]);

  /* ── Controls ─────────────────────────────────────────── */
  const handlePlayPause = useCallback(() => {
    if (done) return;
    setPlaying((p) => {
      if (p && typeof window !== "undefined") window.speechSynthesis?.pause();
      if (!p && typeof window !== "undefined") window.speechSynthesis?.resume();
      return !p;
    });
  }, [done]);

  const handleReset = useCallback(() => {
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setPlaying(false);
    setLineIndex(0);
    setCharIndex(0);
    setDisplayed("");
    setCompleted([]);
    setDone(false);
  }, []);

  const handleMute = useCallback(() => {
    setMuted((m) => {
      if (!m && typeof window !== "undefined") window.speechSynthesis?.cancel();
      return !m;
    });
  }, []);

  const progress = done
    ? 100
    : Math.round(
        ((lineIndex + charIndex / (SCRIPT_LINES[lineIndex]?.length || 1)) /
          SCRIPT_LINES.length) *
          100
      );

  return (
    <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
      {/* ── Background ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(199 89% 60%) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-cyan-500/6 blur-[140px]" />
        <div className="absolute top-1/4 left-1/5 w-60 h-60 rounded-full bg-primary/7 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/5 w-52 h-52 rounded-full bg-violet-500/7 blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* ── Header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-cyan-500/25 text-xs font-mono tracking-widest text-cyan-400 mb-4 uppercase"
          >
            <Zap size={11} className="text-cyan-400" />
            AI Avatar Presenter
            {playing && (
              <span className="relative flex h-1.5 w-1.5 ml-0.5">
                <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
            )}
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Meet{" "}
            <span className="gradient-text">{personal.name.split(" ")[0]}</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {playing
              ? "Speaking live · turn up your volume"
              : done
                ? "Presentation complete"
                : "Press play to hear the introduction with voice"}
          </p>
        </motion.div>

        {/* ── Grid ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="grid lg:grid-cols-[340px_1fr] gap-5 items-start"
        >
          {/* ╔══════════════╗
              ║  Photo card  ║
              ╚══════════════╝ */}
          <div className="relative">
            {/* Pulse rings when speaking */}
            {playing &&
              [0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl border border-cyan-400"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 1.05 + i * 0.07, opacity: 0 }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}

            {/* Card */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "3/4" }}>
              {/* HUD corners */}
              <HudCorner pos="tl" />
              <HudCorner pos="tr" />
              <HudCorner pos="bl" />
              <HudCorner pos="br" />

              {/* Photo with breathing animation */}
              <motion.div
                className="absolute inset-0"
                animate={
                  playing
                    ? { scale: [1, 1.018, 1, 1.018, 1] }
                    : { scale: 1 }
                }
                transition={
                  playing
                    ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.5 }
                }
              >
                <Image
                  src="/ai_avatar.jpeg"
                  alt={personal.name}
                  fill
                  className="object-cover object-top"
                  sizes="340px"
                  priority
                />
              </motion.div>

              {/* Cinematic gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30 z-10 pointer-events-none" />
              <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                animate={playing ? { opacity: [0.04, 0.12, 0.04] } : { opacity: 0 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ background: "radial-gradient(ellipse at 50% 40%, hsl(199 89% 60% / 1), transparent 70%)" }}
              />

              {/* Scan line */}
              {playing && (
                <motion.div
                  className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-20 pointer-events-none"
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* Bottom UI: name plate + waveform + controls */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-12 bg-gradient-to-t from-black/80 to-transparent">
                {/* Name plate */}
                <div className="mb-3">
                  <p className="text-white font-bold text-sm leading-tight">{personal.name}</p>
                  <p className="text-cyan-400 text-[10px] font-mono tracking-wider uppercase">{personal.title}</p>
                </div>

                {/* Waveform */}
                <div className="mb-3">
                  <Waveform speaking={playing} />
                </div>

                {/* Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    disabled={done}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 transition-colors shadow-lg shadow-cyan-500/40 flex-shrink-0"
                  >
                    {playing
                      ? <Pause size={14} className="text-black" />
                      : <Play size={14} className="text-black ml-0.5" />}
                  </button>
                  <button
                    onClick={handleReset}
                    aria-label="Restart"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors flex-shrink-0"
                  >
                    <RotateCcw size={12} />
                  </button>
                  <div className="flex-1 h-0.5 bg-white/15 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <button
                    onClick={handleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                    className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0 ${
                      muted
                        ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  </button>
                </div>
              </div>

              {/* Status badge */}
              <motion.div
                animate={playing ? { borderColor: "hsl(199 89% 58% / 0.6)" } : {}}
                className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-[10px] font-bold tracking-widest whitespace-nowrap"
              >
                {playing && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  </span>
                )}
                <span className={playing ? "text-cyan-400" : done ? "text-emerald-400" : "text-white/50"}>
                  {playing ? "SPEAKING" : done ? "✓ DONE" : "AI READY"}
                </span>
              </motion.div>
            </div>
          </div>

          {/* ╔══════════════════╗
              ║  Transcript panel ║
              ╚══════════════════╝ */}
          <div className="flex flex-col gap-4 lg:min-h-0" style={{ minHeight: "calc(340px * 4/3)" }}>

            {/* Idle */}
            {!playing && !done && completed.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center gap-5 rounded-2xl glass border border-border/40 p-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-xl animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full glass border border-cyan-500/30 flex items-center justify-center">
                    <Bot size={24} className="text-cyan-400" />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-foreground">AI Presentation Ready</p>
                  <p className="text-sm text-muted-foreground mt-1 max-w-[260px]">
                    {personal.name.split(" ")[0]} will introduce himself in voice and text.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPlaying(true)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5"
                  >
                    <Play size={14} /> Start Presentation
                  </button>
                  <button
                    onClick={handleMute}
                    title={muted ? "Enable voice" : "Mute voice"}
                    className={`w-10 h-10 rounded-xl glass border transition-colors flex items-center justify-center ${
                      muted ? "border-red-500/30 text-red-400" : "border-border/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                </div>
                {/* Preview of lines */}
                <div className="w-full space-y-2 mt-2">
                  {SCRIPT_LINES.slice(0, 3).map((line, i) => (
                    <div key={i} className="flex items-start gap-2 text-left">
                      <span className="text-[10px] text-cyan-400/60 font-mono mt-0.5 flex-shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs text-muted-foreground/60 line-clamp-1">{line}</p>
                    </div>
                  ))}
                  <p className="text-[10px] text-muted-foreground/40 text-center">
                    + {SCRIPT_LINES.length - 3} more lines
                  </p>
                </div>
              </motion.div>
            )}

            {/* Active / done */}
            {(playing || done || completed.length > 0) && (
              <>
                {/* Current line card */}
                {!done && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={lineIndex}
                      initial={{ opacity: 0, y: 14, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.97 }}
                      transition={{ duration: 0.35 }}
                      className="relative rounded-2xl p-5 overflow-hidden border"
                      style={{
                        background: "linear-gradient(135deg, hsl(199 89% 58% / 0.07), hsl(252 87% 63% / 0.04))",
                        borderColor: "hsl(199 89% 58% / 0.3)",
                      }}
                    >
                      {/* Moving glow */}
                      {playing && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          animate={{
                            background: [
                              "radial-gradient(ellipse at 0% 50%, hsl(199 89% 58% / 0.12) 0%, transparent 65%)",
                              "radial-gradient(ellipse at 100% 50%, hsl(252 87% 63% / 0.12) 0%, transparent 65%)",
                              "radial-gradient(ellipse at 0% 50%, hsl(199 89% 58% / 0.12) 0%, transparent 65%)",
                            ],
                          }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Mic2 size={10} className="text-cyan-400" />
                          <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
                            LINE {lineIndex + 1}/{SCRIPT_LINES.length}
                          </span>
                          {playing && !muted && (
                            <span className="ml-auto text-[10px] text-violet-400 font-mono">
                              ♪ VOICE ON
                            </span>
                          )}
                        </div>
                        <p className="text-lg sm:text-xl font-medium text-foreground leading-relaxed">
                          {displayed}
                          {playing && (
                            <motion.span
                              animate={{ opacity: [1, 0] }}
                              transition={{ duration: 0.45, repeat: Infinity }}
                              className="inline-block w-[2px] h-5 bg-cyan-400 ml-0.5 align-middle rounded-full"
                            />
                          )}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Progress segments */}
                <div className="flex gap-1">
                  {SCRIPT_LINES.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        flex: i === lineIndex && !done ? 2.5 : 1,
                        background:
                          i < lineIndex || done
                            ? "hsl(199 89% 58%)"
                            : i === lineIndex
                              ? "hsl(252 87% 68%)"
                              : "hsl(var(--border))",
                        opacity:
                          i < lineIndex || done ? 1 : i === lineIndex ? 1 : 0.25,
                      }}
                    />
                  ))}
                </div>

                {/* Done */}
                {done && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl glass border border-emerald-500/25 p-4 text-center"
                  >
                    <p className="text-emerald-400 font-semibold text-sm">Presentation complete ✓</p>
                    <button
                      onClick={handleReset}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <RotateCcw size={11} /> Watch again
                    </button>
                  </motion.div>
                )}

                {/* History */}
                <div className="flex-1 space-y-2 overflow-hidden">
                  <AnimatePresence>
                    {[...completed].reverse().slice(0, 5).map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: Math.max(0.12, 0.55 - i * 0.1), x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-[9px] text-cyan-400/40 font-mono mt-0.5 flex-shrink-0">
                          {String(completed.length - i).padStart(2, "0")}
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {line}
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
