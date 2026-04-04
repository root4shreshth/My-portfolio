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

// Dynamic import Scene3D to avoid SSR issues with Three.js
const Scene3D = dynamic(() => import("@/components/3d/Scene3D"), {
  ssr: false,
});

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Preloader — shown until loading complete */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* 3D Background Canvas — fixed behind everything */}
      <Scene3D />

      {/* UI Overlays */}
      <CommandPalette />
      <AiChatBubble />

      {/* HTML Content — on top of 3D */}
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
