"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Maximize2, Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface BrowserFrameProps {
  screenshotSrc?: string;
  liveUrl?: string;
  title: string;
  accent?: string;
  height?: number;
  /** Pass true when the site sends X-Frame-Options: DENY — skips iframe, shows screenshot */
  embedBlocked?: boolean;
}

const IFRAME_W = 1280;
const IFRAME_H = 800;

export function BrowserFrame({
  screenshotSrc,
  liveUrl,
  title,
  accent = "hsl(252 87% 63%)",
  height = 220,
  embedBlocked = false,
}: BrowserFrameProps) {
  const [hovered, setHovered] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [scale, setScale] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  /* Merge refs */
  const setRefs = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    inViewRef(el);
  };

  /* Calculate scale from container width */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setScale(w / IFRAME_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const displayUrl = liveUrl ? liveUrl.replace(/^https?:\/\//, "") : "localhost:3000";
  const showIframe = liveUrl && inView && scale > 0 && !iframeError && !embedBlocked;

  return (
    <>
      {/* ── Browser Frame Card ──────────────────────── */}
      <div
        ref={setRefs}
        className="relative w-full rounded-xl overflow-hidden border border-border/40 bg-[#0d0d0f] group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1f]/90 border-b border-white/5 backdrop-blur-sm">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_4px_rgba(255,189,46,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.5)]" />
          </div>

          {/* URL bar */}
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

          {/* Scaled live iframe */}
          {showIframe && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: IFRAME_W,
                height: IFRAME_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                pointerEvents: "none",
              }}
            >
              <iframe
                src={liveUrl}
                title={title}
                width={IFRAME_W}
                height={IFRAME_H}
                className="border-0 block"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
              />
            </div>
          )}

          {/* Screenshot shown while iframe loads or as fallback */}
          {screenshotSrc && (!iframeLoaded || iframeError) && (
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{ opacity: iframeLoaded && !iframeError ? 0 : 1 }}
            >
              <Image
                src={screenshotSrc}
                alt={`${title} preview`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* Loading spinner (no screenshot available) */}
          {liveUrl && !screenshotSrc && !iframeLoaded && !iframeError && inView && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0f]">
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={20} className="animate-spin text-primary/50" />
                <span className="text-[11px] text-muted-foreground">Loading preview…</span>
              </div>
            </div>
          )}

          {/* No content fallback */}
          {!liveUrl && !screenshotSrc && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${accent}12 0%, ${accent}06 50%, transparent 100%)` }}
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

          {/* Hover overlay */}
          <AnimatePresence>
            {hovered && liveUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center gap-3 z-20"
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
                  Full Preview
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#0d0d0f] to-transparent pointer-events-none z-10" />
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
                <button
                  onClick={() => setFullscreen(false)}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-red-400 transition-colors"
                />
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

            {/* Full-size iframe */}
            <div className="flex-1 relative overflow-hidden">
              <iframe
                src={liveUrl}
                title={title}
                className="w-full h-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
