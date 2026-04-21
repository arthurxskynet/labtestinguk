import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help & FAQ",
  description:
    "Everything you need to know about peptide verification and understanding your certificate.",
};

const jumpLinks = [
  { id: "general", label: "General" },
  { id: "verification", label: "Verification & Security" },
  { id: "process", label: "Process" },
  { id: "technical", label: "Technical" },
  { id: "certificate", label: "Understanding Your Certificate" },
  { id: "glossary", label: "Glossary of Key Terms" },
];

export default function HelpPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Help &amp; FAQ
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Everything you need to know about peptide verification and
            understanding your certificate
          </p>
          <p className="mt-2 text-sm text-slate-500">Updated: March 2026</p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:flex lg:gap-12 lg:px-8">
        <aside className="mb-10 shrink-0 lg:w-56">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
            Jump to
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {jumpLinks.map((j) => (
              <li key={j.id}>
                <a
                  href={`#${j.id}`}
                  className="text-brand-600 hover:underline"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <div className="min-w-0 flex-1 space-y-16 text-slate-700">
          <section id="general">
            <h2 className="text-2xl font-bold text-slate-900">General</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Verifypeps provides independent analytical testing for research
              and verification. Certificates summarise methods, results, and QC
              checks for the sample as received.
            </p>
          </section>

          <section id="verification">
            <h2 className="text-2xl font-bold text-slate-900">
              Verification &amp; Security
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Each certificate includes a unique ID and QR link to our public{" "}
              <Link href="/verify" className="text-brand-600 hover:underline">
                verification page
              </Link>
              . Anyone can confirm that a PDF matches our records without signing
              in.
            </p>
          </section>

          <section id="process">
            <h2 className="text-2xl font-bold text-slate-900">Process</h2>
            <p className="mt-4 text-sm leading-relaxed">
              Order online, ship your sample to our UK receiving lab, and track
              status in your account. Analysts review chromatograms and MS data
              before release.
            </p>
          </section>

          <section id="technical">
            <h2 className="text-2xl font-bold text-slate-900">Technical</h2>
            <p className="mt-4 text-sm leading-relaxed">
              For sellers: create an account to generate verified certificates for
              your products.{" "}
              <Link href="/login" className="text-brand-600 hover:underline">
                Sign in or register here
              </Link>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed">
              Key metrics on certificates may include{" "}
              <Link href="#glossary" className="text-brand-600 hover:underline">
                mass accuracy
              </Link>
              , resolution, tailing factor, and theoretical plates — referenced
              against the method and suitability criteria for that run.
            </p>
          </section>

          <section id="certificate">
            <h2 className="text-2xl font-bold text-slate-900">
              Understanding Your Certificate
            </h2>
            <h3 className="mt-8 text-lg font-semibold text-slate-900">
              Key Quality Metrics
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Purity is typically reported as area percent from the integrated
              HPLC trace. Identity confirmation uses LC-MS with ppm error on the
              expected mass.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-slate-900">
              Chromatogram
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              The UV trace shows detected peaks vs time. System peaks and
              integration regions are defined in the method.
            </p>
            <h3 className="mt-8 text-lg font-semibold text-slate-900">
              System Suitability Table
            </h3>
            <p className="mt-2 text-sm leading-relaxed">
              Summarises criteria such as resolution and peak symmetry checked
              before sample sequences.
            </p>
          </section>

          <section id="glossary">
            <h2 className="text-2xl font-bold text-slate-900">
              Glossary of Key Terms
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-900">PPI</dt>
                <dd className="mt-1 text-slate-600">
                  Peak purity index — indicator of peak homogeneity at the
                  detection wavelength.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900">EU/mL</dt>
                <dd className="mt-1 text-slate-600">
                  Endotoxin units per millilitre — reported for LAL assays.
                </dd>
              </div>
            </dl>
          </section>

          <section id="sample-prep" className="border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-bold text-slate-900">
              Sample Preparation
            </h2>
            <p className="mt-4 text-sm leading-relaxed">
              Ship lyophilised material in a sealed vial with your order ID.
              Avoid cross-contaminating endotoxin samples with high-protein
              handling surfaces. A detailed preparation guide is available on
              request from{" "}
              <a
                href="mailto:hello@verifypeps.com"
                className="text-brand-600 hover:underline"
              >
                hello@verifypeps.com
              </a>
              .
            </p>
          </section>

          <p className="border-t border-slate-200 pt-10 text-sm text-slate-600">
            Still have questions? Contact us at{" "}
            <a
              href="mailto:hello@verifypeps.com"
              className="text-brand-600 hover:underline"
            >
              hello@verifypeps.com
            </a>{" "}
            or visit our{" "}
            <Link href="/#contact" className="text-brand-600 hover:underline">
              contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
