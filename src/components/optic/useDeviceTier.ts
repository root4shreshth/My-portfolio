"use client";

import { useSyncExternalStore } from "react";

export type Tier = "pending" | "full" | "lite";

let cached: Exclude<Tier, "pending"> | null = null;

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function detectTier(): Exclude<Tier, "pending"> {
  if (cached) return cached;
  const params = new URLSearchParams(window.location.search);
  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (params.get("optic") === "lite") cached = "lite";
  else if (params.get("optic") === "full") cached = "full";
  else if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) cached = "lite";
  else if (nav.connection?.saveData) cached = "lite";
  else if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) cached = "lite";
  else if (!supportsWebGL()) cached = "lite";
  else cached = "full";
  return cached;
}

const subscribe = () => () => {};

// Decided once per page load; "pending" during SSR and hydration.
export function useDeviceTier(): Tier {
  return useSyncExternalStore<Tier>(subscribe, detectTier, () => "pending");
}
