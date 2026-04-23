"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  return (
    <section className="border-b border-[var(--bg-border)] bg-[var(--bg-surface)] py-16">
      <div className="marketing-container">
        <div className="mx-auto max-w-xl rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-8 text-center shadow-[var(--shadow-card)]">
          <h4 className="text-lg font-semibold text-[var(--text-primary)]">Stay in the loop</h4>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Testing capability updates and verification product notes—no fluff.
          </p>
          <form
            className="mt-6 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Subscribed", {
                description: "No spam—just lab updates. (Demo — no email stored.)",
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
              className="h-11 flex-1 rounded-[var(--radius-md)] border-[var(--bg-border)] bg-[var(--bg-surface)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
            <Button
              type="submit"
              className="btn-primary-motion h-11 shrink-0 rounded-[var(--radius-pill)] bg-[var(--accent-primary)] px-6 font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
            >
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            No spam. Unsubscribe anytime. See our{" "}
            <a href="/privacy" className="text-[var(--accent-primary)] underline underline-offset-2 hover:text-[var(--accent-hover)]">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
