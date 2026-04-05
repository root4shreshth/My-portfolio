"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modelState } from "@/lib/scroll-store";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [visible, setVisible] = useState(true);
  const hasCompleted = useRef(false);

  useEffect(() => {
    if (hasCompleted.current) return;

    // Phase 1 immediately
    setPhase(1);
    setStatusText("INITIALIZING SYSTEM...");

    // Poll for actual model load + run phases
    let frame: number;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const isModelLoaded = modelState.loaded;

      // Minimum time: 2s for UI to feel intentional
      // Progress: blend fake progress with model state
      const fakeProgress = Math.min(elapsed / 3000, 0.85);
      const realProgress = isModelLoaded ? 1 : fakeProgress;
      const blended = Math.max(fakeProgress, realProgress);
      const eased = blended < 0.5
        ? 2 * blended * blended
        : 1 - Math.pow(-2 * blended + 2, 2) / 2;

      setProgress(Math.round(eased * 100));

      // Phase transitions based on progress
      if (eased > 0.2 && phase < 2) {
        setPhase(2);
        setStatusText("LOADING NEURAL CORE...");
      }
      if (eased > 0.5 && phase < 3) {
        setPhase(3);
        setStatusText("SYNCING MODULES...");
      }

      // Complete: model loaded AND minimum 2s elapsed
      if (isModelLoaded && elapsed > 2000) {
        setProgress(100);
        setPhase(4);
        setStatusText("SYSTEM READY");
        hasCompleted.current = true;

        // Brief pause on "READY", then slide up
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 1000);
        }, 600);
        return;
      }

      // If taking too long (>8s), force complete
      if (elapsed > 8000) {
        setProgress(100);
        setPhase(4);
        setStatusText("SYSTEM READY");
        hasCompleted.current = true;
        setTimeout(() => {
          setVisible(false);
          setTimeout(() => onComplete?.(), 1000);
        }, 600);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] overflow-hidden"
          style={{ background: "#030303" }}
        >
          {/* Red center glow */}
          <motion.div
            animate={{
              opacity: phase >= 2 ? 0.12 : 0.04,
              scale: phase >= 4 ? 1.3 : 1,
            }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(255, 30, 30, 0.15) 0%, transparent 70%)",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,42,42,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,42,42,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Scanning beam — phase 3 */}
          {phase === 3 && (
            <motion.div
              initial={{ top: "20%" }}
              animate={{ top: ["20%", "80%", "20%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[1px] z-30 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, #ff2a2a 30%, #ff2a2a 70%, transparent 100%)",
                boxShadow: "0 0 15px 3px rgba(255, 42, 42, 0.3)",
              }}
            />
          )}

          {/* HUD corners */}
          <div className="absolute top-6 left-6">
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20" />
          </div>
          <div className="absolute top-6 right-6 flex flex-col items-end">
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20 self-end" />
          </div>
          <div className="absolute bottom-6 left-6">
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20" />
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col items-end">
            <div className="w-[1px] h-[30px] bg-[#ff2a2a]/20 self-end" />
            <div className="w-[30px] h-[1px] bg-[#ff2a2a]/20" />
          </div>

          {/* UI Overlay */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between py-12 pointer-events-none">
            {/* Status indicators */}
            <div className="flex items-center gap-6">
              {[
                { label: "Neural Core", active: phase >= 2 },
                { label: "Interface", active: phase >= 3 },
                { label: "Modules", active: phase >= 4 },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-2">
                  <motion.span
                    animate={{ opacity: item.active ? [0.3, 1, 0.3] : 0.2 }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                    className="w-[5px] h-[5px] rounded-full"
                    style={{ background: item.active ? "#ff2a2a" : "#333" }}
                  />
                  <span className="text-[9px] text-white/15 uppercase tracking-[3px] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Counter */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-baseline"
              >
                <span
                  className="text-[80px] sm:text-[100px] font-instrument-serif text-white/90 tabular-nums tracking-tighter leading-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {progress}
                </span>
                <span className="text-[22px] font-instrument-serif text-[#ff2a2a]/40 ml-1">
                  %
                </span>
              </motion.div>

              <motion.p
                key={statusText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[10px] uppercase tracking-[5px] font-sans mt-4"
                style={{ color: phase >= 4 ? "#ff2a2a" : "rgba(255,255,255,0.2)" }}
              >
                {statusText}
              </motion.p>

              <div className="mt-6 w-[200px] h-[1px] bg-white/5 overflow-hidden">
                <div
                  className="h-full transition-all duration-200"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #ff2a2a, rgba(255,255,255,0.3))",
                  }}
                />
              </div>
            </div>

            {/* Bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-[8px] text-white/8 uppercase tracking-[4px] font-sans"
            >
              Shreshth Srivastava &mdash; Portfolio v2.0
            </motion.p>
          </div>

          {/* Phase transition flicker */}
          <AnimatePresence>
            {(phase === 2 || phase === 4) && (
              <motion.div
                initial={{ opacity: 0.15 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0 z-50 bg-[#ff2a2a] pointer-events-none mix-blend-overlay"
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
