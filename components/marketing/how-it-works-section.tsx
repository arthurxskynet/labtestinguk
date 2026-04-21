import { FileCheck, Microscope, UserPlus } from "lucide-react";

import { RevealOnView } from "@/components/marketing/reveal-on-view";

const steps = [
  {
    title: "Register & submit",
    body: "Create your Verifypeps account and use the Lab Portal to register a batch and log sample receipt. Chain-of-custody stays visible from submission through certificate issue.",
    icon: UserPlus,
  },
  {
    title: "Lab analysis",
    body: "HPLC purity testing and LC-MS identity verification by experienced analysts using validated methods and professional-grade instrumentation.",
    icon: Microscope,
  },
  {
    title: "Digital certificate",
    body: "Receive a QR-verified digital certificate with chromatogram data, purity results, and identity confirmation—ready for public verification.",
    icon: FileCheck,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="border-b border-slate-200 bg-[#f8fafc] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnView className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-sky-700">
            Workflow
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0f172a] sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-[#334155]">
            Three clear steps from portal submission to verified certificate
          </p>
        </RevealOnView>
        <RevealOnView className="mt-16 grid gap-10 md:grid-cols-3" staggerChildren>
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-slate-200/90 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <span className="absolute -top-3 left-8 inline-flex rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-3 py-0.5 text-xs font-bold text-white shadow-sm">
                Step {i + 1}
              </span>
              <div className="mb-6 mt-2 flex size-14 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                <step.icon className="size-7" aria-hidden />
              </div>
              <h3 className="text-xl font-semibold text-[#0f172a]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                {step.body}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#334155]">
                <li className="flex gap-2">
                  <span className="text-success-500">•</span>
                  UK laboratory workflow
                </li>
                <li className="flex gap-2">
                  <span className="text-success-500">•</span>
                  Analyst-reviewed data package
                </li>
              </ul>
            </div>
          ))}
        </RevealOnView>
      </div>
    </section>
  );
}
