"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { navLinks } from "@/lib/data";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const { scrollY } = useScroll();

  // Track scroll position for navbar background
  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0.001, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 60, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-[1440px] px-[20px] min-[810px]:px-[30px] py-[12px]">
          <motion.div
            animate={{
              backgroundColor: scrolled ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)",
              borderColor: scrolled ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between rounded-[30px] border backdrop-blur-[20px] px-[20px] py-[10px]"
          >
            {/* Logo */}
            <a
              href="#home"
              className="text-[16px] font-medium text-white font-[family-name:var(--font-dm-sans)] tracking-[-0.5px] hover:opacity-80 transition-opacity"
            >
              Home
            </a>

            {/* Desktop Links */}
            <div className="hidden min-[810px]:flex items-center gap-[4px]">
              {navLinks.slice(1).map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-[14px] transition-all duration-300 px-[12px] py-[6px] rounded-[10px] font-[family-name:var(--font-dm-sans)] ${
                    activeSection === link.href
                      ? "text-white bg-[rgba(255,255,255,0.08)]"
                      : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden min-[810px]:block">
              <Button href="#contact" variant="primary" className="text-[14px] px-[16px] py-[8px]">
                Get In Touch
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="min-[810px]:hidden flex flex-col items-center justify-center w-[32px] h-[32px] gap-[5px]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-[18px] h-[2px] bg-white rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-[18px] h-[2px] bg-white rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-[18px] h-[2px] bg-white rounded-full block"
              />
            </button>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-[20px] pt-[100px] px-[30px] min-[810px]:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex flex-col gap-[10px]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-[24px] transition-colors duration-300 py-[10px] font-[family-name:var(--font-dm-sans)] ${
                    activeSection === link.href ? "text-white" : "text-text-secondary hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4">
                <Button href="#contact" variant="primary" onClick={() => setMobileOpen(false)}>
                  Get In Touch
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
