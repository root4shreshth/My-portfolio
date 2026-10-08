"use client";

import { useEffect, useRef, useState } from "react";
import { sections } from "@/lib/content";
import EyeAnchor from "@/components/optic/EyeAnchor";
import { emit } from "@/lib/events";
import ThemeToggle from "@/components/ui/ThemeToggle";
import MenuOverlay from "./MenuOverlay";

export default function SiteNav() {
  const [active, setActive] = useState<(typeof sections)[number]>(sections[0]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight * 0.5;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom >= mid) {
          setActive((prev) => (prev.id === s.id ? prev : s));
          break;
        }
      }
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-ink-0" : "border-b border-transparent"
        }`}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4">
          <a href="#top" className="flex min-w-0 items-baseline gap-3">
            <span className="truncate text-[15px] font-medium tracking-[-0.02em]">
              Shreshth<span className="hidden xs:inline"> Srivastava</span>
            </span>
            <span className="t-mono hidden text-fg-3 lap:inline">AI Engineer</span>
          </a>

          <div className="flex items-center gap-3" aria-live="polite">
            <EyeAnchor id="dock" dock led={0.8} className="h-7 w-7" />
            <span className="t-mono hidden tabular-nums text-fg-2 xs:inline">
              <span className="text-fg">{active.index}</span> / {active.label}
            </span>
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => emit("open-chat")}
              className="t-mono hidden h-10 items-center gap-2 border border-line px-3 text-fg-2 transition-colors hover:border-line-2 hover:text-fg tab:inline-flex"
              aria-label="Ask the AI assistant"
            >
              <span className="dot" />
              Ask
            </button>
            <button
              type="button"
              onClick={() => emit("open-palette")}
              className="t-mono hidden h-10 items-center border border-line px-3 text-fg-2 transition-colors hover:border-line-2 hover:text-fg lap:inline-flex"
              aria-label="Open command palette"
            >
              ⌘K
            </button>
            <ThemeToggle className="px-2.5 tab:px-3" />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="t-mono inline-flex h-10 items-center gap-2 border border-line-2 px-3 transition-colors hover:border-fg xs:px-4"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
            >
              Menu
            </button>
          </div>
        </div>
        <div
          ref={progress}
          className="absolute bottom-[-1px] left-0 h-px w-full origin-left bg-signal"
          style={{ transform: "scaleX(0)" }}
        />
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
