interface PlateFrameProps {
  caption: string;
  meta?: string;
  children: React.ReactNode;
  className?: string;
}

// Registration-marked frame shared by every work visual.
export default function PlateFrame({ caption, meta, children, className = "" }: PlateFrameProps) {
  return (
    <figure className={`relative ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden border border-line bg-ink-1 xs:aspect-[16/10]">
        {children}
        {["left-2 top-2", "right-2 top-2 rotate-90", "bottom-2 right-2 rotate-180", "bottom-2 left-2 -rotate-90"].map((pos) => (
          <svg key={pos} className={`absolute h-3 w-3 text-fg-3 ${pos}`} viewBox="0 0 12 12" aria-hidden="true">
            <path d="M0 6V0h6" fill="none" stroke="currentColor" />
          </svg>
        ))}
      </div>
      <figcaption className="t-mono mt-3 flex justify-between gap-4 text-fg-3">
        <span>{caption}</span>
        {meta && <span className="text-right">{meta}</span>}
      </figcaption>
    </figure>
  );
}
