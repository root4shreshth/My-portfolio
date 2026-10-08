import Preloader from "@/components/layout/Preloader";
import SiteNav from "@/components/layout/SiteNav";
import OpticLayer from "@/components/optic/OpticLayer";
import CommandPalette from "@/components/ui/CommandPalette";
import AiChatBubble from "@/components/ui/AiChatBubble";
import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Work from "@/components/sections/Work";
import Capabilities from "@/components/sections/Capabilities";
import Lab from "@/components/sections/Lab";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <SiteNav />
      <OpticLayer />
      <main id="main">
        <Hero />
        <Identity />
        <Work />
        <Capabilities />
        <Lab />
        <Journey />
        <Contact />
      </main>
      <CommandPalette />
      <AiChatBubble />
    </>
  );
}
