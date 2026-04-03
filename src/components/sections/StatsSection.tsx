"use client";

import { useRef } from "react";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
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
      className="text-[40px] min-[810px]:text-[54px] font-bold text-white leading-[1em] tracking-[-2px] font-[family-name:var(--font-afacad-flux)]"
    >
      0{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        <ScrollReveal>
          <div className="grid grid-cols-2 min-[810px]:grid-cols-4 gap-[30px] min-[810px]:gap-[40px]">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-[13px] min-[810px]:text-[14px] text-text-muted mt-[8px] font-[family-name:var(--font-dm-sans)]">
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
