"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { submitContactEnquiry } from "@/lib/actions/contact";
import {
  CONTACT_SUBJECT_LABELS,
  CONTACT_SUBJECTS,
  contactSchema,
  type ContactInput,
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const subjectOptions = CONTACT_SUBJECTS.map((value) => ({
  value,
  label: CONTACT_SUBJECT_LABELS[value],
}));

const fieldClass =
  "flex min-h-[52px] w-full rounded-[var(--radius-md)] border border-[var(--bg-border)] bg-[var(--bg-surface)] px-4 py-3 text-[15px] text-[var(--text-primary)] shadow-inner transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus-visible:border-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]";

export function ContactFormSection() {
  const [sent, setSent] = React.useState(false);
  const [pending, startTransition] = React.useTransition();
  const formReadyAt = React.useRef(Date.now());
  const honeypotRef = React.useRef<HTMLInputElement>(null);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactInput> = (values) => {
    startTransition(async () => {
      const result = await submitContactEnquiry({
        ...values,
        sourcePageUrl: window.location.href,
        formReadyAt: formReadyAt.current,
        website: honeypotRef.current?.value ?? "",
      });

      if (result.ok) {
        toast.success("Message sent", {
          description:
            "We aim to respond within one UK business day where possible.",
        });
        form.reset();
        setSent(true);
        return;
      }

      toast.error(result.error);
    });
  };

  return (
    <section id="contact" className="relative overflow-hidden border-b border-[var(--bg-border)] bg-[var(--bg-base)] py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 contact-grid-bg" aria-hidden />
      <div className="relative marketing-container">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="relative lg:col-span-2">
            <div className="rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-surface)] p-8 shadow-[var(--shadow-card)] lg:p-10">
              <div className="absolute left-0 top-8 h-24 w-1 rounded-r bg-[var(--accent-primary)]" aria-hidden />
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.5rem)] tracking-tight text-[var(--text-primary)]">
                Get in Touch
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
                Questions about verification, documentation, or sample intake—we respond quickly during UK business hours.
              </p>
              <ul className="mt-10 space-y-6 text-[var(--text-secondary)]">
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-subtle)] text-[var(--accent-primary)]">
                    <Mail className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Email
                    </p>
                    <a
                      href="mailto:hello@verifypeps.com"
                      className="mt-1 block text-[15px] font-medium text-[var(--text-primary)] underline-offset-4 hover:text-[var(--accent-primary)] hover:underline"
                    >
                      hello@verifypeps.com
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-subtle)] text-[var(--accent-primary)]">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Location
                    </p>
                    <p className="mt-1 text-[15px] text-[var(--text-primary)]">United Kingdom</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent-subtle)] text-[var(--accent-primary)]">
                    <Clock className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      Response time
                    </p>
                    <p className="mt-1 text-[15px] text-[var(--text-primary)]">
                      We aim to respond within one UK business day where possible
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-[var(--radius-xl)] border border-[var(--bg-border)] bg-[var(--bg-elevated)] p-8 shadow-[var(--shadow-card)] lg:p-10">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 className="size-16 text-[var(--accent-primary)]" />
                  <p className="mt-6 text-xl font-semibold text-[var(--accent-primary)]">Message sent</p>
                  <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
                    Thank you—we&apos;ll reply as soon as possible.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-8 border-[var(--bg-border)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--accent-subtle)]"
                    onClick={() => setSent(false)}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <input
                      ref={honeypotRef}
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden
                      className="absolute left-[-9999px] h-px w-px opacity-0"
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-secondary)]">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" className={fieldClass} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-secondary)]">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@institution.ac.uk"
                              className={fieldClass}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-secondary)]">Subject</FormLabel>
                          <FormControl>
                            <select className={cn(fieldClass, "h-auto min-h-[52px] py-3")} {...field}>
                              {subjectOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-[var(--bg-surface)]">
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[var(--text-secondary)]">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help?"
                              className={cn(fieldClass, "min-h-[140px] resize-y py-3")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={pending}
                      className="btn-primary-motion h-14 w-full rounded-[var(--radius-pill)] bg-[var(--accent-primary)] text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)] disabled:opacity-60"
                    >
                      {pending ? "Sending…" : "Send message"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
            {!sent ? (
              <p className="mt-6 text-center text-sm text-[var(--text-muted)] lg:text-left">
                Our team aims to respond within one UK business day where possible.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
