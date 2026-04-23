"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createBrowserSupabaseClient } from "@/lib/supabase/client";
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
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const [submitting, setSubmitting] = React.useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  React.useEffect(() => {
    const err = searchParams.get("error");
    if (err === "auth") {
      toast.error("Sign-in link expired or invalid. Try again.");
    }
    if (err === "config") {
      toast.error("Supabase is not configured.");
    }
  }, [searchParams]);

  async function onSubmit(values: LoginValues) {
    setSubmitting(true);
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Signed in");
      router.push(next);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="you@lab.ac.uk"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>Password</FormLabel>
                <button
                  type="button"
                  className="text-xs text-brand-600 hover:underline"
                  onClick={() =>
                    toast.message("Password reset", {
                      description:
                        "Contact hello@verifypeps.com or use Supabase Auth recovery when enabled.",
                    })
                  }
                >
                  Forgot password?
                </button>
              </div>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  className="h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="h-11 w-full rounded-xl shadow-md"
          disabled={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </Button>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "w-full border-border",
          )}
        >
          Back to home
        </Link>
      </form>
    </Form>
  );
}
