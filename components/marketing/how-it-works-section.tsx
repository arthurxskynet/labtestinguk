import Link from "next/link";
import { ClipboardList, FileCheck, Microscope } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";

const steps = [
  {
    title: "Submit in the Lab Portal",
    body: "Use the Lab Portal to register a batch and log sample receipt. Chain-of-custody stays visible from submission through certificate issue.",
    icon: ClipboardList,
    bullets: ["UK laboratory workflow", "Secure batch registration"],
  },
  {
    title: "Lab analysis",
    body: "HPLC purity testing and LC-MS identity verification by experienced analysts using validated methods and professional-grade instrumentation.",
    icon: Microscope,
    bullets: ["Analyst-reviewed data package", "Documented methods"],
  },
  {
    title: "Digital certificate",
    body: "Receive a QR-verified digital certificate with chromatogram data, purity results, and identity confirmation—ready for public verification.",
    icon: FileCheck,
    bullets: ["QR-linked documentation", "Instant public lookup"],
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-[var(--bg-border)] bg-[var(--bg-base)] py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-mesh)" }}
        aria-hidden
      />
      <div className="relative marketing-container">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <span className="marketing-badge mx-auto">Workflow</span>
          <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Three clear steps from portal submission to verified certificate
          </p>
        </RevealOnView>

        <RevealOnView className="mt-16">
          <div className="relative hidden lg:block">
            <div
              className="absolute left-0 right-0 top-[52px] border-t border-dashed border-[var(--bg-border)]"
              aria-hidden
            />
            <div className="relative grid grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <article
                  key={step.title}
                  className="group relative rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-8 pt-12 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 hover:border-[var(--accent-primary)] hover:shadow-[var(--shadow-glow)] motion-reduce:hover:translate-y-0"
                >
                  <div className="absolute left-8 top-0 h-[3px] w-[calc(100%-4rem)] rounded-b bg-[var(--accent-primary)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="font-mono text-4xl font-medium leading-none text-[var(--accent-primary)]/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 flex size-12 items-center justify-center rounded-xl bg-[var(--accent-subtle)] text-[var(--accent-primary)] ring-1 ring-[var(--bg-border)]">
                    <step.icon className="size-6" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                    {step.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-[var(--accent-primary)]">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:hidden">
            {steps.map((step, i) => (
              <article
                key={step.title}
                className="rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-6 pt-10"
              >
                <div className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-subtle)] font-mono text-sm font-semibold text-[var(--accent-primary)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--bg-elevated)] text-[var(--accent-primary)]">
                      <step.icon className="size-5" aria-hidden />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
                    <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
                      {step.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-[var(--accent-primary)]">✓</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView className="mt-14 flex justify-center">
          <Link
            href="/login"
            className="btn-primary-motion inline-flex items-center justify-center rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-10 py-3 text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
          >
            Start Verification →
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}
