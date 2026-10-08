"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { contact } from "@/lib/content";
import { on } from "@/lib/events";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = ["What does he build?", "Tell me about Sellixis", "Is he available?", "What's his stack?"];

const GREETING: Message = {
  role: "assistant",
  content: "Sensor online. Ask about Shreshth's work, systems, stack, or how to reach him.",
};

export default function AiChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => on("open-chat", () => setOpen(true)), []);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => field.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: res.ok && data.response ? data.response : `Link unavailable right now. Reach Shreshth directly at ${contact.email}.`,
        },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: `Connection lost. Email ${contact.email} instead.` }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="AI assistant"
            data-lenis-prevent
            className="fixed inset-0 z-[69] flex flex-col border-line-2 bg-ink-1 tab:inset-auto tab:bottom-6 tab:right-6 tab:h-[min(560px,calc(100svh-7rem))] tab:w-[400px] tab:border"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="t-mono flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
              <span className="flex items-center gap-2 text-fg">
                <span className="dot dot-pulse" /> Ask the system
              </span>
              <button type="button" onClick={() => setOpen(false)} className="h-10 border border-line-2 px-3 hover:border-fg">
                Close
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  <p className={`t-mono mb-1 ${m.role === "user" ? "text-fg-3" : "text-signal"}`}>
                    {m.role === "user" ? "You" : "SYS"}
                  </p>
                  <p
                    className={`inline-block max-w-[90%] whitespace-pre-line text-left text-[0.9375rem] leading-relaxed ${
                      m.role === "user" ? "border border-line-2 px-3 py-2 text-fg" : "text-fg-2"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {busy && <p className="t-mono text-fg-3">Processing<span className="dot-pulse">…</span></p>}
              <div ref={end} />
            </div>

            {messages.length <= 2 && !busy && (
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => send(s)}
                    className="t-mono border border-line px-2.5 py-2 normal-case tracking-[0.04em] text-fg-2 hover:border-line-2 hover:text-fg"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              className="flex shrink-0 items-center gap-2 border-t border-line px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <span className="t-mono text-signal">›</span>
              <input
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={busy}
                placeholder="Ask about work, stack, availability"
                aria-label="Message"
                className="h-12 flex-1 bg-transparent text-[1rem] outline-none placeholder:text-fg-3 disabled:opacity-50"
              />
              <button type="submit" disabled={!input.trim() || busy} className="t-mono h-10 border border-line-2 px-3 hover:border-fg disabled:opacity-30">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
