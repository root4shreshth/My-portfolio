import { work } from "@/lib/content";
import SectionHeader from "@/components/ui/SectionHeader";
import Chapter from "@/components/work/Chapter";

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-[clamp(6rem,14vw,12rem)]">
      <div className="shell">
        <SectionHeader
          id="work-title"
          index="03"
          label="Work"
          title={["Selected", <span key="s" className="t-serif text-fg-2">systems.</span>]}
          aside={<p className="t-mono">{work.length} chapters<br />2025 — 2026</p>}
        />
        <div className="mt-[clamp(3rem,8vw,7rem)] space-y-[clamp(5rem,12vw,10rem)]">
          {work.map((item, i) => (
            <Chapter key={item.id} item={item} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
