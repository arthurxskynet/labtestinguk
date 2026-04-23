"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { SiteLogo } from "@/components/branding/site-logo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/verify", label: "Verify" },
  { href: "/endotoxin-testing", label: "Endotoxin Testing" },
  { href: "/help", label: "Help" },
] as const;

const SCROLL_THRESHOLD_PX = 16;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MarketingHeader() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const firstFocusableRef = React.useRef<HTMLAnchorElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => firstFocusableRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        closeButtonRef.current?.focus();
      }
      if (e.key !== "Tab" || !overlayRef.current) return;
      const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const list = [...focusable].filter((el) => !el.hasAttribute("data-skip-focus-trap"));
      if (list.length === 0) return;
      const first = list[0]!;
      const last = list[list.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md transition-[padding,box-shadow] duration-300 ease-out supports-[backdrop-filter]:bg-white/90",
          scrolled && "shadow-md",
          scrolled ? "py-2" : "py-3",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8",
            scrolled &&
              "max-w-[min(960px,92vw)] rounded-full border border-slate-200/90 bg-white py-2 shadow-md",
          )}
        >
          <Link
            href="/"
            className="group relative flex shrink-0 items-center rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
            onClick={() => setOpen(false)}
          >
            <span className="rounded-lg px-1 py-0.5 ring-1 ring-transparent transition-[box-shadow] group-hover:ring-slate-200/80">
              <SiteLogo
                size="sm"
                priority
                className="w-28 sm:w-32"
                imageClassName="block"
              />
            </span>
            <span
              className="absolute -bottom-0.5 left-1 right-1 h-0.5 scale-x-0 rounded-full bg-[var(--accent-primary)] transition-transform duration-200 group-hover:scale-x-100"
              aria-hidden
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary navigation"
          >
            {nav.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-lg px-3 py-2 text-[14px] font-medium transition-colors duration-200",
                    active
                      ? "text-[#0f172a]"
                      : "text-slate-600 hover:text-[var(--accent-primary)]",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      className="absolute bottom-0 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[var(--accent-primary)]"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/verify"
              className={cn(
                "hidden items-center justify-center rounded-[var(--radius-pill)] border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-[#0f172a] transition-colors duration-200 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] sm:inline-flex",
              )}
            >
              Verify Certificate
            </Link>
            <Link
              href="/login"
              className="btn-primary-motion hidden items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-4 py-2 text-sm font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)] sm:inline-flex"
            >
              Lab Portal
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#0f172a] transition-colors hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav-overlay"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              <span className="sr-only">{open ? "Close navigation menu" : "Open navigation menu"}</span>
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          ref={overlayRef}
          id="mobile-nav-overlay"
          className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-10 pt-24 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="flex flex-col gap-2" aria-label="Mobile primary">
            {nav.map((item, i) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  ref={i === 0 ? firstFocusableRef : undefined}
                  href={item.href}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={cn(
                    "animate-fade-in rounded-xl px-4 py-3 text-lg font-medium",
                    active ? "text-[#0f172a]" : "text-slate-600",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/verify"
              className="animate-fade-in mt-4 rounded-[var(--radius-pill)] border border-slate-200 px-4 py-3 text-center text-base font-semibold text-[#0f172a]"
              onClick={() => setOpen(false)}
            >
              Verify Certificate
            </Link>
            <Link
              href="/login"
              className="btn-primary-motion animate-fade-in rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-4 py-3 text-center text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
              onClick={() => setOpen(false)}
            >
              Lab Portal
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
