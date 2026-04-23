"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

function subscribeReducedMotion(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type Parsed =
  | { kind: "static" }
  | { kind: "thousands_plus"; end: number }
  | { kind: "hours"; end: number }
  | { kind: "percent"; end: number };

function parseStat(stat: string): Parsed {
  const lower = stat.toLowerCase();
  if (lower.includes("lab") || lower.includes("uk")) return { kind: "static" };
  const plus = stat.match(/^([\d,]+)\+$/);
  if (plus) {
    return {
      kind: "thousands_plus",
      end: Number.parseInt(plus[1].replace(/,/g, ""), 10),
    };
  }
  const hrs = stat.match(/^(\d+)hrs$/i);
  if (hrs) {
    return { kind: "hours", end: Number.parseInt(hrs[1], 10) };
  }
  const pct = stat.match(/^(\d+(?:\.\d+)?)%$/);
  if (pct) {
    return { kind: "percent", end: Number.parseFloat(pct[1]) };
  }
  return { kind: "static" };
}

function startingDisplay(parsed: Parsed): string {
  if (parsed.kind === "static") return "";
  if (parsed.kind === "thousands_plus") return "0+";
  if (parsed.kind === "hours") return "0hrs";
  return "0.0%";
}

function finalDisplay(parsed: Parsed, stat: string): string {
  if (parsed.kind === "static") return stat;
  if (parsed.kind === "thousands_plus") {
    return `${parsed.end.toLocaleString("en-GB")}+`;
  }
  if (parsed.kind === "hours") {
    return `${parsed.end}hrs`;
  }
  return `${parsed.end.toFixed(1)}%`;
}

export type StatTileAnimatedProps = {
  icon?: LucideIcon;
  stat: string;
  label: string;
  /** Stats strip (marketing homepage) — emoji + serif value */
  variant?: "card" | "bar";
  emoji?: string;
};

export function StatTileAnimated({
  icon: Icon,
  stat,
  label,
  variant = "card",
  emoji,
}: StatTileAnimatedProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const parsed = React.useMemo(() => parseStat(stat), [stat]);
  const prefersReducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [display, setDisplay] = React.useState(stat);

  React.useLayoutEffect(() => {
    if (prefersReducedMotion || parsed.kind === "static") {
      setDisplay(stat);
      return;
    }
    setDisplay(startingDisplay(parsed));
  }, [stat, parsed, prefersReducedMotion]);

  React.useEffect(() => {
    if (prefersReducedMotion || parsed.kind === "static") {
      return;
    }

    const el = ref.current;
    if (!el) return;

    const durationMs = 1200;
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          const eased = 1 - (1 - t) ** 3;

          if (parsed.kind === "thousands_plus") {
            const n = Math.round(eased * parsed.end);
            setDisplay(`${n.toLocaleString("en-GB")}+`);
          } else if (parsed.kind === "hours") {
            const n = Math.round(eased * parsed.end);
            setDisplay(`${n}hrs`);
          } else if (parsed.kind === "percent") {
            const n = eased * parsed.end;
            setDisplay(`${n.toFixed(1)}%`);
          }

          if (t < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setDisplay(finalDisplay(parsed, stat));
          }
        };

        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [parsed, prefersReducedMotion, stat]);

  if (variant === "bar") {
    return (
      <div
        ref={ref}
        className="flex flex-col items-center justify-center px-4 py-10 text-center sm:py-12 lg:py-14"
      >
        {emoji ? (
          <span className="mb-3 text-2xl leading-none" aria-hidden>
            {emoji}
          </span>
        ) : null}
        <p className="font-display text-[2.5rem] leading-none tracking-tight text-[var(--text-primary)] tabular-nums">
          {display || stat}
        </p>
        <p className="mt-3 max-w-[12rem] text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--text-muted)]">
          {label}
        </p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="flex gap-4 rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]"
    >
      {Icon ? (
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-primary)] text-[var(--text-inverse)] shadow-sm">
          <Icon className="size-6" aria-hidden />
        </span>
      ) : null}
      <div>
        <p className="text-2xl font-bold tabular-nums text-[var(--text-primary)]">
          {display || stat}
        </p>
        <p className="text-sm text-[var(--text-secondary)]">{label}</p>
      </div>
    </div>
  );
}
