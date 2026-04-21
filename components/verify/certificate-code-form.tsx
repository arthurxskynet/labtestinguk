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
        className={cn(
          "h-12 min-w-0 flex-1 border-slate-200 bg-white font-mono text-base tracking-wide shadow-inner sm:min-w-[280px] sm:text-sm",
          inputClassName,
        )}
      />
      <Button
        type="submit"
        className="h-12 shrink-0 bg-primary px-8 text-primary-foreground shadow-md transition-all hover:bg-brand-500 hover:shadow-lg"
      >
        {submitLabel}
      </Button>
    </form>
  );
}
