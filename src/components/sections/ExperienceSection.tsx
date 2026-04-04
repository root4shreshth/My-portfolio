"use client";

import { experiences } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ExperienceCard from "@/components/ui/ExperienceCard";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Header */}
        <div className="grid grid-cols-1 min-[1200px]:grid-cols-[1fr_auto] gap-10">
          <div>
            <ScrollReveal>
              <SectionLabel text="Experience" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[32px] min-[810px]:text-[44px] min-[1200px]:text-[52px] text-white leading-[1.1em] tracking-tight font-instrument-serif font-normal mt-8">
                Production AI &amp;
                <br />
                <span className="italic text-white/70">Systems Engineering</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] text-white/60 leading-[26px] max-w-lg mt-6 font-sans">
                From product engineering to AI automation — building reliable
                systems that ship to production and scale. B.Tech in Computer
                Science from United University (2024).
              </p>
            </ScrollReveal>
          </div>

          <div className="flex items-start">
            <ScrollReveal delay={0.2}>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full ring-1 ring-white/10 bg-white/5 text-[12px] font-medium text-white/70 font-sans">
                  Automation
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full ring-1 ring-white/10 bg-white/5 text-[12px] font-medium text-white/70 font-sans">
                  Engineering
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="mt-12 flex flex-col gap-4">
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
          <div className="mt-10 flex justify-center">
            <Button href="https://Wa.me/+919335963562" variant="outline">
              Book an Appointment
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
