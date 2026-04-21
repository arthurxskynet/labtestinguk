import type { Metadata } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Endotoxin Testing",
  description:
    "LAL-based bacterial endotoxin detection for peptides and research samples. Quantitative EU/mL results with QR-verified certificates.",
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
            LAL endotoxin testing for research peptides
          </h1>
          <p className="mt-6 text-lg text-[#334155]">
            LAL-based bacterial endotoxin detection. Separate sample required to
            prevent cross-contamination. Quantitative EU/mL result with pass/fail
            certification and QR-verified certificate.
          </p>
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
              Verify a certificate
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#0f172a]">What we report</h2>
        <ul className="mt-6 space-y-3 text-[#334155]">
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            LAL kinetic turbidimetric assay
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Sensitivity: 0.005 EU/mL
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Quantitative EU/mL result
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            Pass/fail certification against your specification
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            QR-verified certificate
          </li>
          <li className="flex gap-2">
            <span className="text-success-500">✓</span>
            48–72h typical turnaround
          </li>
        </ul>
        <p className="mt-10 text-sm text-[#334155]">
          A peptide can test at high purity and still contain bacterial
          endotoxin. LAL testing is the standard approach to detect these
          heat-stable contaminants in research materials. Results are reported
          for documentation and batch review — not as a clinical safety
          assessment.
        </p>
      </section>
    </div>
  );
}
