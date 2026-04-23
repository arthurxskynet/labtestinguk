import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function CtaBannerSection() {
  return (
    <section className="lab-gradient-cta border-b border-brand-700/20 py-16 text-white shadow-inner">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to Verify?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Join UK researchers using Verifypeps for trusted third-party testing
          and verification.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 min-w-[200px] border-0 bg-white text-brand-700 shadow-lg hover:bg-brand-50",
            )}
          >
            Open Lab Portal
          </Link>
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 min-w-[200px] border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            )}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
