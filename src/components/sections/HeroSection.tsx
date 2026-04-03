"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const springTransition = (delay: number) => ({
  type: "spring" as const,
  stiffness: 200,
  damping: 60,
  mass: 1,
  delay,
});

export default function HeroSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-[100px] pb-[60px]"
    >
      {/* Background Image with scale animation */}
      <motion.div
        initial={{ opacity: 0.001, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0, duration: 3 }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
      </motion.div>

      {/* Purple glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(79,26,214,0.25) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-[30px] w-full text-center">
        {/* Top Tags */}
        <motion.div
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(0.5)}
          className="flex items-center justify-center gap-[12px] mb-[30px] flex-wrap"
        >
          <span className="inline-flex items-center px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
            {currentYear}
          </span>
          <span className="inline-flex items-center px-[16px] py-[6px] rounded-[30px] border border-border-subtle bg-glass text-[12px] font-medium text-text-secondary font-[family-name:var(--font-dm-sans)]">
            Automation
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(0.5)}
          className="text-[50px] min-[810px]:text-[80px] min-[1200px]:text-[100px] font-bold text-white leading-[1em] tracking-[-3.8px] font-[family-name:var(--font-afacad-flux)] mb-[10px]"
        >
          Shreshth Srivastava
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(1.1)}
          className="text-[28px] min-[810px]:text-[36px] min-[1200px]:text-[48px] text-text-secondary leading-[1.1em] tracking-[-2px] font-[family-name:var(--font-dm-sans)] mb-[20px] italic"
        >
          Automation Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(1.1)}
          className="text-[16px] min-[810px]:text-[18px] text-text-secondary leading-[28px] max-w-[600px] mx-auto mb-[10px] font-[family-name:var(--font-dm-sans)]"
        >
          Building production-grade AI systems that integrate LLMs, real-time
          speech pipelines, and cloud APIs to automate workflows.
        </motion.p>

        <motion.p
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(1.1)}
          className="text-[14px] text-text-muted leading-[22px] max-w-[520px] mx-auto mb-[40px] font-[family-name:var(--font-dm-sans)]"
        >
          Proven ability to ship reliable, observable systems that reduce
          manual effort and scale across business operations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(1.2)}
          className="flex items-center justify-center gap-[12px] flex-wrap"
        >
          <Button href="https://Wa.me/+919335963562" variant="primary">
            Connect me
          </Button>
          <Button href="/Shreshth-Srivastava-Resume.pdf" variant="outline">
            Resume
          </Button>
        </motion.div>

        {/* Profile Image */}
        <motion.div
          initial={{ opacity: 0.001 }}
          animate={{ opacity: 1 }}
          transition={springTransition(1.2)}
          className="mt-[50px] flex justify-center"
        >
          <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-[rgba(255,255,255,0.15)]">
            <Image
              src="/images/favicon.png"
              alt="Shreshth Srivastava"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-[30px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-[8px]"
      >
        <span className="text-[11px] text-text-muted uppercase tracking-[2px] font-[family-name:var(--font-dm-sans)]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-[30px] bg-gradient-to-b from-text-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
