import Link from "next/link";

import { SiteLogo } from "@/components/branding/site-logo";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function AuthChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <header className="sticky top-0 z-40 border-b border-[var(--bg-border)] bg-[var(--bg-surface)]/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-[var(--bg-surface)]/90">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
          >
            <SiteLogo size="sm" className="w-24" imageClassName="block" />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-xl text-[var(--text-secondary)] hover:bg-[var(--accent-subtle)] hover:text-[var(--accent-primary)]",
              )}
            >
              Home
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl border-[var(--bg-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]",
              )}
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-xl bg-[var(--accent-primary)] text-[var(--text-inverse)] shadow-sm hover:bg-[var(--accent-hover)]",
              )}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
