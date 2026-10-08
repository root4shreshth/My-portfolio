"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import OpticEye from "./OpticEye";

export default function OpticCanvas() {
  // Client-only component (loaded with ssr:false), so window is available here.
  const [dpr, setDpr] = useState(() =>
    window.matchMedia("(max-width: 809px)").matches ? 1 : Math.min(window.devicePixelRatio, 1.75)
  );
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");

  useEffect(() => {
    const onVisibility = () => setFrameloop(document.hidden ? "never" : "always");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      frameloop={frameloop}
      dpr={dpr}
      camera={{ position: [0, 0, 10], fov: 30, near: 0.1, far: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
      }}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 40 }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.12} />
      <directionalLight position={[3, 5, 6]} intensity={1.1} />
      <Suspense fallback={null}>
        <Environment resolution={256} frames={1}>
          <Lightformer form="rect" intensity={2.4} position={[0, 4, 5]} scale={[10, 1.2, 1]} />
          <Lightformer form="rect" intensity={1.1} position={[-6, 0, 3]} rotation-y={Math.PI / 2} scale={[8, 1.6, 1]} />
          <Lightformer form="rect" intensity={1.1} position={[6, 0, 3]} rotation-y={-Math.PI / 2} scale={[8, 1.6, 1]} />
          <Lightformer form="ring" intensity={2} color="#ff2a1f" position={[0, -1, 6]} scale={1.6} />
        </Environment>
        <OpticEye />
      </Suspense>
    </Canvas>
  );
}
