import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { RegisterForm } from "@/app/(auth)/register/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Register",
  description:
    "Create a Verifypeps account for the Lab Portal — submit samples and track QR-verified certificates.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:px-6">
      <div className="mx-auto w-full max-w-md">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-slate-900">Create account</CardTitle>
            <CardDescription>
              Register for the Verifypeps Lab Portal to submit tests and manage
              certificates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<p className="text-sm text-slate-500">Loading…</p>}>
              <RegisterForm />
            </Suspense>
          </CardContent>
        </Card>
        <p className="mt-8 text-center text-xs text-slate-500">
          By registering you agree to our{" "}
          <Link href="/terms" className="text-brand-600 hover:underline">
            Terms
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
