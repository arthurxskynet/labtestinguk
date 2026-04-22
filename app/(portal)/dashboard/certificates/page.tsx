import type { Metadata } from "next";

import { AmpoulabsNote } from "@/components/certificates/ampoulabs-note";
import { CertificatesTable } from "@/components/dashboard/certificates-table";
import { getMyCertificates } from "@/lib/data/certificates";

export const metadata: Metadata = {
  title: "My Certificates",
};

export default async function CertificatesPage() {
  const certificates = await getMyCertificates();

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold text-foreground">My Certificates</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Certificates you created in the Lab Portal. Public verification works
          for anyone with the code — no login required.
        </p>
        <AmpoulabsNote className="mt-4" />
        <div className="mt-8">
          <CertificatesTable certificates={certificates} />
        </div>
      </div>
    </div>
  );
}
