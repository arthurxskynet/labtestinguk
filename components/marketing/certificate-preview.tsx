"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

/** Floating certificate mockup for hero — illustrative HPLC trace (research documentation). */
export function CertificatePreview({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative min-h-[320px] w-full max-w-md justify-self-end lg:max-w-lg",
        className,
      )}
    >
      <div className="cert-preview-float rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-6 shadow-[var(--shadow-glow)]">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--bg-border)] pb-4">
          <div>
            <p className="font-mono text-sm font-medium tracking-wide text-[var(--accent-primary)]">
              VP-A3F7B2-KPVX
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Illustrative certificate preview
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--success)]/30 bg-[var(--success-dim)] px-2.5 py-1 text-xs font-semibold text-[var(--success)]">
            <span className="size-1.5 rounded-full bg-[var(--success)]" aria-hidden />
            Verified
          </span>
        </div>

        <div className="mt-4 rounded-[var(--radius-md)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-3">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
            HPLC — UV trace
          </p>
          <svg
            viewBox="0 0 320 120"
            className="mt-2 h-28 w-full text-[var(--accent-primary)]"
            aria-hidden
          >
            <defs>
              <linearGradient id="peakGradHero" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={24 + i * 22}
                x2="320"
                y2={24 + i * 22}
                stroke="var(--bg-border)"
                strokeWidth="1"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line
                key={`v-${i}`}
                x1={40 + i * 52}
                y1="16"
                x2={40 + i * 52}
                y2="112"
                stroke="var(--bg-border)"
                strokeWidth="1"
                opacity="0.6"
              />
            ))}
            {/* Illustrative UV trace: solvent front bump + asymmetric sharp peak + tailing */}
            <path
              d="M 12 100 L 36 100 L 42 90 L 48 100 L 118 99 C 138 98 152 52 164 24 C 168 16 174 14 182 26 C 196 48 208 94 238 99 L 308 100 L 308 112 L 12 112 Z"
              fill="url(#peakGradHero)"
            />
            <path
              d="M 12 100 L 36 100 L 42 90 L 48 100 L 118 99 C 138 98 152 52 164 24 C 168 16 174 14 182 26 C 196 48 208 94 238 99 L 308 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs">
          <div className="rounded-[var(--radius-sm)] bg-[var(--bg-surface)] px-2 py-2">
            <p className="font-mono font-semibold tabular-nums text-[var(--text-primary)]">
              99.91%
            </p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
              Purity
            </p>
          </div>
          <div className="rounded-[var(--radius-sm)] bg-[var(--bg-surface)] px-2 py-2">
            <p className="font-semibold text-[var(--text-primary)]">BPC-157</p>
            <p className="mt-0.5 text-[10px] text-[var(--success)]">✓ Identity</p>
          </div>
          <div className="rounded-[var(--radius-sm)] bg-[var(--bg-surface)] px-2 py-2">
            <p className="font-medium text-[var(--text-secondary)]">HPLC + LC-MS</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
              Methods
            </p>
          </div>
        </div>

        <p className="mt-4 text-center">
          <Link
            href="/verify?code=VP-A3F7B2-KPVX"
            className="text-xs font-medium text-[var(--accent-primary)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
          >
            Open sample verification
          </Link>
        </p>
      </div>
    </div>
  );
}
