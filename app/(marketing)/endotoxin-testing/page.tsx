import type { Metadata } from "next";
import Link from "next/link";

import { ResearchUseOnlyNotice } from "@/components/compliance/research-use-only-notice";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Endotoxin Testing",
  description:
    "LAL-based bacterial endotoxin detection for research peptide samples. Quantitative EU/mL reporting with registry-linked certificates.",
};

export default function EndotoxinTestingPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-gradient-to-b from-[#f8fafc] to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Endotoxin testing
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0f172a] sm:text-5xl">
            LAL endotoxin testing for research samples
          </h1>
          <p className="mt-6 text-lg text-[#334155]">
            LAL-based bacterial endotoxin detection for research materials. A
            separate sample is required to reduce cross-contamination risk.
            Results are reported as quantitative EU/mL with comparison to an
            agreed specification where provided.
          </p>
          <ResearchUseOnlyNotice className="mx-auto mt-6 max-w-2xl border-slate-200 bg-slate-50 text-slate-600" />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#contact"
              className={cn(buttonVariants({ size: "lg" }), "min-w-[200px] shadow-md")}
            >
              Discuss endotoxin testing
            </Link>
            <Link
              href="/verify"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-w-[200px] border-slate-200 bg-white shadow-sm",
              )}
            >
              Lookup a certificate
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0f172a]">What we report</h2>
        <ul className="mt-6 space-y-3 text-[#334155]">
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            LAL kinetic turbidimetric assay (where selected for scope)
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Method sensitivity stated on the certificate for the run performed
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Quantitative EU/mL result
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Outcome vs client specification where an agreed limit is supplied
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            QR-linked registry certificate
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Estimated turnaround communicated at order acceptance (typically several working days)
          </li>
        </ul>
        <p className="mt-10 text-sm text-[#334155]">
          LAL testing detects bacterial endotoxin in research materials. Results
          are reported for documentation and batch review — not as a clinical
          safety assessment, release for human use, or regulatory approval.
        </p>
        <p className="mt-4 text-sm text-[#334155]">
          Some endotoxin methods may be performed by qualified partner
          laboratories, including facilities in the European Union where required.
          See our{" "}
          <Link href="/lab-partner-disclosure" className="text-brand-600 hover:underline">
            laboratory partner disclosure
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
