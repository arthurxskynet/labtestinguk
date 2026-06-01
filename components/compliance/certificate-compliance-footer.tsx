import {
  MANUAL_REGISTRY_ENTRY_DISCLAIMER,
  OUTSOURCED_TEST_ROUTING_NOTE,
  PENDING_REGISTRY_REVIEW_NOTE,
  RESEARCH_USE_ONLY_SHORT,
  VERIFICATION_REGISTRY_DISCLAIMER,
} from "@/lib/compliance/disclaimers";
import { cn } from "@/lib/utils";

export type CertificateComplianceFooterProps = {
  className?: string;
  /** Show research-use-only one-liner (public certificate pages). */
  showResearchUseOnly?: boolean;
  /** Certificate status is pending registry review. */
  isPendingReview?: boolean;
  /** Record was created via the research portal. */
  isPortalSubmission?: boolean;
};

const noteClass =
  "rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-3 py-2 text-xs leading-relaxed text-muted-foreground";

export function CertificateComplianceFooter({
  className,
  showResearchUseOnly = true,
  isPendingReview = false,
  isPortalSubmission = false,
}: CertificateComplianceFooterProps) {
  const showPortalNote = isPendingReview || isPortalSubmission;

  return (
    <div
      className={cn("space-y-3", className)}
      role="note"
      aria-label="Certificate compliance notices"
    >
      {showPortalNote ? (
        <p className={cn(noteClass, "border-amber-500/30 bg-amber-50/60 text-amber-950")}>
          <span className="font-semibold text-amber-900">Pending registry review:</span>{" "}
          {PENDING_REGISTRY_REVIEW_NOTE}
        </p>
      ) : null}
      <p className={noteClass}>{MANUAL_REGISTRY_ENTRY_DISCLAIMER}</p>
      <p className={noteClass}>
        <span className="font-semibold text-slate-800">Partner laboratory note:</span>{" "}
        {OUTSOURCED_TEST_ROUTING_NOTE}
      </p>
      <p className={noteClass}>{VERIFICATION_REGISTRY_DISCLAIMER}</p>
      {showResearchUseOnly ? (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {RESEARCH_USE_ONLY_SHORT}
        </p>
      ) : null}
    </div>
  );
}
