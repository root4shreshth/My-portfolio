"use client";

import { profile } from "@/lib/content";
import { useReady } from "@/lib/ready";
import { Lines } from "@/components/ui/Reveal";
import EyeAnchor from "@/components/optic/EyeAnchor";
import Readout from "@/components/ui/Readout";

export default function Hero() {
  const ready = useReady();

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className={`relative flex min-h-[100svh] flex-col pt-16 ${ready ? "is-in" : ""}`}
    >
      <div className="guides" />

      <div className="shell relative flex flex-1 flex-col">
        {/* meta strip */}
        <div className="t-mono fade-up grid grid-cols-2 gap-4 border-b border-line py-4 text-fg-3 tab:grid-cols-4">
          <span>Index 01 — Sensor</span>
          <span className="text-right tab:text-left">
            {profile.location} · {profile.timezone}
          </span>
          <span className="hidden tab:block">Portfolio — Ed. 2026</span>
          <span className="col-span-2 flex items-center gap-2 text-fg-2 tab:col-span-1 tab:justify-end">
            <span className="dot dot-pulse" />
            {profile.availability}
          </span>
        </div>

        {/* name + optic */}
        <div className="grid-12 flex-1 content-center gap-y-6 py-8 tab:py-12">
          <div className="col-span-12 flex justify-center tab:order-2 tab:col-span-5 tab:items-center tab:justify-end">
            <EyeAnchor
              id="hero"
              led={1}
              className="aspect-square w-[min(68vw,42svh)] tab:w-[min(38vw,64svh,760px)]"
            />
          </div>

          <h1
            id="hero-title"
            className="col-span-12 self-center font-medium leading-[0.86] tracking-[-0.055em] text-[clamp(3.25rem,15vw,7.5rem)] tab:order-1 tab:col-span-7 tab:text-[clamp(4.5rem,9.2vw,11.5rem)]"
          >
            <Lines lines={[profile.first, <span key="l" className="t-serif text-fg-2">{profile.last}</span>]} step={0.12} />
          </h1>
        </div>

        {/* lede + telemetry + actions */}
        <div className="grid-12 gap-y-8 border-t border-line py-6 tab:py-8">
          <p
            className="fade-up col-span-12 max-w-[34ch] text-[clamp(1.25rem,1rem+1vw,1.75rem)] leading-[1.2] tracking-[-0.02em] tab:col-span-6 lap:col-span-5"
            style={{ ["--d" as string]: "0.35s" }}
          >
            {profile.role} — takes systems from{" "}
            <span className="t-serif text-fg-2">prototype to production.</span>
          </p>

          <Readout
            className="fade-up col-span-12 self-end tab:col-span-3 tab:col-start-7 lap:col-start-8"
          />

          <div
            className="fade-up col-span-12 flex flex-col gap-3 self-end xs:flex-row tab:col-span-3 tab:flex-col tab:items-stretch lap:col-span-2 lap:col-start-11"
            style={{ ["--d" as string]: "0.5s" }}
          >
            <a href="#work" className="btn btn-solid">
              Selected work
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn">
              Résumé ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
