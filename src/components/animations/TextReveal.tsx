"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.15,
  duration = 1.2,
  as: Component = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const el = containerRef.current;

    // Wrap text content in line containers for clip animation
    const textEl = el.querySelector("[data-text-reveal-inner]") as HTMLElement;
    if (!textEl) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    tl.from(textEl, {
      yPercent: 100,
      opacity: 0,
      duration,
      ease: "power3.out",
      delay,
    });

    hasAnimated.current = true;

    return () => {
      tl.kill();
    };
  }, [delay, stagger, duration]);

  return (
    <div ref={containerRef} style={{ overflow: "hidden" }}>
      <Component className={className} data-text-reveal-inner="">
        {children}
      </Component>
    </div>
  );
}
