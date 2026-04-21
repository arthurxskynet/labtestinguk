/**
 * Normalise certificate `details` JSON from Supabase for UI / PDF.
 */

export type PeakDetail = { rt: number; area_pct: number; name: string };

export function sumPeakAreaPercent(peaks: PeakDetail[]): number {
  return peaks.reduce((sum, p) => sum + p.area_pct, 0);
}

export type CertificateDetailsView = {
  batch: string | null;
  batchRef: string | null;
  instrument: string | null;
  column: string | null;
  method: string | null;
  detection: string | null;
  hplcLcmsNotes: string | null;
  notes: string | null;
  endotoxinRequested: boolean | null;
  additionalTests: string[];
  peaks: PeakDetail[];
  chromatogramProfile: "high_purity" | "default";
  /** When true, UI shows a neutral product-image placeholder (no photo URL). */
  showProductPlaceholder: boolean;
  productPlaceholderCaption: string | null;
  internalRegistryId: string | null;
  /** Optional recorded component names (e.g. blend lines). */
  componentAnalytes: string[];
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
        typeof (p as PeakDetail).name === "string"
      ) {
        peaks.push({
          rt: (p as PeakDetail).rt,
          area_pct: (p as PeakDetail).area_pct,
          name: (p as PeakDetail).name,
        });
      }
    }
  }

  const additionalRaw = d.additional_tests;
  const additionalTests: string[] = [];
  if (Array.isArray(additionalRaw)) {
    for (const t of additionalRaw) {
      if (typeof t === "string" && t.trim()) additionalTests.push(t.trim());
    }
  }

  const profile = d.chromatogram_profile;
  const chromatogramProfile: "high_purity" | "default" =
    profile === "high_purity" ? "high_purity" : "default";

  const batchRef = str(d.batch_ref) ?? str(d.batch);

  const componentsRaw = d.component_analytes;
  const componentAnalytes: string[] = [];
  if (Array.isArray(componentsRaw)) {
    for (const c of componentsRaw) {
      if (typeof c === "string" && c.trim()) componentAnalytes.push(c.trim());
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
    batchImageUrl,
  };
}
