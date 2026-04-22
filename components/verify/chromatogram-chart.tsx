"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const POINTS = 72;

/** Narrow Gaussian + low noise — typical high-purity single-peak profile. */
function buildHighPuritySeries(seed: number) {
  const data: { rt: number; intensity: number }[] = [];
  const center = 22;
  for (let i = 0; i < POINTS; i++) {
    const rt = Number((2 + i * 0.12).toFixed(2));
    const x = (i - center) / 2.15;
    const base = Math.exp(-(x * x)) * 100;
    const noise = Math.sin(seed + i * 0.35) * 0.35;
    data.push({ rt, intensity: Math.max(0, base + noise) });
  }
  return data;
}

function buildDefaultSeries(seed: number) {
  const data: { rt: number; intensity: number }[] = [];
  for (let i = 0; i < POINTS; i++) {
    const rt = Number((2 + i * 0.12).toFixed(2));
    const x = (i - 22) / 6;
    const base = Math.exp(-(x * x)) * 100;
    const noise = Math.sin(seed + i * 0.4) * 1.2;
    data.push({ rt, intensity: Math.max(0, base + noise) });
  }
  return data;
}

/** Composite multi-peak profile for blend / mixed lines. */
function buildBlendSeries(seed: number) {
  const data: { rt: number; intensity: number }[] = [];
  for (let i = 0; i < POINTS; i++) {
    const rt = Number((2 + i * 0.12).toFixed(2));
    const p1 = Math.exp(-Math.pow((i - 18) / 3.6, 2)) * 72;
    const p2 = Math.exp(-Math.pow((i - 30) / 4.2, 2)) * 88;
    const p3 = Math.exp(-Math.pow((i - 44) / 4.8, 2)) * 64;
    const noise = Math.sin(seed + i * 0.33) * 0.9;
    data.push({ rt, intensity: Math.max(0, p1 + p2 + p3 + noise) });
  }
  return data;
}

const STROKE = "#0f766e";
const FILL_TOP = "#14b8a6";
const FILL_MID = "#10b981";
const FILL_BOTTOM = "#34d399";

function peakFromData(data: { rt: number; intensity: number }[]): {
  rt: number;
  intensity: number;
} {
  const initial = { rt: 0, intensity: -1 };
  return data.reduce<{ rt: number; intensity: number }>(
    (best, d) =>
      d.intensity > best.intensity ? { rt: d.rt, intensity: d.intensity } : best,
    initial,
  );
}

export function ChromatogramChart({
  peptideName,
  profile = "default",
  variant = "default",
}: {
  peptideName: string;
  profile?: "high_purity" | "default" | "blend";
  /** Tighter embed on marketing card: extra axis space, peak marker, softer grid. */
  variant?: "default" | "embed";
}) {
  const uid = React.useId().replace(/:/g, "");
  const gradId = `chromFill-${uid}`;

  const seed =
    peptideName.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 97;
  const data =
    profile === "high_purity"
      ? buildHighPuritySeries(seed)
      : profile === "blend"
        ? buildBlendSeries(seed)
        : buildDefaultSeries(seed);

  const peak = React.useMemo(() => peakFromData(data), [data]);
  const embed = variant === "embed";

  const margin = embed
    ? { top: 10, right: 6, left: 2, bottom: 44 }
    : { top: 10, right: 14, left: 4, bottom: 36 };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={margin}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={FILL_TOP} stopOpacity={0.58} />
            <stop offset="35%" stopColor={FILL_MID} stopOpacity={0.28} />
            <stop offset="72%" stopColor={FILL_MID} stopOpacity={0.1} />
            <stop offset="100%" stopColor={FILL_BOTTOM} stopOpacity={0} />
          </linearGradient>
          {embed ? (
            <filter id={`${uid}-lineGlow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1.25" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ) : null}
        </defs>
        <CartesianGrid
          strokeDasharray="4 6"
          stroke="#94a3b8"
          strokeOpacity={embed ? 0.28 : 0.38}
          vertical
        />
        <XAxis
          dataKey="rt"
          tick={{ fontSize: embed ? 10 : 11, fill: "#475569" }}
          tickLine={{ stroke: "#cbd5e1" }}
          axisLine={{ stroke: "#e2e8f0" }}
          minTickGap={embed ? 36 : 22}
          label={{
            value: "Retention time (min)",
            position: "insideBottom",
            offset: embed ? 2 : 0,
            dy: embed ? 14 : 10,
            style: { fontSize: 11, fill: "#64748b", fontWeight: 500 },
          }}
        />
        <YAxis
          tick={{ fontSize: embed ? 10 : 11, fill: "#475569" }}
          tickLine={false}
          axisLine={{ stroke: "#e2e8f0" }}
          width={embed ? 38 : 42}
          domain={[0, (max: number) => Math.ceil(max * 1.08)]}
          label={{
            value: "mAU",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 11, fill: "#64748b", fontWeight: 500 },
          }}
        />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "1px solid var(--border)",
            fontSize: 12,
            boxShadow: "0 8px 30px rgba(15, 23, 42, 0.1)",
          }}
          formatter={(value) => {
            if (typeof value !== "number") return [String(value ?? ""), "Response"];
            const v =
              value >= 10 || Number.isInteger(value) ? value.toFixed(1) : value.toFixed(2);
            return [v, "Response"];
          }}
          labelFormatter={(label) => `RT ${label} min`}
          cursor={{
            stroke: STROKE,
            strokeWidth: 1,
            strokeOpacity: 0.35,
            strokeDasharray: "4 4",
          }}
        />
        <Area
          type="monotone"
          dataKey="intensity"
          stroke={STROKE}
          strokeWidth={embed ? 2.65 : 2.25}
          fill={`url(#${gradId})`}
          isAnimationActive={false}
          dot={false}
          style={embed ? { filter: `url(#${uid}-lineGlow)` } : undefined}
          activeDot={{
            r: 5,
            strokeWidth: 2,
            stroke: "#fff",
            fill: STROKE,
          }}
        />
        {embed ? (
          <ReferenceDot
            x={peak.rt}
            y={peak.intensity}
            r={5}
            fill={STROKE}
            stroke="#fff"
            strokeWidth={2}
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
}
