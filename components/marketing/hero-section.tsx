import Link from "next/link";
import { BadgeCheck, Home, Shield } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="lab-gradient-hero relative overflow-hidden border-b border-slate-200/80">
      <div
        className="pointer-events-none absolute -right-[20%] top-[-10%] h-[min(520px,55vw)] w-[min(520px,55vw)] rounded-full bg-[radial-gradient(circle,rgba(224,242,254,0.85)_0%,transparent_68%)] lab-hero-float-slow"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(15,118,110,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_0%,rgba(16,185,129,0.08),transparent)]" />
      <div
        className="lab-hero-grain pointer-events-none absolute inset-0 mix-blend-multiply"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 text-center sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-accent-sky-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700 shadow-sm backdrop-blur-sm ring-1 ring-accent-sky-100/50">
          <span className="size-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" aria-hidden />
          Independent peptide analysis
        </p>
        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Know What&apos;s In Your{" "}
          <span className="bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
            Peptides.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
          HPLC purity and LC-MS identity testing with QR-verified digital
          certificates. Independent UK laboratory analysis you can trust.
        </p>
        <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 px-8 text-base shadow-md",
            )}
          >
            Lab Portal
          </Link>
          <Link
            href="/verify"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 border-slate-200 bg-white/90 px-8 text-base text-foreground shadow-sm backdrop-blur-sm hover:bg-white",
            )}
          >
            Verify Certificate
          </Link>
        </div>
        <ul className="mx-auto mt-12 flex max-w-xl flex-col gap-4 text-left sm:max-w-2xl sm:flex-row sm:justify-center sm:gap-10 sm:text-center">
          <li className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:flex-col sm:gap-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-100 sm:size-11">
              <Home className="size-5" aria-hidden />
            </span>
            UK-Based
          </li>
          <li className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:flex-col sm:gap-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-100 sm:size-11">
              <Shield className="size-5" aria-hidden />
            </span>
            Validated Methods
          </li>
          <li className="flex items-center gap-3 text-sm font-medium text-muted-foreground sm:flex-col sm:gap-2">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-sm ring-1 ring-brand-100 sm:size-11">
              <BadgeCheck className="size-5" aria-hidden />
            </span>
            QR-Verified Certs
          </li>
        </ul>
      </div>
    </section>
  );
}
