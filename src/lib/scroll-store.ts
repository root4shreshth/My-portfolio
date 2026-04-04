// Shared scroll progress — single source of truth for GSAP + R3F
// This is a mutable ref, NOT React state (avoids re-renders)

export const scrollState = {
  progress: 0,    // 0 to 1 (overall page progress)
  velocity: 0,    // scroll speed
  direction: 1,   // 1 = down, -1 = up
  y: 0,           // raw scroll Y position
};
