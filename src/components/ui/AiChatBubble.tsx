"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Knowledge base — answers based on resume data
const knowledgeBase: Record<string, string> = {
  // Greetings
  "hi|hello|hey|sup": "Hey! 👋 I'm Shreshth's AI assistant. Ask me anything about his work, skills, or projects!",

  // About
  "who|about|tell me|introduce": "Shreshth Srivastava is an Automation Engineer with hands-on experience building production-grade AI systems. He specializes in LLMs, real-time speech pipelines, and cloud APIs to automate workflows. He holds a B.Tech in Computer Science from United University (2024).",

  // Experience
  "experience|work|job|career|where": "Shreshth is currently a Product Engineer Intern at Concept2Action (C2A) in the USA (2026), building production-level products. Previously, he was an AI Automation Intern at Pitch X (2025) where he cut manual handoffs by 80% with a voice-calling SaaS.",

  // C2A
  "c2a|concept2action|current": "At Concept2Action (C2A), Shreshth builds and ships production-level products from concept to deployment. He collaborates across product, design, and engineering teams for the full development lifecycle.",

  // Pitch X
  "pitch|vernika|voice": "At Pitch X, Shreshth built Vernika — a production voice-calling SaaS with Twilio + LLM-driven IVR. He engineered low-latency speech pipelines using Whisper/Groq and implemented API orchestration with monitoring and confidence scoring.",

  // Projects
  "project|built|portfolio|work on": "Key projects: \n• CARA — AI Clinical Intake & Triage System (70% faster intake)\n• LeadFlow AI — Chat + Voice Lead Automation (80% less manual scheduling)\n• Heisyn — Branding & Automation Agency Website\n• SourceSync — Multisource News Collector with bias detection",

  // CARA
  "cara|clinical|triage|medical": "CARA is an AI Clinical Intake & Triage System using ADK-style agent architecture. It turns patient voice and documents into structured symptoms, triage decisions, and care-plan actions — cutting intake-to-plan time by 70%.",

  // LeadFlow
  "leadflow|lead|qualification|chatbot": "LeadFlow AI is an end-to-end lead pipeline: ad leads → Google Sheets → Telegram chatbot → Voice AI agent. Built with Twilio, Whisper/Groq, and LLMs to qualify prospects and auto-book meetings, cutting manual scheduling by ~80%.",

  // Skills
  "skill|tech|stack|language|tool": "Tech stack: Python, JavaScript, React, Next.js, Node.js, FastAPI, Tailwind CSS. AI: LLMs (GPT, Gemini), RAG pipelines, embeddings, prompt engineering. Automation: n8n, Zapier, Twilio, Docker, REST APIs.",

  // Contact
  "contact|reach|hire|email|phone|whatsapp": "📱 WhatsApp: +91 9335963562\n📧 Email: hype4shreshth@gmail.com\n🔗 LinkedIn: linkedin.com/in/root4shreshth\n🐙 GitHub: github.com/root4shreshth",

  // Resume
  "resume|cv|pdf|download": "You can download Shreshth's resume directly! Click the 'Download Resume' button in the hero section, or visit: /Shreshth-Srivastava-Resume.pdf",

  // Education
  "education|university|degree|college|study": "B.Tech in Computer Science and Engineering from United University, Prayagraj, UP (2024).",

  // Achievements
  "achievement|cert|award|hackathon": "🏆 Won GenAI Hackathon 2025 — 3rd Position\n📜 Microsoft Certified: Azure AI Fundamentals (AI-900)\n📜 Google Cloud Fundamentals: AI Automation Learning\n📜 Internship Certification from Pitch X",

  // Availability
  "available|hire|freelance|open": "Yes! Shreshth is open to full-time and contract roles in 2026. Best way to connect: WhatsApp (+91 9335963562) or LinkedIn.",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const [patterns, response] of Object.entries(knowledgeBase)) {
    const keywords = patterns.split("|");
    if (keywords.some((k) => lower.includes(k))) {
      return response;
    }
  }

  return "Great question! I'm a simple AI assistant with knowledge about Shreshth's work. Try asking about his **projects**, **experience**, **skills**, or **contact info**. For complex questions, reach out directly via WhatsApp! 💬";
}

export default function AiChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Shreshth's AI assistant. Ask me about his projects, skills, experience, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI "thinking" delay
    setTimeout(() => {
      const response = getResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 600 + Math.random() * 800);
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
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
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
            className="fixed bottom-[80px] right-6 z-[90] w-[360px] max-w-[calc(100vw-48px)] rounded-2xl bg-[#111113] ring-1 ring-white/10 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "480px" }}
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
                  Ask me anything about Shreshth
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-[6px] h-[6px] rounded-full bg-green-500 animate-pulse" />
                <span className="text-[11px] text-white/30 font-sans">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                  <div className="bg-white/5 ring-1 ring-white/10 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    <span className="w-[6px] h-[6px] rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-[6px] h-[6px] rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-[6px] h-[6px] rounded-full bg-white/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10">
              <div className="flex items-center gap-2 rounded-xl bg-white/5 ring-1 ring-white/10 px-3 py-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about projects, skills..."
                  className="flex-1 bg-transparent border-none outline-none text-[13px] text-white placeholder:text-white/25 py-2 font-sans"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-[28px] h-[28px] rounded-lg bg-white text-neutral-900 flex items-center justify-center hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
                  </svg>
                </button>
              </div>
              <p className="text-[10px] text-white/20 text-center mt-2 font-sans">
                Press <kbd className="px-1 py-0.5 rounded ring-1 ring-white/10 text-white/30">⌘K</kbd> for command palette
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
