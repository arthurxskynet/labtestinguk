import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";

import { CertificateDetail } from "@/components/verify/certificate-detail";
import { VerifyLookupHero } from "@/components/verify/verify-lookup-hero";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const certificateCodeSchema = z.string().trim().min(4).max(80);

type Props = {
  searchParams: Promise<{ code?: string }>;
};

export const metadata: Metadata = {
  title: "Verify certificate",
  description:
    "Enter a Verifypeps certificate ID or scan a QR code to view HPLC and LC-MS summary data for research traceability.",
};

export default async function VerifyPage({ searchParams }: Props) {
  const { code } = await searchParams;
  const trimmed = code?.trim();

  if (!trimmed) {
    return <VerifyLookupHero />;
  }

  const parsed = certificateCodeSchema.safeParse(trimmed);
  if (!parsed.success) {
    return <VerifyLookupHero />;
  }

  const hasConfig =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  if (!hasConfig) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <p className="text-slate-600">
          Supabase environment variables are not configured. Add{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
          </code>{" "}
          to verify certificates.
        </p>
        <Link
          href="/verify"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "mt-6 inline-flex border-brand-200",
          )}
        >
          <ArrowLeft className="mr-2 size-4" aria-hidden />
          Back to lookup
        </Link>
      </div>
    );
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc("get_certificate_by_code", {
    lookup_code: trimmed,
  });

  const row = Array.isArray(data) ? data[0] : data;

  if (error || !row) {
    return (
      <div className="min-h-[60vh] border-b border-slate-200 bg-gradient-to-b from-red-50/40 to-white">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-red-700">
            Not found
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            Certificate not found
          </h1>
          <p className="mt-4 text-slate-600">
            No record matched code{" "}
            <span className="font-mono font-semibold text-slate-900">
              {trimmed}
            </span>
            . Check the code and try again.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/verify"
              className={cn(
                buttonVariants({ size: "lg" }),
                "min-w-[200px] bg-primary text-primary-foreground shadow-md hover:bg-brand-500",
              )}
            >
              New search
            </Link>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "min-w-[200px] border-slate-200",
              )}
            >
              Back home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
      <CertificateDetail
        certificate={{
          id: row.id as string,
          code: row.code as string,
          peptide_name: row.peptide_name as string,
          purity_percent: row.purity_percent as number | null,
          molecular_weight: row.molecular_weight as number | null,
          hplc_purity: row.hplc_purity as string | null,
          lcms_ppm: row.lcms_ppm as number | null,
          status: row.status as string,
          created_at: row.created_at as string,
          details: (row.details ?? {}) as Record<string, unknown>,
        }}
      />
    </div>
  );
}
