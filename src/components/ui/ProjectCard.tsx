"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  link?: string;
  details?: string[];
  tech?: string[];
  year?: string;
  comingSoon?: boolean;
}

export default function ProjectCard({
  title,
  subtitle,
  description,
  image,
  link,
  details,
  tech,
  year,
  comingSoon = false,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (comingSoon) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-[20px] border border-border-subtle bg-glass backdrop-blur-[20px] overflow-hidden flex items-center justify-center min-h-[300px]"
      >
        <div className="text-center">
          <p className="text-[16px] font-medium text-accent-blue font-[family-name:var(--font-dm-sans)]">
            Coming soon
          </p>
          <p className="text-[14px] text-text-muted mt-1 font-[family-name:var(--font-dm-sans)]">
            coming soon&hellip;
          </p>
        </div>
      </motion.div>
    );
  }

  const hasDropdown = details && details.length > 0;

  return (
    <motion.div
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      transition={{ duration: 0.3 }}
      className="relative rounded-[20px] border border-border-subtle bg-background-alt overflow-hidden group cursor-pointer"
      onClick={() => hasDropdown && setExpanded(!expanded)}
      role={hasDropdown ? "button" : undefined}
      tabIndex={hasDropdown ? 0 : undefined}
      aria-expanded={hasDropdown ? expanded : undefined}
      onKeyDown={(e) => {
        if (hasDropdown && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[1408/768] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 809px) 100vw, (max-width: 1199px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Year badge */}
        {year && (
          <div className="absolute top-[16px] right-[16px] px-[10px] py-[4px] rounded-[8px] bg-black/50 backdrop-blur-[8px] border border-[rgba(255,255,255,0.1)] text-[11px] text-text-secondary font-[family-name:var(--font-dm-sans)]">
            {year}
          </div>
        )}

        {/* "Click to expand" hint — subtle indicator on hover */}
        {hasDropdown && !expanded && (
          <div className="absolute bottom-[16px] right-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-[6px] px-[10px] py-[5px] rounded-[8px] bg-black/60 backdrop-blur-[8px] border border-[rgba(255,255,255,0.1)]">
            <span className="text-[11px] text-text-secondary font-[family-name:var(--font-dm-sans)]">Details</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-[24px] min-[810px]:p-[30px]">
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-[20px] min-[810px]:text-[22px] font-medium text-white leading-[28px] tracking-[-0.5px] font-[family-name:var(--font-dm-sans)]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[13px] min-[810px]:text-[14px] text-accent-blue mt-1 font-[family-name:var(--font-dm-sans)]">
                {subtitle}
              </p>
            )}
          </div>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-white transition-colors p-[6px] rounded-[8px] hover:bg-[rgba(255,255,255,0.08)] shrink-0 mt-[2px]"
              aria-label={`View ${title} live demo`}
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          )}
        </div>

        {/* Short description */}
        <p className="text-[13px] min-[810px]:text-[14px] text-text-secondary leading-[22px] mt-[10px] font-[family-name:var(--font-dm-sans)]">
          {description}
        </p>
      </div>

      {/* Expandable dropdown details */}
      <AnimatePresence>
        {expanded && hasDropdown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-[24px] min-[810px]:px-[30px] pb-[24px] min-[810px]:pb-[30px] border-t border-[rgba(255,255,255,0.06)] pt-[20px]">
              {/* Bullet points */}
              <ul className="space-y-[12px]">
                {details.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex gap-[10px] text-[13px] min-[810px]:text-[14px] text-text-secondary leading-[22px] font-[family-name:var(--font-dm-sans)]"
                  >
                    <span className="text-accent-purple mt-[6px] shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor">
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Tech stack pills */}
              {tech && tech.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="flex flex-wrap gap-[6px] mt-[16px]"
                >
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-[10px] py-[4px] rounded-[6px] bg-[rgba(79,26,214,0.12)] border border-[rgba(79,26,214,0.2)] text-[11px] font-medium text-accent-purple-light font-[family-name:var(--font-dm-sans)]"
                    >
                      {t}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* View project link */}
              {link && (
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[6px] mt-[16px] text-[13px] font-medium text-accent-blue hover:text-white transition-colors font-[family-name:var(--font-dm-sans)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Live Demo
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
