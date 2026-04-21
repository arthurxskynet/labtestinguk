"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "sonner";

import { createLabCertificate } from "@/lib/actions/certificates";
import { labTestSchema, type LabTestInput } from "@/lib/validations/lab-test";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function NewTestForm() {
  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

  const form = useForm<LabTestInput>({
    resolver: zodResolver(labTestSchema) as Resolver<LabTestInput>,
    defaultValues: {
      peptide_name: "",
      batch_reference: "",
      target_purity_percent: 99,
      molecular_weight: 1000,
      hplc_lcms_notes: "",
      endotoxin: false,
      lcms_ppm: "",
      notes: "",
    },
  });

  function onSubmit(values: LabTestInput) {
    startTransition(async () => {
      const result = await createLabCertificate(values);
      if (result.ok) {
        toast.success("Certificate created", {
          description: `Code ${result.code} — visible on public verify.`,
          className:
            "!border !border-success-500/35 !bg-emerald-50/95 !text-[#0f172a] !shadow-md",
        });
        form.reset();
        router.push(`/verify?code=${encodeURIComponent(result.code)}`);
        router.refresh();
        return;
      }
      toast.error(result.error);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto max-w-2xl space-y-6"
      >
        <FormField
          control={form.control}
          name="peptide_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peptide name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. BPC-157" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batch_reference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch / reference</FormLabel>
              <FormControl>
                <Input placeholder="Internal batch ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="target_purity_percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target purity %</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" min={0} max={100} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="molecular_weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Molecular weight (Da)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.0001" min={0} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="hplc_lcms_notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HPLC / LC-MS notes</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  placeholder="Gradient, wavelength, method notes…"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lcms_ppm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LC-MS ppm (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. 12.5"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea rows={3} placeholder="Internal notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endotoxin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-slate-200 p-4">
              <FormControl>
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-slate-300"
                  checked={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel className="!mt-0 font-medium">
                  Request endotoxin pathway
                </FormLabel>
                <FormDescription>
                  Appends <span className="font-mono">-ETX</span> to the
                  certificate code for LAL-related tracking.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            type="submit"
            disabled={pending}
            className="shadow-md"
          >
            {pending ? "Submitting…" : "Submit & generate certificate"}
          </Button>
          <Link
            href="/dashboard/certificates"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-slate-200",
            )}
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  );
}
