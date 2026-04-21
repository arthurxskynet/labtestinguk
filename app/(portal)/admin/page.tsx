import type { Metadata } from "next";

import { AdminKpiStrip } from "@/components/admin/admin-kpi-strip";
import { AdminRecentTable } from "@/components/admin/admin-recent-table";
import { getAdminOverviewData } from "@/lib/data/admin-portal";

export const metadata: Metadata = {
  title: "Overview",
};

export default async function AdminOverviewPage() {
  const { stats, recent } = await getAdminOverviewData();

  return (
    <div className="p-6 lg:p-10">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Overview</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Aggregate certificate metrics and the most recent rows across all
            lab submissions and catalogue entries. Use{" "}
            <span className="font-medium text-foreground">All certificates</span>{" "}
            for search and filters.
          </p>
        </header>

        <AdminKpiStrip stats={stats} />

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Recent activity
          </h2>
          <AdminRecentTable certificates={recent} />
        </section>
      </div>
    </div>
  );
}
