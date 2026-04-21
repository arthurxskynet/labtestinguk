import Link from "next/link";

import type { AdminCertificateRecord } from "@/types/admin-certificate";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

function statusBadgeVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  const s = status.toLowerCase();
  if (s === "verified") return "default";
  if (s === "pending") return "outline";
  if (s === "revoked") return "destructive";
  return "secondary";
}

export function AdminRecentTable({
  certificates,
}: {
  certificates: AdminCertificateRecord[];
}) {
  if (certificates.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center text-sm text-muted-foreground">
        No certificate rows yet. Demo catalogue data appears after schema seed.
      </div>
    );
  }

  return (
    <div className="min-w-0 overflow-x-auto rounded-2xl border border-slate-200/90 bg-white shadow-md">
      <table className="min-w-[44rem] w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Peptide</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Link</th>
          </tr>
        </thead>
        <tbody>
          {certificates.map((c) => (
            <tr
              key={c.id}
              className="border-b border-slate-100 last:border-0 hover:bg-slate-50/80"
            >
              <td className="px-4 py-3 font-mono text-xs">{c.code}</td>
              <td className="px-4 py-3 font-medium text-foreground">
                {c.peptide_name}
              </td>
              <td className="px-4 py-3">
                <Badge variant={statusBadgeVariant(String(c.status))}>
                  {c.status}
                </Badge>
              </td>
              <td className="max-w-[10rem] truncate px-4 py-3 text-muted-foreground">
                {c.owner_email ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(c.created_at).toLocaleString("en-GB", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  href={`/verify?code=${encodeURIComponent(c.code)}`}
                  className={cn(
                    buttonVariants({ variant: "default", size: "sm" }),
                    "inline-flex",
                  )}
                >
                  Verify
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
