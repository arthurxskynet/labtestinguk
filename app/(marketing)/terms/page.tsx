import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/compliance/legal-page-layout";
import { LegalIdentityBlock } from "@/components/compliance/legal-identity-block";
import { LEGAL_IDENTITY } from "@/lib/compliance/legal-identity";
import { MANUAL_REGISTRY_ENTRY_DISCLAIMER } from "@/lib/compliance/disclaimers";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for Verifypeps analytical testing services, sample handling, payment, and certificate documentation.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      description="These terms apply to analytical testing services coordinated by Verifypeps. They do not cover sale of peptide products."
    >
      <LegalSection title="Service provider">
        <LegalIdentityBlock className="text-slate-600" showVat />
      </LegalSection>

      <LegalSection title="Scope of service">
        <p>
          Verifypeps provides independent analytical testing coordination and certificate documentation for research and verification purposes. We do not sell peptide products, provide medical advice, or supply materials for human or veterinary administration.
        </p>
        <p>
          Certificates report analytical results for the sample as received under the stated method. They are not a safety assessment, regulatory approval, or fitness-for-purpose determination.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You must not use our services to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Support human or veterinary administration of unlicensed substances</li>
          <li>Misrepresent certificates as medical, clinical, or product-release documentation</li>
          <li>Submit samples you are not authorised to send for testing</li>
          <li>Attempt to interfere with the certificate registry or verification systems</li>
        </ul>
        <p>
          Full prohibited-use terms are set out in our{" "}
          <Link href="/research-use-only" className="text-brand-600 hover:underline">
            Research Use Only policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Sample acceptance and handling">
        <ul className="list-disc space-y-2 pl-5">
          <li>Samples must be clearly labelled with your order or batch reference</li>
          <li>We may reject samples that are mislabelled, compromised, insufficient, or outside agreed scope</li>
          <li>Rejected samples may be returned or disposed of according to your instructions and applicable rules</li>
          <li>Residual sample retention and disposal windows are communicated at acceptance</li>
        </ul>
      </LegalSection>

      <LegalSection title="Turnaround and delays">
        <p>
          Any turnaround estimates are non-binding and depend on method, queue, sample condition, and partner-laboratory availability. We will communicate material delays where practicable.
        </p>
      </LegalSection>

      <LegalSection title="Partner laboratories">
        <p>
          Some tests may be performed by qualified partner laboratories, including facilities in the European Union for selected HPLC methods. See our{" "}
          <Link href="/lab-partner-disclosure" className="text-brand-600 hover:underline">
            laboratory partner disclosure
          </Link>{" "}
          for role allocation and certificate limitations.
        </p>
      </LegalSection>

      <LegalSection title="Fees and payment">
        <p>
          Payment is by bank transfer unless otherwise agreed in writing. Services commence after sample acceptance and any required payment confirmation according to your order terms. Prices quoted exclude VAT where applicable unless stated otherwise.
        </p>
      </LegalSection>

      <LegalSection title="Cancellation and refunds">
        <p>
          You may cancel before analytical work has commenced. Once testing has started, fees may be charged for work completed and non-recoverable third-party costs. Refunds, where due, are processed to the original payer by bank transfer within a reasonable period.
        </p>
      </LegalSection>

      <LegalSection title="Certificate registry and verification">
        <p>
          Public verification confirms consistency with our registry at the time of lookup. Printed or forwarded PDF copies are informational; the online registry entry is the authoritative reference for record matching.
        </p>
        <p>{MANUAL_REGISTRY_ENTRY_DISCLAIMER}</p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by law, our liability for any claim arising from the services is limited to the fees paid for the specific order giving rise to the claim. We are not liable for indirect or consequential loss, loss of profit, or reliance on certificates beyond their stated research-documentation purpose.
        </p>
        <p>Nothing in these terms excludes liability that cannot be excluded under applicable law.</p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of England and Wales. Courts in England and Wales have exclusive jurisdiction, subject to mandatory consumer protections where applicable.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms:{" "}
          <a href={`mailto:${LEGAL_IDENTITY.contactEmail}`} className="text-brand-600 hover:underline">
            {LEGAL_IDENTITY.contactEmail}
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
