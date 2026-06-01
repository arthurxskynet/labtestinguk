import Link from "next/link";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: "🧪",
    title: "UK-coordinated service",
    body: "Sample intake and documentation are coordinated from the UK. Selected methods—including certain HPLC tests—may be performed by qualified partner laboratories in the European Union.",
    span: "normal" as const,
  },
  {
    icon: "⚡",
    title: "Structured certificate delivery",
    body: "Digital certificates with QR registry links are issued when analysis and review are complete. Turnaround depends on method, queue, and sample condition.",
    span: "wide" as const,
  },
  {
    icon: "🔍",
    title: "Built for documentation",
    body: "HPLC traces, identity checks, and certificate codes support research traceability—not clinical claims or suitability assessments.",
    span: "normal" as const,
  },
  {
    icon: "🖥",
    title: "Lab Portal workflow",
    body: "Register batches and publish certificate-ready records in one place. Public registry lookup stays a single scan or code entry away.",
    span: "normal" as const,
  },
];

export function UkLabHighlightsSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--bg-border)] bg-[var(--bg-base)] py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{ background: "var(--gradient-mesh)" }}
        aria-hidden
      />
      <div className="relative marketing-container">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Service overview
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            UK-coordinated service.
            <br />
            <em className="italic text-[var(--accent-primary)]">EU partner labs where required.</em>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Independent peptide analytical documentation with a structured digital certificate experience—focused on research traceability.
          </p>
        </RevealOnView>

        <RevealOnView className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2" staggerChildren>
          {features.map((item) => (
            <article
              key={item.title}
              className={cn(
                "group rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--gradient-card)] p-8 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                "hover:-translate-y-1 hover:border-[rgba(0,196,180,0.3)] hover:shadow-[var(--shadow-glow)] motion-reduce:hover:translate-y-0",
                item.span === "wide" && "md:col-span-2",
              )}
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-2xl ring-1 ring-[var(--bg-border)]">
                <span aria-hidden>{item.icon}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.7] text-[var(--text-secondary)]">{item.body}</p>
              <Link
                href="/lab-partner-disclosure"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-hover)]"
              >
                Partner lab disclosure <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </RevealOnView>

        <RevealOnView className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary-motion inline-flex min-w-[220px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-8 py-3 text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
          >
            Open Lab Portal
          </Link>
          <Link
            href="/verify"
            className="inline-flex min-w-[220px] items-center justify-center rounded-[var(--radius-pill)] border border-[var(--bg-border)] px-8 py-3 text-base font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:bg-[var(--accent-subtle)]"
          >
            Lookup a certificate
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}
