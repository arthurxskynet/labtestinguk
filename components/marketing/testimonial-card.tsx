"use client";

import * as React from "react";
import Image from "next/image";
import { CheckCircle2, Star, User } from "lucide-react";

export type TestimonialCardProps = {
  name: string;
  location: string;
  quote: string;
  avatarUrl: string;
};

export function TestimonialCard({
  name,
  location,
  quote,
  avatarUrl,
}: TestimonialCardProps) {
  const [imgFailed, setImgFailed] = React.useState(false);

  return (
    <article className="hover-lift-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white pl-1 shadow-md ring-1 ring-slate-100/80 transition-all duration-300 ease-out motion-reduce:transition-none">
      <div
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-2xl bg-brand-600"
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-6 pl-5 sm:p-8 sm:pl-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 flex-1 gap-4">
            <div className="relative size-16 shrink-0 sm:size-[4.5rem]">
              {!imgFailed ? (
                <Image
                  src={avatarUrl}
                  alt={`${name}`}
                  width={72}
                  height={72}
                  className="size-16 rounded-full object-cover shadow-md ring-2 ring-white sm:size-[4.5rem]"
                  sizes="72px"
                  onError={() => setImgFailed(true)}
                />
              ) : (
                <div
                  className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand-600 shadow-inner ring-2 ring-white sm:size-[4.5rem]"
                  aria-hidden
                >
                  <User className="size-8 sm:size-9" strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="text-base font-semibold leading-snug text-foreground">
                {name}
                <span className="font-medium text-muted-foreground">
                  , {location}
                </span>
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

        <blockquote className="mt-5 flex-1 border-t border-slate-100 pt-5">
          <p className="text-[1.05rem] italic leading-relaxed text-muted-foreground sm:text-lg">
            <span className="font-serif text-brand-600/90">&ldquo;</span>
            {quote}
            <span className="font-serif text-brand-600/90">&rdquo;</span>
          </p>
        </blockquote>
      </div>
    </article>
  );
}
