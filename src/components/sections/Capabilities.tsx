"use client";

import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/lib/content";
import { gsap } from "@/lib/gsap-init";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import EyeAnchor from "@/components/optic/EyeAnchor";
import { r2 } from "@/components/optic/LensSVG";

const C = 300;
const RADII = [138, 180, 222, 264];

function polar(r: number, i: number, n: number, offset: number) {
  const a = (i / n) * Math.PI * 2 - Math.PI / 2 + offset;
  return { x: r2(C + Math.cos(a) * r), y: r2(C + Math.sin(a) * r) };
}

export default function Capabilities() {
  const [active, setActive] = useState(0);
  const map = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      map.current?.querySelectorAll<SVGGElement>("[data-ring]").forEach((ring, i) => {
        gsap.fromTo(
          ring,
          { rotation: i % 2 ? 18 : -18, svgOrigin: `${C} ${C}` },
          {
            rotation: i % 2 ? -18 : 18,
            svgOrigin: `${C} ${C}`,
            ease: "none",
            scrollTrigger: { trigger: map.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const current = capabilities[active];

  return (
    <section id="system" aria-labelledby="system-title" className="relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <SectionHeader
          id="system-title"
          index="04"
          label="System"
          title={["Capability", <span key="s" className="t-serif text-fg-2">map.</span>]}
          aside={<p className="t-mono">4 rings · {capabilities.reduce((n, c) => n + c.items.length, 0)} nodes</p>}
        />

        <div className="grid-12 mt-[clamp(3rem,8vw,6rem)] items-center gap-y-10">
          <div className="col-span-12 tab:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[720px]">
              <svg ref={map} viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" role="img" aria-label="Concentric map of capability categories around the sensor">
                <circle cx={C} cy={C} r={290} className="fill-none stroke-line" />
                {[0, 45, 90, 135].map((deg) => (
                  <line
                    key={deg}
                    x1={r2(C + Math.cos((deg * Math.PI) / 180) * 290)}
                    y1={r2(C + Math.sin((deg * Math.PI) / 180) * 290)}
                    x2={r2(C - Math.cos((deg * Math.PI) / 180) * 290)}
                    y2={r2(C - Math.sin((deg * Math.PI) / 180) * 290)}
                    className="stroke-line opacity-60"
                  />
                ))}
                {capabilities.map((cap, ci) => {
                  const r = RADII[ci];
                  const on = ci === active;
                  return (
                    <g
                      key={cap.id}
                      data-ring
                      onPointerEnter={() => setActive(ci)}
                      onClick={() => setActive(ci)}
                      className="cursor-pointer"
                    >
                      <circle cx={C} cy={C} r={r} fill="none" stroke="transparent" strokeWidth="22" />
                      <circle
                        cx={C}
                        cy={C}
                        r={r}
                        fill="none"
                        className={`fill-none transition-[stroke] duration-500 ${on ? "stroke-signal" : "stroke-line-2"}`}
                        strokeDasharray={on ? undefined : "1 5"}
                      />
                      {cap.items.map((item, i) => {
                        const p = polar(r, i, cap.items.length, ci * 0.4);
                        return (
                          <circle
                            key={item}
                            cx={p.x}
                            cy={p.y}
                            r={on ? 4.5 : 2.6}
                            className={on ? "fill-signal" : "fill-fg-3"}
                            style={{ transition: "r .5s, fill .5s" }}
                          />
                        );
                      })}
                      <text
                        x={C}
                        y={C - r - 8}
                        textAnchor="middle"
                        className={`transition-[fill] duration-500 ${on ? "fill-fg" : "fill-fg-3"}`}
                        fontFamily="var(--font-geist-mono), monospace"
                        fontSize="10"
                        letterSpacing="2"
                      >
                        R{ci + 1}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <EyeAnchor
                id="system"
                led={1}
                className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
          </div>

          <Reveal className="col-span-12 tab:col-span-5 lap:col-span-4 lap:col-start-9">
            <div role="tablist" aria-label="Capability categories" className="grid grid-cols-2 border-t border-line tab:grid-cols-1">
              {capabilities.map((cap, ci) => (
                <button
                  key={cap.id}
                  role="tab"
                  id={`tab-${cap.id}`}
                  aria-selected={ci === active}
                  aria-controls="cap-panel"
                  onClick={() => setActive(ci)}
                  onPointerEnter={() => setActive(ci)}
                  className={`fade-up flex min-h-14 items-center gap-3 border-b border-line py-3 pr-3 text-left transition-colors ${
                    ci === active ? "text-fg" : "text-fg-3 hover:text-fg-2"
                  }`}
                  style={{ ["--d" as string]: `${ci * 0.06}s` }}
                >
                  <span className={`t-mono ${ci === active ? "text-signal" : ""}`}>R{ci + 1}</span>
                  <span className="text-[0.9375rem] font-medium tracking-[-0.01em] tab:text-[1.125rem]">{cap.label}</span>
                </button>
              ))}
            </div>

            <div id="cap-panel" role="tabpanel" aria-labelledby={`tab-${current.id}`} className="mt-8 min-h-[12rem]">
              <p className="t-mono text-fg-3">
                Ring {active + 1} · {current.items.length} nodes
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.items.map((item) => (
                  <li key={item} className="t-mono border border-line px-3 py-2 normal-case tracking-[0.04em] text-fg-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
