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
    "inline-flex items-center gap-2 font-sans font-medium text-[14px] rounded-full transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-white text-neutral-900 px-5 py-3 hover:bg-white/90",
    outline:
      "bg-white/10 text-white px-5 py-3 ring-1 ring-white/15 hover:bg-white/15",
    ghost:
      "text-white/80 hover:text-white px-4 py-2 bg-transparent",
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
