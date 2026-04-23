"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  submitLabel?: string;
  defaultValue?: string;
};

const inputDark =
  "h-12 min-w-0 flex-1 border-[var(--bg-border)] bg-[var(--bg-surface)] font-mono text-base tracking-wide text-[var(--text-primary)] placeholder:text-[var(--text-muted)] shadow-inner transition-[border-color,box-shadow] duration-200 focus-visible:border-[var(--accent-primary)] focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)] sm:min-w-[280px] sm:text-sm";

export function CertificateCodeForm({
  className,
  inputClassName,
  placeholder = "VP-920598-Q7FB",
  submitLabel = "Verify",
  defaultValue,
}: Props) {
  return (
    <form
      action="/verify"
      method="get"
      className={cn("flex flex-col gap-3 sm:flex-row sm:items-stretch", className)}
    >
      <label className="sr-only" htmlFor="certificate-code-input">
        Enter Certificate ID
      </label>
      <Input
        id="certificate-code-input"
        name="code"
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        className={cn(inputDark, inputClassName)}
      />
      <Button
        type="submit"
        className="btn-primary-motion h-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-8 font-semibold text-[var(--text-inverse)] shadow-md transition-colors hover:bg-[var(--accent-hover)]"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
