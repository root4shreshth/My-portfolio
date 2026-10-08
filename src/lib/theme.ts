"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";
const KEY = "theme";
const EVENT = "theme-change";

// Runs inline in <head> before first paint so the stored theme never flashes.
// Dark is the brand default; light only when the visitor chose it.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${KEY}");if(t==="light"){document.documentElement.dataset.theme="light";}}catch(e){}})();`;

function read(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function setTheme(next: Theme) {
  const root = document.documentElement;
  const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (animate) root.classList.add("theme-switching");
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f2f1ec" : "#050505");
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  window.dispatchEvent(new Event(EVENT));
  if (animate) window.setTimeout(() => root.classList.remove("theme-switching"), 550);
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "dark");
}
