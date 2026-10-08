interface LensSVGProps {
  lit?: number;
  className?: string;
  pupilRef?: React.Ref<SVGGElement>;
}

const OUTER = 56;
const INNER = 40;
export const LED_COUNT = OUTER + INNER;

// Rounded so server and client render identical attribute strings (avoids hydration mismatch).
export const r2 = (n: number) => Math.round(n * 100) / 100;

function ring(count: number, radius: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2 + offset;
    return { x: r2(100 + Math.cos(a) * radius), y: r2(100 + Math.sin(a) * radius) };
  });
}

const outerDots = ring(OUTER, 70);
const innerDots = ring(INNER, 58, Math.PI / INNER);

// 2D drawing of the optic: housing, two concentric LED rings, lens.
// `lit` (0..LED_COUNT) controls how many LEDs are on, in order.
export default function LensSVG({ lit = LED_COUNT, className = "", pupilRef }: LensSVGProps) {
  const dots = [...outerDots, ...innerDots];
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="lens-body" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#2a2a2c" />
          <stop offset="70%" stopColor="#0d0d0e" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <radialGradient id="lens-glass" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#3a3a3d" />
          <stop offset="55%" stopColor="#09090a" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="96" fill="url(#lens-body)" stroke="rgba(255,255,255,.14)" strokeWidth="1" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={i < OUTER ? 3.1 : 2.6}
          fill={i < lit ? "#ff2a1f" : "#2a1110"}
          style={i < lit ? { filter: "drop-shadow(0 0 2px #ff2a1f)" } : undefined}
        />
      ))}
      <g ref={pupilRef}>
        <circle cx="100" cy="100" r="44" fill="#0a0a0b" stroke="rgba(255,255,255,.12)" strokeWidth="1" />
        <circle cx="100" cy="100" r="30" fill="url(#lens-glass)" />
        <ellipse cx="90" cy="88" rx="9" ry="5" fill="rgba(255,255,255,.22)" transform="rotate(-30 90 88)" />
      </g>
    </svg>
  );
}
