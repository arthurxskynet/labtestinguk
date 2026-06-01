import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalPageLayout,
  LegalSection,
} from "@/components/compliance/legal-page-layout";
import { LegalIdentityBlock } from "@/components/compliance/legal-identity-block";
import { LEGAL_IDENTITY } from "@/lib/compliance/legal-identity";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Verifypeps processes personal data for analytical testing services, certificate registry lookup, and customer communications.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      description="This policy explains how we collect, use, and protect personal data when you use our website, Lab Portal, and testing services."
    >
      <LegalSection title="Who we are">
        <LegalIdentityBlock className="text-slate-600" showVat />
        <p>
          For UK GDPR purposes, the data controller is{" "}
          {LEGAL_IDENTITY.legalOwnerName} trading as {LEGAL_IDENTITY.tradingName}.
        </p>
      </LegalSection>

      <LegalSection title="What data we collect">
        <p>Depending on how you use our services, we may process:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Contact details (name, email, organisation) submitted via forms or the Lab Portal</li>
          <li>Account and authentication data for portal access</li>
          <li>Sample submission metadata (batch references, order identifiers, method selections)</li>
          <li>Certificate registry data you choose to make lookup-accessible</li>
          <li>Communications with our team (email and support messages)</li>
          <li>Technical logs required to operate the website securely (IP address, browser type, timestamps)</li>
        </ul>
        <p>We do not intentionally collect special category data or health data.</p>
      </LegalSection>

      <LegalSection title="How we use your data and lawful bases">
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Service delivery</strong> — to accept samples, perform testing coordination, issue certificates, and respond to enquiries (contract / legitimate interests).
          </li>
          <li>
            <strong>Account administration</strong> — to manage Lab Portal access and security (contract / legitimate interests).
          </li>
          <li>
            <strong>Legal and regulatory compliance</strong> — to meet record-keeping and consumer information obligations where applicable (legal obligation / legitimate interests).
          </li>
          <li>
            <strong>Marketing communications</strong> — only where you opt in (consent). You may withdraw consent at any time.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Cookies and similar technologies">
        <p>
          We use essential cookies and local storage required for authentication, session management, and security. We do not use non-essential analytics or advertising cookies in the current site version.
        </p>
        <p>
          If this changes, we will update this policy and, where required under PECR, obtain consent before placing non-essential cookies.
        </p>
      </LegalSection>

      <LegalSection title="Sharing and processors">
        <p>We may share data with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Hosting and infrastructure providers</li>
          <li>Authentication and database services (Supabase)</li>
          <li>Qualified partner laboratories performing agreed analytical methods, including EU facilities for selected HPLC methods</li>
          <li>Professional advisers where legally required</li>
        </ul>
        <p>
          Processors are engaged under appropriate data protection terms. Partner laboratories receive only the information required to perform the agreed test scope.
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          Some processors may process data outside the UK. Where this occurs, we use appropriate safeguards such as UK IDTA-style contractual protections or equivalent mechanisms permitted under UK GDPR.
        </p>
      </LegalSection>

      <LegalSection title="Retention">
        <ul className="list-disc space-y-2 pl-5">
          <li>Account data: retained while your account is active and for a reasonable period thereafter</li>
          <li>Certificate and testing records: retained as required for service continuity, audit, and legal obligations</li>
          <li>Enquiry and marketing data: retained according to purpose and consent status</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Under UK GDPR you may have rights to access, rectify, erase, restrict, or object to processing, and to data portability where applicable. You may also lodge a complaint with the Information Commissioner&apos;s Office (ICO) at{" "}
          <a href="https://ico.org.uk" className="text-brand-600 hover:underline" rel="noopener noreferrer" target="_blank">
            ico.org.uk
          </a>
          .
        </p>
        <p>
          To exercise your rights, contact{" "}
          <a href={`mailto:${LEGAL_IDENTITY.contactEmail}`} className="text-brand-600 hover:underline">
            {LEGAL_IDENTITY.contactEmail}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Related policies">
        <p>
          See also our{" "}
          <Link href="/terms" className="text-brand-600 hover:underline">Terms of Service</Link>,{" "}
          <Link href="/research-use-only" className="text-brand-600 hover:underline">Research Use Only policy</Link>, and{" "}
          <Link href="/lab-partner-disclosure" className="text-brand-600 hover:underline">Laboratory partner disclosure</Link>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
