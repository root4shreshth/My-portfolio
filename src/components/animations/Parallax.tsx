"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative = opposite direction
  direction?: "y" | "x";
}

export default function Parallax({
  children,
  className = "",
  speed = -50,
  direction = "y",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const props =
      direction === "y" ? { yPercent: speed } : { xPercent: speed };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(ref.current, {
        ...props,
        ease: "none",
      }),
    });

    return () => {
      trigger.kill();
    };
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
