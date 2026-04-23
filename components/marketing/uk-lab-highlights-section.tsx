import Link from "next/link";
import { Clock, MapPin, ShieldCheck, Sparkles } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: MapPin,
    title: "UK-based independent testing",
    body: "Analytical work is coordinated through our UK laboratory network with clear chain-of-custody and documented methods—so your verification story stays traceable and audit-ready.",
  },
  {
    icon: Clock,
    title: "Fast certificate delivery",
    body: "Digital certificates with QR verification are issued as soon as analysis and review complete. Check status anytime in the Lab Portal—no guesswork on where your batch stands.",
  },
  {
    icon: ShieldCheck,
    title: "Built for verification",
    body: "HPLC traces, identity checks, and certificate codes are designed for research traceability—not clinical claims. Everything stays aligned with independent third-party verification.",
  },
  {
    icon: Sparkles,
    title: "Lab Portal workflow",
    body: "From the Lab Portal, add new lab tests and publish certificate-ready records in one place. Public verification stays a single scan or code lookup away.",
  },
];

export function UkLabHighlightsSection() {
  return (
    <section className="border-b border-slate-200/90 bg-[#f8fafc] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-sky-700">
            Why teams choose Verifypeps
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            UK laboratory rigour. Certificates you can prove.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-[#334155]">
            Independent peptide verification with a premium digital certificate
            experience—focused on research traceability, not sales tiers.
          </p>
        </RevealOnView>

        <RevealOnView className="mt-16 grid gap-8 sm:grid-cols-2" staggerChildren>
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm transition-all duration-300 hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                <item.icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-[#0f172a]">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                {item.body}
              </p>
            </div>
          ))}
        </RevealOnView>

        <RevealOnView className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "min-w-[200px] shadow-md",
            )}
          >
            Open Lab Portal
          </Link>
          <Link
            href="/verify"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "min-w-[200px] border-slate-200 bg-white shadow-sm hover:bg-slate-50",
            )}
          >
            Verify a certificate
          </Link>
        </RevealOnView>
      </div>
    </section>
  );
}
