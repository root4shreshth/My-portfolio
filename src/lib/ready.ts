"use client";

import { useSyncExternalStore } from "react";

let ready = false;
const EVENT = "site-ready";

export function markReady() {
  if (ready) return;
  ready = true;
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  return () => window.removeEventListener(EVENT, cb);
}

export function useReady() {
  return useSyncExternalStore(subscribe, () => ready, () => false);
}
