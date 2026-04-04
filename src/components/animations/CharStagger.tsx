"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-init";
import { splitTextIntoChars } from "@/lib/text-splitter";

interface CharStaggerProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div" | "span";
  trigger?: "scroll" | "immediate";
}

export default function CharStagger({
  text,
  className = "",
  delay = 0,
  stagger = 0.02,
  duration = 1.5,
  as: Component = "h1",
  trigger = "scroll",
}: CharStaggerProps) {
  const ref = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const el = ref.current;
    const chars = splitTextIntoChars(el);

    // Set initial state
    gsap.set(chars, { y: 40, opacity: 0 });

    const animConfig = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "expo.out",
      delay,
    };

    if (trigger === "scroll") {
      gsap.to(chars, {
        ...animConfig,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    } else {
      gsap.to(chars, animConfig);
    }

    hasAnimated.current = true;

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [text, delay, stagger, duration, trigger]);

  return (
    <Component
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      aria-label={text}
    >
      {text}
    </Component>
  );
}
