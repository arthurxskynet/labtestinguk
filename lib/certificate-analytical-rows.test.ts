import { describe, expect, it } from "vitest";

import {
  buildAnalyticalResultRows,
  hasSystemSuitabilityScope,
} from "@/lib/certificate-analytical-rows";
import { parseCertificateDetails } from "@/lib/certificate-details";
import type { CertificateRecord } from "@/types/certificate";

function cert(overrides: Partial<CertificateRecord> = {}): CertificateRecord {
  return {
    id: "00000000-0000-4000-8000-000000000001",
    code: "VP-TEST01-ABCD",
    peptide_name: "BPC-157",
    purity_percent: 99.86,
    molecular_weight: 1419,
    hplc_purity: "Single peak HPLC",
    lcms_ppm: 12.5,
    status: "verified",
    created_at: "2026-01-01T00:00:00Z",
    details: {},
    ...overrides,
  };
}

describe("buildAnalyticalResultRows", () => {
  it("builds HPLC and LC-MS rows from certificate fields", () => {
    const certificate = cert();
    const detail = parseCertificateDetails({
      method: "Gradient HPLC",
      detection: "UV 214 nm",
      additional_tests: ["LC-MS identity", "System suitability"],
    });
    const rows = buildAnalyticalResultRows(certificate, detail, {
      mixCertificate: false,
    });

    expect(rows[0]?.test).toContain("Peptide purity");
    expect(rows[0]?.result).toBe("99.86%");
    expect(rows.some((row) => row.test === "Identity (LC-MS)")).toBe(true);
    expect(rows.some((row) => /system suitability/i.test(row.test))).toBe(false);
  });
});

describe("hasSystemSuitabilityScope", () => {
  it("detects system suitability in additional tests", () => {
    expect(hasSystemSuitabilityScope(["LC-MS identity", "System suitability"])).toBe(
      true,
    );
    expect(hasSystemSuitabilityScope(["Appearance"])).toBe(false);
  });
});
