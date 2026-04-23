import * as React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { PeakDetail } from "@/lib/certificate-details";
import type { CertificateRecord } from "@/types/certificate";

let chartPeaks: PeakDetail[] = [];

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("qrcode", () => ({
  default: {
    toDataURL: vi.fn().mockResolvedValue("data:image/png;base64,mock"),
  },
}));

vi.mock("@/components/verify/chromatogram-chart", () => ({
  ChromatogramChart: ({ peaks }: { peaks?: PeakDetail[] }) => {
    chartPeaks = peaks ?? [];
    return <div data-testid="mock-chart" />;
  },
}));

import { CertificateViewer } from "@/components/certificates/certificate-viewer";

function buildCertificate(details: Record<string, unknown>): CertificateRecord {
  return {
    id: "1",
    code: "VP-TEST-0001",
    peptide_name: "Retatrutide (reference peptide)",
    purity_percent: 99.86,
    molecular_weight: 4113.5,
    hplc_purity: "Single dominant peak",
    lcms_ppm: 14.2,
    status: "verified",
    created_at: "2026-01-01T00:00:00.000Z",
    details,
  };
}

describe("CertificateViewer", () => {
  it("uses display peak count that matches single-compound expectation", () => {
    render(
      <CertificateViewer
        certificate={buildCertificate({
          peaks: [
            { name: "Retatrutide", rt: 4.56, area_pct: 99.86 },
            { name: "System", rt: 2.22, area_pct: 0.14 },
          ],
        })}
      />,
    );

    expect(chartPeaks).toHaveLength(1);
    expect(chartPeaks[0]?.name).toBe("Retatrutide");
    expect(screen.getByText("Peak table")).not.toBeNull();
    expect(screen.getAllByRole("row").length).toBeGreaterThan(1);
  });

  it("keeps blend peaks aligned with component count", () => {
    render(
      <CertificateViewer
        certificate={buildCertificate({
          component_analytes: ["A", "B", "C"],
          component_purity: [
            { analyte: "A", purity_percent: 99.5, rt: 2.8 },
            { analyte: "B", purity_percent: 99.4, rt: 3.7 },
            { analyte: "C", purity_percent: 99.3, rt: 4.6 },
          ],
          peaks: [
            { name: "A", rt: 2.8, area_pct: 60 },
            { name: "B", rt: 3.7, area_pct: 25 },
            { name: "C", rt: 4.6, area_pct: 10 },
            { name: "System", rt: 5.8, area_pct: 5 },
          ],
        })}
      />,
    );

    expect(chartPeaks).toHaveLength(3);
  });

  it("forces two dominant spikes for two-compound blends", () => {
    render(
      <CertificateViewer
        certificate={buildCertificate({
          component_analytes: ["BPC-157", "TB-500 fragment"],
          component_purity: [
            { analyte: "BPC-157", purity_percent: 99.62, rt: 4.23 },
            { analyte: "TB-500 fragment", purity_percent: 99.72, rt: 4.08 },
          ],
          peaks: [
            { name: "BPC-157", rt: 4.23, area_pct: 60 },
            { name: "TB-500 fragment", rt: 4.08, area_pct: 35 },
            { name: "System", rt: 5.4, area_pct: 5 },
          ],
        })}
      />,
    );

    expect(chartPeaks).toHaveLength(2);
  });
});
