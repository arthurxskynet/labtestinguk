"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
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
  { value: "general", label: "General Enquiry" },
  { value: "services", label: "Services & verification" },
  { value: "technical", label: "Technical Support" },
  { value: "verification", label: "Certificate Verification" },
  { value: "partnership", label: "Partnership Opportunities" },
  { value: "other", label: "Other" },
];

export function ContactFormSection() {
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
  };

  return (
    <section id="contact" className="border-b border-slate-200 bg-[#f8fafc] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Have questions about peptide verification or testing? We&apos;re here
            to help.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200/90 bg-white p-8 shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@institution.ac.uk"
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
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <select
                        className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none",
                          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        )}
                        {...field}
                      >
                        {subjectOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
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
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="How can we help?"
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full shadow-sm"
              >
                Send Message
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-slate-500">
            Our team typically responds within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
}
