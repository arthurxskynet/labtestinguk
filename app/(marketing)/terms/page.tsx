import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-6 text-sm leading-relaxed text-slate-600">
        These placeholder terms will set out service scope, sample acceptance,
        turnaround targets, limitations of liability, and acceptable use. Results
        are provided for research and verification purposes. Contact{" "}
        <a href="mailto:hello@verifypeps.com" className="text-brand-600">
          hello@verifypeps.com
        </a>{" "}
        for contractual enquiries.
      </p>
    </div>
  );
}
