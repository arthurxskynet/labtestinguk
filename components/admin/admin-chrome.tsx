"use client";

import * as React from "react";
import { Menu } from "lucide-react";

import {
  AdminNavBranding,
  AdminNavLinks,
  AdminSignOut,
} from "@/components/admin/admin-nav";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 lg:flex-row">
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-3 lg:hidden">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-slate-100"
          aria-expanded={mobileOpen}
          aria-controls="admin-mobile-nav"
          aria-label="Open navigation menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" aria-hidden />
        </button>
        <span className="text-sm font-semibold text-foreground">Admin</span>
      </header>

      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent
          showCloseButton
          className="!fixed !inset-y-0 !top-0 !left-0 !z-50 flex !h-full !max-h-none w-[min(100vw-1.5rem,288px)] !max-w-none !translate-x-0 !translate-y-0 flex-col gap-0 rounded-none rounded-r-2xl border-y-0 border-l-0 border-r border-slate-200 p-0 shadow-xl sm:max-w-none data-open:slide-in-from-left-2 data-open:zoom-in-100 data-closed:slide-out-to-left-2 data-closed:zoom-out-100"
        >
          <DialogTitle className="sr-only">Admin navigation</DialogTitle>
          <DialogDescription className="sr-only">
            Overview, all certificates, and Lab Portal link.
          </DialogDescription>
          <div id="admin-mobile-nav" className="flex min-h-0 flex-1 flex-col">
            <AdminNavBranding />
            <AdminNavLinks
              className="min-h-0 flex-1"
              onNavigate={() => setMobileOpen(false)}
            />
            <AdminSignOut />
          </div>
        </DialogContent>
      </Dialog>

      <aside className="hidden w-64 shrink-0 flex-col border-slate-200 bg-white lg:flex lg:min-h-screen lg:border-r">
        <AdminNavBranding />
        <AdminNavLinks className="flex-1" />
        <AdminSignOut />
      </aside>

      <div className="min-w-0 flex-1 overflow-x-auto">{children}</div>
    </div>
  );
}
