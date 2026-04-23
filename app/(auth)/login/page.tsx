import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { LoginForm } from "@/app/(auth)/login/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Sign in",
  description:
    "Access the Verifypeps Lab Portal to manage certificates, submit tests, and download verification data.",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[var(--bg-base)] px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-border bg-[var(--bg-elevated)] shadow-[var(--shadow-elevated)]">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Lab Portal</CardTitle>
            <CardDescription>
              Sign in with your Verifypeps account to manage certificates and
              lab tests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Protected by Supabase Auth.{" "}
          <Link href="/privacy" className="text-[var(--accent-primary)] hover:underline">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
