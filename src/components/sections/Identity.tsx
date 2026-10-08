"use client";

import { useEffect, useRef } from "react";
import { facts, pipeline, profile } from "@/lib/content";
import { gsap } from "@/lib/gsap-init";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import EyeAnchor from "@/components/optic/EyeAnchor";

export default function Identity() {
  const text = useRef<HTMLParagraphElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const words = text.current?.querySelectorAll("[data-w]");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: { trigger: text.current, start: "top 80%", end: "bottom 45%", scrub: true },
          }
        );
      }
      if (rail.current) {
        gsap.fromTo(
          rail.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: rail.current.parentElement, start: "top 85%", end: "bottom 60%", scrub: true },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const words = profile.summary.split(" ");

  return (
    <section id="identity" aria-labelledby="identity-title" className="relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <SectionHeader
          id="identity-title"
          index="02"
          label="Identity"
          title={["Prototype", <span key="s" className="t-serif text-fg-2">to production.</span>]}
        />

        <div className="grid-12 mt-[clamp(3rem,8vw,7rem)] gap-y-10">
          <div className="col-span-12 tab:col-span-4">
            <div className="tab:sticky tab:top-28">
              <EyeAnchor id="identity" led={0.9} className="mx-auto aspect-square w-[min(52vw,300px)] tab:mx-0 tab:w-full tab:max-w-[340px]" />
              <p className="t-mono mt-6 hidden text-fg-3 tab:block">Fig. 02 — Sensor reading the brief</p>
            </div>
          </div>

          <div className="col-span-12 tab:col-span-8 lap:col-span-7 lap:col-start-6">
            <p ref={text} className="t-lead">
              {words.map((w, i) => (
                <span key={i} data-w className="inline">
                  {w}{" "}
                </span>
              ))}
            </p>

            {/* pipeline */}
            <div className="relative mt-[clamp(3rem,7vw,6rem)]">
              <p className="t-mono mb-5 text-fg-3">Operating sequence</p>
              <div className="relative h-px bg-line">
                <div ref={rail} className="absolute inset-0 origin-left bg-signal" />
              </div>
              <ol className="grid grid-cols-1 xs:grid-cols-2 lap:grid-cols-4">
                {pipeline.map((p) => (
                  <li key={p.step} className="border-b border-line py-5 pr-4 xs:[&:nth-child(odd)]:border-r xs:[&:nth-child(odd)]:pr-5 xs:[&:nth-child(even)]:pl-5 lap:border-r lap:px-5 lap:first:pl-0 lap:last:border-r-0">
                    <span className="t-mono text-signal">{p.step}</span>
                    <p className="mt-3 text-[1.0625rem] font-medium tracking-[-0.01em]">{p.title}</p>
                    <p className="t-mono mt-2 normal-case tracking-[0.04em] text-fg-3">{p.note}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* facts */}
            <Reveal as="dl" className="mt-[clamp(3rem,7vw,6rem)] grid grid-cols-2 gap-px bg-line lap:grid-cols-4">
              {facts.map((f, i) => (
                <div key={f.label} className="fade-up bg-ink-0 p-4 tab:p-5" style={{ ["--d" as string]: `${i * 0.08}s` }}>
                  <dt className="t-mono text-fg-3">{f.label}</dt>
                  <dd className="mt-6 text-[clamp(2.5rem,5vw,4rem)] font-medium leading-none tracking-[-0.05em] tabular-nums">
                    {f.value}
                  </dd>
                  <dd className="t-mono mt-3 normal-case tracking-[0.04em] text-fg-2">{f.detail}</dd>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
