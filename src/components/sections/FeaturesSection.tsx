"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        <div className="relative rounded-[20px] min-[810px]:rounded-[30px] border border-border-subtle overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/features-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-[30px] min-[810px]:p-[60px] min-[1200px]:p-[80px]">
            <ScrollReveal>
              <SectionLabel text="Features" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[36px] min-[810px]:text-[48px] min-[1200px]:text-[56px] font-bold text-white leading-[1.05em] tracking-[-3px] font-[family-name:var(--font-afacad-flux)] mt-[30px]">
                Packed with Innovation.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] min-[810px]:text-[16px] text-text-secondary leading-[26px] tracking-[-0.5px] max-w-[520px] mt-[20px] font-[family-name:var(--font-dm-sans)]">
                Production-grade AI systems, clinical triage pipelines, voice
                automation, and full-stack products — built for real users,
                shipped to production, and scaling in the wild.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-[30px]">
                <Button href="https://Wa.me/+919335963562" variant="primary">
                  Book an Appointment
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
