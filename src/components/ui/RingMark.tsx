interface RingMarkProps {
  className?: string;
  active?: boolean;
}

// Section-index glyph: the optic reduced to two hairline rings and one indicator LED.
export default function RingMark({ className = "", active = true }: RingMarkProps) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeOpacity=".35" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" strokeOpacity=".6" />
      <circle cx="12" cy="1.6" r="1.6" className={active ? "fill-signal" : "fill-current"} />
    </svg>
  );
}
