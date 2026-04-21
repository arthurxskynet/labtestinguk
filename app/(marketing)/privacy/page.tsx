import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      <p className="mt-6 text-sm leading-relaxed text-slate-600">
        This placeholder page outlines that Verifypeps processes account and
        order data to deliver testing services, issue certificates, and respond to
        enquiries. A full policy will describe lawful bases, retention, cookies,
        subprocessors, and your rights under UK GDPR. Contact{" "}
        <a href="mailto:hello@verifypeps.com" className="text-brand-600">
          hello@verifypeps.com
        </a>{" "}
        for privacy questions.
      </p>
    </div>
  );
}
