import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function AuthChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white">
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-[#0f172a] transition-opacity hover:opacity-80"
          >
            Verifypeps
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-xl text-[#334155]",
              )}
            >
              Home
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl border-slate-200",
              )}
            >
              Sign in
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "default", size: "sm" }),
                "rounded-xl shadow-sm",
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
