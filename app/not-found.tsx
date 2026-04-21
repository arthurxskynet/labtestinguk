import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 text-slate-600">
        The page you requested does not exist or has moved.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "mt-8 bg-primary text-primary-foreground shadow-md hover:bg-brand-500",
        )}
      >
        Back to home
      </Link>
    </div>
  );
}
