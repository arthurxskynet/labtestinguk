import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { VerifyCertificatePanel } from "@/components/marketing/verify-certificate-panel";
import { CertificateComplianceFooter } from "@/components/compliance/certificate-compliance-footer";
import { VerificationDisclaimer } from "@/components/compliance/verification-disclaimer";

export function VerifySection() {
  return (
    <section
      id="verify"
      className="relative overflow-hidden border-b border-[var(--bg-border)] bg-[var(--bg-base)] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,196,180,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative marketing-container">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            Certificate registry
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            Lookup a certificate record
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Enter a certificate ID or scan the QR code to view the registry entry and reported analytical data.
          </p>
        </RevealOnView>
        <RevealOnView className="relative z-[1] mt-12">
          <VerifyCertificatePanel placeholder="e.g. VP-A3F7B2-KPVX" />
          <VerificationDisclaimer className="mx-auto mt-6 max-w-2xl" />
          <CertificateComplianceFooter
            className="mx-auto mt-4 max-w-2xl"
            showResearchUseOnly={false}
          />
        </RevealOnView>
      </div>
    </section>
  );
}
