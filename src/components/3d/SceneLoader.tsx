"use client";

import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { modelState } from "@/lib/scroll-store";

export default function SceneLoader() {
  const { progress, loaded, total } = useProgress();

  useEffect(() => {
    modelState.progress = progress / 100;
    if (progress >= 100 && loaded === total && total > 0) {
      modelState.loaded = true;
    }
  }, [progress, loaded, total]);

  return null;
}
