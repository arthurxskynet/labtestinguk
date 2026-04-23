import Link from "next/link";

export function CtaBannerSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--bg-border)] py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/90 via-[#008f84] to-[var(--accent-blue)]/90" aria-hidden />
      <div className="relative marketing-container text-center text-[var(--text-inverse)]">
        <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] tracking-tight">
          Ready to verify?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Join UK researchers using Verifypeps for independent testing documentation and certificate verification.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary-motion inline-flex h-12 min-w-[200px] items-center justify-center rounded-[var(--radius-pill)] bg-white px-8 text-base font-semibold text-[#080D14] shadow-lg hover:bg-[var(--text-primary)] hover:text-[var(--text-inverse)]"
          >
            Open Lab Portal
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-[var(--radius-pill)] border border-white/50 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
