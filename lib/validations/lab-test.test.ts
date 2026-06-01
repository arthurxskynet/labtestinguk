import { describe, expect, it } from "vitest";

import { labTestSchema } from "./lab-test";

const validSingle = {
  peptide_name: "BPC-157",
  batch_reference: "LOT-001",
  is_blend: false,
  target_purity_percent: 99.5,
  hplc_lcms_notes: "Single dominant peak",
  endotoxin: false,
  attestation_confirmed: true,
};

describe("labTestSchema", () => {
  it("accepts a valid single-compound submission with attestation", () => {
    const result = labTestSchema.safeParse(validSingle);
    expect(result.success).toBe(true);
  });

  it("rejects submission without attestation", () => {
    const result = labTestSchema.safeParse({
      ...validSingle,
      attestation_confirmed: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects blend mode without enough component purities", () => {
    const result = labTestSchema.safeParse({
      ...validSingle,
      is_blend: true,
      target_purity_percent: undefined,
      component_purity: [{ analyte: "A", purity_percent: 99.5 }],
    });
    expect(result.success).toBe(false);
  });

  it("rejects single mode with component purities", () => {
    const result = labTestSchema.safeParse({
      ...validSingle,
      component_purity: [
        { analyte: "A", purity_percent: 99.5 },
        { analyte: "B", purity_percent: 99.4 },
      ],
    });
    expect(result.success).toBe(false);
  });

  it("accepts a valid blend submission", () => {
    const result = labTestSchema.safeParse({
      peptide_name: "Blend reference",
      batch_reference: "LOT-BLEND",
      is_blend: true,
      hplc_lcms_notes: "Multi-component trace",
      endotoxin: false,
      attestation_confirmed: true,
      component_purity: [
        { analyte: "A", purity_percent: 99.5 },
        { analyte: "B", purity_percent: 99.4 },
      ],
    });
    expect(result.success).toBe(true);
  });
});
