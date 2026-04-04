"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning.");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon.");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening.");
    else setGreeting("Working Late?");
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between pointer-events-none select-none"
    >
      {/* Nav */}
      <header className="relative z-10 pointer-events-auto">
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 pt-5">
          <div className="flex items-center justify-between">
            <a
              href="#home"
              className="text-[20px] font-instrument-serif italic text-white/80 hover:text-white transition-colors"
            >
              Shreshth.
            </a>

            <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 px-1.5 py-1.5 ring-1 ring-white/10 backdrop-blur-xl">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Experience", href: "#experience" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 text-[13px] font-medium text-white/70 hover:text-white font-sans transition-colors rounded-full hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="ml-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium text-neutral-900 hover:bg-white/90 font-sans transition-colors"
              >
                Get In Touch
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" /><path d="M7 17 17 7" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero content — centered vertically on the left */}
      <div className="relative z-10 pointer-events-auto flex-1 flex items-center px-6 sm:px-10 lg:px-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-white/8 px-3 py-2 ring-1 ring-white/12 backdrop-blur-sm animate-fade-slide-in-1">
            <span className="inline-flex items-center text-[11px] font-semibold text-neutral-900 bg-white/90 rounded-full py-0.5 px-2.5 font-sans tracking-wide">
              NEW
            </span>
            <span className="text-[13px] font-medium text-white/80 font-sans">
              Open to Full-Time &amp; Contract Roles 2026
            </span>
          </div>

          {/* Greeting */}
          {greeting && (
            <p className="text-[13px] text-white/35 font-sans mb-3 tracking-wide animate-fade-slide-in-1">
              {greeting} I&apos;m
            </p>
          )}

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl text-white tracking-tight font-instrument-serif font-normal leading-[1.05] animate-fade-slide-in-2">
            Shreshth
            <br />
            <span className="text-white/60 italic">Srivastava</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[16px] text-white/40 font-sans mt-5 leading-relaxed max-w-md animate-fade-slide-in-3">
            Automation Engineer building production-grade AI systems with LLMs, speech pipelines, and cloud APIs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-8 animate-fade-slide-in-4">
            <a
              href="https://Wa.me/+919335963562"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-white/10 hover:bg-white/15 ring-1 ring-white/15 rounded-full py-3 px-6 font-sans transition-all hover:ring-white/25"
            >
              Connect with me
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="/Shreshth-Srivastava-Resume.pdf"
              target="_blank"
              download
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[13px] font-medium text-white/50 hover:text-white/80 font-sans transition-colors"
            >
              Download Resume
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator — centered */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[9px] text-white/15 uppercase tracking-[4px] font-sans">
          Scroll
        </span>
        <div className="w-[1px] h-[28px] bg-gradient-to-b from-white/20 to-transparent animate-bounce" style={{ animationDuration: "2.5s" }} />
      </div>
    </section>
  );
}
