import type { SupabaseClient } from "@supabase/supabase-js";

import type { CertificateRecord } from "@/types/certificate";
import type {
  AdminCertificateRecord,
  AdminCertificateStats,
} from "@/types/admin-certificate";

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
  user_id: string | null;
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

export function batchRefFromDetails(
  details: Record<string, unknown>,
): string | null {
  const b = details.batch_ref ?? details.batch;
  return typeof b === "string" && b.trim() ? b : null;
}

export function computeAdminCertificateStats(
  records: CertificateRecord[],
  nowMs: number = Date.now(),
): AdminCertificateStats {
  const peptides = new Set<string>();
  let verified = 0;
  let pending = 0;
  let revoked = 0;
  let otherStatus = 0;
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const cutoff = nowMs - weekMs;
  let createdLast7Days = 0;

  for (const r of records) {
    peptides.add(r.peptide_name);
    const s = String(r.status).toLowerCase();
    if (s === "verified") verified++;
    else if (s === "pending") pending++;
    else if (s === "revoked") revoked++;
    else otherStatus++;
    if (new Date(r.created_at).getTime() >= cutoff) createdLast7Days++;
  }

  return {
    total: records.length,
    verified,
    pending,
    revoked,
    otherStatus,
    distinctPeptides: peptides.size,
    createdLast7Days,
  };
}

/**
 * Fetches all certificates (admin RLS) and merges owner emails from `profiles`.
 * Accepts any Supabase client for tests.
 */
export async function fetchAdminCertificatesWithOwners(
  client: SupabaseClient,
): Promise<AdminCertificateRecord[]> {
  const { data, error } = await client
    .from("certificates")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  const rows = data as CertRow[];
  const base = rows.map((row) => ({
    ...toRecord(row),
    user_id: row.user_id,
    owner_email: null as string | null,
  }));

  const ids = [
    ...new Set(
      rows.map((r) => r.user_id).filter((id): id is string => id != null),
    ),
  ];

  if (ids.length === 0) {
    return base;
  }

  const { data: profiles, error: profErr } = await client
    .from("profiles")
    .select("id, email")
    .in("id", ids);

  if (profErr || !profiles) {
    return base;
  }

  const emailById = new Map<string, string | null>();
  for (const p of profiles as { id: string; email: string | null }[]) {
    emailById.set(p.id, p.email);
  }

  return base.map((r) => ({
    ...r,
    owner_email: r.user_id ? emailById.get(r.user_id) ?? null : null,
  }));
}
