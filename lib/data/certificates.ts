import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { CertificateRecord } from "@/types/certificate";

type CertRow = {
  id: string;
  code: string;
  peptide_name: string;
  purity_percent: number | null;
  molecular_weight: number | null;
  hplc_purity: string | null;
  lcms_ppm: number | null;
  status: string;
  created_at: string;
  details: unknown;
};

function toRecord(row: CertRow): CertificateRecord {
  return {
    id: row.id,
    code: row.code,
    peptide_name: row.peptide_name,
    purity_percent: row.purity_percent,
    molecular_weight: row.molecular_weight,
    hplc_purity: row.hplc_purity,
    lcms_ppm: row.lcms_ppm,
    status: row.status,
    created_at: row.created_at,
    details:
      typeof row.details === "object" && row.details !== null
        ? (row.details as Record<string, unknown>)
        : {},
  };
}

export async function getMyCertificates(): Promise<CertificateRecord[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }
  return (data as CertRow[]).map(toRecord);
}
