"use client";

import { motion } from "framer-motion";

interface SkillMarqueeProps {
  skills: string[];
}

export default function SkillMarquee({ skills }: SkillMarqueeProps) {
  const doubled = [...skills, ...skills];

  return (
    <div className="relative overflow-hidden py-[10px]">
      <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gradient-to-r from-[#09090b] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[60px] bg-gradient-to-l from-[#09090b] to-transparent z-10 pointer-events-none" />

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
            className="inline-flex items-center px-4 py-2 rounded-full ring-1 ring-white/10 bg-white/5 text-[13px] font-medium text-white/70 font-sans whitespace-nowrap hover:text-white hover:ring-white/20 transition-all duration-300"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
