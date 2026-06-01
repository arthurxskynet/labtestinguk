/**
 * Sole-trader legal identity for UK trading disclosures.
 */
export const LEGAL_IDENTITY = {
  tradingName: "Verifypeps",
  legalOwnerName: "Neicko Marsh",
  serviceAddress: "66 Paul St, London EC2A 4NA, United Kingdom",
  contactEmail: "hello@verifypeps.com",
  /** Set to a GB VAT number when registered; leave null if not VAT-registered. */
  vatNumber: null as string | null,
} as const;

const PLACEHOLDER_MARKER = "[REQUIRED BEFORE LAUNCH";

export function hasUnresolvedLegalPlaceholders(): boolean {
  return (
    LEGAL_IDENTITY.legalOwnerName.includes(PLACEHOLDER_MARKER) ||
    LEGAL_IDENTITY.serviceAddress.includes(PLACEHOLDER_MARKER)
  );
}

export type LaunchBlocker = {
  id: string;
  severity: "critical" | "warning";
  message: string;
};

/** Pre-launch checklist derived from unresolved site configuration. */
export function getLaunchBlockers(): LaunchBlocker[] {
  const blockers: LaunchBlocker[] = [];

  if (hasUnresolvedLegalPlaceholders()) {
    blockers.push({
      id: "legal-identity",
      severity: "critical",
      message:
        "Replace legal owner name and service address placeholders in lib/compliance/legal-identity.ts before launch.",
    });
  }

  if (!LEGAL_IDENTITY.contactEmail.includes("@")) {
    blockers.push({
      id: "contact-email",
      severity: "critical",
      message: "Set a valid contact email in lib/compliance/legal-identity.ts.",
    });
  }

  blockers.push({
    id: "legal-review",
    severity: "warning",
    message:
      "Obtain UK regulatory/legal review of final public copy, outsourced-lab disclosures, and service terms.",
  });

  blockers.push({
    id: "testimonial-evidence",
    severity: "warning",
    message:
      "If publishing named customer quotes, retain consent records and substantiation before launch.",
  });

  return blockers;
}
