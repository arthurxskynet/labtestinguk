import { getLaunchBlockers } from "@/lib/compliance/legal-identity";

export function PrelaunchGateBanner() {
  const blockers = getLaunchBlockers().filter((b) => b.severity === "critical");
  if (blockers.length === 0) return null;

  return (
    <div
      role="status"
      className="border-b border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-900"
    >
      <p className="font-semibold">Pre-launch compliance notice</p>
      <ul className="mt-1 space-y-0.5 text-xs">
        {blockers.map((b) => (
          <li key={b.id}>{b.message}</li>
        ))}
      </ul>
    </div>
  );
}
