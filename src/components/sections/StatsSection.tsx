"use client";

import { useRef } from "react";
import { useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { stats } from "@/lib/data";
import { useEffect } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 30 });
  const rounded = useTransform(springValue, (v) => Math.round(v));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <span
      ref={ref}
      className="text-[36px] min-[810px]:text-[48px] font-normal text-white leading-[1em] tracking-tight font-instrument-serif"
    >
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <ScrollReveal>
          <div className="grid grid-cols-2 min-[810px]:grid-cols-4 gap-8 min-[810px]:gap-10 py-10 border-y border-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-[13px] text-white/50 mt-2 font-sans">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
