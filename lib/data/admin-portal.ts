import "server-only";

import { requireAdmin } from "@/lib/auth/require-admin";
import type { AdminCertificateRecord } from "@/types/admin-certificate";

import {
  computeAdminCertificateStats,
  fetchAdminCertificatesWithOwners,
} from "./admin-certificates";

export async function getAdminCertificates(): Promise<AdminCertificateRecord[]> {
  const { supabase } = await requireAdmin();
  return fetchAdminCertificatesWithOwners(supabase);
}

export async function getAdminOverviewData() {
  const { supabase } = await requireAdmin();
  const certificates = await fetchAdminCertificatesWithOwners(supabase);
  const stats = computeAdminCertificateStats(certificates);
  const recent = certificates.slice(0, 12);
  return { certificates, stats, recent };
}
