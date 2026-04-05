"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { scrollState, modelState } from "@/lib/scroll-store";

export default function CyborgModel() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isMobile = typeof window !== "undefined" && window.innerWidth < 810;

  const { scene } = useGLTF("/models/cyborg_with_thermal_katana.glb");

  // Signal that model is loaded
  useEffect(() => {
    if (scene) {
      modelState.loaded = true;
      modelState.progress = 1;
    }
  }, [scene]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    if (!scene) return;

    // Known: model is 1.4 x 1.8 x 1.0, center at (-0.4, 0.9, 0.3)
    // Scale to 3.5 → becomes 6.3 units tall (85% of viewport)
    scene.scale.setScalar(7);

    // Center-correct using known bounding box values
    // center.x = -0.4, center.z = 0.3, min.y = 0
    scene.position.set(
      0.4 * 7,   // cancel out x offset
      0,          // feet at y=0
      -0.3 * 7   // cancel out z offset
    );

    // Enhance emissive materials (red glow)
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          if (mat.emissive && mat.emissiveIntensity > 0.05) {
            mat.emissiveIntensity = Math.max(mat.emissiveIntensity, 3);
            mat.toneMapped = false;
          }
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;
    const sp = scrollState.progress;

    // Idle bob
    const baseY = isMobile ? -4.5 : -8.5;
    groupRef.current.position.y = baseY + Math.sin(time * 0.4) * 0.05;

    // Mouse follow — base facing left
    const targetRotY = -0.5 + mouse.current.x * 0.1;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.02;

    // Scroll drift right + push back — delayed fade
    const baseX = isMobile ? 0.5 : 1.8;
    groupRef.current.position.x = baseX + sp * 1.5;
    groupRef.current.position.z = -sp * 4;

    // Delayed fade: stays fully visible until 30% scroll, then fades over next 40%
    const fadeStart = 0.3;
    const fadeDuration = 0.4;
    const fadeProgress = Math.max(0, (sp - fadeStart) / fadeDuration);
    const targetOpacity = Math.max(0, 1 - fadeProgress);
    groupRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (!mat.transparent) mat.transparent = true;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOpacity, 0.05);
      }
    });
  });

  if (!scene) return null;

  // Desktop: right side. Mobile: centered, pushed down more
  const initX = isMobile ? 0.5 : 1.8;
  const initY = isMobile ? -9.5 : -7.5;
  return (
    <group ref={groupRef} position={[initX, initY, 0]} rotation={[0, -0.7, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/models/cyborg_with_thermal_katana.glb");
