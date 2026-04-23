import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";

const testimonials = [
  {
    name: "Dr. James Harrington",
    location: "London",
    quote:
      "Certificate landed next working day. HPLC and LC-MS sections are laid out clearly for our batch files—we did not need to chase anyone for supplementary data.",
    featured: true,
  },
  {
    name: "Marcus Thompson",
    location: "Birmingham",
    quote: "Sorted. QR opens the cert, figures match what we submitted. That's all I wanted.",
    featured: false,
  },
  {
    name: "Sarah Patel",
    location: "Glasgow",
    quote:
      "Third reference material order this year. Same layout each time—which is exactly what our internal review expects.",
    featured: false,
  },
  {
    name: "Dr. Elena Voss",
    location: "Cambridge",
    quote:
      "Annotated peaks made the handover to our documentation set much quicker than spreadsheets alone.",
    featured: false,
  },
  {
    name: "Ryan Brooks",
    location: "Bristol",
    quote: "Straightforward for supplier verification.",
    featured: false,
  },
] as const;

function initials(name: string): string {
  const stripped = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Miss|Prof\.)\s+/i, "");
  const parts = stripped.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase();
}

export function ReviewsSection() {
  const featured = testimonials.find((t) => t.featured)!;
  const rest = testimonials.filter((t) => !t.featured);
  const marqueeLeft = rest.filter((_, i) => i % 2 === 0);
  const marqueeRight = rest.filter((_, i) => i % 2 === 1);

  return (
    <section className="relative overflow-hidden border-b border-[var(--bg-border)] bg-[var(--bg-base)] py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(0,196,180,0.05)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="relative marketing-container">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-primary)]">
            Customer reviews
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-tight text-[var(--text-primary)]">
            Trusted by UK labs &amp; researchers
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            Research teams rely on repeatable documentation and verification
          </p>
        </RevealOnView>

        <RevealOnView className="mt-14">
          <article className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-card)] sm:p-12">
            <span
              className="font-display pointer-events-none absolute left-6 top-4 text-[5rem] leading-none text-[var(--accent-primary)]/40 sm:left-10"
              aria-hidden
            >
              “
            </span>
            <blockquote className="relative z-[1] pt-12">
              <p className="font-display text-[1.6rem] italic leading-snug text-[var(--text-primary)] sm:text-[1.75rem]">
                {featured.quote}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <span
                  className="flex size-12 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-sm font-semibold text-[var(--accent-primary)] ring-1 ring-[var(--bg-border)]"
                  aria-hidden
                >
                  {initials(featured.name)}
                </span>
                <div>
                  <cite className="not-italic text-base font-semibold text-[var(--text-primary)]">
                    {featured.name}
                  </cite>
                  <p className="text-sm text-[var(--text-muted)]">{featured.location}</p>
                </div>
              </footer>
            </blockquote>
          </article>
        </RevealOnView>

        <div className="marquee-row mt-12 space-y-4 overflow-hidden">
          <MarqueeRow items={[...marqueeLeft, ...marqueeLeft]} dir="left" />
        </div>
        <div className="marquee-row mt-4 overflow-hidden">
          <MarqueeRow items={[...marqueeRight, ...marqueeRight]} dir="right" />
        </div>

        <RevealOnView className="mt-14 text-center">
          <Link
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] underline-offset-4 transition-colors hover:text-[var(--accent-hover)] hover:underline"
          >
            Leave us a review on Google
            <ExternalLink className="size-3.5 shrink-0 opacity-80" aria-hidden />
            <span className="sr-only"> (opens in a new tab)</span>
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  dir,
}: {
  items: readonly { name: string; location: string; quote: string }[];
  dir: "left" | "right";
}) {
  return (
    <div className="flex w-full overflow-hidden">
      <div className={dir === "left" ? "marquee-track flex gap-4 pr-4" : "marquee-track marquee-track-reverse flex gap-4 pr-4"}>
        {items.map((t, i) => (
          <article
            key={`${t.name}-${i}`}
            className="w-[min(100%,320px)] shrink-0 rounded-[var(--radius-lg)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-5 shadow-[var(--shadow-card)]"
          >
            <p className="text-xs text-[#f59e0b]" aria-label="5 out of 5 stars">
              ★★★★★
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{t.quote}</p>
            <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">{t.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{t.location}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
