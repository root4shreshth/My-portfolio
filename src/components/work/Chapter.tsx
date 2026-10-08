"use client";

import { useId, useState } from "react";
import type { Work } from "@/lib/content";
import Reveal, { Lines } from "@/components/ui/Reveal";
import PlateFrame from "./PlateFrame";
import { EnterprisePlate, PraetorPlate, ScreenshotPlate, SmartCapPlate } from "./plates";

function Visual({ item }: { item: Work }) {
  if (item.image) return <ScreenshotPlate src={item.image} alt={`${item.title} — product screenshot`} />;
  if (item.plate === "enterprise") return <EnterprisePlate />;
  if (item.plate === "smartcap") return <SmartCapPlate />;
  return <PraetorPlate />;
}

export default function Chapter({ item, flip }: { item: Work; flip: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <article className="grid-12 gap-y-8 border-t border-line pt-6 tab:pt-8" aria-labelledby={`${item.id}-title`}>
      {/* heading */}
      <Reveal className="col-span-12 grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-2 lap:hidden">
        <span className="t-mono pt-2 text-signal">{item.index}</span>
        <h3 id={`${item.id}-title`} className="t-h2">
          <Lines lines={[item.title]} />
        </h3>
        <p className="t-serif col-start-2 text-[1.375rem] text-fg-2">{item.subtitle}</p>
      </Reveal>

      {/* plate */}
      <div className={`col-span-12 lap:col-span-7 ${flip ? "lap:order-2 lap:col-start-6" : ""}`}>
        <Reveal className="lap:sticky lap:top-24" threshold={0.1}>
          <div className="mask">
            <PlateFrame
              caption={`Fig. ${item.index} — ${item.image ? "Product" : "System diagram"}`}
              meta={item.status}
            >
              <Visual item={item} />
            </PlateFrame>
          </div>
        </Reveal>
      </div>

      {/* text */}
      <div className={`col-span-12 lap:col-span-5 ${flip ? "lap:order-1 lap:col-start-1" : "lap:col-start-8"}`}>
        <Reveal className="hidden lap:block">
          <span className="t-mono text-signal">{item.index}</span>
          <h3 id={`${item.id}-title-lg`} className="t-h2 mt-4">
            <Lines lines={[item.title]} />
          </h3>
          <p className="t-serif fade-up mt-3 text-[1.5rem] text-fg-2">{item.subtitle}</p>
        </Reveal>

        <Reveal>
          <p className="fade-up max-w-[46ch] text-fg lap:mt-8">{item.summary}</p>

          <dl className="fade-up mt-8 border-t border-line" style={{ ["--d" as string]: "0.1s" }}>
            {[
              ["Year", item.year],
              ["Context", item.context],
              ["Status", item.status],
              ["Stack", item.stack.join(" · ")],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-3">
                <dt className="t-mono text-fg-3">{k}</dt>
                <dd className="text-[0.9375rem] text-fg-2">
                  {k === "Status" && <span className="dot mr-2 align-middle" />}
                  {v}
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="t-mono fade-up mt-6 flex min-h-12 w-full items-center justify-between border-b border-line-2 py-3 text-left transition-colors hover:text-signal"
            style={{ ["--d" as string]: "0.2s" }}
          >
            <span>{open ? "Close case study" : "Read case study"}</span>
            <span aria-hidden="true" className={`transition-transform duration-500 ${open ? "rotate-45" : ""}`}>
              +
            </span>
          </button>

          {/* Always in the DOM (collapsed via CSS) so the case study is crawlable and searchable. */}
          <div id={panelId} inert={!open} className={`collapse-panel ${open ? "is-open" : ""}`}>
            <div className="min-h-0">
              <div className="space-y-6 py-6">
                {item.caseStudy.map((c) => (
                  <div key={c.label} className="grid gap-2 xs:grid-cols-[6.5rem_1fr] xs:gap-4">
                    <h4 className="t-mono text-signal">{c.label}</h4>
                    <p className="text-[0.9375rem] leading-relaxed text-fg-2">{c.body}</p>
                  </div>
                ))}
                {item.links?.map((l) => (
                  <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="t-mono link-line inline-block">
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
