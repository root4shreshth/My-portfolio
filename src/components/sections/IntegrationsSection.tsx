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
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden min-h-[400px] min-[810px]:min-h-[500px]">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/integrations-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/90 to-[#09090b]/60" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 min-[810px]:p-14">
            <ScrollReveal>
              <SectionLabel text="Integrations" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[32px] min-[810px]:text-[44px] min-[1200px]:text-[52px] text-white leading-[1.1em] tracking-tight font-instrument-serif font-normal mt-8 max-w-[500px]">
                Seamless
                <br />
                <span className="italic text-white/70">Integrations.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] text-white/60 leading-[26px] max-w-lg mt-6 font-sans">
                Seamlessly connecting AI agents with CRMs, calendars, and
                messaging platforms to ensure workflows run efficiently
                end-to-end.
              </p>
            </ScrollReveal>

            {/* Integration Icons Grid */}
            <ScrollReveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                {integrationIcons.map((icon, i) => (
                  <div
                    key={i}
                    className="relative w-[44px] h-[44px] rounded-xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur flex items-center justify-center hover:ring-white/20 transition-all duration-300 cursor-pointer"
                  >
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={44}
                      height={44}
                      className="object-contain p-[8px]"
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
