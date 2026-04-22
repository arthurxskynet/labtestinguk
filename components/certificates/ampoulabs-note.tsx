import { cn } from "@/lib/utils";

type AmpoulabsNoteProps = {
  className?: string;
};

export function AmpoulabsNote({ className }: AmpoulabsNoteProps) {
  return (
    <p
      className={cn(
        "rounded-xl border border-accent-sky-200/80 bg-accent-sky-50/55 px-3 py-2 text-xs text-slate-700",
        className,
      )}
    >
      <span className="font-semibold text-slate-900">Ampoulabs note:</span>{" "}
      All listed tests belong to Ampoulabs.
    </p>
  );
}
