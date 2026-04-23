"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Clock, Mail, MapPin } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  subject: z.enum([
    "general",
    "services",
    "technical",
    "verification",
    "partnership",
    "other",
  ]),
  message: z.string().min(10, "Please enter a longer message"),
});

type ContactValues = z.infer<typeof contactSchema>;

const subjectOptions: { value: ContactValues["subject"]; label: string }[] = [
  { value: "general", label: "General enquiry" },
  { value: "services", label: "Services & verification" },
  { value: "technical", label: "Technical support" },
  { value: "verification", label: "Certificate verification" },
  { value: "partnership", label: "Partnership opportunities" },
  { value: "other", label: "Other" },
];

const fieldClass =
  "flex min-h-[52px] w-full rounded-[var(--radius-md)] border border-[var(--bg-border)] bg-[var(--bg-surface)] px-4 py-3 text-[15px] text-[var(--text-primary)] shadow-inner transition-[border-color,box-shadow] duration-200 placeholder:text-[var(--text-muted)] focus-visible:border-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-glow)]";

export function ContactFormSection() {
  const [sent, setSent] = React.useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "general",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<ContactValues> = () => {
    toast.success("Message sent", {
      description:
        "Our team typically responds within 24 hours. This demo does not transmit data yet.",
    });
    form.reset();
    setSent(true);
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
                    <p className="mt-1 text-[15px] text-[var(--text-primary)]">Typically within 24 hours</p>
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
                      className="btn-primary-motion h-14 w-full rounded-[var(--radius-pill)] bg-[var(--accent-primary)] text-base font-semibold text-[var(--text-inverse)] hover:bg-[var(--accent-hover)]"
                    >
                      Send message
                    </Button>
                  </form>
                </Form>
              )}
            </div>
            {!sent ? (
              <p className="mt-6 text-center text-sm text-[var(--text-muted)] lg:text-left">
                Our team typically responds within 24 hours.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
