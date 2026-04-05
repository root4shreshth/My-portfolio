"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import ParticleField from "./ParticleField";
import ScrollCamera from "./ScrollCamera";
import CyborgModel from "./CyborgModel";
import PostEffects from "./PostEffects";

export default function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 810);
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (!mounted || reduceMotion) return null;

  return (
    <div className="fixed inset-0 z-0" style={{ background: "#09090b" }}>
      <Canvas
        camera={{
          position: isMobile ? [0, 1, 10] : [0, 1, 8],
          fov: isMobile ? 55 : 50,
        }}
        dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5)}
        gl={{
          antialias: !isMobile,
          powerPreference: "high-performance",
          alpha: false,
          toneMapping: 4,
          toneMappingExposure: 1.3,
        }}
        style={{ background: "#09090b" }}
      >
        <ambientLight intensity={0.4} color="#b0b0d0" />
        <directionalLight position={[3, 6, 5]} intensity={2.5} color="#ffffff" />
        <pointLight position={[2, 0, 5]} intensity={2} color="#ff1a1a" distance={15} />
        <pointLight position={[-3, 1, 4]} intensity={0.8} color="#818cf8" distance={20} />
        <pointLight position={[1, 5, -3]} intensity={0.6} color="#c4b5fd" distance={18} />
        <pointLight position={[0, -2, 3]} intensity={0.5} color="#ff3333" distance={12} />
        <spotLight position={[0, 8, 4]} intensity={1.5} angle={0.5} penumbra={0.8} color="#ffffff" />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <ParticleField count={isMobile ? 60 : 200} />
          {/* Model renders on ALL devices — mobile gets reduced particles + no post-processing */}
          <CyborgModel />
          <ScrollCamera />
          {!isMobile && <PostEffects />}
        </Suspense>
      </Canvas>
    </div>
  );
}
