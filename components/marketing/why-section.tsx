import { BadgeCheck, Globe2, Scale } from "lucide-react";

const items = [
  {
    title: "Independent & Impartial",
    body: "We provide testing services only—no peptide sales. Results are reported for research documentation under agreed methods.",
    icon: Scale,
  },
  {
    title: "UK-coordinated testing",
    body: "Sample intake and documentation are coordinated from the UK. Selected HPLC methods may be performed by qualified partner laboratories in the European Union.",
    icon: Globe2,
  },
  {
    title: "Registry-linked certificates",
    body: "Each certificate includes a unique QR code for public registry lookup—confirming record consistency at the time of lookup.",
    icon: BadgeCheck,
  },
];

export function WhySection() {
  return (
    <section className="border-b border-slate-200 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for Researchers
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Independent, transparent documentation designed for research traceability
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-brand-500 text-white shadow-sm">
                <item.icon className="size-6" aria-hidden />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
