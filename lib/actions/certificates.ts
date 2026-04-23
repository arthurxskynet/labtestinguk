"use server";

import { revalidatePath } from "next/cache";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateCertificateCode } from "@/lib/certificate-code";
import {
  computeBlendSummaryPurity,
  sanitizePurityToRange,
} from "@/lib/certificate-details";
import { normalizeBlendPeaksFromComponents } from "@/lib/chromatogram/peak-model";
import { labTestSchema } from "@/lib/validations/lab-test";

export type CreateCertificateResult =
  | { ok: true; code: string }
  | { ok: false; error: string };

function buildSyntheticPeaks(
  seed: string,
  peptideName: string,
  isBlend: boolean,
  components: Array<{ analyte: string; purity_percent: number; rt: number | null }>,
) {
  if (isBlend) {
    const blendPeaks = normalizeBlendPeaksFromComponents(components);
    if (blendPeaks.length > 0) return blendPeaks;
  }
  const base = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return [
    {
      rt: Number((4.1 + (base % 8) * 0.03).toFixed(2)),
      area_pct: sanitizePurityToRange(99.11 + (base % 7) / 10),
      name: peptideName,
    },
  ];
}

export async function createLabCertificate(
  input: unknown,
): Promise<CreateCertificateResult> {
  const parsed = labTestSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid form" };
  }
  const v = parsed.data;

  const lcmsPpmParsed = (() => {
    const s = v.lcms_ppm?.trim();
    if (!s) return null;
    const n = Number.parseFloat(s);
    return Number.isFinite(n) ? n : null;
  })();

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "You must be signed in." };
  }

  const componentPurity = (v.component_purity ?? []).map((entry) => ({
    analyte: entry.analyte.trim(),
    purity_percent: sanitizePurityToRange(entry.purity_percent),
    rt: entry.rt != null ? Number(entry.rt.toFixed(2)) : null,
    notes: entry.notes?.trim() ? entry.notes.trim() : null,
  }));
  const isBlend = v.is_blend;
  const peaks = buildSyntheticPeaks(
    v.peptide_name + v.batch_reference,
    v.peptide_name,
    isBlend,
    componentPurity,
  );
  const resolvedPurity =
    isBlend && componentPurity.length > 0
      ? computeBlendSummaryPurity(componentPurity) ?? null
      : v.target_purity_percent != null
        ? sanitizePurityToRange(v.target_purity_percent)
        : null;

  const additional_tests: string[] = [];
  if (v.endotoxin) additional_tests.push("Endotoxin (LAL) requested");

  const details = {
    batch_ref: v.batch_reference,
    hplc_lcms_notes: v.hplc_lcms_notes,
    endotoxin_requested: v.endotoxin,
    notes: v.notes ?? "",
    peaks,
    target_purity_percent: v.target_purity_percent,
    component_purity: componentPurity,
    component_analytes: componentPurity.map((entry) => entry.analyte),
    is_blend: isBlend,
    chromatogram_profile: isBlend
      ? "blend"
      : (resolvedPurity ?? 0) >= 99.5
        ? "high_purity"
        : "default",
    additional_tests,
  };

  for (let attempt = 0; attempt < 12; attempt++) {
    const code = generateCertificateCode({ endotoxin: v.endotoxin });
    const { error } = await supabase.from("certificates").insert({
      code,
      peptide_name: v.peptide_name,
      purity_percent: resolvedPurity,
      molecular_weight: v.molecular_weight ?? null,
      hplc_purity: v.hplc_lcms_notes,
      lcms_ppm: lcmsPpmParsed,
      status: "pending",
      user_id: user.id,
      details,
    });

    if (!error) {
      revalidatePath("/dashboard");
      revalidatePath("/dashboard/certificates");
      revalidatePath("/dashboard/new");
      return { ok: true, code };
    }

    if (error.code !== "23505") {
      return { ok: false, error: error.message };
    }
  }

  return { ok: false, error: "Could not allocate a unique certificate code." };
}
