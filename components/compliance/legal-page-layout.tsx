import type { ReactNode } from "react";

import { PrelaunchGateBanner } from "@/components/compliance/prelaunch-gate-banner";
import { cn } from "@/lib/utils";

type LegalPageLayoutProps = {
  title: string;
  description?: string;
  updated?: string;
  children: ReactNode;
  className?: string;
};

export function LegalPageLayout({
  title,
  description,
  updated = "May 2026",
  children,
  className,
}: LegalPageLayoutProps) {
  return (
    <>
      <PrelaunchGateBanner />
      <article className={cn("mx-auto max-w-3xl px-4 py-16 sm:px-6", className)}>
        <header>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              {description}
            </p>
          ) : null}
          <p className="mt-2 text-sm text-slate-500">Last updated: {updated}</p>
        </header>
        <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-slate-700">
          {children}
        </div>
      </article>
    </>
  );
}

export function LegalSection({
  title,
  children,
  id,
}: {
  title: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id}>
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}
