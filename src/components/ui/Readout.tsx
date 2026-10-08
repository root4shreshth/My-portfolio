"use client";

import { useEffect, useRef } from "react";
import { eye } from "@/components/optic/eye-store";

function fmt(v: number) {
  const s = v.toFixed(1);
  return (v >= 0 ? "+" : "−") + s.replace("-", "").padStart(4, "0");
}

// Live telemetry from the eye, throttled to ~12fps to stay off the main thread's critical path.
export default function Readout({ className = "" }: { className?: string }) {
  const yaw = useRef<HTMLSpanElement>(null);
  const pitch = useRef<HTMLSpanElement>(null);
  const status = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 80) {
        last = now;
        if (yaw.current) yaw.current.textContent = fmt(eye.yaw) + "°";
        if (pitch.current) pitch.current.textContent = fmt(eye.pitch) + "°";
        if (status.current) status.current.textContent = eye.locked ? "Target locked" : "Tracking";
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`t-mono tabular-nums text-fg-3 ${className}`} aria-hidden="true">
      <div className="flex items-center gap-2 text-fg-2">
        <span className="dot dot-pulse" />
        <span>Sensor OBJ-01 ·</span>
        <span ref={status}>Tracking</span>
      </div>
      <div className="mt-1 flex gap-4">
        <span>
          Yaw <span ref={yaw} className="text-fg">+00.0°</span>
        </span>
        <span>
          Pitch <span ref={pitch} className="text-fg">+00.0°</span>
        </span>
      </div>
    </div>
  );
}
