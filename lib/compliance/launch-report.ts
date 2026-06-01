import { getLaunchBlockers } from "./legal-identity";

export type ComplianceQaResult = {
  id: string;
  label: string;
  passed: boolean;
  detail: string;
};

/** Static checklist for pre-launch compliance QA. */
export function runComplianceQaChecklist(): ComplianceQaResult[] {
  const blockers = getLaunchBlockers();
  const legalBlockers = blockers.filter((b) => b.severity === "critical");

  return [
    {
      id: "legal-identity-complete",
      label: "Legal identity placeholders replaced",
      passed: legalBlockers.length === 0,
      detail:
        legalBlockers.length === 0
          ? "No critical legal identity placeholders detected."
          : legalBlockers.map((b) => b.message).join(" "),
    },
    {
      id: "research-use-only-page",
      label: "Dedicated research-use-only policy published",
      passed: true,
      detail: "Route /research-use-only implemented.",
    },
    {
      id: "partner-disclosure-page",
      label: "Outsourced laboratory disclosure published",
      passed: true,
      detail: "Route /lab-partner-disclosure implemented.",
    },
    {
      id: "privacy-policy",
      label: "UK GDPR privacy policy published",
      passed: true,
      detail: "Route /privacy replaced with structured policy content.",
    },
    {
      id: "terms-of-service",
      label: "Testing-service terms published",
      passed: true,
      detail: "Route /terms replaced with service-specific terms.",
    },
    {
      id: "manual-entry-disclaimer",
      label: "Manual registry-entry disclaimer on certificate surfaces",
      passed: true,
      detail:
        "CertificateComplianceFooter and portal attestation implemented.",
    },
    {
      id: "pdf-disclaimer-parity",
      label: "PDF export includes full compliance disclaimer stack",
      passed: true,
      detail: "getCertificateCompliancePdfLines appended to certificate PDF footer.",
    },
    {
      id: "external-legal-review",
      label: "External legal/regulatory review completed",
      passed: false,
      detail:
        "Manual step: obtain UK counsel review before public launch.",
    },
    {
      id: "testimonial-substantiation",
      label: "Testimonial consent and substantiation on file",
      passed: false,
      detail:
        "Manual step: retain evidence for named quotes if published at launch.",
    },
  ];
}

export function formatLaunchBlockerReport(): string {
  const blockers = getLaunchBlockers();
  const qa = runComplianceQaChecklist();

  const lines = [
    "Verifypeps compliance launch report",
    "===================================",
    "",
    "Critical blockers:",
    ...blockers
      .filter((b) => b.severity === "critical")
      .map((b) => `- [CRITICAL] ${b.message}`),
    "",
    "Warnings:",
    ...blockers
      .filter((b) => b.severity === "warning")
      .map((b) => `- [WARNING] ${b.message}`),
    "",
    "QA checklist:",
    ...qa.map(
      (item) =>
        `- [${item.passed ? "PASS" : "FAIL"}] ${item.label}: ${item.detail}`,
    ),
  ];

  return lines.join("\n");
}
