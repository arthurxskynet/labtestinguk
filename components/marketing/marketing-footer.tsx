"use client";

import Link from "next/link";
import { toast } from "sonner";

import { SiteLogo } from "@/components/branding/site-logo";
import { Input } from "@/components/ui/input";

const platform = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/endotoxin-testing", label: "Endotoxin Testing" },
  { href: "/", label: "For Peptide Sellers" },
  { href: "/verify", label: "Verify Peptide Quality" },
  { href: "/login", label: "Sign In" },
];

const resources = [
  { href: "/help", label: "Help & FAQ" },
  { href: "/help#sample-prep", label: "Sample Preparation" },
  { href: "/#contact", label: "Contact Us" },
];

const legal = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/verify", label: "Certificate Verification" },
];

export function MarketingFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--bg-border)] bg-[#040810] text-[var(--text-secondary)]">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--accent-primary)] to-transparent" aria-hidden />

      <div className="marketing-container py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md space-y-4">
            <SiteLogo size="sm" className="w-40" imageClassName="block opacity-95" />
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Independent peptide verification and laboratory testing documentation—built for research traceability and audit-ready records.
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed", {
                description: "Thanks — we’ll only send verification and lab updates. (Demo)",
              });
            }}
          >
            <label className="sr-only" htmlFor="footer-newsletter-email">
              Email for newsletter
            </label>
            <Input
              id="footer-newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="h-12 flex-1 rounded-[var(--radius-md)] border-[var(--bg-border)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
            <button
              type="submit"
              className="btn-primary-motion h-12 shrink-0 rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-6 text-sm font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Platform
            </h4>
            <ul className="mt-4 space-y-3">
              {platform.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Resources
            </h4>
            <ul className="mt-4 space-y-3">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Legal
            </h4>
            <ul className="mt-4 space-y-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              Verifypeps provides independent analytical testing for research and verification purposes. Certificates report composition as received and do not constitute a safety assessment or fitness-for-purpose determination.
            </p>
            <p className="mt-4 text-xs text-[var(--text-muted)]">
              Verifypeps — a trading name of Verifypeps Analytics Ltd (company no. placeholder).
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--bg-border)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Verifypeps</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-[var(--accent-primary)]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[var(--accent-primary)]">
              Terms
            </Link>
            <Link href="/verify" className="transition-colors hover:text-[var(--accent-primary)]">
              Verify Certificate
            </Link>
          </div>
        </div>
      </div>

      <span
        className="footer-watermark font-display pointer-events-none absolute bottom-0 right-4 select-none text-[var(--text-primary)]"
        aria-hidden
      >
        V
      </span>
    </footer>
  );
}
