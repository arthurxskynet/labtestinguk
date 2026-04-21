import type { Metadata } from "next";

import { AdminCertificatesTable } from "@/components/admin/admin-certificates-table";
import { getAdminCertificates } from "@/lib/data/admin-portal";

export const metadata: Metadata = {
  title: "All certificates",
};

export default async function AdminCertificatesPage() {
  const certificates = await getAdminCertificates();

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            All certificates
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Full list with owner email (from profiles), batch reference from lab
            details, and quick access to the public verification page. Research
            reference data only.
          </p>
        </header>

        <AdminCertificatesTable certificates={certificates} />
      </div>
    </div>
  );
}
