"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, profile, sections } from "@/lib/content";
import { scrollToId } from "@/lib/lenis-provider";
import { emit } from "@/lib/events";

interface MenuOverlayProps {
  open: boolean;
  onClose: () => void;
}

const ease = [0.7, 0, 0.2, 1] as const;

export default function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    document.documentElement.style.overflow = "hidden";
    const first = panel.current?.querySelector<HTMLElement>("button, a");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a, button"));
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      returnFocus.current?.focus();
    };
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="site-menu"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink-0"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="shell flex h-16 shrink-0 items-center justify-between border-b border-line">
            <span className="t-mono text-fg-2">Index</span>
            <button type="button" onClick={onClose} className="t-mono h-10 border border-line-2 px-4 hover:border-fg">
              Close
            </button>
          </div>

          <nav className="shell flex-1 py-6 tab:py-10" aria-label="Sections">
            <ol>
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.8, ease }}
                  className="border-b border-line"
                >
                  <button
                    type="button"
                    onClick={() => go(s.id)}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-3 text-left tab:grid-cols-[6rem_1fr_auto] tab:py-4"
                  >
                    <span className="t-mono text-fg-3 group-hover:text-signal">{s.index}</span>
                    <span className="text-[clamp(2rem,7vw,5.5rem)] font-medium leading-none tracking-[-0.045em] transition-transform duration-500 group-hover:translate-x-2">
                      {s.label}
                    </span>
                    <span className="t-mono text-fg-3 opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </button>
                </motion.li>
              ))}
            </ol>
          </nav>

          <div className="shell grid shrink-0 gap-4 border-t border-line py-6 tab:grid-cols-3">
            <a href={`mailto:${contact.email}`} className="t-mono link-line w-fit text-fg-2 hover:text-fg">
              {contact.email}
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {contact.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="t-mono link-line text-fg-2 hover:text-fg">
                  {l.label}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 tab:justify-self-end">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  emit("open-chat");
                }}
                className="t-mono link-line text-signal"
              >
                Ask the system →
              </button>
              <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="t-mono link-line text-fg-2 hover:text-fg">
                Résumé ↓
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
