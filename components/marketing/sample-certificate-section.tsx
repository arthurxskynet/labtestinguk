import Link from "next/link";

import { CertificateStatsGrid } from "@/components/marketing/certificate-stats-grid";
import { QrPlaceholder } from "@/components/marketing/qr-placeholder";
import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { SampleChromatogram } from "@/components/marketing/sample-chromatogram";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SampleCertificateSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-sky-700">
            Analysis overview
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Professional Peptide Testing
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Independent third-party verification with HPLC analysis, mass
            spectrometry, and QR-verified certificates
          </p>
        </RevealOnView>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="lab-cert-card-wrap lab-cert-float">
            <div className="lab-cert-card-inner overflow-hidden rounded-2xl">
              <Card className="overflow-hidden rounded-2xl border-0 border-slate-200/90 bg-white shadow-none">
                <CardHeader className="border-b border-slate-100 bg-slate-50/80">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-slate-900">
                        BPC-157
                      </CardTitle>
                      <CardDescription className="font-mono text-sm text-slate-600">
                        VP-A3F7B2-KPVX
                      </CardDescription>
                    </div>
                    <Badge className="border-0 bg-success-500 text-white shadow-sm hover:bg-success-500">
                      99.91% purity
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        HPLC — UV trace
                      </p>
                      <p className="text-sm text-slate-600">
                        Single peak profile (illustrative)
                      </p>
                    </div>
                    <QrPlaceholder className="size-24 shrink-0 self-center rounded-lg border border-accent-sky-200/80 bg-white p-1 shadow-sm ring-1 ring-slate-100" />
                  </div>
                  <div className="min-h-[256px] w-full rounded-lg border border-slate-100 bg-gradient-to-b from-white to-slate-50/80 p-2 pb-3">
                    <SampleChromatogram peptideName="BPC-157" />
                  </div>
                  <p className="text-center text-xs text-slate-500">
                    <Link
                      href="/verify?code=VP-A3F7B2-KPVX"
                      className="font-medium text-brand-600 underline-offset-4 hover:underline"
                    >
                      Or view sample certificate preview
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <CertificateStatsGrid />
        </div>
      </div>
    </section>
  );
}
