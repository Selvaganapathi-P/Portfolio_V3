"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, RefreshCw, Maximize2 } from "lucide-react";

interface BrowserFrameProps {
  /** Local /public path or remote URL for the screenshot */
  screenshotSrc?: string;
  /** Live URL for the "open in new tab" button and URL bar */
  liveUrl?: string;
  /** Project title shown in the tab */
  title: string;
  /** Accent color for the live badge */
  accent?: string;
  /** Height of the viewport area */
  height?: number;
}

export function BrowserFrame({
  screenshotSrc,
  liveUrl,
  title,
  accent = "hsl(252 87% 63%)",
  height = 220,
}: BrowserFrameProps) {
  const [hovered, setHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const displayUrl = liveUrl ? liveUrl.replace(/^https?:\/\//, "") : "localhost:3000";

  return (
    <>
      {/* Browser Frame Card */}
      <div
        className="relative w-full rounded-xl overflow-hidden border border-border/40 bg-[#0d0d0f] group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Chrome Bar ─────────────────────────────── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1f]/90 border-b border-white/5 backdrop-blur-sm">
          {/* Traffic lights */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_4px_rgba(255,189,46,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.5)]" />
          </div>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 px-3 py-1 mx-2 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white/50 min-w-0">
            <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="truncate">{displayUrl}</span>
          </div>

          {/* Live badge */}
          {liveUrl && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 flex-shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              LIVE
            </div>
          )}

          {/* Expand button */}
          {liveUrl && (
            <button
              onClick={() => setFullscreen(true)}
              className="p-1 rounded text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
              aria-label="Expand preview"
            >
              <Maximize2 size={11} />
            </button>
          )}
        </div>

        {/* ── Viewport ──────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height }}>
          {screenshotSrc ? (
            <>
              <Image
                src={screenshotSrc}
                alt={`${title} preview`}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay on hover */}
              <AnimatePresence>
                {hovered && liveUrl && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center gap-3"
                  >
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shadow-xl"
                    >
                      <ExternalLink size={14} />
                      Visit Live Site
                    </a>
                    <button
                      onClick={() => setFullscreen(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
                    >
                      <Maximize2 size={14} />
                      Preview
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            /* No screenshot fallback — abstract gradient */
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 50%, transparent 100%)`,
              }}
            >
              <div className="grid-pattern absolute inset-0 opacity-10" />
              <div
                className="relative w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: `${accent}25`, border: `1px solid ${accent}40` }}
              >
                {title.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs text-muted-foreground relative">No preview available</span>
            </div>
          )}

          {/* Bottom fade to match card */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d0d0f] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── Fullscreen Modal ───────────────────────── */}
      <AnimatePresence>
        {fullscreen && liveUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex flex-col"
            onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false); }}
          >
            {/* Modal chrome bar */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1a1a1f] border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-1.5">
                <button onClick={() => setFullscreen(false)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex items-center gap-2 px-3 py-1 mx-4 rounded-md bg-white/[0.06] border border-white/[0.08] text-[12px] text-white/60 max-w-lg">
                <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="truncate">{liveUrl}</span>
              </div>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={12} />
                Open
              </a>
            </div>

            {/* Iframe viewport */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={liveUrl}
                title={title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
              {/* Overlay for sites that block iframes */}
              <div className="absolute inset-0 pointer-events-none" id="iframe-fallback" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
