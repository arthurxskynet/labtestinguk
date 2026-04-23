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
import type { PeakDetail } from "@/lib/certificate-details";
import {
  buildSeriesFromPeaks,
  hasValidPeakStructure,
  selectRenderablePeaks,
  type ChromatogramPoint,
} from "@/lib/chromatogram/peak-model";

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

function buildExpectedCountFallbackSeries(seed: number, expectedCount: number) {
  const count = Math.max(1, expectedCount);
  if (count === 1) return buildHighPuritySeries(seed);

  const data: { rt: number; intensity: number }[] = [];
  const centers = Array.from({ length: count }, (_, idx) => 16 + idx * (40 / Math.max(1, count - 1)));

  for (let i = 0; i < POINTS; i++) {
    const rt = Number((2 + i * 0.12).toFixed(2));
    let intensity = 0;
    for (const [idx, center] of centers.entries()) {
      const sigma = 2.2 + ((idx + seed) % 3) * 0.4;
      const amplitude = 72 + ((seed + idx * 11) % 16);
      intensity += Math.exp(-Math.pow((i - center) / sigma, 2)) * amplitude;
    }
    const noise = Math.sin(seed + i * 0.28) * 0.18;
    data.push({ rt, intensity: Math.max(0, intensity + noise) });
  }
  return data;
}

const STROKE = "#0f766e";
const FILL_TOP = "#14b8a6";
const FILL_MID = "#10b981";
const FILL_BOTTOM = "#34d399";

function peakFromData(data: ChromatogramPoint[]): {
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
  peaks = [],
  isBlend = false,
  expectedPeakCount,
}: {
  peptideName: string;
  profile?: "high_purity" | "default" | "blend";
  /** Tighter embed on marketing card: extra axis space, peak marker, softer grid. */
  variant?: "default" | "embed";
  peaks?: PeakDetail[];
  isBlend?: boolean;
  expectedPeakCount?: number;
}) {
  const uid = React.useId().replace(/:/g, "");
  const gradId = `chromFill-${uid}`;

  const seed =
    peptideName.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 97;
  const data = React.useMemo(() => {
    const renderablePeaks = selectRenderablePeaks(peaks, expectedPeakCount);
    if (
      hasValidPeakStructure(renderablePeaks, {
        isBlend,
        expectedPeakCount,
        minRelativePeakShare: isBlend ? 0.12 : undefined,
      })
    ) {
      const series = buildSeriesFromPeaks(renderablePeaks, seed, expectedPeakCount);
      if (series.length > 0) return series;
    }
    if (expectedPeakCount != null && expectedPeakCount > 0) {
      return buildExpectedCountFallbackSeries(seed, expectedPeakCount);
    }
    return profile === "high_purity"
      ? buildHighPuritySeries(seed)
      : buildDefaultSeries(seed);
  }, [expectedPeakCount, isBlend, peaks, profile, seed]);

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
