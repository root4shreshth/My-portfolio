"use client";

import { motion } from "framer-motion";

interface ExperienceCardProps {
  role: string;
  company: string;
  type: string;
  description: string;
  tags: string[];
  label?: string;
}

export default function ExperienceCard({
  role,
  company,
  type,
  description,
  tags,
  label,
}: ExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      transition={{ duration: 0.3 }}
      className="rounded-[20px] border border-border-subtle bg-glass backdrop-blur-[20px] p-[30px] card-shadow"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="text-[18px] font-medium text-white leading-[26px] tracking-[-0.5px] font-[family-name:var(--font-dm-sans)]">
            {role} &mdash; {company}
            {type && (
              <span className="text-text-muted font-normal">
                {" "}
                ({type})
              </span>
            )}
          </h3>
          <p className="text-[14px] text-text-secondary leading-[22px] mt-3 font-[family-name:var(--font-dm-sans)]">
            {description}
          </p>
        </div>
        {label && (
          <span className="text-[12px] font-medium px-[12px] py-[4px] rounded-[8px] bg-glass border border-border-subtle text-text-secondary shrink-0 font-[family-name:var(--font-dm-sans)]">
            {label}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-[12px] py-[5px] rounded-[8px] border border-border-subtle bg-glass text-[12px] font-medium text-accent-blue font-[family-name:var(--font-dm-sans)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
