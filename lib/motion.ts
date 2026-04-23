/** Shared durations for marketing animations — keep initial paint delay ≤200ms per spec */

export const MOTION = {
  fast: 150,
  button: 150,
  card: 300,
  reveal: 600,
  stagger: 60,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
