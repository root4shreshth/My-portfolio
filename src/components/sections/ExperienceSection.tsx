"use client";

import Image from "next/image";
import { experiences } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        {/* Header */}
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-2 gap-[40px] min-[1200px]:gap-[50px]">
          {/* Left - Title & Description */}
          <div>
            <ScrollReveal>
              <SectionLabel text="Experience" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[36px] min-[810px]:text-[46px] min-[1200px]:text-[54px] font-bold text-white leading-[1.05em] tracking-[-2px] font-[family-name:var(--font-afacad-flux)] mt-[30px]">
                Production AI &amp; Systems Engineering
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-[20px] min-[810px]:text-[22px] font-medium text-accent-purple-light leading-[28px] tracking-[-0.5px] mt-[15px] font-[family-name:var(--font-dm-sans)]">
                Purpose Into Ideas!
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] min-[810px]:text-[16px] text-text-secondary leading-[26px] tracking-[-0.5px] mt-[20px] font-[family-name:var(--font-dm-sans)]">
                From product engineering to AI automation — building reliable
                systems that ship to production and scale.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <p className="text-[13px] min-[810px]:text-[14px] text-text-muted leading-[22px] mt-[10px] font-[family-name:var(--font-dm-sans)]">
                B.Tech in Computer Science from United University (2024).
                Azure AI certified. GenAI Hackathon winner.
              </p>
            </ScrollReveal>

            {/* Integration icons preview */}
            <ScrollReveal delay={0.3}>
              <div className="flex items-center gap-[10px] mt-[30px]">
                {["/icons/integration-icon-1.svg", "/icons/integration-icon-2.svg", "/icons/integration-icon-3.svg", "/icons/integration-icon-4.svg"].map(
                  (src, i) => (
                    <div
                      key={i}
                      className="relative w-[40px] h-[40px] rounded-[10px] overflow-hidden border border-border-subtle bg-glass"
                    >
                      <Image
                        src={src}
                        alt="Integration"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Labels */}
          <div className="flex items-start justify-start min-[1200px]:justify-end">
            <ScrollReveal delay={0.2}>
              <div className="flex gap-[10px]">
                <span className="inline-flex items-center px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium text-accent-blue font-[family-name:var(--font-dm-sans)]">
                  Automation
                </span>
                <span className="inline-flex items-center px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
                  Experience
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="mt-[50px] flex flex-col gap-[20px]">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.company} delay={index * 0.1}>
              <ExperienceCard
                role={exp.role}
                company={exp.company}
                type={exp.type}
                description={exp.description}
                tags={exp.tags}
                label={exp.label}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA */}
        <ScrollReveal delay={0.3}>
          <div className="mt-[40px] flex justify-center">
            <Button href="https://Wa.me/+919335963562" variant="primary">
              Book an Appointment
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
