import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AmpoulabsNote } from "@/components/certificates/ampoulabs-note";
import { CertificateCodeForm } from "@/components/verify/certificate-code-form";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function VerifyLookupHero() {
  return (
    <div className="min-h-[70vh] border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "-ml-2 mb-8 text-slate-600 hover:text-slate-900",
          )}
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden />
          Back to home
        </Link>
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Certificate verification
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Verify Authenticity
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Enter a certificate ID or scan the QR code to instantly verify
          authenticity and view complete analysis data
        </p>
        <div className="mt-10 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg ring-1 ring-accent-sky-100/60 sm:p-8">
          <CertificateCodeForm />
          <p className="mt-4 text-center text-sm text-slate-500">
            Try our demo: Enter{" "}
            <Link
              href="/verify?code=VP-A3F7B2-KPVX"
              className="font-mono font-medium text-brand-600 hover:underline"
            >
              VP-A3F7B2-KPVX
            </Link>{" "}
            above
          </p>
          <p className="mt-6 text-center">
            <Link
              href="/verify?code=VP-A3F7B2-KPVX"
              className="text-sm font-medium text-brand-600 underline-offset-4 hover:underline"
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
