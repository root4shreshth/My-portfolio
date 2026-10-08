import RingMark from "./RingMark";
import Reveal, { Lines } from "./Reveal";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode[];
  aside?: React.ReactNode;
  id?: string;
}

export default function SectionHeader({ index, label, title, aside, id }: SectionHeaderProps) {
  return (
    <Reveal className="grid-12 items-start gap-y-8 border-t border-line pt-5">
      <div className="t-mono col-span-12 flex items-center gap-3 text-fg-2 tab:col-span-3 tab:pt-[0.9em]">
        <RingMark />
        <span className="text-fg">{index}</span>
        <span>/ {label}</span>
      </div>
      <h2 id={id} className="t-h2 col-span-12 tab:col-span-9 lap:col-span-7">
        <Lines lines={title} />
      </h2>
      {aside && (
        <div className="fade-up col-span-12 self-end text-fg-2 tab:col-span-6 tab:col-start-4 lap:col-span-2 lap:col-start-11 lap:text-right">
          {aside}
        </div>
      )}
    </Reveal>
  );
}
