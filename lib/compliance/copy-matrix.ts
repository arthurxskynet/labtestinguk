/**
 * Route-by-route compliance copy matrix.
 * Maps public surfaces to risk level and target compliant wording.
 */
export type ComplianceRisk = "high" | "medium" | "low";

export type CopyMatrixEntry = {
  route: string;
  file: string;
  risk: ComplianceRisk;
  currentIssue: string;
  targetCopy: string;
};

export const COMPLIANCE_COPY_MATRIX: CopyMatrixEntry[] = [
  {
    route: "/",
    file: "components/marketing/hero-section.tsx",
    risk: "high",
    currentIssue: "Consumer certainty framing ('Know Exactly What's In Your Peptides') and 24hr priority chip.",
    targetCopy:
      "Analytical documentation for research samples. HPLC/LC-MS reporting with QR-linked registry lookup — research use only.",
  },
  {
    route: "/",
    file: "components/marketing/stats-bar-section.tsx",
    risk: "high",
    currentIssue: "Unsubstantiated metrics (2,500+, 99.9% QC pass rate, 24hrs).",
    targetCopy:
      "Method-focused descriptors (HPLC, LC-MS, registry verification, UK coordination) without performance guarantees.",
  },
  {
    route: "/",
    file: "components/marketing/reviews-section.tsx",
    risk: "medium",
    currentIssue: "Broad trust claim and star ratings without substantiation.",
    targetCopy:
      "Experience-focused quotes with explicit research-context disclaimer; remove implied 5-star ratings.",
  },
  {
    route: "/",
    file: "components/marketing/uk-lab-highlights-section.tsx",
    risk: "medium",
    currentIssue: "'Certificates you can prove' reads as outcome guarantee.",
    targetCopy: "Emphasise documented methods, registry lookup, and research traceability.",
  },
  {
    route: "/verify",
    file: "components/verify/verify-lookup-hero.tsx",
    risk: "medium",
    currentIssue: "'Verify Authenticity' and 'instantly verify' overstates registry scope.",
    targetCopy:
      "Registry lookup confirms record consistency; not safety, efficacy, or fitness-for-purpose.",
  },
  {
    route: "/verify?code=…",
    file: "components/certificates/certificate-viewer.tsx",
    risk: "medium",
    currentIssue: "'Tamper-proof verification' and authenticity framing.",
    targetCopy:
      "Online registry is authoritative reference; PDF is informational; no clinical/human-use specification.",
  },
  {
    route: "/endotoxin-testing",
    file: "app/(marketing)/endotoxin-testing/page.tsx",
    risk: "medium",
    currentIssue: "'Pass/fail certification' and fixed sensitivity/turnaround without qualification.",
    targetCopy:
      "Report EU/mL against client specification where agreed; estimates and method limits clearly qualified.",
  },
  {
    route: "/privacy",
    file: "app/(marketing)/privacy/page.tsx",
    risk: "high",
    currentIssue: "Placeholder policy text live on public route.",
    targetCopy: "Full UK GDPR notice aligned to actual processing (forms, auth, certificates).",
  },
  {
    route: "/terms",
    file: "app/(marketing)/terms/page.tsx",
    risk: "high",
    currentIssue: "Placeholder terms live on public route.",
    targetCopy:
      "Testing-service terms: sample acceptance, bank transfer, estimates, liability limits, ROU scope.",
  },
  {
    route: "global",
    file: "components/marketing/marketing-footer.tsx",
    risk: "high",
    currentIssue: "Ltd company placeholder conflicts with sole-trader model.",
    targetCopy: "Sole-trader trading name disclosure with service address and ROU disclaimer links.",
  },
  {
    route: "global",
    file: "app/layout.tsx",
    risk: "medium",
    currentIssue: "Metadata includes trust-led phrasing ('analysis you can trust').",
    targetCopy: "Neutral research-testing documentation positioning without trust superlatives.",
  },
  {
    route: "/help",
    file: "app/(marketing)/help/page.tsx",
    risk: "low",
    currentIssue: "Seller/product framing in technical section.",
    targetCopy: "Testing-service and certificate documentation language; link to outsourcing disclosure.",
  },
  {
    route: "/research-use-only",
    file: "app/(marketing)/research-use-only/page.tsx",
    risk: "low",
    currentIssue: "Implemented — maintain ROU and portal-submission clarity.",
    targetCopy: "Central ROU and prohibited-use policy referenced site-wide.",
  },
  {
    route: "/lab-partner-disclosure",
    file: "app/(marketing)/lab-partner-disclosure/page.tsx",
    risk: "low",
    currentIssue: "Implemented — maintain outsourced-lab and registry-entry transparency.",
    targetCopy: "Explain in-house coordination vs partner-lab execution and certificate limits.",
  },
  {
    route: "/dashboard/new",
    file: "components/dashboard/new-test-form.tsx",
    risk: "high",
    currentIssue: "Portal manual entry must stay paired with attestation and manual-entry disclaimer.",
    targetCopy:
      "Required attestation checkbox; manual-entry disclaimer; synthetic/representative trace disclosure on certificate view.",
  },
  {
    route: "/verify?code=…",
    file: "components/compliance/certificate-compliance-footer.tsx",
    risk: "medium",
    currentIssue: "PDF and on-screen disclaimer stack must stay aligned.",
    targetCopy:
      "Manual-entry, outsourced routing, verification registry, and ROU lines on certificate view and PDF export.",
  },
];

export const PROHIBITED_CLAIM_PATTERNS = [
  "treat",
  "cure",
  "prevent disease",
  "anti-ageing",
  "weight loss",
  "bodybuilding",
  "dosage",
  "injection",
  "human consumption",
  "clinical use",
  "medicinal",
  "guaranteed",
  "100% pure",
] as const;
