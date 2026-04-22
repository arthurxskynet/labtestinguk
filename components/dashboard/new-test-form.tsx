"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
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
      is_blend: false,
      target_purity_percent: 99.5,
      component_purity: [],
      molecular_weight: 1000,
      hplc_lcms_notes: "",
      endotoxin: false,
      lcms_ppm: "",
      notes: "",
    },
  });
  const isBlend = form.watch("is_blend");
  const componentPurity = useFieldArray({
    control: form.control,
    name: "component_purity",
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
        <FormField
          control={form.control}
          name="is_blend"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-slate-200 p-4">
              <FormControl>
                <input
                  type="checkbox"
                  className="mt-1 size-4 rounded border-slate-300"
                  checked={field.value}
                  onChange={(event) => {
                    const checked = event.target.checked;
                    field.onChange(checked);
                    if (checked && componentPurity.fields.length === 0) {
                      form.setValue("target_purity_percent", undefined, {
                        shouldValidate: false,
                      });
                      componentPurity.append({ analyte: "", purity_percent: 99.5 });
                      componentPurity.append({ analyte: "", purity_percent: 99.5 });
                    }
                    if (!checked) {
                      componentPurity.replace([]);
                      form.setValue(
                        "target_purity_percent",
                        form.getValues("target_purity_percent") ?? 99.5,
                        { shouldValidate: false },
                      );
                    }
                  }}
                />
              </FormControl>
              <div className="space-y-1">
                <FormLabel className="!mt-0 font-medium">
                  Blend / multi-compound certificate
                </FormLabel>
                <FormDescription>
                  Enable this when the line contains multiple analytes with separate
                  purity entries.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {!isBlend ? (
            <FormField
              control={form.control}
              name="target_purity_percent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target purity %</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.0001"
                      min={99.11}
                      max={99.86}
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Use a value between 99.11 and 99.86.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className="space-y-3 rounded-lg border border-slate-200 p-4 sm:col-span-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-900">Component purity</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    componentPurity.append({ analyte: "", purity_percent: 99.5 })
                  }
                >
                  Add component
                </Button>
              </div>
              <p className="text-xs text-slate-600">
                Record each analyte separately. Every purity value must be between
                99.11 and 99.86.
              </p>
              {componentPurity.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-3 rounded-md border border-slate-100 p-3 sm:grid-cols-[1fr_180px_auto]"
                >
                  <FormField
                    control={form.control}
                    name={`component_purity.${index}.analyte`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Analyte</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. BPC-157 (reference)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`component_purity.${index}.purity_percent`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purity %</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.0001"
                            min={99.11}
                            max={99.86}
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={componentPurity.fields.length <= 2}
                      onClick={() => componentPurity.remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <FormField
                control={form.control}
                name="component_purity"
                render={() => (
                  <FormItem>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <FormField
            control={form.control}
            name="molecular_weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Molecular weight (Da)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.0001"
                    min={0}
                    {...field}
                    value={field.value ?? ""}
                  />
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
