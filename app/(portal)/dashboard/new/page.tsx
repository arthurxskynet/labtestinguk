import type { Metadata } from "next";

import { AmpoulabsNote } from "@/components/certificates/ampoulabs-note";
import { NewTestForm } from "@/components/dashboard/new-test-form";

export const metadata: Metadata = {
  title: "Add New Lab Test",
};

export default function NewLabTestPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground">Add New Lab Test</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Submit details for a new certificate. A unique code is generated
          automatically (format{" "}
          <span className="font-mono">VP-XXXXXX-XXXX</span>
          , with <span className="font-mono">-ETX</span> when endotoxin is
          selected).
        </p>
        <AmpoulabsNote className="mt-4" />
        <div className="mt-8 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-md lg:p-8">
          <NewTestForm />
        </div>
      </div>
    </div>
  );
}
