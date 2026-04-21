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
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900">Lab Portal</CardTitle>
            <CardDescription>
              Sign in with your Verifypeps account to manage certificates and
              lab tests.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
              <LoginForm />
            </Suspense>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-xs text-slate-500">
          Protected by Supabase Auth.{" "}
          <Link href="/privacy" className="text-brand-600 hover:underline">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
