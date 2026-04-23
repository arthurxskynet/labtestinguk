"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, QrCode } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  placeholder?: string;
  defaultCode?: string;
};

export function VerifyCertificatePanel({
  className,
  placeholder = "e.g. VP-A3F7B2-KPVX",
  defaultCode,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const code = String(fd.get("code") ?? "").trim();
    if (!code) return;
    setPending(true);
    router.push(`/verify?code=${encodeURIComponent(code)}`);
  }

  return (
    <div
      className={cn(
        "relative mx-auto max-w-[560px] rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--shadow-elevated)] sm:p-10",
        className,
      )}
    >
      {pending ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-[var(--bg-base)]/75 backdrop-blur-[2px]"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="size-10 animate-spin text-[var(--accent-primary)] motion-reduce:animate-none" />
          <span className="mt-3 text-sm font-medium text-[var(--text-secondary)]">
            Opening verifier…
          </span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="sr-only" htmlFor="marketing-verify-code">
          Certificate ID
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              id="marketing-verify-code"
              name="code"
              type="text"
              placeholder={placeholder}
              autoComplete="off"
              defaultValue={defaultCode}
              className={cn(
                "input-glow-focus h-14 w-full rounded-[var(--radius-md)] border border-[var(--bg-border)] bg-[var(--bg-surface)] px-4 pr-14 font-mono text-[15px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-[border-color,box-shadow] duration-200",
              )}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-[var(--radius-sm)] border border-transparent text-[var(--text-secondary)] transition-colors hover:border-[var(--bg-border)] hover:bg-[var(--accent-subtle)] hover:text-[var(--accent-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              aria-label="Verify by QR code — opens verification page"
              onClick={() => router.push("/verify")}
            >
              <QrCode className="size-5" aria-hidden />
            </button>
          </div>
          <button
            type="submit"
            className="btn-primary-motion inline-flex h-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-8 text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)] sm:min-w-[140px]"
          >
            Verify
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        Try:{" "}
        <Link
          href="/verify?code=VP-A3F7B2-KPVX"
          className="font-mono font-medium text-[var(--accent-primary)] underline decoration-[var(--accent-primary)] underline-offset-4 hover:text-[var(--accent-hover)]"
        >
          VP-A3F7B2-KPVX
        </Link>
      </p>
    </div>
  );
}
