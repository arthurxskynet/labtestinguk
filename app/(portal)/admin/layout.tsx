import type { Metadata } from "next";

import { AdminChrome } from "@/components/admin/admin-chrome";
import { requireAdmin } from "@/lib/auth/require-admin";

export const metadata: Metadata = {
  title: "Admin",
  description:
    "Verifypeps admin — certificate overview for authorised lab staff.",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return <AdminChrome>{children}</AdminChrome>;
}
