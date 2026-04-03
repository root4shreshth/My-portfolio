"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  padding = "p-[30px]",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, borderColor: "rgba(255,255,255,0.2)" } : undefined}
      transition={{ duration: 0.3 }}
      className={`rounded-[20px] border border-border-subtle bg-glass backdrop-blur-[20px] card-shadow ${padding} ${className}`}
    >
      {children}
    </motion.div>
  );
}
