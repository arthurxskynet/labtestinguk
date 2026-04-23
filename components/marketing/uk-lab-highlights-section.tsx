import Link from "next/link";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: "🧪",
    title: "UK-Based Independent Testing",
    body: "Analytical work is coordinated through our UK laboratory network with clear chain-of-custody and documented methods—so your verification story stays traceable and audit-ready.",
    span: "normal" as const,
  },
  {
    icon: "⚡",
    title: "Fast Certificate Delivery",
    body: "Digital certificates with QR verification are issued as soon as analysis and review complete. Check status anytime in the Lab Portal—no guesswork on where your batch stands.",
    span: "wide" as const,
  },
  {
    icon: "🔍",
    title: "Built for Verification",
    body: "HPLC traces, identity checks, and certificate codes are designed for research traceability—not clinical claims. Everything stays aligned with independent third-party verification.",
    span: "normal" as const,
  },
  {
    icon: "🖥",
    title: "Lab Portal Workflow",
    body: "From the Lab Portal, register batches and publish certificate-ready records in one place. Public verification stays a single scan or code lookup away.",
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
            Why teams choose Verifypeps
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            UK laboratory rigour.
            <br />
            <em className="italic text-[var(--accent-primary)]">Certificates you can prove.</em>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[var(--text-secondary)]">
            Independent peptide verification with a premium digital certificate experience—focused on research traceability.
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
                href="/login"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-primary)] transition-colors hover:text-[var(--accent-hover)]"
              >
                Learn more <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </RevealOnView>

        <RevealOnView className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="btn-primary-motion inline-flex min-w-[220px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-8 py-3 text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
          >
            Start Verification →
          </Link>
          <Link
            href="/verify"
            className="inline-flex min-w-[220px] items-center justify-center rounded-[var(--radius-pill)] border border-[var(--bg-border)] px-8 py-3 text-base font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)] hover:bg-[var(--accent-subtle)]"
          >
            Verify a certificate
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}
