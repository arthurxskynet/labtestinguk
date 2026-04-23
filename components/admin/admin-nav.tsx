"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ScrollText, Shield } from "lucide-react";

import { signOut } from "@/lib/actions/auth";
import { SiteLogo } from "@/components/branding/site-logo";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const items = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/certificates", label: "All certificates", icon: ScrollText },
] as const;

export function AdminNavBranding() {
  return (
    <div className="border-b border-slate-100 px-4 py-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
        <Shield className="size-3.5 text-accent-sky-600" aria-hidden />
        Admin
      </p>
      <SiteLogo size="sm" className="mt-2 w-36" imageClassName="block" />
      <p className="mt-1 text-xs text-muted-foreground">
        Lab data overview — research use only.
      </p>
    </div>
  );
}

export function AdminNavLinks({
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
          item.href === "/admin"
            ? pathname === "/admin"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onNavigate?.()}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "min-h-10 justify-start gap-2 rounded-xl text-muted-foreground",
              active &&
                "bg-accent-sky-50 font-medium text-accent-sky-700 hover:bg-accent-sky-50",
            )}
          >
            <item.icon className="size-4 shrink-0" aria-hidden />
            {item.label}
          </Link>
        );
      })}
      <Link
        href="/dashboard/certificates"
        onClick={() => onNavigate?.()}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "min-h-10 justify-start gap-2 rounded-xl text-muted-foreground",
        )}
      >
        Lab Portal
      </Link>
    </nav>
  );
}

export function AdminSignOut({ className }: { className?: string }) {
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
