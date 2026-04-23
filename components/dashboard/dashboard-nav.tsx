"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FlaskConical, LayoutDashboard, Settings } from "lucide-react";

import { signOut } from "@/lib/actions/auth";
import { SiteLogo } from "@/components/branding/site-logo";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard/certificates", label: "My Certificates", icon: LayoutDashboard },
  { href: "/dashboard/new", label: "Add New Test", icon: FlaskConical },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardNavBranding() {
  return (
    <div className="border-b border-[var(--bg-border)] px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Lab Portal
      </p>
      <SiteLogo size="sm" className="mt-2 w-36" imageClassName="block" />
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
                "bg-[var(--accent-subtle)] font-medium text-[var(--accent-primary)] hover:bg-[var(--accent-subtle)]",
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
    <div className={cn("border-t border-[var(--bg-border)] p-3", className)}>
      <form action={signOut}>
        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "min-h-10 w-full rounded-xl border-[var(--bg-border)] text-muted-foreground hover:bg-[var(--bg-elevated)]",
          )}
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
