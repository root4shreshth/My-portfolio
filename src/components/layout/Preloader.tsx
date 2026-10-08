"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LensSVG, { LED_COUNT } from "@/components/optic/LensSVG";
import { modelState } from "@/components/optic/eye-store";
import { markReady } from "@/lib/ready";

const MIN_MS = 1000;
const MAX_MS = 6000;
const KEY = "optic-calibrated";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    let skip = false;
    try {
      skip = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (skip || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        markReady();
      });
      return () => cancelAnimationFrame(id);
    }

    const start = performance.now();
    let raf = 0;
    let shown = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      const target = modelState.loaded ? 1 : Math.min(0.9, 1 - Math.exp(-elapsed / 1400));
      shown += (target - shown) * 0.12;
      setLit(Math.round(shown * LED_COUNT));

      const done = (modelState.loaded && elapsed > MIN_MS && shown > 0.985) || elapsed > MAX_MS;
      if (done) {
        setLit(LED_COUNT);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        setTimeout(() => {
          setVisible(false);
          markReady();
        }, 250);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-ink-0"
          role="status"
          aria-label="Loading"
          initial={{ ["--r" as string]: "0%" }}
          exit={{ ["--r" as string]: "75%" }}
          transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
          style={{
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 0.5%))",
            maskImage: "radial-gradient(circle at 50% 50%, transparent var(--r), #000 calc(var(--r) + 0.5%))",
          }}
        >
          <div className="shell t-mono flex h-16 items-center justify-between text-fg-3">
            <span>Shreshth Srivastava</span>
            <span>OBJ-01</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <LensSVG lit={lit} className="w-[min(46vw,260px)]" />
            <p className="t-mono tabular-nums text-fg-2">
              Calibrating sensor — <span className="text-fg">{String(lit).padStart(3, "0")}</span> / {LED_COUNT}
            </p>
          </div>
          <div className="shell t-mono flex h-16 items-center justify-between text-fg-3">
            <span>AI Engineer</span>
            <span>Ed. 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
