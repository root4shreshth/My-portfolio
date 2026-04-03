"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  href?: string;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  icon,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center gap-2 font-[family-name:var(--font-dm-sans)] font-medium text-[16px] leading-[26px] tracking-[-0.5px] rounded-[10px] transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent-purple text-white px-[18px] py-[10px] hover:brightness-125 purple-glow",
    outline:
      "border border-border-medium text-white px-[18px] py-[10px] bg-transparent hover:bg-glass-hover hover:border-border-hover",
    ghost:
      "text-text-secondary hover:text-white px-[16px] py-[8px] bg-transparent",
  };

  const Component = href ? "a" : "button";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        target={href?.startsWith("http") ? "_blank" : href?.endsWith(".pdf") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        download={href?.endsWith(".pdf") ? true : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </Component>
    </motion.div>
  );
}
