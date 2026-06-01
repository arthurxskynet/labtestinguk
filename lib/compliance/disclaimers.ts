export const RESEARCH_USE_ONLY_SHORT =
  "For laboratory research and analytical documentation only. Not for human or veterinary use, clinical application, or administration.";

export const RESEARCH_USE_ONLY_FULL =
  "Verifypeps provides independent analytical testing services and certificate documentation for research and verification purposes. Results describe the sample as received under the stated method. They do not constitute medical advice, a safety assessment, a fitness-for-purpose determination, or approval for human or veterinary use.";

export const VERIFICATION_REGISTRY_DISCLAIMER =
  "Online verification confirms that the displayed record matches the Verifypeps certificate registry at the time of lookup. It does not confirm product safety, purity for any particular use, regulatory compliance, or suitability for human or clinical application.";

export const OUTSOURCED_LAB_SUMMARY =
  "Verifypeps is a UK sole trader coordinating sample intake, documentation, and certificate issuance. Selected analytical methods—including certain HPLC purity tests—may be performed by qualified partner laboratories located in the European Union. Partner facility and method details are stated on the certificate where applicable.";

export const EU_HPLC_PARTNER_NOTE =
  "Certain HPLC methods are allocated to EU-based partner laboratories when required by method capability or capacity. This does not change the research-documentation purpose of the certificate.";

export const TESTIMONIAL_DISCLAIMER =
  "Customer comments reflect individual experience with our testing documentation service. They are not endorsements of any product, compound, or intended use.";

export const MANUAL_REGISTRY_ENTRY_DISCLAIMER =
  "Registry data reflects the record as entered or returned for the stated method and scope. Analytical fields may be manually recorded at issuance. Chromatogram traces are representative of the recorded purity class and may be normalised for display.";

export const OUTSOURCED_TEST_ROUTING_NOTE =
  "Depending on method, sample type, and capacity, selected tests—including certain HPLC purity work—may be performed by qualified EU partner laboratories. Method and facility details are stated on the certificate where applicable.";

export const PENDING_REGISTRY_REVIEW_NOTE =
  "This record is pending registry review. It was submitted via the research portal and has not been independently verified unless status is Verified.";

export const CHROMATOGRAM_FALLBACK_NOTE =
  "Display trace may use a normalised fallback profile when peak data does not meet the strict display contract.";

export const ADDITIONAL_TESTS_SCOPE_NOTE =
  "Listed tests reflect requested or recorded scope; execution may be in-house or via partner laboratories depending on method allocation.";

export const PORTAL_ATTESTATION_LABEL =
  "I confirm this submission is for lawful research documentation only, that entered data accurately reflects available analytical records where applicable, and I understand the certificate reflects registry data as recorded—not independent re-analysis unless stated.";

export const ENDOTOXIN_REQUEST_NOTE =
  "Endotoxin (LAL) requested — result recorded separately when returned.";

/** Compact disclaimer lines for PDF export footers. */
export function getCertificateCompliancePdfLines(options?: {
  isPendingReview?: boolean;
  isPortalSubmission?: boolean;
}): string[] {
  const lines = [
    MANUAL_REGISTRY_ENTRY_DISCLAIMER,
    OUTSOURCED_TEST_ROUTING_NOTE,
    VERIFICATION_REGISTRY_DISCLAIMER,
    RESEARCH_USE_ONLY_SHORT,
  ];
  if (options?.isPendingReview || options?.isPortalSubmission) {
    lines.unshift(PENDING_REGISTRY_REVIEW_NOTE);
  }
  return lines;
}
