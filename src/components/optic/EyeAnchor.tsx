"use client";

import { useEffect, useRef } from "react";
import { registerAnchor } from "./eye-store";

interface EyeAnchorProps {
  id: string;
  led?: number;
  dock?: boolean;
  className?: string;
}

// Reserves layout space for the eye; the canvas renders the eye into this slot.
export default function EyeAnchor({ id, led = 1, dock = false, className = "" }: EyeAnchorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return registerAnchor(id, { el, section: el.closest("section"), led, dock });
  }, [id, led, dock]);

  return <div ref={ref} aria-hidden="true" data-eye-anchor={id} className={className} />;
}
