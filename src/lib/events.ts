export type UIEvent = "open-palette" | "open-chat";

export function emit(name: UIEvent) {
  window.dispatchEvent(new CustomEvent(name));
}

export function on(name: UIEvent, handler: () => void) {
  window.addEventListener(name, handler);
  return () => window.removeEventListener(name, handler);
}
