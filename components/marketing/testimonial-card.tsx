import { CheckCircle2, Star } from "lucide-react";

export type TestimonialCardProps = {
  name: string;
  location: string;
  quote: string;
};

function initialsFromDisplayName(name: string): string {
  const withoutTitle = name.replace(
    /^(Dr\.|Mr\.|Mrs\.|Ms\.|Miss|Prof\.)\s+/i,
    "",
  );
  const parts = withoutTitle.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const w = parts[0]!;
    return w.slice(0, 2).toUpperCase();
  }
  const first = parts[0]!.charAt(0);
  const last = parts[parts.length - 1]!.charAt(0);
  return `${first}${last}`.toUpperCase();
}

export function TestimonialCard({
  name,
  location,
  quote,
}: TestimonialCardProps) {
  const initials = initialsFromDisplayName(name);

  return (
    <article className="hover-lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white pl-1 shadow-md ring-1 ring-slate-100/80 transition-all duration-300 ease-out motion-reduce:transition-none">
      <div
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-brand-600 transition-colors duration-300 ease-out group-hover:bg-brand-500 motion-reduce:transition-none"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6 pl-5 sm:p-8 sm:pl-7">
        <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
          <div className="flex min-w-0 flex-1 gap-3.5 sm:gap-4">
            <div
              className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/80 text-[0.7rem] font-semibold tracking-tight text-brand-700 shadow-inner ring-1 ring-brand-200/50 transition-[box-shadow,ring-color] duration-300 ease-out group-hover:shadow-md group-hover:ring-brand-300/70 sm:size-12 sm:text-[0.75rem] motion-reduce:transition-none"
              aria-hidden
            >
              {initials}
            </div>
            <div className="min-w-0 pt-0.5">
              <h3 className="text-base font-semibold leading-snug text-foreground">
                {name}
              </h3>
              <p className="mt-0.5 text-sm font-medium leading-snug text-muted-foreground">
                {location}
              </p>
              <div
                className="mt-2 flex gap-0.5"
                aria-label="5 out of 5 stars"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 shrink-0 fill-[#FACC15] text-[#FACC15] sm:size-[1.125rem]"
                    aria-hidden
                  />
                ))}
              </div>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-success-500/25 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-success-600 shadow-sm sm:text-xs">
            <CheckCircle2 className="size-3.5 text-success-500" aria-hidden />
            Verified Customer
          </span>
        </div>

        <blockquote className="mt-5 flex-1 border-t border-slate-100 pt-5 text-pretty">
          <p className="text-[1.05rem] leading-relaxed text-muted-foreground sm:text-lg">
            <span className="font-serif italic text-brand-600/90">&ldquo;</span>
            <span className="italic">{quote}</span>
            <span className="font-serif italic text-brand-600/90">&rdquo;</span>
          </p>
        </blockquote>
      </div>
    </article>
  );
}
