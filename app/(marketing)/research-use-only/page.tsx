import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/compliance/legal-page-layout";
import { RESEARCH_USE_ONLY_FULL, MANUAL_REGISTRY_ENTRY_DISCLAIMER } from "@/lib/compliance/disclaimers";

export const metadata: Metadata = {
  title: "Research Use Only",
  description:
    "Verifypeps research-use-only and prohibited-use policy for analytical testing services.",
};

export default function ResearchUseOnlyPage() {
  return (
    <LegalPageLayout
      title="Research Use Only Policy"
      description="This policy defines the permitted scope of our analytical testing services and prohibited uses of certificates and results."
    >
      <LegalSection title="Purpose">
        <p>{RESEARCH_USE_ONLY_FULL}</p>
      </LegalSection>

      <LegalSection title="Permitted use">
        <ul className="list-disc space-y-2 pl-5">
          <li>Laboratory research documentation and internal batch records</li>
          <li>Independent analytical verification of submitted research samples</li>
          <li>Supplier or batch traceability checks within a research context</li>
          <li>Registry lookup to confirm certificate record consistency</li>
        </ul>
      </LegalSection>

      <LegalSection title="Prohibited use">
        <p>You must not use our services, certificates, or website content to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Promote, supply, or administer products for human or veterinary use</li>
          <li>Make or imply therapeutic, cosmetic, anti-ageing, weight-loss, or disease-related claims</li>
          <li>Provide or solicit dosage, injection, or administration guidance</li>
          <li>Represent results as medicinal product approval, clinical suitability, or safety clearance</li>
          <li>Mislabel certificates as compliance or release documentation for consumer products</li>
        </ul>
      </LegalSection>

      <LegalSection title="Sample submissions">
        <p>
          By submitting a sample, you confirm you are authorised to send it for analytical testing, that it is intended for lawful research documentation purposes, and that you will not use results in breach of this policy.
        </p>
        <p className="mt-3">{MANUAL_REGISTRY_ENTRY_DISCLAIMER}</p>
        <p className="mt-3">
          Portal-created registry records reflect data as entered at issuance and may remain pending until review. They do not represent independent third-party re-analysis unless explicitly stated on the certificate.
        </p>
      </LegalSection>

      <LegalSection title="Enforcement">
        <p>
          We may refuse, suspend, or terminate services where use appears inconsistent with this policy or applicable law. We may retain records required for compliance and dispute resolution.
        </p>
      </LegalSection>

      <LegalSection title="Related information">
        <p>
          See our{" "}
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>,{" "}
          <Link href="/lab-partner-disclosure" className="text-brand-600 hover:underline">Laboratory partner disclosure</Link>, and{" "}
          <Link href="/help" className="text-brand-600 hover:underline">Help &amp; FAQ</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
