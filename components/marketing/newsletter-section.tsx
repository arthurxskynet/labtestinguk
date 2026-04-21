"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="border-b border-slate-200 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
          <h4 className="text-lg font-semibold text-slate-900">Stay in the loop</h4>
          <p className="mt-2 text-sm text-slate-600">
            Be first to hear about new testing capabilities, exclusive offers, and
            the latest in peptide verification.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed", {
                description: "No spam, just science. (Demo — no email stored.)",
              });
            }}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              placeholder="Enter your email"
              className="h-11 flex-1"
            />
            <Button
              type="submit"
              className="h-11 shrink-0 bg-primary text-primary-foreground shadow-md hover:bg-brand-500"
            >
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-500">
            No spam, just science. Unsubscribe anytime. See our{" "}
            <a href="/privacy" className="text-brand-600 underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
