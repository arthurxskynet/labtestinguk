import Link from "next/link";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { CertificateCodeForm } from "@/components/verify/certificate-code-form";

export function VerifySection() {
  return (
    <section
      id="verify"
      className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-sky-700">
            Certificate check
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Verify Authenticity
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Enter a certificate ID or scan the QR code to instantly verify
            authenticity and view complete analysis data
          </p>
        </RevealOnView>
        <RevealOnView className="mx-auto mt-10 max-w-2xl">
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
        </RevealOnView>
      </div>
    </section>
  );
}
