import { describe, expect, it } from "vitest";

import { COMPLIANCE_COPY_MATRIX } from "./copy-matrix";
import {
  formatLaunchBlockerReport,
  runComplianceQaChecklist,
} from "./launch-report";
import { hasUnresolvedLegalPlaceholders } from "./legal-identity";

describe("compliance launch report", () => {
  it("includes copy matrix entries for all major public routes", () => {
    const routes = new Set(COMPLIANCE_COPY_MATRIX.map((entry) => entry.route));
    expect(routes.has("/")).toBe(true);
    expect(routes.has("/verify")).toBe(true);
    expect(routes.has("/privacy")).toBe(true);
    expect(routes.has("/terms")).toBe(true);
    expect(routes.has("/research-use-only")).toBe(true);
    expect(routes.has("/lab-partner-disclosure")).toBe(true);
  });

  it("reports legal identity placeholders as resolved when configured", () => {
    expect(hasUnresolvedLegalPlaceholders()).toBe(false);
    const qa = runComplianceQaChecklist();
    const legalItem = qa.find((item) => item.id === "legal-identity-complete");
    expect(legalItem?.passed).toBe(true);
  });

  it("generates a readable launch blocker report", () => {
    const report = formatLaunchBlockerReport();
    expect(report).toContain("Critical blockers");
    expect(report).toContain("QA checklist");
  });

  it("includes manual-entry disclaimer and PDF parity checklist items", () => {
    const qa = runComplianceQaChecklist();
    expect(qa.find((item) => item.id === "manual-entry-disclaimer")?.passed).toBe(
      true,
    );
    expect(qa.find((item) => item.id === "pdf-disclaimer-parity")?.passed).toBe(
      true,
    );
  });
});
