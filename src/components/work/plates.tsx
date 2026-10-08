import Image from "next/image";
import { r2 } from "@/components/optic/LensSVG";

const STROKE = "rgba(255,255,255,0.22)";
const DIM = "rgba(255,255,255,0.45)";
const FG = "#ededeb";
const RED = "#ff2a1f";
const MONO = "var(--font-geist-mono), monospace";

function Box({
  x,
  y,
  w,
  h,
  label,
  sub,
  hot = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  hot?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#0f0f10" stroke={hot ? RED : STROKE} />
      <text x={x + 10} y={y + (sub ? h / 2 - 2 : h / 2 + 5)} fill={FG} fontFamily={MONO} fontSize="13" letterSpacing="1">
        {label}
      </text>
      {sub && (
        <text x={x + 10} y={y + h / 2 + 15} fill={DIM} fontFamily={MONO} fontSize="11">
          {sub}
        </text>
      )}
      {hot && <circle cx={x + w - 10} cy={y + 10} r="3" fill={RED} />}
    </g>
  );
}

function Arrow({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={DIM} strokeWidth="1" markerEnd="url(#arrow)" />;
}

function Defs() {
  return (
    <defs>
      <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L8 4L0 8" fill="none" stroke={DIM} />
      </marker>
      <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.8" fill="rgba(255,255,255,0.08)" />
      </pattern>
    </defs>
  );
}

function Svg({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 600 420" className="absolute inset-0 h-full w-full" role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
      <Defs />
      <rect width="600" height="420" fill="url(#dots)" />
      {children}
    </svg>
  );
}

export function EnterprisePlate() {
  const chain = ["EMAIL", "EXTRACT", "AUTO-FILL", "CHECKS", "DUAL GATE"];
  const modules = [
    ["KYC", "onboarding"],
    ["PO", "automation"],
    ["CARD REC.", "reconciliation"],
    ["INVENTORY", "portal"],
  ];
  return (
    <Svg label="System diagram: agentic email intake feeding four Next.js modules, connected to SAP Business One through the Service Layer REST API">
      <text x="30" y="36" fill={DIM} fontFamily={MONO} fontSize="11" letterSpacing="2">AGENTIC INTAKE</text>
      {chain.map((c, i) => (
        <g key={c}>
          <Box x={30 + i * 110} y={48} w={98} h={34} label={c} hot={i === 4} />
          {i < 4 && <Arrow d={`M${128 + i * 110} 65 H${138 + i * 110}`} />}
        </g>
      ))}
      <Arrow d="M519 82 V104 H222 V124" />

      {modules.map(([l, s], i) => (
        <g key={l}>
          <Box x={30 + i * 138} y={128} w={126} h={56} label={l} sub={s} />
          <path d={`M${93 + i * 138} 184 V206`} stroke={STROKE} />
        </g>
      ))}

      <rect x="30" y="206" width="540" height="38" fill="#0f0f10" stroke={STROKE} />
      <text x="300" y="230" textAnchor="middle" fill={FG} fontFamily={MONO} fontSize="13" letterSpacing="2">NEXT.JS 14 · SUPABASE</text>
      <Arrow d="M300 244 V268" />

      <rect x="130" y="270" width="340" height="38" fill="#0f0f10" stroke={STROKE} />
      <text x="300" y="294" textAnchor="middle" fill={FG} fontFamily={MONO} fontSize="13" letterSpacing="2">SAP SERVICE LAYER · REST</text>
      <Arrow d="M300 308 V332" />

      <rect x="200" y="334" width="200" height="52" fill="#0f0f10" stroke={RED} />
      <circle cx="388" cy="346" r="3" fill={RED} />
      <text x="300" y="366" textAnchor="middle" fill={FG} fontFamily={MONO} fontSize="13" letterSpacing="2">SAP BUSINESS ONE</text>
    </Svg>
  );
}

export function SmartCapPlate() {
  const ticks = Array.from({ length: 19 }, (_, i) => -90 + i * 10);
  return (
    <Svg label="Hardware diagram: IMU into ESP32-C3, haptic alert and BLE link to a mobile app running a gradient boosting posture model">
      <Box x={30} y={60} w={150} h={56} label="MPU-6050" sub="IMU · live" />
      <Arrow d="M180 88 H222" />
      <Box x={224} y={60} w={150} h={56} label="ESP32-C3" sub="wearable MCU" hot />
      <Arrow d="M299 116 V158" />
      <Box x={224} y={160} w={150} h={48} label="HAPTIC" sub="posture alert" />
      <Arrow d="M374 88 H416" />
      <Box x={418} y={60} w={152} h={56} label="BLE" sub="paired link" />
      <Arrow d="M494 116 V158" />
      <Box x={418} y={160} w={152} h={48} label="MOBILE APP" sub="paired" />
      <Arrow d="M494 208 V250" />
      <Box x={378} y={252} w={192} h={56} label="GB MODEL" sub="score · risk horizon" hot />

      {/* cervical angle gauge (schematic) */}
      <g transform="translate(130 330)">
        <path d="M-100 0 A100 100 0 0 1 100 0" fill="none" stroke={STROKE} />
        {ticks.map((a) => {
          const r = (a * Math.PI) / 180;
          const long = a % 30 === 0;
          return (
            <line
              key={a}
              x1={r2(Math.sin(r) * 100)}
              y1={r2(-Math.cos(r) * 100)}
              x2={r2(Math.sin(r) * (long ? 86 : 92))}
              y2={r2(-Math.cos(r) * (long ? 86 : 92))}
              stroke={a > 30 ? RED : DIM}
            />
          );
        })}
        <line x1="0" y1="0" x2={r2(Math.sin(0.62) * 78)} y2={r2(-Math.cos(0.62) * 78)} stroke={FG} strokeWidth="1.5" />
        <circle r="4" fill={FG} />
        <text x="-100" y="24" fill={DIM} fontFamily={MONO} fontSize="11" letterSpacing="2">CERVICAL ANGLE · SCHEMATIC</text>
      </g>
      <text x="570" y="398" textAnchor="end" fill={DIM} fontFamily={MONO} fontSize="11" letterSpacing="2">PATENT GRANTED · IN</text>
    </Svg>
  );
}

export function PraetorPlate() {
  const stages = ["PAGED", "TRIAGE", "POLICY", "REMEDIATE"];
  const cx = 200;
  const cy = 215;
  const r = 130;
  return (
    <Svg label="Agent loop diagram: paged incident, triage, trained policy, remediation, around a 10-action vocabulary; OpenEnv environment components listed">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={STROKE} />
      <circle cx={cx} cy={cy} r={r - 46} fill="none" stroke={STROKE} strokeDasharray="2 6" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={i}>
            <circle cx={r2(cx + Math.cos(a) * (r - 46))} cy={r2(cy + Math.sin(a) * (r - 46))} r="4" fill={i === 0 ? RED : "#0f0f10"} stroke={i === 0 ? RED : DIM} />
          </g>
        );
      })}
      <text x={cx} y={cy - 4} textAnchor="middle" fill={FG} fontFamily={MONO} fontSize="22" letterSpacing="1">10</text>
      <text x={cx} y={cy + 16} textAnchor="middle" fill={DIM} fontFamily={MONO} fontSize="10" letterSpacing="2">TYPED ACTIONS</text>
      {stages.map((s, i) => {
        const a = (i / stages.length) * Math.PI * 2 - Math.PI / 2;
        const x = r2(cx + Math.cos(a) * r);
        const y = r2(cy + Math.sin(a) * r);
        return (
          <g key={s}>
            <rect x={x - 46} y={y - 15} width="92" height="30" fill="#0f0f10" stroke={i === 2 ? RED : STROKE} />
            <text x={x} y={y + 5} textAnchor="middle" fill={FG} fontFamily={MONO} fontSize="12" letterSpacing="1">{s}</text>
          </g>
        );
      })}

      <text x="400" y="80" fill={DIM} fontFamily={MONO} fontSize="11" letterSpacing="2">OPENENV · DEVOPS</text>
      {["SIMULATOR", "CURRICULUM", "TRAINING PIPELINE", "SIM-TO-REAL BRIDGE"].map((l, i) => (
        <g key={l}>
          <rect x="400" y={96 + i * 52} width="170" height="38" fill="#0f0f10" stroke={STROKE} />
          <text x="412" y={120 + i * 52} fill={FG} fontFamily={MONO} fontSize="12" letterSpacing="1">{l}</text>
          {i < 3 && <Arrow d={`M485 ${134 + i * 52} V${148 + i * 52}`} />}
        </g>
      ))}
    </Svg>
  );
}

export function ScreenshotPlate({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1199px) 100vw, 55vw"
      className="object-cover object-top"
    />
  );
}
