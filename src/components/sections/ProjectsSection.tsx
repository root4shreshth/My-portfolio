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
      <div className="mx-auto max-w-[1300px] px-[20px] min-[810px]:px-[30px]">
        {/* Header */}
        <ScrollReveal>
          <SectionLabel text="Projects" />
        </ScrollReveal>

        <div className="mt-[30px] flex flex-col min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between gap-[20px]">
          <ScrollReveal delay={0.1}>
            <h2 className="text-[36px] min-[810px]:text-[46px] min-[1200px]:text-[54px] font-bold text-white leading-[1.05em] tracking-[-2px] font-[family-name:var(--font-afacad-flux)] max-w-[700px]">
              <span className="gradient-text-red-purple">AI-Powered Projects</span>{" "}
              for Future-Driven Businesses
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Button href="https://Wa.me/+919335963562" variant="outline">
              Book a 15-min call
            </Button>
          </ScrollReveal>
        </div>

        {/* Project Grid */}
        <div className="mt-[50px] grid grid-cols-1 min-[1200px]:grid-cols-2 gap-[20px]">
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

          {/* Coming Soon */}
          <ScrollReveal delay={0.5}>
            <ProjectCard
              title=""
              description=""
              image=""
              comingSoon
            />
          </ScrollReveal>
        </div>

        {/* Skill Tags Marquee */}
        <ScrollReveal delay={0.3}>
          <div className="mt-[40px]">
            <SkillMarquee skills={skillTags} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
