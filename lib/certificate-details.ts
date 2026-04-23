/**
 * Normalise certificate `details` JSON from Supabase for UI / PDF.
 */

export type PeakDetail = { rt: number; area_pct: number; name: string };
export type ComponentPurityDetail = {
  analyte: string;
  purity_percent: number;
  rt: number | null;
  notes: string | null;
};

export const MIN_REALISTIC_PURITY = 99.11;
export const MAX_REALISTIC_PURITY = 99.86;

export function sumPeakAreaPercent(peaks: PeakDetail[]): number {
  return peaks.reduce((sum, p) => sum + p.area_pct, 0);
}

export function sanitizePurityToRange(value: number): number {
  const bounded = Math.min(MAX_REALISTIC_PURITY, Math.max(MIN_REALISTIC_PURITY, value));
  return Number(bounded.toFixed(4));
}

export function computeBlendSummaryPurity(
  components: Array<{ purity_percent: number; weight?: number }>,
): number | null {
  if (components.length === 0) return null;
  let weightedTotal = 0;
  let weightTotal = 0;
  for (const c of components) {
    const weight = c.weight != null && Number.isFinite(c.weight) && c.weight > 0 ? c.weight : 1;
    weightedTotal += sanitizePurityToRange(c.purity_percent) * weight;
    weightTotal += weight;
  }
  if (weightTotal <= 0) return null;
  return Number((weightedTotal / weightTotal).toFixed(4));
}

export type CertificateDetailsView = {
  batch: string | null;
  batchRef: string | null;
  testingDate: string | null;
  instrument: string | null;
  column: string | null;
  method: string | null;
  detection: string | null;
  hplcLcmsNotes: string | null;
  notes: string | null;
  endotoxinRequested: boolean | null;
  additionalTests: string[];
  peaks: PeakDetail[];
  chromatogramProfile: "high_purity" | "default" | "blend";
  /** When true, UI shows a neutral product-image placeholder (no photo URL). */
  showProductPlaceholder: boolean;
  productPlaceholderCaption: string | null;
  internalRegistryId: string | null;
  /** Optional recorded component names (e.g. blend lines). */
  componentAnalytes: string[];
  /** Optional recorded component-level purity for blends. */
  componentPurity: ComponentPurityDetail[];
  /**
   * Public HTTPS URL for batch/product photography (Supabase Storage or same origin).
   * When set, verification page and PDF can embed the image when allowed.
   */
  batchImageUrl: string | null;
};

function str(v: unknown): string | null {
  if (typeof v === "string" && v.trim()) return v.trim();
  return null;
}

function bool(v: unknown): boolean | null {
  if (typeof v === "boolean") return v;
  return null;
}

function isoDate(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const value = v.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [yearText, monthText, dayText] = value.split("-");
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return null;
  }
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return value;
}

export function parseCertificateDetails(
  details: Record<string, unknown> | null | undefined,
): CertificateDetailsView {
  const d = details ?? {};
  const peaksRaw = d.peaks;
  const peaks: PeakDetail[] = [];
  if (Array.isArray(peaksRaw)) {
    for (const p of peaksRaw) {
      if (
        typeof p === "object" &&
        p !== null &&
        typeof (p as PeakDetail).rt === "number" &&
        typeof (p as PeakDetail).area_pct === "number" &&
        Number.isFinite((p as PeakDetail).rt) &&
        Number.isFinite((p as PeakDetail).area_pct) &&
        (p as PeakDetail).rt > 0 &&
        (p as PeakDetail).area_pct >= 0 &&
        typeof (p as PeakDetail).name === "string" &&
        (p as PeakDetail).name.trim().length > 0
      ) {
        peaks.push({
          rt: Number((p as PeakDetail).rt.toFixed(2)),
          area_pct: Number((p as PeakDetail).area_pct.toFixed(4)),
          name: (p as PeakDetail).name.trim(),
        });
      }
    }
    peaks.sort((a, b) => a.rt - b.rt);
  }

  const additionalRaw = d.additional_tests;
  const additionalTests: string[] = [];
  if (Array.isArray(additionalRaw)) {
    for (const t of additionalRaw) {
      if (typeof t === "string" && t.trim()) additionalTests.push(t.trim());
    }
  }

  const profile = d.chromatogram_profile;
  const chromatogramProfile: "high_purity" | "default" | "blend" =
    profile === "high_purity" || profile === "blend" ? profile : "default";

  const batchRef = str(d.batch_ref) ?? str(d.batch);

  const componentsRaw = d.component_analytes;
  const componentAnalytes: string[] = [];
  if (Array.isArray(componentsRaw)) {
    for (const c of componentsRaw) {
      if (typeof c === "string" && c.trim()) componentAnalytes.push(c.trim());
    }
  }

  const componentPurityRaw = d.component_purity;
  const componentPurity: ComponentPurityDetail[] = [];
  if (Array.isArray(componentPurityRaw)) {
    for (const entry of componentPurityRaw) {
      if (typeof entry !== "object" || entry === null) continue;
      const row = entry as Record<string, unknown>;
      const analyte = str(row.analyte);
      const purityRaw = row.purity_percent;
      const rtRaw = row.rt;
      if (!analyte || typeof purityRaw !== "number" || !Number.isFinite(purityRaw)) {
        continue;
      }
      const rt =
        typeof rtRaw === "number" && Number.isFinite(rtRaw) ? Number(rtRaw.toFixed(2)) : null;
      componentPurity.push({
        analyte,
        purity_percent: sanitizePurityToRange(purityRaw),
        rt,
        notes: str(row.notes),
      });
    }
  }

  const showPh = d.show_product_placeholder;
  const showProductPlaceholder =
    showPh === true || showPh === "true" || showPh === 1;

  const batchImageUrl =
    str(d.batch_image_url) ?? str(d.product_image_url);

  return {
    batch: str(d.batch) ?? batchRef,
    batchRef,
    testingDate: isoDate(d.testing_date),
    instrument: str(d.instrument),
    column: str(d.column),
    method: str(d.method),
    detection: str(d.detection),
    hplcLcmsNotes: str(d.hplc_lcms_notes),
    notes: str(d.notes),
    endotoxinRequested: bool(d.endotoxin_requested),
    additionalTests,
    peaks,
    chromatogramProfile,
    showProductPlaceholder,
    productPlaceholderCaption: str(d.placeholder_caption),
    internalRegistryId: str(d.internal_registry_id),
    componentAnalytes,
    componentPurity,
    batchImageUrl,
  };
}

export function isMixCertificate(details: CertificateDetailsView): boolean {
  return details.componentPurity.length >= 2 || details.componentAnalytes.length >= 2;
}
