import { cn } from "@/lib/utils";
import {
  RESEARCH_USE_ONLY_FULL,
  RESEARCH_USE_ONLY_SHORT,
} from "@/lib/compliance/disclaimers";

type ResearchUseOnlyNoticeProps = {
  variant?: "compact" | "full";
  className?: string;
};

export function ResearchUseOnlyNotice({
  variant = "compact",
  className,
}: ResearchUseOnlyNoticeProps) {
  const text =
    variant === "full" ? RESEARCH_USE_ONLY_FULL : RESEARCH_USE_ONLY_SHORT;

  return (
    <p
      role="note"
      className={cn(
        "rounded-xl border border-[var(--bg-border)] bg-[var(--bg-surface)] px-4 py-3 text-xs leading-relaxed text-[var(--text-muted)]",
        className,
      )}
    >
      {variant === "compact" ? (
        <>
          <span className="font-semibold text-[var(--text-secondary)]">
            Research use only.{" "}
          </span>
          Not for human or veterinary use, clinical application, or
          administration.
        </>
      ) : (
        text
      )}
    </p>
  );
}
