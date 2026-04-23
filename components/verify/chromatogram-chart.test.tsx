import * as React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

let lastAreaChartData: Array<{ rt: number; intensity: number }> = [];

vi.mock("recharts", () => {
  const passthrough = ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  );

  return {
    ResponsiveContainer: passthrough,
    AreaChart: ({
      children,
      data,
    }: {
      children?: React.ReactNode;
      data: Array<{ rt: number; intensity: number }>;
    }) => {
      lastAreaChartData = data;
      return <div>{children}</div>;
    },
    Area: passthrough,
    CartesianGrid: passthrough,
    ReferenceDot: passthrough,
    Tooltip: passthrough,
    XAxis: passthrough,
    YAxis: passthrough,
  };
});

import { ChromatogramChart } from "@/components/verify/chromatogram-chart";
import { countPrincipalPeaks } from "@/lib/chromatogram/peak-model";

describe("ChromatogramChart", () => {
  it("renders principal peaks from provided peak rows", () => {
    render(
      <ChromatogramChart
        peptideName="Blend"
        peaks={[
          { name: "A", rt: 2.8, area_pct: 34 },
          { name: "B", rt: 3.9, area_pct: 33 },
          { name: "C", rt: 5.1, area_pct: 33 },
        ]}
        expectedPeakCount={3}
        isBlend
      />,
    );

    expect(lastAreaChartData.length).toBeGreaterThan(30);
    expect(countPrincipalPeaks(lastAreaChartData)).toBe(3);
  });

  it("falls back to expected-count series when peaks are invalid", () => {
    render(
      <ChromatogramChart
        peptideName="Blend fallback"
        profile="blend"
        peaks={[{ name: "", rt: -1, area_pct: 0 }]}
        expectedPeakCount={2}
        isBlend
      />,
    );

    expect(lastAreaChartData.length).toBe(72);
    expect(countPrincipalPeaks(lastAreaChartData)).toBe(2);
  });
});
