"use client";

import type { CertificateRecord } from "@/types/certificate";

import { CertificateViewer } from "@/components/certificates/certificate-viewer";

export function CertificateDetail({
  certificate,
}: {
  certificate: CertificateRecord;
}) {
  return <CertificateViewer certificate={certificate} variant="page" />;
}
