"use client";

import { useEffect, useRef } from "react";
import { journey } from "@/lib/content";
import { gsap } from "@/lib/gsap-init";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";

export default function Journey() {
  const rail = useRef<HTMLDivElement>(null);
  const vrail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      if (rail.current) {
        gsap.fromTo(rail.current, { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: rail.current, start: "top 85%", end: "top 30%", scrub: true },
        });
      }
      if (vrail.current) {
        gsap.fromTo(vrail.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: vrail.current.parentElement, start: "top 75%", end: "bottom 60%", scrub: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <SectionHeader
          id="journey-title"
          index="06"
          label="Journey"
          title={["Signal", <span key="s" className="t-serif text-fg-2">history.</span>]}
          aside={<p className="t-mono">2024 — Now</p>}
        />

        {/* desktop: horizontal track */}
        <Reveal className="mt-[clamp(3rem,8vw,6rem)] hidden lap:block">
          <div className="relative h-px bg-line">
            <div ref={rail} className="absolute inset-0 origin-left bg-signal" />
          </div>
          <ol className="grid grid-cols-6">
            {journey.map((j, i) => (
              <li key={j.title} className="fade-up relative border-l border-line px-5 pb-2 pt-8 first:border-l-0 first:pl-0" style={{ ["--d" as string]: `${i * 0.07}s` }}>
                <span className={`absolute -top-[4px] left-[-4px] h-2 w-2 rounded-full ${j.current ? "bg-signal dot-pulse" : "bg-fg-3"} ${i === 0 ? "left-0" : ""}`} />
                <p className="text-[clamp(2.5rem,3.6vw,4rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">{j.year}</p>
                <p className="mt-6 text-[1.0625rem] font-medium leading-snug tracking-[-0.01em]">{j.title}</p>
                <p className="t-mono mt-3 normal-case tracking-[0.04em] text-fg-2">{j.org}</p>
                <p className="t-mono mt-2 normal-case tracking-[0.04em] text-fg-3">{j.note}</p>
                {j.current && <p className="t-mono mt-4 text-signal">Current</p>}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* mobile + tablet: vertical rail */}
        <Reveal className="relative mt-[clamp(3rem,8vw,6rem)] lap:hidden">
          <div className="absolute bottom-0 left-[3px] top-0 w-px bg-line">
            <div ref={vrail} className="absolute inset-0 origin-top bg-signal" />
          </div>
          <ol className="space-y-10 tab:space-y-12">
            {journey.map((j, i) => (
              <li key={j.title} className="fade-up relative grid gap-2 pl-8 tab:grid-cols-[8rem_1fr] tab:gap-8" style={{ ["--d" as string]: `${i * 0.06}s` }}>
                <span className={`absolute left-0 top-3 h-[7px] w-[7px] rounded-full ${j.current ? "bg-signal dot-pulse" : "bg-fg-3"}`} />
                <p className="text-[2.5rem] font-medium leading-none tracking-[-0.05em] tabular-nums">{j.year}</p>
                <div>
                  <p className="text-[1.125rem] font-medium tracking-[-0.01em]">
                    {j.title}
                    {j.current && <span className="t-mono ml-3 text-signal">Current</span>}
                  </p>
                  <p className="t-mono mt-2 normal-case tracking-[0.04em] text-fg-2">{j.org}</p>
                  <p className="t-mono mt-1 normal-case tracking-[0.04em] text-fg-3">{j.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
