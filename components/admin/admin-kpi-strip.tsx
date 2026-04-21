import type { AdminCertificateStats } from "@/types/admin-certificate";

function Tile({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

export function AdminKpiStrip({ stats }: { stats: AdminCertificateStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Tile label="Total certificates" value={stats.total} />
      <Tile
        label="Verified"
        value={stats.verified}
        hint={`${stats.pending} pending`}
      />
      <Tile label="Distinct peptides" value={stats.distinctPeptides} />
      <Tile
        label="New (7 days)"
        value={stats.createdLast7Days}
        hint={
          stats.revoked > 0 || stats.otherStatus > 0
            ? `${stats.revoked} revoked · ${stats.otherStatus} other status`
            : undefined
        }
      />
    </div>
  );
}
