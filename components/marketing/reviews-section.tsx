import Link from "next/link";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { TestimonialCard } from "@/components/marketing/testimonial-card";

const testimonials = [
  {
    name: "Dr. James Harrington",
    location: "London",
    quote:
      "The certificate arrived within 24 hours with clear HPLC and LC-MS data. As a researcher, the transparency and detail give me complete confidence in my compounds.",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Marcus Thompson",
    location: "Birmingham",
    quote:
      "Finally a UK lab that actually shows you the real purity numbers. My BPC-157 came back at 99.8%. Verifypeps is now my go-to.",
    avatarUrl: "https://i.pravatar.cc/150?img=33",
  },
  {
    name: "Sarah Patel",
    location: "Glasgow",
    quote:
      "Super quick service and the certificate looks proper professional. The QR code works perfect and its reassuring knowing exactly what your getting.",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Dr. Elena Voss",
    location: "Cambridge",
    quote:
      "The chromatogram and peak analysis provided far exceeded my expectations. This level of independent verification is exactly what the peptide community needs.",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Ryan Brooks",
    location: "Bristol",
    quote:
      "Used them twice now. Both times the results were spot on and delivery was fast. Makes buying peptides online feel much safer.",
    avatarUrl: "https://i.pravatar.cc/150?img=15",
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
            Trusted by Researchers &amp; Athletes
          </h2>
          <p className="mt-4 text-lg text-[#334155]">
            Real feedback from our community
          </p>
        </RevealOnView>

        <RevealOnView
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:gap-x-12 lg:gap-y-10"
          staggerChildren
        >
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.name}
              name={t.name}
              location={t.location}
              quote={t.quote}
              avatarUrl={t.avatarUrl}
            />
          ))}
        </RevealOnView>

        <RevealOnView className="mt-14 text-center">
          <Link
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-600 underline-offset-4 transition-colors hover:text-brand-500 hover:underline"
          >
            Leave us a review on Google
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}
