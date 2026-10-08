"use client";

import { useEffect, useRef } from "react";
import LensSVG from "./LensSVG";
import { eye, modelState, pointer, resolveTarget } from "./eye-store";

// Lightweight optic for low-power devices, reduced motion and no-WebGL:
// same docking anchors, pupil offset instead of 3D rotation.
export default function OpticFallback() {
  const wrap = useRef<HTMLDivElement>(null);
  const pupil = useRef<SVGGElement>(null);

  useEffect(() => {
    modelState.loaded = true;
    modelState.progress = 1;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cur = { x: 0, y: 0, s: 0, px: 0, py: 0, init: false };
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = resolveTarget();
      const k = reduced || !cur.init ? 1 : 1 - Math.exp(-6 * dt);
      cur.x += (t.cx - cur.x) * k;
      cur.y += (t.cy - cur.y) * k;
      cur.s += ((t.visible ? t.size : 0) - cur.s) * k;
      cur.init = cur.init || t.visible;

      const recent = now - pointer.lastMove < 2800;
      const dx = recent ? pointer.x - cur.x : 0;
      const dy = recent ? pointer.y - cur.y : 0;
      const len = Math.hypot(dx, dy) || 1;
      const reach = Math.min(len / 400, 1) * 14;
      const g = reduced ? 1 : 1 - Math.exp(-8 * dt);
      cur.px += ((dx / len) * reach - cur.px) * g;
      cur.py += ((dy / len) * reach - cur.py) * g;
      eye.yaw = cur.px * 2.5;
      eye.pitch = -cur.py * 2.5;

      if (wrap.current) {
        wrap.current.style.transform = `translate3d(${cur.x - cur.s / 2}px, ${cur.y - cur.s / 2}px, 0)`;
        wrap.current.style.width = wrap.current.style.height = `${cur.s}px`;
      }
      pupil.current?.setAttribute("transform", `translate(${cur.px} ${cur.py})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-40"
      style={{ width: 0, height: 0 }}
    >
      <LensSVG className="h-full w-full" pupilRef={pupil} />
    </div>
  );
}
