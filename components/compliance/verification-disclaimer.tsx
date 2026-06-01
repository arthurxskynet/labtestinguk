import { VERIFICATION_REGISTRY_DISCLAIMER } from "@/lib/compliance/disclaimers";
import { cn } from "@/lib/utils";

type VerificationDisclaimerProps = {
  className?: string;
};

export function VerificationDisclaimer({ className }: VerificationDisclaimerProps) {
  return (
    <p
      role="note"
      className={cn(
        "rounded-xl border border-[var(--bg-border)] bg-[var(--bg-elevated)] px-4 py-3 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      {VERIFICATION_REGISTRY_DISCLAIMER}
    </p>
  );
}
