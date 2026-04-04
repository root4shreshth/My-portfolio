"use client";

import { projects, skillTags } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import SkillMarquee from "@/components/ui/SkillMarquee";
import ScrollReveal from "@/components/animations/ScrollReveal";

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-[60px] min-[810px]:py-[80px]">
      <div className="mx-auto max-w-5xl px-6 sm:px-10">
        {/* Header */}
        <ScrollReveal>
          <SectionLabel text="Projects" />
        </ScrollReveal>

        <div className="mt-8 flex flex-col min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between gap-6">
          <ScrollReveal delay={0.1}>
            <h2 className="text-[32px] min-[810px]:text-[44px] min-[1200px]:text-[52px] text-white leading-[1.1em] tracking-tight font-instrument-serif font-normal max-w-[600px]">
              AI-Powered Projects
              <br />
              <span className="italic text-white/70">for the Future</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Button href="https://Wa.me/+919335963562" variant="outline">
              Book a 15-min call
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
            </Button>
          </ScrollReveal>
        </div>

        {/* Project Grid */}
        <div className="mt-12 grid grid-cols-1 min-[1200px]:grid-cols-2 gap-5">
          {projects.map((project, index) => (
            <ScrollReveal key={project.title} delay={index * 0.1}>
              <ProjectCard
                title={project.title}
                subtitle={project.subtitle}
                description={project.description}
                image={project.image}
                link={project.link}
                details={project.details}
                tech={project.tech}
                year={project.year}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Skill Tags Marquee */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10">
            <SkillMarquee skills={skillTags} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
