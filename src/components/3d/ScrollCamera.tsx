"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { scrollState } from "@/lib/scroll-store";

export default function ScrollCamera() {
  const { camera } = useThree();

  useFrame(() => {
    const sp = scrollState.progress;

    // Gentle push-in: z 8 → 6
    camera.position.z = 8 - sp * 2;
    // Drift up slightly
    camera.position.y = 1 + sp * 1;
  });

  return null;
}
