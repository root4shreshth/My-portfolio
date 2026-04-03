"use client";

import { socialLinks, contactInfo } from "@/lib/data";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function Footer() {
  return (
    <footer id="contact" className="relative w-full bg-background pt-[60px] min-[810px]:pt-[80px] pb-[30px] min-[810px]:pb-[40px]">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        <ScrollReveal>
          <div className="grid grid-cols-1 min-[810px]:grid-cols-3 gap-[30px] min-[810px]:gap-[40px]">
            {/* Left - CTA */}
            <div>
              <h2 className="text-[30px] min-[810px]:text-[35px] font-bold text-white leading-[38px] tracking-[-1.9px] font-[family-name:var(--font-afacad-flux)]">
                Lets Talk
              </h2>
            </div>

            {/* Middle - Contact */}
            <div>
              <h4 className="text-[11px] min-[810px]:text-[12px] font-medium text-text-muted uppercase tracking-[1px] mb-[16px] font-[family-name:var(--font-dm-sans)]">
                Contact me
              </h4>
              <div className="flex flex-col gap-[8px]">
                <a
                  href={contactInfo.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-text-secondary hover:text-white transition-colors font-[family-name:var(--font-dm-sans)]"
                >
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-[14px] text-text-secondary hover:text-white transition-colors font-[family-name:var(--font-dm-sans)]"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Right - Social */}
            <div>
              <h4 className="text-[11px] min-[810px]:text-[12px] font-medium text-text-muted uppercase tracking-[1px] mb-[16px] font-[family-name:var(--font-dm-sans)]">
                Social
              </h4>
              <div className="flex flex-col gap-[8px]">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-text-secondary hover:text-white transition-colors font-[family-name:var(--font-dm-sans)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Copyright */}
        <div className="mt-[40px] min-[810px]:mt-[60px] pt-[20px] border-t border-border-subtle">
          <p className="text-[12px] text-text-muted font-[family-name:var(--font-dm-sans)]">
            &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
