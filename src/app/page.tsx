"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import IntegrationsSection from "@/components/sections/IntegrationsSection";
import CommandPalette from "@/components/ui/CommandPalette";
import AiChatBubble from "@/components/ui/AiChatBubble";
import Preloader from "@/components/animations/Preloader";

// Dynamic import Scene3D — no SSR, loads immediately on client
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* 3D Canvas — mounts IMMEDIATELY, loads model in background
          This sits behind the preloader (z-0 vs z-200) */}
      <Scene3D />

      {/* Preloader — sits on top (z-200), polls modelState.loaded
          Slides up only when the GLB model is actually downloaded */}
      <Preloader onComplete={() => setLoaded(true)} />

      {/* UI Overlays — only show after loading */}
      {loaded && <CommandPalette />}
      {loaded && <AiChatBubble />}

      {/* HTML Content — renders immediately but hidden behind preloader */}
      <main id="main-content" className="relative z-[1]">
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <ExperienceSection />
        <FeaturesSection />
        <ProjectsSection />
        <IntegrationsSection />
      </main>
      <Footer />
    </>
  );
}
