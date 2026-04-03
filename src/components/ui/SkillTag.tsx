interface SkillTagProps {
  label: string;
  className?: string;
}

export default function SkillTag({ label, className = "" }: SkillTagProps) {
  return (
    <span
      className={`inline-flex items-center px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium leading-[10px] tracking-[-0.2px] text-text-secondary font-[family-name:var(--font-dm-sans)] ${className}`}
    >
      {label}
    </span>
  );
}
