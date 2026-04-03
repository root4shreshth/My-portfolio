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
      className="rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur p-[28px] min-[810px]:p-[32px]"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] min-[810px]:text-[18px] font-medium text-white leading-[26px] font-sans">
            {role} &mdash; {company}
            {type && (
              <span className="text-white/50 font-normal">
                {" "}({type})
              </span>
            )}
          </h3>
          <p className="text-[14px] text-white/60 leading-[22px] mt-3 font-sans">
            {description}
          </p>
        </div>
        {label && (
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/10 ring-1 ring-white/15 text-white/80 shrink-0 font-sans">
            {label}
          </span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-[8px] mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1.5 rounded-full ring-1 ring-white/10 bg-white/5 text-[12px] font-medium text-white/70 font-sans"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}
