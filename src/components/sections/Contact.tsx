"use client";

import { useEffect, useState } from "react";
import { contact, profile } from "@/lib/content";
import { setLocked } from "@/components/optic/eye-store";
import EyeAnchor from "@/components/optic/EyeAnchor";
import Reveal, { Lines } from "@/components/ui/Reveal";
import RingMark from "@/components/ui/RingMark";
import { emit } from "@/lib/events";

function useIST() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useIST();

  useEffect(() => () => setLocked(false), []);

  const lock = {
    onPointerEnter: () => setLocked(true),
    onPointerLeave: () => setLocked(false),
    onFocus: () => setLocked(true),
    onBlur: () => setLocked(false),
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative flex min-h-[100svh] flex-col pt-16">
      <div className="guides" />
      <div className="shell relative flex flex-1 flex-col">
        <div className="t-mono flex items-center justify-between gap-4 border-y border-line py-4 text-fg-3">
          <span className="flex items-center gap-3">
            <RingMark />
            <span className="text-fg">07</span> / Contact
          </span>
          <span className="hidden xs:inline">End of transmission</span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-[clamp(2.5rem,6vw,4rem)] text-center tab:gap-8">
          <EyeAnchor id="contact" led={1.5} className="aspect-square w-[min(56vw,30svh,420px)]" />

          <Reveal
            as="h2"
            id="contact-title"
            className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.055em]"
          >
            <Lines lines={["Signal", <span key="s" className="t-serif text-fg-2">acquired.</span>]} step={0.12} />
          </Reveal>

          <Reveal className="flex w-full max-w-xl flex-col gap-3 xs:flex-row xs:justify-center">
            <a href={`mailto:${contact.email}`} className="btn btn-solid fade-up xs:flex-1" {...lock}>
              Start a conversation
            </a>
            <button type="button" onClick={copy} className="btn fade-up xs:flex-1" style={{ ["--d" as string]: "0.08s" }} aria-live="polite">
              {copied ? "Copied ✓" : "Copy email"}
            </button>
          </Reveal>

          <Reveal className="t-mono flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-fg-2">
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="link-line fade-up hover:text-fg">
              WhatsApp
            </a>
            {contact.links.map((l, i) => (
              <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="link-line fade-up hover:text-fg" style={{ ["--d" as string]: `${(i + 1) * 0.05}s` }}>
                {l.label}
              </a>
            ))}
            <button type="button" onClick={() => emit("open-chat")} className="link-line fade-up text-signal">
              Ask the system →
            </button>
          </Reveal>
        </div>

        <footer className="t-mono grid grid-cols-2 gap-4 border-t border-line py-5 text-fg-3 tab:grid-cols-4">
          <span>© 2026 {profile.name}</span>
          <span className="text-right tab:text-left">
            IST <span className="tabular-nums text-fg-2">{time}</span>
          </span>
          <span className="hidden tab:block">Next.js · R3F · GSAP</span>
          <a href="#top" className="link-line col-span-2 w-fit justify-self-start tab:col-span-1 tab:justify-self-end">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
