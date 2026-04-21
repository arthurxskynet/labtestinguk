import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Profile and notification preferences will be configured here.
        </p>
        <p className="mt-6 rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Settings coming soon.
        </p>
      </div>
    </div>
  );
}
