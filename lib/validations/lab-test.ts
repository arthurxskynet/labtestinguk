import { z } from "zod";

export const labTestSchema = z.object({
  peptide_name: z.string().trim().min(1, "Peptide name is required"),
  batch_reference: z.string().trim().min(1, "Batch / reference is required"),
  target_purity_percent: z.coerce.number().min(0).max(100),
  molecular_weight: z.coerce.number().positive(),
  hplc_lcms_notes: z.string().trim().min(1, "Add HPLC / LC-MS notes"),
  endotoxin: z.boolean(),
  lcms_ppm: z.string().optional(),
  notes: z.string().optional(),
});

export type LabTestInput = z.infer<typeof labTestSchema>;
