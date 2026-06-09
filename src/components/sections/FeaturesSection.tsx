"use client";

import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        <div className="relative rounded-2xl ring-1 ring-white/10 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/features-bg.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-[#09090b]/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 min-[810px]:p-14 min-[1200px]:p-20">
            <ScrollReveal>
              <SectionLabel text="Features" />
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <h2 className="text-[32px] min-[810px]:text-[44px] min-[1200px]:text-[52px] text-white leading-[1.1em] tracking-tight font-instrument-serif font-normal mt-8">
                Packed with
                <br />
                <span className="italic text-white/70">Innovation.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-[15px] text-white/60 leading-[26px] max-w-lg mt-6 font-sans">
                Production-grade AI products, autonomous agents, voice
                pipelines, and IoT systems — built for real users,
                shipped to production, and scaling in the wild.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-8">
                <Button href="https://Wa.me/+919335963562" variant="outline">
                  Book an Appointment
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
