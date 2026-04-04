"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function AboutSection() {
  return (
    <section id="about" className="relative w-full py-[80px] min-[1200px]:py-[100px]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <ScrollReveal>
          <SectionLabel text="About" />
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 min-[1200px]:grid-cols-[1fr_auto] gap-10 min-[1200px]:gap-14 items-center">
          <ScrollReveal delay={0.1}>
            <h2 className="text-[28px] min-[810px]:text-[36px] min-[1200px]:text-[42px] text-white leading-[1.25em] tracking-tight font-instrument-serif font-normal">
              <span className="text-white/50">
                Automation Engineer specialized in designing end-to-end solutions
              </span>{" "}
              that integrate LLMs, real-time speech pipelines, and cloud APIs to automate lead qualification, customer engagement, and data workflows.
            </h2>

            <div className="mt-8">
              <Button href="https://Wa.me/+919335963562" variant="outline">
                Book an Appointment
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="right">
            <div className="relative w-[200px] h-[200px] min-[810px]:w-[240px] min-[810px]:h-[240px] min-[1200px]:w-[280px] min-[1200px]:h-[280px] rounded-2xl overflow-hidden ring-1 ring-white/10">
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
