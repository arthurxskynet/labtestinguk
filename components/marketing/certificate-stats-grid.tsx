"use client";

import { Clock, FlaskConical, LineChart, Users } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { StatTileAnimated } from "@/components/marketing/stat-tile-animated";

const stats = [
  {
    icon: Users,
    stat: "2,500+",
    label: "Samples analysed",
  },
  {
    icon: Clock,
    stat: "24hrs",
    label: "Typical turnaround (priority)",
  },
  {
    icon: LineChart,
    stat: "99.9%",
    label: "QC pass rate",
  },
  {
    icon: FlaskConical,
    stat: "UK lab",
    label: "Chain of custody",
  },
] as const;

export function CertificateStatsGrid() {
  return (
    <RevealOnView
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
      staggerChildren
    >
      {stats.map((item) => (
        <StatTileAnimated
          key={item.label}
          icon={item.icon}
          stat={item.stat}
          label={item.label}
        />
      ))}
    </RevealOnView>
  );
}
