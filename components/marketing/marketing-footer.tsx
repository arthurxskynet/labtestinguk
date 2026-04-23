import Link from "next/link";

import { SiteLogo } from "@/components/branding/site-logo";

const platform = [
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/endotoxin-testing", label: "Endotoxin Testing" },
  { href: "/", label: "For Peptide Sellers" },
  { href: "/verify", label: "Verify Peptide Quality" },
  { href: "/login", label: "Sign In" },
];

const resources = [
  { href: "/#blog", label: "Blog & Insights" },
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
    <footer className="border-t border-slate-200 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo size="sm" className="w-40" imageClassName="block" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Independent peptide verification and testing service.
            </p>
            <p className="text-xs text-slate-500">
              Verifypeps — A trading name of Verifypeps Analytics Ltd (Company
              No. placeholder)
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Platform
            </h4>
            <ul className="mt-4 space-y-3 sm:space-y-2">
              {platform.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Resources
            </h4>
            <ul className="mt-4 space-y-3 sm:space-y-2">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Legal
            </h4>
            <ul className="mt-4 space-y-3 sm:space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-slate-200 pt-8 text-xs leading-relaxed text-slate-500">
          Verifypeps provides independent analytical testing for research and
          verification purposes. Our certificates report the composition of
          samples as received and do not constitute a safety assessment or
          fitness-for-purpose determination.
        </p>
        <p className="mt-4 text-center text-xs text-slate-500 md:text-left">
          © {new Date().getFullYear()} Verifypeps. All rights reserved.
          Independent analytical testing services with experienced laboratory
          partners.
        </p>
      </div>
    </footer>
  );
}
