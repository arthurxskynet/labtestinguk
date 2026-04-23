import type { PeakDetail } from "@/lib/certificate-details";

export type ChromatogramPoint = { rt: number; intensity: number };

export type PeakValidationContext = {
  isBlend?: boolean;
  minDominantAreaPct?: number;
  expectedPeakCount?: number;
  minRelativePeakShare?: number;
};

const POINT_COUNT = 72;
const RT_START = 2;
const RT_STEP = 0.12;

function bounded(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function normalizePeaks(peaks: PeakDetail[]): PeakDetail[] {
  return peaks
    .filter(
      (peak) =>
        Number.isFinite(peak.rt) &&
        Number.isFinite(peak.area_pct) &&
        peak.rt > 0 &&
        peak.area_pct >= 0 &&
        typeof peak.name === "string" &&
        peak.name.trim().length > 0,
    )
    .map((peak) => ({
      rt: Number(peak.rt.toFixed(2)),
      area_pct: Number(peak.area_pct.toFixed(4)),
      name: peak.name.trim(),
    }))
    .sort((a, b) => a.rt - b.rt);
}

export function detectDominantPeak(peaks: PeakDetail[]): PeakDetail | null {
  if (peaks.length === 0) return null;
  return peaks.reduce((best, current) =>
    current.area_pct > best.area_pct ? current : best,
  );
}

export function selectRenderablePeaks(
  peaks: PeakDetail[],
  expectedCount?: number,
): PeakDetail[] {
  const normalized = normalizePeaks(peaks);
  if (!expectedCount || expectedCount <= 0 || normalized.length <= expectedCount) {
    return normalized;
  }
  return [...normalized]
    .sort((a, b) => b.area_pct - a.area_pct)
    .slice(0, expectedCount)
    .sort((a, b) => a.rt - b.rt);
}

export function expectedDominantCount(input: {
  isBlend?: boolean;
  componentPurityCount?: number;
  componentAnalytesCount?: number;
  fallbackPeakCount?: number;
}): number {
  if (!input.isBlend) return 1;
  if ((input.componentPurityCount ?? 0) >= 2) return input.componentPurityCount ?? 2;
  if ((input.componentAnalytesCount ?? 0) >= 2) return input.componentAnalytesCount ?? 2;
  return Math.max(2, input.fallbackPeakCount ?? 2);
}

export function normalizeBlendPeaksFromComponents(
  components: Array<{ analyte: string; purity_percent: number; rt: number | null }>,
): PeakDetail[] {
  const usable = components
    .filter(
      (component) =>
        component.analyte.trim().length > 0 &&
        Number.isFinite(component.purity_percent) &&
        component.purity_percent > 0,
    )
    .map((component, index) => ({
      analyte: component.analyte.trim(),
      purity: component.purity_percent,
      rt:
        component.rt != null && Number.isFinite(component.rt)
          ? Number(component.rt.toFixed(2))
          : Number((2.6 + index * 0.9).toFixed(2)),
    }))
    .sort((a, b) => a.rt - b.rt);

  if (usable.length === 0) return [];
  const purityTotal = usable.reduce((sum, component) => sum + component.purity, 0) || 1;
  const majorEnvelopeArea = 99.6;
  return usable.map((component) => ({
    name: component.analyte,
    rt: component.rt,
    area_pct: Number(((component.purity / purityTotal) * majorEnvelopeArea).toFixed(4)),
  }));
}

function principalPeakThreshold(maxIntensity: number): number {
  return maxIntensity * 0.25;
}

export function hasValidPeakStructure(
  peaks: PeakDetail[],
  context: PeakValidationContext = {},
): boolean {
  const expectedCount =
    context.expectedPeakCount != null && context.expectedPeakCount > 0
      ? context.expectedPeakCount
      : undefined;
  const normalized = selectRenderablePeaks(peaks, expectedCount);
  if (normalized.length === 0) return false;
  if (expectedCount != null && normalized.length !== expectedCount) return false;
  const dominant = detectDominantPeak(normalized);
  if (!dominant) return false;

  if (context.isBlend) {
    const total = normalized.reduce((sum, peak) => sum + peak.area_pct, 0) || 1;
    const minimumRelativeShare = context.minRelativePeakShare ?? 0.08;
    return normalized.every((peak) => peak.area_pct / total >= minimumRelativeShare);
  }
  const minimum = context.minDominantAreaPct ?? 85;
  return dominant.area_pct >= minimum;
}

function gaussian(x: number, center: number, sigma: number): number {
  const z = (x - center) / sigma;
  return Math.exp(-(z * z));
}

export function buildSeriesFromPeaks(
  peaks: PeakDetail[],
  seed = 0,
  expectedCount?: number,
): ChromatogramPoint[] {
  const normalized = selectRenderablePeaks(peaks, expectedCount);
  if (normalized.length === 0) return [];
  const dominant = detectDominantPeak(normalized);
  if (!dominant) return [];

  const totalArea = normalized.reduce((sum, peak) => sum + peak.area_pct, 0) || 1;

  const data: ChromatogramPoint[] = [];
  for (let i = 0; i < POINT_COUNT; i++) {
    const rt = Number((RT_START + i * RT_STEP).toFixed(2));
    let intensity = 0;

    for (const peak of normalized) {
      const normalizedArea = peak.area_pct / totalArea;
      const relativeWeight = peak.area_pct / dominant.area_pct;
      const isDominant = peak.name === dominant.name && peak.rt === dominant.rt;
      const sigma = isDominant
        ? 0.14
        : bounded(0.19 + (1 - relativeWeight) * 0.26, 0.18, 0.45);
      intensity += gaussian(rt, peak.rt, sigma) * normalizedArea * 220;
    }

    const baselineWave = Math.sin(seed + i * 0.37) * 0.04;
    const baselineNoise = Math.cos(seed * 0.61 + i * 0.19) * 0.02;
    const baseline = 0.2 + baselineWave + baselineNoise;
    data.push({
      rt,
      intensity: Number(Math.max(0, intensity + baseline).toFixed(4)),
    });
  }
  return data;
}

export function countPrincipalPeaks(data: ChromatogramPoint[]): number {
  if (data.length < 3) return 0;
  const maxIntensity = data.reduce((max, point) => Math.max(max, point.intensity), 0);
  if (maxIntensity <= 0) return 0;
  const threshold = principalPeakThreshold(maxIntensity);

  let count = 0;
  for (let i = 1; i < data.length - 1; i++) {
    const prev = data[i - 1];
    const current = data[i];
    const next = data[i + 1];
    if (
      current.intensity >= threshold &&
      current.intensity > prev.intensity &&
      current.intensity > next.intensity
    ) {
      count += 1;
    }
  }
  return count;
}

export function validateDominantCardinality(
  peaks: PeakDetail[],
  expectedPeakCount: number,
): boolean {
  if (!expectedPeakCount || expectedPeakCount <= 0) return false;
  const normalized = selectRenderablePeaks(peaks, expectedPeakCount);
  if (normalized.length !== expectedPeakCount) return false;
  return hasValidPeakStructure(normalized, {
    isBlend: expectedPeakCount > 1,
    expectedPeakCount,
    minRelativePeakShare: expectedPeakCount > 1 ? 0.08 : undefined,
  });
}
