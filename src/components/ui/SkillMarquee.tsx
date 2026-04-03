"use client";

import { motion } from "framer-motion";

interface SkillMarqueeProps {
  skills: string[];
}

export default function SkillMarquee({ skills }: SkillMarqueeProps) {
  // Double the skills for seamless loop
  const doubled = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-[10px]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-[12px] w-max"
        animate={{ x: [0, `-${skills.length * 130}px`] }}
        transition={{
          x: {
            duration: skills.length * 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {doubled.map((skill, i) => (
          <span
            key={`${skill}-${i}`}
            className="inline-flex items-center px-[18px] py-[8px] rounded-[30px] border border-border-subtle bg-glass text-[13px] font-medium text-text-secondary font-[family-name:var(--font-dm-sans)] whitespace-nowrap hover:text-white hover:border-border-hover transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
