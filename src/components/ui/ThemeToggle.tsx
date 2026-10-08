"use client";

import { setTheme, useTheme } from "@/lib/theme";

// Switch styled as an instrument control: two-position indicator with a sliding LED.
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const light = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={light}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      title={light ? "Dark mode" : "Light mode"}
      onClick={() => setTheme(light ? "dark" : "light")}
      className={`t-mono inline-flex h-10 items-center gap-2 border border-line px-3 text-fg-2 transition-colors hover:border-line-2 hover:text-fg ${className}`}
    >
      <span aria-hidden="true" className="relative inline-block h-3 w-6 rounded-full border border-line-2">
        <span
          className={`absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal transition-[left] duration-500 ${
            light ? "left-[calc(100%-8px)]" : "left-[2px]"
          }`}
        />
      </span>
      <span className="hidden tab:inline">{light ? "Light" : "Dark"}</span>
    </button>
  );
}
