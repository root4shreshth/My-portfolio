"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact, profile, sections } from "@/lib/content";
import { scrollToId } from "@/lib/lenis-provider";
import { emit, on } from "@/lib/events";

interface Command {
  id: string;
  glyph: string;
  label: string;
  hint: string;
  keywords: string;
  run: () => void;
}

const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: s.id,
        glyph: s.index,
        label: s.label,
        hint: "Go to section",
        keywords: `${s.label} ${s.id}`.toLowerCase(),
        run: () => scrollToId(s.id),
      })),
      { id: "resume", glyph: "↓", label: "Résumé", hint: "Open PDF", keywords: "resume cv pdf download", run: () => open(profile.resume) },
      { id: "email", glyph: "@", label: "Email", hint: contact.email, keywords: "email mail contact hire", run: () => (window.location.href = `mailto:${contact.email}`) },
      { id: "whatsapp", glyph: "↗", label: "WhatsApp", hint: contact.phone, keywords: "whatsapp phone chat", run: () => open(contact.whatsapp) },
      ...contact.links.map((l) => ({
        id: l.label,
        glyph: "↗",
        label: l.label,
        hint: l.href.replace("https://", ""),
        keywords: l.label.toLowerCase(),
        run: () => open(l.href),
      })),
      { id: "ask", glyph: "?", label: "Ask the system", hint: "AI assistant", keywords: "ai chat ask assistant question", run: () => emit("open-chat") },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.hint.toLowerCase().includes(q));
  }, [commands, query]);

  const show = useCallback(() => {
    setQuery("");
    setIndex(0);
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
        setQuery("");
        setIndex(0);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    const off = on("open-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      off();
    };
  }, [show]);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => input.current?.focus());
  }, [isOpen]);

  const run = (c: Command) => {
    setIsOpen(false);
    requestAnimationFrame(c.run);
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[index]) {
      run(filtered[index]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-ink-0/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            data-lenis-prevent
            className="fixed left-1/2 top-[12vh] z-[81] w-[calc(100vw-32px)] max-w-[560px] -translate-x-1/2 border border-line-2 bg-ink-1"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <span className="t-mono text-signal">›</span>
              <input
                ref={input}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Type a command or section"
                aria-label="Search commands"
                aria-controls="palette-list"
                aria-activedescendant={filtered[index] ? `cmd-${filtered[index].id}` : undefined}
                className="h-14 flex-1 bg-transparent text-[0.9375rem] outline-none placeholder:text-fg-3"
              />
              <kbd className="t-mono hidden border border-line px-1.5 py-0.5 text-fg-3 xs:inline">Esc</kbd>
            </div>
            <ul id="palette-list" role="listbox" className="max-h-[60vh] overflow-y-auto py-2">
              {filtered.length === 0 && <li className="t-mono px-4 py-6 text-center text-fg-3">No match</li>}
              {filtered.map((c, i) => (
                <li
                  key={c.id}
                  id={`cmd-${c.id}`}
                  role="option"
                  aria-selected={i === index}
                  onClick={() => run(c)}
                  onPointerEnter={() => setIndex(i)}
                  className={`grid cursor-pointer grid-cols-[2.5rem_1fr_auto] items-center gap-3 px-4 py-3 ${i === index ? "bg-graphite" : ""}`}
                >
                  <span className={`t-mono ${i === index ? "text-signal" : "text-fg-3"}`}>{c.glyph}</span>
                  <span className="text-[0.9375rem]">{c.label}</span>
                  <span className="t-mono truncate normal-case tracking-[0.04em] text-fg-3">{c.hint}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
