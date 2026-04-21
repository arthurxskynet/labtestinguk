"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealOnViewProps = {
  children: React.ReactNode;
  className?: string;
  /** When true, direct children get staggered transition-delay (see globals.css). */
  staggerChildren?: boolean;
  /** IntersectionObserver rootMargin (e.g. early trigger). */
  rootMargin?: string;
};

export function RevealOnView({
  children,
  className,
  staggerChildren = false,
  rootMargin = "0px 0px -8% 0px",
}: RevealOnViewProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-on-view",
        visible && "reveal-visible",
        staggerChildren && "reveal-stagger",
        className,
      )}
    >
      {children}
    </div>
  );
}
