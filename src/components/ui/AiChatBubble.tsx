"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What projects has Shreshth built?",
  "What's his tech stack?",
  "Is he available for hire?",
  "Tell me about CARA",
];

export default function AiChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Shreshth's AI assistant, powered by Claude. Ask me anything about his projects, skills, experience, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const content = (text || input).trim();
    if (!content || isTyping) return;

    const userMsg: Message = { role: "user", content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      // Send conversation history (skip the initial greeting)
      const apiMessages = updatedMessages
        .slice(1) // remove initial assistant greeting
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (res.ok && data.response) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ]);
      } else {
        // Fallback message if API fails
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              data.error ||
              "I'm having trouble connecting right now. You can reach Shreshth directly at hype4shreshth@gmail.com or WhatsApp +91 9335963562 💬",
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Connection issue — please try again! Or reach out directly: hype4shreshth@gmail.com 📧",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[90] w-[52px] h-[52px] rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-lg hover:bg-white/90 transition-colors cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close chat" : "Open AI assistant"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-[80px] right-6 z-[90] w-[380px] max-w-[calc(100vw-48px)] rounded-2xl bg-[#111113] ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
              <div className="w-[32px] h-[32px] rounded-full bg-white/10 flex items-center justify-center text-[14px]">
                🤖
              </div>
              <div>
                <p className="text-[14px] font-medium text-white font-sans">
                  AI Assistant
                </p>
                <p className="text-[11px] text-white/40 font-sans">
                  Powered by Claude &middot; Ask me anything
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-white/30 font-sans">
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-[20px] font-sans whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-white text-neutral-900 rounded-br-md"
                        : "bg-white/5 ring-1 ring-white/10 text-white/80 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 ring-1 ring-white/10 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1.5 items-center">
                    <span className="text-[11px] text-white/30 font-sans mr-1">
                      thinking
                    </span>
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-white/30 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-white/30 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-[5px] h-[5px] rounded-full bg-white/30 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions — show only when few messages */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-[11px] text-white/50 px-2.5 py-1.5 rounded-full ring-1 ring-white/10 bg-white/5 hover:bg-white/10 hover:text-white/70 transition-colors font-sans cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about projects, skills..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-white placeholder:text-white/25 py-2 font-sans disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="w-[28px] h-[28px] rounded-lg bg-white text-neutral-900 flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m5 12 7-7 7 7" />
                    <path d="M12 19V5" />
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-white/20 text-center mt-2 font-sans">
                Powered by Claude AI &middot; Press{" "}
                <kbd className="px-1 py-0.5 rounded ring-1 ring-white/10 text-white/30">
                  ⌘K
                </kbd>{" "}
                for commands
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
