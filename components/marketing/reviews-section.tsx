import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Dr. James Harrington",
    location: "London",
    quote:
      "Certificate landed next working day. HPLC and LC-MS sections are laid out clearly for our batch files—we did not need to chase anyone for supplementary data.",
  },
  {
    name: "Marcus Thompson",
    location: "Birmingham",
    quote: "Sorted. QR opens the cert, figures match what we submitted. That's all I wanted.",
  },
  {
    name: "Sarah Patel",
    location: "Glasgow",
    quote:
      "Third reference material order this year. Same layout each time, which sounds boring but it is what our internal review expects.",
  },
  {
    name: "Dr. Elena Voss",
    location: "Cambridge",
    quote:
      "I was sceptical we'd get this much chromatogram detail at the turnaround we were quoted. The annotated peaks made the handover to our doc set much quicker.",
  },
  {
    name: "Ryan Brooks",
    location: "Bristol",
    quote: "Straightforward for supplier verification. No drama.",
  },
] as const;

export function ReviewsSection() {
  return (
    <section className="relative border-b border-slate-200/90 bg-gradient-to-b from-[#f8fafc] via-white to-emerald-50/20 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/60 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-sky-700">
            Customer reviews
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            Trusted by UK labs &amp; researchers
          </h2>
          <p className="mt-4 text-lg text-[#334155]">
            What people say about certificates and verification
          </p>
        </RevealOnView>

        <RevealOnView
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-x-12 lg:gap-y-10"
          staggerChildren
        >
          {testimonials.map((t, index) => (
            <div
              key={t.name}
              className={cn(
                index === testimonials.length - 1 &&
                  "md:col-span-2 md:flex md:justify-center",
              )}
            >
              <div
                className={cn(
                  "w-full",
                  index === testimonials.length - 1 && "md:max-w-xl",
                )}
              >
                <TestimonialCard
                  name={t.name}
                  location={t.location}
                  quote={t.quote}
                />
              </div>
            </div>
          ))}
        </RevealOnView>

        <RevealOnView className="mt-14 text-center">
          <Link
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 underline-offset-4 transition-colors hover:text-brand-500 hover:underline"
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
