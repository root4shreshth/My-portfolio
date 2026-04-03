"use client";

import { motion } from "framer-motion";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium leading-[10px] tracking-[-0.2px] text-text-secondary font-[family-name:var(--font-dm-sans)] ${className}`}
    >
      <span className="w-[6px] h-[6px] rounded-full bg-accent-purple" />
      {text}
    </motion.div>
  );
}
