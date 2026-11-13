import type { CertificateDetailsView } from "@/lib/certificate-details";
import type { CertificateRecord } from "@/types/certificate";

export type AnalyticalResultRow = {
  test: string;
  specification: string;
  result: string;
  method: string;
};

export const SYSTEM_SUITABILITY_ROWS = [
  { criterion: "Resolution (Rs)", specification: "≥ 1.5", status: "Pass" },
  { criterion: "Peak symmetry (Tailing factor)", specification: "0.8 – 1.5", status: "Pass" },
  { criterion: "Theoretical plates (N)", specification: "≥ 2000", status: "Pass" },
  { criterion: "Retention time repeatability (RSD)", specification: "≤ 2.0%", status: "Pass" },
] as const;

export const SYSTEM_SUITABILITY_NOTE =
  "Programme-level method qualification criteria. Values represent validated method parameters for the stated HPLC workflow—not a batch-specific system suitability re-run unless explicitly noted.";

export function buildAnalyticalResultRows(
  certificate: CertificateRecord,
  detail: CertificateDetailsView,
  options: { mixCertificate: boolean },
): AnalyticalResultRow[] {
  const methodLabel =
    detail.method && detail.detection
      ? `${detail.method}; ${detail.detection}`
      : (detail.method ?? detail.detection ?? "As recorded");

  const rows: AnalyticalResultRow[] = [];

  rows.push({
    test: options.mixCertificate ? "Blend summary purity (HPLC area %)" : "Peptide purity (HPLC area %)",
    specification: "≥ 98.0%",
    result:
      certificate.purity_percent != null
        ? `${Number(certificate.purity_percent).toFixed(2)}%`
        : "—",
    method: methodLabel,
  });

  if (certificate.lcms_ppm != null || certificate.molecular_weight != null) {
    const ppm =
      certificate.lcms_ppm != null ? `${Number(certificate.lcms_ppm)} ppm` : "—";
    const mw =
      certificate.molecular_weight != null
        ? `${certificate.molecular_weight} Da expected`
        : "Mass match";
    rows.push({
      test: "Identity (LC-MS)",
      specification: "Within method tolerance",
      result: `${mw}; Δ ${ppm}`,
      method: "LC-MS (ESI+)",
    });
  }

  for (const test of detail.additionalTests) {
    if (/system suitability/i.test(test)) continue;
    if (/lc-?ms identity/i.test(test)) continue;
    rows.push({
      test,
      specification: "Per method SOP",
      result: "Recorded",
      method: "As stated",
    });
  }

  return rows;
}

export function hasSystemSuitabilityScope(additionalTests: string[]): boolean {
  return additionalTests.some((t) => /system suitability/i.test(t));
}
