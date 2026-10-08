"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useDeviceTier } from "./useDeviceTier";
import { trackPointer } from "./eye-store";
import OpticFallback from "./OpticFallback";

const OpticCanvas = dynamic(() => import("./OpticCanvas"), { ssr: false });

export default function OpticLayer() {
  const tier = useDeviceTier();

  useEffect(() => trackPointer(), []);

  if (tier === "pending") return null;
  return tier === "full" ? <OpticCanvas /> : <OpticFallback />;
}
