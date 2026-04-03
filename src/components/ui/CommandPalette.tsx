"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: string;
  action: () => void;
  keywords: string[];
}

const commands: CommandItem[] = [
  {
    id: "home",
    label: "Go to Home",
    description: "Scroll to the top",
    icon: "🏠",
    action: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["home", "top", "start", "hero"],
  },
  {
    id: "about",
    label: "About Shreshth",
    description: "Learn about my background",
    icon: "👤",
    action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["about", "who", "bio", "background", "me"],
  },
  {
    id: "experience",
    label: "Work Experience",
    description: "C2A, Pitch X, and more",
    icon: "💼",
    action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["experience", "work", "jobs", "career", "c2a", "pitch"],
  },
  {
    id: "projects",
    label: "View Projects",
    description: "CARA, LeadFlow, Heisyn, SourceSync",
    icon: "🚀",
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["projects", "work", "cara", "leadflow", "heisyn", "sourcesync", "portfolio"],
  },
  {
    id: "contact",
    label: "Contact Me",
    description: "Get in touch via WhatsApp or email",
    icon: "📬",
    action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["contact", "email", "phone", "whatsapp", "reach", "talk", "hire"],
  },
  {
    id: "resume",
    label: "Download Resume",
    description: "Get my latest resume as PDF",
    icon: "📄",
    action: () => window.open("/Shreshth-Srivastava-Resume.pdf", "_blank"),
    keywords: ["resume", "cv", "pdf", "download"],
  },
  {
    id: "whatsapp",
    label: "WhatsApp Me",
    description: "Open WhatsApp chat directly",
    icon: "💬",
    action: () => window.open("https://Wa.me/+919335963562", "_blank"),
    keywords: ["whatsapp", "chat", "message", "connect"],
  },
  {
    id: "github",
    label: "GitHub Profile",
    description: "View my open source work",
    icon: "🐙",
    action: () => window.open("https://github.com/root4shreshth", "_blank"),
    keywords: ["github", "code", "repos", "open source"],
  },
  {
    id: "linkedin",
    label: "LinkedIn Profile",
    description: "Connect on LinkedIn",
    icon: "🔗",
    action: () => window.open("https://www.linkedin.com/in/root4shreshth/", "_blank"),
    keywords: ["linkedin", "professional", "connect", "network"],
  },
  {
    id: "twitter",
    label: "Twitter / X",
    description: "Follow me on X",
    icon: "🐦",
    action: () => window.open("https://x.com/Rootshreshth", "_blank"),
    keywords: ["twitter", "x", "social", "follow"],
  },
  {
    id: "skills",
    label: "Technical Skills",
    description: "Python, LLMs, React, Node.js, Twilio...",
    icon: "⚡",
    action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
    keywords: ["skills", "tech", "python", "react", "node", "llm", "ai", "twilio", "nextjs"],
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords.some((k) => k.includes(query.toLowerCase()))
      )
    : commands;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open: Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      // Close: Escape
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeCommand = (cmd: CommandItem) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      executeCommand(filtered[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 z-[101] w-[90vw] max-w-[560px]"
          >
            <div className="rounded-2xl bg-[#111113] ring-1 ring-white/10 shadow-2xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30 shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search commands, navigate, or ask..."
                  className="flex-1 bg-transparent border-none outline-none text-[15px] text-white placeholder:text-white/30 py-4 font-sans"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[11px] text-white/30 ring-1 ring-white/10 font-sans">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[360px] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="py-8 text-center text-[14px] text-white/30 font-sans">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  filtered.map((cmd, index) => (
                    <button
                      key={cmd.id}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        index === selectedIndex
                          ? "bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span className="text-[18px] w-[28px] text-center shrink-0">
                        {cmd.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] text-white/90 font-medium font-sans truncate">
                          {cmd.label}
                        </p>
                        <p className="text-[12px] text-white/40 font-sans truncate">
                          {cmd.description}
                        </p>
                      </div>
                      {index === selectedIndex && (
                        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] text-white/30 ring-1 ring-white/10 font-sans shrink-0">
                          ↵
                        </kbd>
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10">
                <div className="flex items-center gap-3 text-[11px] text-white/25 font-sans">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded ring-1 ring-white/10">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded ring-1 ring-white/10">↵</kbd> select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 rounded ring-1 ring-white/10">esc</kbd> close
                  </span>
                </div>
                <span className="text-[11px] text-white/20 font-sans">
                  AI Portfolio
                </span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
