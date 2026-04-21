export type CertificateStatus = "verified" | "pending" | "revoked";

export type CertificateRecord = {
  id: string;
  code: string;
  peptide_name: string;
  purity_percent: number | null;
  molecular_weight: number | null;
  hplc_purity: string | null;
  lcms_ppm: number | null;
  status: CertificateStatus | string;
  created_at: string;
  details: Record<string, unknown>;
};
