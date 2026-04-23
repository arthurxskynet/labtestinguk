import { describe, expect, it } from "vitest";

import {
  buildSeriesFromPeaks,
  countPrincipalPeaks,
  expectedDominantCount,
  hasValidPeakStructure,
  normalizeBlendPeaksFromComponents,
  normalizePeaks,
  selectRenderablePeaks,
  validateDominantCardinality,
} from "@/lib/chromatogram/peak-model";

describe("peak-model", () => {
  it("normalizes and sorts peaks", () => {
    const peaks = normalizePeaks([
      { name: "B", rt: 4.232, area_pct: 10.12345 },
      { name: "A", rt: 2.128, area_pct: 89.87654 },
    ]);

    expect(peaks[0]?.name).toBe("A");
    expect(peaks[0]?.rt).toBe(2.13);
    expect(peaks[1]?.area_pct).toBe(10.1235);
  });

  it("enforces dominant single-compound peak threshold", () => {
    expect(
      hasValidPeakStructure([{ name: "Main", rt: 4.2, area_pct: 92 }], {
        isBlend: false,
      }),
    ).toBe(true);

    expect(
      hasValidPeakStructure(
        [
          { name: "Main", rt: 4.2, area_pct: 50 },
          { name: "System", rt: 2.2, area_pct: 50 },
        ],
        { isBlend: false },
      ),
    ).toBe(false);
  });

  it("limits rendered peaks to expected count", () => {
    const selected = selectRenderablePeaks(
      [
        { name: "P1", rt: 2.5, area_pct: 10 },
        { name: "P2", rt: 3.5, area_pct: 45 },
        { name: "P3", rt: 4.5, area_pct: 30 },
        { name: "P4", rt: 5.5, area_pct: 15 },
      ],
      2,
    );

    expect(selected).toHaveLength(2);
    expect(selected.map((p) => p.name)).toEqual(["P2", "P3"]);
  });

  it("creates deterministic multi-peak series", () => {
    const peaks = [
      { name: "A", rt: 3.1, area_pct: 50 },
      { name: "B", rt: 4.5, area_pct: 50 },
    ];

    const first = buildSeriesFromPeaks(peaks, 42, 2);
    const second = buildSeriesFromPeaks(peaks, 42, 2);

    expect(first).toEqual(second);
    expect(countPrincipalPeaks(first)).toBe(2);
  });

  it("derives expected dominant count from compound metadata", () => {
    expect(expectedDominantCount({ isBlend: false })).toBe(1);
    expect(expectedDominantCount({ isBlend: true, componentPurityCount: 2 })).toBe(2);
    expect(expectedDominantCount({ isBlend: true, componentAnalytesCount: 3 })).toBe(3);
  });

  it("normalizes blend peaks from components with strict count", () => {
    const peaks = normalizeBlendPeaksFromComponents([
      { analyte: "BPC-157", purity_percent: 99.62, rt: 4.23 },
      { analyte: "TB-500", purity_percent: 99.72, rt: 4.08 },
    ]);

    expect(peaks).toHaveLength(2);
    expect(peaks.map((peak) => peak.name)).toEqual(["TB-500", "BPC-157"]);
    expect(validateDominantCardinality(peaks, 2)).toBe(true);
  });
});
