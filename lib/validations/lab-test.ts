import { z } from "zod";

const componentPuritySchema = z.object({
  analyte: z.string().trim().min(1, "Analyte name is required"),
  purity_percent: z.coerce.number().min(99.11).max(99.86),
  rt: z.coerce.number().positive().optional(),
  notes: z.string().optional(),
});

export const labTestSchema = z
  .object({
    peptide_name: z.string().trim().min(1, "Peptide name is required"),
    batch_reference: z.string().trim().min(1, "Batch / reference is required"),
    is_blend: z.boolean().default(false),
    target_purity_percent: z.coerce.number().min(99.11).max(99.86).optional(),
    component_purity: z.array(componentPuritySchema).optional(),
    molecular_weight: z.coerce.number().positive().nullable().optional(),
    hplc_lcms_notes: z.string().trim().min(1, "Add HPLC / LC-MS notes"),
    endotoxin: z.boolean(),
    lcms_ppm: z.string().optional(),
    notes: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    const hasSingle = value.target_purity_percent != null;
    const componentCount = value.component_purity?.length ?? 0;
    const hasBlend = componentCount > 0;

    if (value.is_blend) {
      if (!hasBlend || componentCount < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["component_purity"],
          message: "Add at least two component purity entries for a blend.",
        });
      }
      if (hasSingle) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["target_purity_percent"],
          message: "Blend mode uses component purities, not single purity.",
        });
      }
      return;
    }

    if (!hasSingle) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["target_purity_percent"],
        message: "Target purity is required for a single-compound certificate.",
      });
    }
    if (hasBlend) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["component_purity"],
        message: "Component purity is only allowed when blend mode is enabled.",
      });
    }
  });

export type LabTestInput = z.infer<typeof labTestSchema>;
