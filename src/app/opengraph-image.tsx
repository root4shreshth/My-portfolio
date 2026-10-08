import { ImageResponse } from "next/og";

export const alt = "Shreshth Srivastava — AI Engineer. LLM agents, voice AI and enterprise automation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const OUTER = 56;
const INNER = 40;

function dots(count: number, radius: number, offset: number, d: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2 - Math.PI / 2 + offset;
    return { left: Math.round(210 + Math.cos(a) * radius - d / 2), top: Math.round(210 + Math.sin(a) * radius - d / 2), d };
  });
}

export default function Image() {
  const leds = [...dots(OUTER, 150, 0, 9), ...dots(INNER, 124, Math.PI / INNER, 7)];

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#050505", color: "#ededeb", padding: 64, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, color: "#6a6a69" }}>INDEX 01 — SENSOR · IN · UTC+05:30</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 112, fontWeight: 600, letterSpacing: -5, lineHeight: 0.92 }}>Shreshth</div>
            <div style={{ fontSize: 112, fontStyle: "italic", letterSpacing: -4, lineHeight: 1, color: "#a1a1a0" }}>Srivastava</div>
            <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#ededeb" }}>AI Engineer — prototype to production.</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 20, letterSpacing: 3, color: "#a1a1a0" }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#ff2a1f", marginRight: 14 }} />
            LLM AGENTS · VOICE AI · SAP AUTOMATION · hype4shreshth.in
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 420 }}>
          <div style={{ position: "relative", display: "flex", width: 420, height: 420, borderRadius: 420, background: "radial-gradient(circle at 50% 42%, #2a2a2c, #0d0d0e 70%, #050505)", border: "1px solid rgba(255,255,255,0.14)" }}>
            {leds.map((p, i) => (
              <div key={i} style={{ position: "absolute", left: p.left, top: p.top, width: p.d, height: p.d, borderRadius: p.d, background: "#ff2a1f" }} />
            ))}
            <div style={{ position: "absolute", left: 120, top: 120, width: 180, height: 180, borderRadius: 180, background: "radial-gradient(circle at 40% 35%, #3a3a3d, #09090a 55%, #000)", border: "1px solid rgba(255,255,255,0.12)" }} />
          </div>
        </div>
      </div>
    ),
    size
  );
}
