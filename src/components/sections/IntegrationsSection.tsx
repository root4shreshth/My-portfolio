"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollReveal from "@/components/animations/ScrollReveal";

const integrationIcons = [
  { src: "/icons/integration-icon-1.svg", alt: "Sheets" },
  { src: "/icons/integration-icon-2.svg", alt: "Calendar" },
  { src: "/icons/integration-icon-3.svg", alt: "Chat" },
  { src: "/icons/integration-icon-4.svg", alt: "Workflow" },
  { src: "/images/profile-about.jpeg", alt: "AI Network" },
  { src: "/images/profile-hero.jpg", alt: "Zapier" },
  { src: "/images/small-icon.png", alt: "Make" },
  { src: "/images/skill-icon-1.png", alt: "Langchain" },
];

export default function IntegrationsSection() {
  return (
    <section className="relative w-full py-[60px] min-[810px]:py-[80px] overflow-hidden">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        <div className="relative rounded-[20px] min-[810px]:rounded-[30px] border border-border-subtle overflow-hidden min-h-[400px] min-[810px]:min-h-[500px]">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/integrations-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-[30px] min-[810px]:p-[60px]">
            <ScrollReveal>
              <SectionLabel text="Integretions" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[32px] min-[810px]:text-[48px] min-[1200px]:text-[56px] font-bold text-white leading-[1.05em] tracking-[-3px] font-[family-name:var(--font-afacad-flux)] mt-[30px] max-w-[600px]">
                Seamless Integrations for
                <br />
                Maximum Efficiency.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] min-[810px]:text-[16px] text-text-secondary leading-[26px] tracking-[-0.5px] max-w-[520px] mt-[20px] font-[family-name:var(--font-dm-sans)]">
                Seamlessly connecting AI agents with CRMs, calendars, and
                messaging platforms, I ensure workflows run efficiently
                end-to-end.
              </p>
            </ScrollReveal>

            {/* Integration Icons Grid */}
            <ScrollReveal delay={0.3}>
              <div className="mt-[40px] flex flex-wrap gap-[14px]">
                {integrationIcons.map((icon, i) => (
                  <div
                    key={i}
                    className="relative w-[44px] h-[44px] rounded-[10px] overflow-hidden border border-border-subtle bg-glass backdrop-blur-[10px] flex items-center justify-center hover:border-border-hover transition-colors duration-300 cursor-pointer"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={44}
                      height={44}
                      className="object-contain p-[6px]"
                    />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
