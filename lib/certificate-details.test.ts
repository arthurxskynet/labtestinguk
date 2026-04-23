import { describe, expect, it } from "vitest";

import { parseCertificateDetails } from "@/lib/certificate-details";

describe("parseCertificateDetails", () => {
  it("filters invalid peaks and sorts valid ones", () => {
    const parsed = parseCertificateDetails({
      peaks: [
        { name: "Invalid NaN", rt: Number.NaN, area_pct: 2 },
        { name: "Main", rt: 4.5655, area_pct: 99.86555 },
        { name: "", rt: 2.2, area_pct: 0.14 },
        { name: "System", rt: 2.2222, area_pct: 0.1344 },
      ],
    });

    expect(parsed.peaks).toEqual([
      { name: "System", rt: 2.22, area_pct: 0.1344 },
      { name: "Main", rt: 4.57, area_pct: 99.8655 },
    ]);
  });

  it("parses a valid testing_date value", () => {
    const parsed = parseCertificateDetails({
      testing_date: "2026-03-18",
    });

    expect(parsed.testingDate).toBe("2026-03-18");
  });

  it("returns null for invalid testing_date values", () => {
    const parsedFromInvalidMonth = parseCertificateDetails({
      testing_date: "2026-13-18",
    });
    const parsedFromInvalidFormat = parseCertificateDetails({
      testing_date: "18/03/2026",
    });

    expect(parsedFromInvalidMonth.testingDate).toBeNull();
    expect(parsedFromInvalidFormat.testingDate).toBeNull();
  });
});
