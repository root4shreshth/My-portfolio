"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "ul" | "ol" | "dl" | "h2" | "p";
  threshold?: number;
}

// Adds `is-in` once the element enters the viewport; CSS (.reveal-line, .fade-up) does the motion.
export default function Reveal({ as = "div", threshold = 0.2, className = "", children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  // All allowed tags share HTMLElement's props; type as "div" so JSX accepts the shared ref.
  const Tag = as as "div";
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={`${className} ${inView ? "is-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

export function Lines({ lines, className = "", step = 0.08 }: { lines: React.ReactNode[]; className?: string; step?: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className={`reveal-line ${className}`}>
          <span style={{ ["--d" as string]: `${i * step}s` }}>{line}</span>
        </span>
      ))}
    </>
  );
}
