import "server-only";

import type { User } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/types/profile";

import { isAdminRole } from "./roles";

export type AdminSession = {
  user: User;
  profile: ProfileRow;
};

/**
 * Ensures the caller is signed in and has `profiles.role = 'admin'`.
 * Returns user, profile, and the Supabase server client for follow-up queries.
 * Uses `x-pathname` from middleware for post-login redirect when present.
 */
export async function requireAdmin(): Promise<
  AdminSession & {
    supabase: Awaited<ReturnType<typeof createServerSupabaseClient>>;
  }
> {
  const headerList = await headers();
  const nextPath = headerList.get("x-pathname") ?? "/admin";

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile || !isAdminRole(profile.role)) {
    redirect("/dashboard");
  }

  return {
    supabase,
    user,
    profile: profile as ProfileRow,
  };
}
