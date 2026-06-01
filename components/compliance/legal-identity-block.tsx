import Link from "next/link";

import { LEGAL_IDENTITY } from "@/lib/compliance/legal-identity";
import { cn } from "@/lib/utils";

type LegalIdentityBlockProps = {
  className?: string;
  showVat?: boolean;
  /** Subtle styling for footer — low-contrast disclosure against dark background. */
  variant?: "default" | "subtle";
  showPolicyLinks?: boolean;
};

export function LegalIdentityBlock({
  className,
  showVat = true,
  variant = "default",
  showPolicyLinks = true,
}: LegalIdentityBlockProps) {
  const subtle = variant === "subtle";

  return (
    <div
      className={cn(
        "leading-relaxed",
        subtle ? "space-y-1 text-[10px] text-[var(--text-muted)]" : "space-y-2 text-xs",
        className,
      )}
    >
      <p className="text-[var(--text-muted)]">
        {subtle ? (
          <>
            {LEGAL_IDENTITY.tradingName} · {LEGAL_IDENTITY.legalOwnerName} · sole
            trader
          </>
        ) : (
          <>
            <span className="font-semibold text-[var(--text-secondary)]">
              {LEGAL_IDENTITY.tradingName}
            </span>{" "}
            is a trading name operated by{" "}
            <span className="text-[var(--text-secondary)]">
              {LEGAL_IDENTITY.legalOwnerName}
            </span>
            , a sole trader established in the United Kingdom.
          </>
        )}
      </p>
      <address
        className={cn(
          "not-italic",
          "text-[var(--text-muted)]",
        )}
      >
        {LEGAL_IDENTITY.serviceAddress}
      </address>
      {!subtle ? (
        <p>
          <a
            href={`mailto:${LEGAL_IDENTITY.contactEmail}`}
            className="text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-hover)]"
          >
            {LEGAL_IDENTITY.contactEmail}
          </a>
        </p>
      ) : null}
      {showVat && LEGAL_IDENTITY.vatNumber ? (
        <p className="text-[var(--text-muted)]">
          VAT registration no. {LEGAL_IDENTITY.vatNumber}
        </p>
      ) : null}
      {showPolicyLinks && !subtle ? (
        <p className="text-[var(--text-muted)]">
          <Link
            href="/research-use-only"
            className="text-[var(--accent-primary)] underline-offset-4 hover:underline"
          >
            Research-use-only policy
          </Link>
          {" · "}
          <Link
            href="/lab-partner-disclosure"
            className="text-[var(--accent-primary)] underline-offset-4 hover:underline"
          >
            Laboratory partner disclosure
          </Link>
        </p>
      ) : null}
    </div>
  );
}
