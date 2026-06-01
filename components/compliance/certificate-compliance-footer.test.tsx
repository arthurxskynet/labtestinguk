import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  MANUAL_REGISTRY_ENTRY_DISCLAIMER,
  OUTSOURCED_TEST_ROUTING_NOTE,
  PENDING_REGISTRY_REVIEW_NOTE,
  RESEARCH_USE_ONLY_SHORT,
  VERIFICATION_REGISTRY_DISCLAIMER,
} from "@/lib/compliance/disclaimers";

import { CertificateComplianceFooter } from "./certificate-compliance-footer";

describe("CertificateComplianceFooter", () => {
  it("renders the full compliance disclaimer stack", () => {
    render(<CertificateComplianceFooter />);

    expect(screen.getByText(MANUAL_REGISTRY_ENTRY_DISCLAIMER)).not.toBeNull();
    expect(screen.getByText(OUTSOURCED_TEST_ROUTING_NOTE)).not.toBeNull();
    expect(screen.getByText(VERIFICATION_REGISTRY_DISCLAIMER)).not.toBeNull();
    expect(screen.getByText(RESEARCH_USE_ONLY_SHORT)).not.toBeNull();
  });

  it("shows pending portal note when review is pending", () => {
    render(
      <CertificateComplianceFooter isPendingReview isPortalSubmission={false} />,
    );

    expect(screen.getByText(PENDING_REGISTRY_REVIEW_NOTE)).not.toBeNull();
  });

  it("can hide research-use-only line", () => {
    render(<CertificateComplianceFooter showResearchUseOnly={false} />);

    expect(screen.queryByText(RESEARCH_USE_ONLY_SHORT)).toBeNull();
  });
});
