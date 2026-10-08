// Mutable, render-free state shared by the WebGL eye, the SVG fallback and DOM readouts.

export interface AnchorConfig {
  el: HTMLElement;
  section: HTMLElement | null;
  led: number;
  dock?: boolean;
}

export const modelState = { loaded: false, progress: 0 };

export const eye = {
  yaw: 0,
  pitch: 0,
  led: 1,
  locked: false,
  activeId: "",
};

export const pointer = {
  x: 0,
  y: 0,
  lastMove: -Infinity,
};

const anchors = new Map<string, AnchorConfig>();

export function registerAnchor(id: string, config: AnchorConfig) {
  anchors.set(id, config);
  return () => {
    if (anchors.get(id) === config) anchors.delete(id);
  };
}

export function setLocked(value: boolean) {
  eye.locked = value;
}

export interface EyeTarget {
  cx: number;
  cy: number;
  size: number;
  led: number;
  visible: boolean;
}

const hidden: EyeTarget = { cx: 0, cy: 0, size: 0, led: 0, visible: false };

// The eye docks into the anchor whose section contains the viewport's midline;
// sections without their own anchor hand the eye to the dock (the nav sensor).
export function resolveTarget(): EyeTarget {
  if (typeof window === "undefined") return hidden;
  const mid = window.innerHeight * 0.5;
  let dock: AnchorConfig | undefined;
  let dockId = "";

  for (const [id, a] of anchors) {
    if (a.dock) {
      dock = a;
      dockId = id;
      continue;
    }
    if (!a.section) continue;
    const s = a.section.getBoundingClientRect();
    if (s.top <= mid && s.bottom >= mid) {
      eye.activeId = id;
      return fromRect(a.el.getBoundingClientRect(), a.led);
    }
  }

  if (dock) {
    eye.activeId = dockId;
    return fromRect(dock.el.getBoundingClientRect(), dock.led);
  }
  return hidden;
}

function fromRect(r: DOMRect, led: number): EyeTarget {
  return {
    cx: r.left + r.width / 2,
    cy: r.top + r.height / 2,
    size: Math.min(r.width, r.height),
    led,
    visible: r.width > 0 && r.height > 0,
  };
}

export function trackPointer() {
  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.lastMove = performance.now();
  };
  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  return () => {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onMove);
  };
}
