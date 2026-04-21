import type { CertificateRecord } from "@/types/certificate";

export type AdminCertificateRecord = CertificateRecord & {
  user_id: string | null;
  owner_email: string | null;
};

export type AdminCertificateStats = {
  total: number;
  verified: number;
  pending: number;
  revoked: number;
  otherStatus: number;
  distinctPeptides: number;
  createdLast7Days: number;
};
