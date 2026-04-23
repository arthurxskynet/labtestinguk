import Link from "next/link";

import { CertificatePreview } from "@/components/marketing/certificate-preview";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section
      className={cn(
        "hero-section-bg relative border-b border-[var(--bg-border)]",
        "hero-mesh hero-grid",
      )}
    >
      <div className="relative z-10 marketing-container flex min-h-[100svh] flex-col justify-center gap-12 pb-20 pt-28 lg:flex-row lg:items-center lg:gap-8 lg:pb-28 lg:pt-24">
        <div className="w-full shrink-0 lg:w-[55%] lg:max-w-none">
          <span className="marketing-badge">Independent UK Laboratory</span>
          <h1 className="text-balance">
            Know Exactly
            <br />
            <em className="font-display text-[var(--accent-primary)] italic">
              What&apos;s In
            </em>
            <br />
            Your Peptides.
          </h1>
          <p className="hero-sub mt-6">
            HPLC purity and LC-MS identity testing with QR-verified digital certificates.
            Results you can prove. Chain of custody you can trust.
          </p>
          <div className="mt-10 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/login"
              className="btn-primary-motion inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-primary)] px-8 text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
            >
              Lab Portal
            </Link>
            <Link
              href="/verify"
              className="inline-flex h-12 items-center justify-center rounded-[var(--radius-md)] border border-[var(--bg-border)] px-8 text-base font-semibold text-[var(--text-primary)] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:bg-[var(--accent-subtle)]"
            >
              Verify Certificate
            </Link>
          </div>
          <div className="trust-chips mt-8">
            <span>✓ UK-Based Lab</span>
            <span>✓ QR-Verified Certs</span>
            <span>✓ 24hr Priority</span>
          </div>
        </div>
        <div className="flex w-full flex-1 justify-center lg:w-[45%] lg:justify-end">
          <CertificatePreview />
        </div>
      </div>
    </section>
  );
}
