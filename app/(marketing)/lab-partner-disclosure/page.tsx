import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/compliance/legal-page-layout";
import {
  EU_HPLC_PARTNER_NOTE,
  MANUAL_REGISTRY_ENTRY_DISCLAIMER,
  OUTSOURCED_LAB_SUMMARY,
  VERIFICATION_REGISTRY_DISCLAIMER,
} from "@/lib/compliance/disclaimers";

export const metadata: Metadata = {
  title: "Laboratory Partner Disclosure",
  description:
    "How Verifypeps coordinates peptide testing in the UK and when EU partner laboratories perform analytical work.",
};

export default function LabPartnerDisclosurePage() {
  return (
    <LegalPageLayout
      title="Laboratory Partner Disclosure"
      description="Transparency about how analytical work is allocated between Verifypeps (UK) and qualified partner laboratories, including EU facilities for selected HPLC methods."
    >
      <LegalSection title="Overview">
        <p>{OUTSOURCED_LAB_SUMMARY}</p>
      </LegalSection>

      <LegalSection title="EU partner laboratories (HPLC and other methods)">
        <p>{EU_HPLC_PARTNER_NOTE}</p>
        <p>
          Where testing is performed in the EU, samples may be transferred from
          the UK intake workflow to the partner facility under documented
          chain-of-custody. The certificate identifies the method performed and
          reports results for the sample as received—it does not imply UK-only
          performance unless explicitly stated on that certificate.
        </p>
      </LegalSection>

      <LegalSection title="Role allocation">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Verifypeps (UK)</strong> — client communication, sample intake coordination, order documentation, certificate issuance, and public registry verification
          </li>
          <li>
            <strong>Partner laboratories (including EU facilities)</strong> — performance of agreed analytical methods (for example HPLC, LC-MS, LAL endotoxin) within defined scope
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Method selection">
        <p>
          Tests are allocated based on method availability, sample type, and agreed scope. HPLC purity work may be routed to EU partner laboratories depending on method and capacity. The certificate states the method performed and reports results for the sample as received.
        </p>
      </LegalSection>

      <LegalSection title="Accreditation and quality statements">
        <p>
          Any accreditation or quality-system references apply only where explicitly stated on a certificate or written confirmation for a specific method and facility. We do not claim that all work is performed under one accreditation, in one country, or at one site unless clearly documented and attributable.
        </p>
      </LegalSection>

      <LegalSection title="Chain of custody">
        <p>
          Sample handling steps are documented from UK intake through reporting. Where a partner laboratory performs testing—including EU facilities—custody transfer points are recorded in the service workflow. Certificates reflect the analytical record returned for the agreed scope.
        </p>
      </LegalSection>

      <LegalSection title="Registry records and portal-submitted data">
        <p>{MANUAL_REGISTRY_ENTRY_DISCLAIMER}</p>
        <p>
          Records submitted via the authenticated research portal reflect data as entered at issuance. They may remain in a pending registry status until review is complete. Chromatogram traces on the verification page are representative of the recorded purity class and may be normalised for display.
        </p>
      </LegalSection>

      <LegalSection title="What certificates do not represent">
        <p>{VERIFICATION_REGISTRY_DISCLAIMER}</p>
        <p>
          Certificates are not product warranties, medical assessments, or regulatory approvals. See our{" "}
          <Link href="/research-use-only" className="text-brand-600 hover:underline">
            Research Use Only policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>
          For scope or method questions before submission, contact us via the{" "}
          <Link href="/#contact" className="text-brand-600 hover:underline">
            contact form
          </Link>{" "}
          or Help pages.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
