"use client";

import dynamic from "next/dynamic";

const ChromatogramChart = dynamic(
  () =>
    import("@/components/verify/chromatogram-chart").then(
      (m) => m.ChromatogramChart,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[256px] animate-pulse rounded-lg bg-slate-100" />
    ),
  },
);

export function SampleChromatogram({ peptideName }: { peptideName: string }) {
  return (
    <div className="h-[256px] w-full min-h-[256px]">
      <ChromatogramChart
        peptideName={peptideName}
        profile="high_purity"
        variant="embed"
      />
    </div>
  );
}
