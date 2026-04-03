"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-[80px] min-[1200px]:py-[100px]">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        <ScrollReveal>
          <SectionLabel text="About me" />
        </ScrollReveal>

        <div className="mt-[40px] grid grid-cols-1 min-[1200px]:grid-cols-[1fr_auto] gap-[40px] min-[1200px]:gap-[50px] items-center">
          {/* Text */}
          <ScrollReveal delay={0.1}>
            <p className="text-[24px] min-[810px]:text-[30px] min-[1200px]:text-[35px] font-medium text-white leading-[1.3em] tracking-[-1.9px] font-[family-name:var(--font-dm-sans)]">
              <span className="text-text-secondary">
                Automation Engineer specialized in designing end-to-end solutions
              </span>{" "}
              that integrate LLMs, real-time speech pipelines, and cloud APIs to automate lead qualification, customer engagement, and data workflows.
            </p>

            <div className="mt-[30px]">
              <Button href="https://Wa.me/+919335963562" variant="primary">
                Book an Appointment
              </Button>
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="relative w-[200px] h-[200px] min-[810px]:w-[250px] min-[810px]:h-[250px] min-[1200px]:w-[280px] min-[1200px]:h-[280px] rounded-[20px] overflow-hidden border border-border-subtle">
              <Image
                src="/images/about-logo-clean.png"
                alt="AI Network"
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
