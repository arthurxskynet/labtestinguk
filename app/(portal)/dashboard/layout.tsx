import type { Metadata } from "next";

import { DashboardChrome } from "@/components/dashboard/dashboard-chrome";

export const metadata: Metadata = {
  title: "Lab Portal",
  description:
    "Verifypeps Lab Portal — certificates, new tests, and order references.",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardChrome>{children}</DashboardChrome>;
}
