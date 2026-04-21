"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, LayoutDashboard, Settings } from "lucide-react";

import { signOut } from "@/lib/actions/auth";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard/certificates", label: "My Certificates", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "Add New Test", icon: FlaskConical },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardNavBranding() {
  return (
    <div className="border-b border-slate-100 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        Lab Portal
      </p>
      <p className="mt-1 text-sm font-semibold text-foreground">Verifypeps</p>
    </div>
  );
}

export function DashboardNavLinks({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-1 flex-col gap-1 p-3", className)}>
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onNavigate?.()}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "min-h-10 justify-start gap-2 rounded-xl text-muted-foreground",
              active &&
                "bg-brand-50 font-medium text-brand-700 hover:bg-brand-50",
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function DashboardSignOut({ className }: { className?: string }) {
  return (
    <div className={cn("border-t border-slate-100 p-3", className)}>
      <form action={signOut}>
        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "min-h-10 w-full rounded-xl border-slate-200 text-muted-foreground",
          )}
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
