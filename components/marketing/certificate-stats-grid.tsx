"use client";

import { Clock, FlaskConical, LineChart, Users } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { StatTileAnimated } from "@/components/marketing/stat-tile-animated";

const stats = [
  {
    icon: Users,
    stat: "HPLC",
    label: "Purity reporting",
  },
  {
    icon: Clock,
    stat: "LC-MS",
    label: "Identity confirmation",
  },
  {
    icon: LineChart,
    stat: "QR",
    label: "Registry lookup",
  },
  {
    icon: FlaskConical,
    stat: "UK",
    label: "Sample coordination",
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
