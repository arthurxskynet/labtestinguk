"use client";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { StatTileAnimated } from "@/components/marketing/stat-tile-animated";

const stats = [
  { value: "HPLC", label: "Purity reporting", icon: "⚗️" },
  { value: "LC-MS", label: "Identity confirmation", icon: "🔬" },
  { value: "QR", label: "Registry lookup", icon: "🔗" },
  { value: "UK", label: "Sample coordination", icon: "📋" },
] as const;

export function StatsBarSection() {
  return (
    <section
      aria-label="Analytical service capabilities"
      className="border-y border-[var(--bg-border)] bg-[var(--bg-surface)]"
    >
      <RevealOnView>
        <div className="marketing-container">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--bg-border)] lg:grid-cols-4 lg:divide-y-0">
            {stats.map((item) => (
              <StatTileAnimated
                key={item.label}
                stat={item.value}
                label={item.label}
                emoji={item.icon}
                variant="bar"
              />
            ))}
          </div>
        </div>
      </RevealOnView>
    </section>
  );
}
