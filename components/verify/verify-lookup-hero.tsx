import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AmpoulabsNote } from "@/components/certificates/ampoulabs-note";
import { CertificateCodeForm } from "@/components/verify/certificate-code-form";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function VerifyLookupHero() {
  return (
    <div className="min-h-[70vh] border-b border-[var(--bg-border)] bg-[var(--bg-base)]">
      <div className="marketing-container max-w-3xl py-16 lg:py-24">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 mb-8 text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:text-[var(--text-primary)]",
          )}
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden />
          Back to home
        </Link>
        <p className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-primary)]">
          Certificate verification
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-[var(--text-primary)] sm:text-5xl">
          Verify Authenticity
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Enter a certificate ID or scan the QR code to instantly verify authenticity and view complete analysis data
        </p>
        <div className="mt-10 rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          <CertificateCodeForm placeholder="e.g. VP-A3F7B2-KPVX" />
          <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
            Try our demo: Enter{" "}
            <Link
              href="/verify?code=VP-A3F7B2-KPVX"
              className="font-mono font-medium text-[var(--accent-primary)] underline-offset-4 hover:underline"
            >
              VP-A3F7B2-KPVX
            </Link>{" "}
            above
          </p>
          <p className="mt-6 text-center">
            <Link
              href="/verify?code=VP-A3F7B2-KPVX"
              className="text-sm font-medium text-[var(--accent-primary)] underline-offset-4 hover:underline"
            >
              Or view sample certificate preview
            </Link>
          </p>
          <AmpoulabsNote className="mt-6 text-center" />
        </div>
      </div>
    </div>
  );
}
