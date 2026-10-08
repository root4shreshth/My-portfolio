"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { archive } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function Lab() {
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const preview = useRef<HTMLDivElement>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  useEffect(() => {
    if (!canHover) return;
    let raf = 0;
    const pos = { x: 0, y: 0, cx: 0, cy: 0 };
    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };
    const tick = () => {
      pos.cx += (pos.x - pos.cx) * 0.18;
      pos.cy += (pos.y - pos.cy) * 0.18;
      if (preview.current) preview.current.style.transform = `translate3d(${pos.cx + 24}px, ${pos.cy - 90}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [canHover]);

  const hovered = canHover ? archive.find((a) => a.id === hover && a.image) : undefined;

  return (
    <section id="lab" aria-labelledby="lab-title" className="relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <SectionHeader
          id="lab-title"
          index="05"
          label="Lab"
          title={["Archive &", <span key="s" className="t-serif text-fg-2">experiments.</span>]}
          aside={<p className="t-mono">{archive.length} entries · register</p>}
        />

        <Reveal className="mt-[clamp(3rem,8vw,6rem)]">
          <div className="t-mono hidden grid-cols-[5rem_1.4fr_1fr_5rem_7rem_2rem] gap-4 border-b border-line-2 pb-3 text-fg-3 tab:grid">
            <span>ID</span>
            <span>Entry</span>
            <span>Type</span>
            <span>Year</span>
            <span>Status</span>
            <span />
          </div>

          <ul onPointerLeave={() => setHover(null)}>
            {archive.map((a, i) => {
              const isOpen = open === a.id;
              const panelId = `lab-${a.id}`;
              return (
                <li key={a.id} className="fade-up border-b border-line" style={{ ["--d" as string]: `${i * 0.04}s` }}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : a.id)}
                    onPointerEnter={() => setHover(a.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group grid w-full grid-cols-[4.25rem_1fr_auto] items-center gap-4 py-4 text-left tab:grid-cols-[5rem_1.4fr_1fr_5rem_7rem_2rem] tab:py-5"
                  >
                    <span className={`t-mono ${a.id.startsWith("OBJ") ? "text-signal" : "text-fg-3"}`}>{a.id}</span>
                    <span className="text-[clamp(1.125rem,1rem+0.8vw,1.75rem)] font-medium tracking-[-0.025em] transition-transform duration-500 group-hover:translate-x-1">
                      {a.name}
                    </span>
                    <span className="t-mono hidden normal-case tracking-[0.04em] text-fg-2 tab:block">{a.type}</span>
                    <span className="t-mono hidden text-fg-2 tab:block">{a.year}</span>
                    <span className="t-mono hidden items-center gap-2 text-fg-2 tab:flex">
                      {(a.status === "Live" || a.status === "Running") && <span className="dot" />}
                      {a.status}
                    </span>
                    <span aria-hidden="true" className={`t-mono justify-self-end text-fg-3 transition-transform duration-500 ${isOpen ? "rotate-45 text-signal" : ""}`}>
                      +
                    </span>
                  </button>

                  <div id={panelId} inert={!isOpen} className={`collapse-panel ${isOpen ? "is-open" : ""}`}>
                    <div className="min-h-0">
                        <div className="grid gap-5 pb-6 tab:grid-cols-[5rem_1fr] tab:gap-4">
                          <div className="t-mono flex flex-wrap gap-x-4 gap-y-1 text-fg-3 tab:col-start-2 tab:hidden">
                            <span>{a.type}</span>
                            <span>{a.year}</span>
                            <span>{a.status}</span>
                          </div>
                          <div className="grid gap-5 tab:col-start-2 tab:grid-cols-[1fr_16rem] tab:gap-8">
                            <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-fg-2">{a.note}</p>
                            {a.image && !canHover && (
                              <div className="relative aspect-[16/10] w-full overflow-hidden border border-line">
                                <Image src={a.image} alt={`${a.name} screenshot`} fill sizes="100vw" className="object-cover object-top" />
                              </div>
                            )}
                            {a.href && (
                              <a href={a.href} target="_blank" rel="noopener noreferrer" className="t-mono link-line h-fit w-fit self-start">
                                Visit {a.href.replace("https://", "")} ↗
                              </a>
                            )}
                          </div>
                        </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>

      <div
        ref={preview}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-20 w-[300px]"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              key={hovered.id}
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              exit={{ clipPath: "inset(100% 0 0 0)" }}
              transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}
              className="relative aspect-[16/10] w-full overflow-hidden border border-line-2 bg-ink-1"
            >
              <Image src={hovered.image!} alt="" fill sizes="300px" className="object-cover object-top" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
