"use client";

import { socialLinks, contactInfo } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full pt-[60px] min-[810px]:pt-[80px] pb-[30px] min-[810px]:pb-[40px]">
      <div className="mx-auto max-w-5xl px-6">
        <ScrollReveal>
          <div className="grid grid-cols-1 min-[810px]:grid-cols-3 gap-10 min-[810px]:gap-12">
            {/* Left - CTA */}
            <div>
              <h2 className="text-[32px] min-[810px]:text-[40px] text-white leading-[1.1em] tracking-tight font-instrument-serif font-normal">
                Let&apos;s <span className="italic text-white/70">Talk.</span>
              </h2>
            </div>

            {/* Middle - Contact */}
            <div>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[1.5px] mb-4 font-sans">
                Contact me
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-white/60 hover:text-white transition-colors font-sans"
                >
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[14px] text-white/60 hover:text-white transition-colors font-sans"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Right - Social */}
            <div>
              <h4 className="text-[11px] font-medium text-white/40 uppercase tracking-[1.5px] mb-4 font-sans">
                Social
              </h4>
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-white/60 hover:text-white transition-colors font-sans"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Copyright */}
        <div className="mt-12 min-[810px]:mt-16 pt-5 border-t border-white/10">
          <p className="text-[12px] text-white/30 font-sans">
            &copy; {new Date().getFullYear()} Shreshth Srivastava
          </p>
        </div>
      </div>
    </footer>
  );
}
