/**
 * One-off: create or update an Auth user and set `profiles.role = 'admin'`.
 * Run locally only; requires service role. Never commit secrets.
 *
 * Usage (from repo root):
 *   npx tsx --env-file=.env.local scripts/bootstrap-admin.mts
 */
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error(
    "Missing required env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_BOOTSTRAP_EMAIL, ADMIN_BOOTSTRAP_PASSWORD",
  );
  process.exit(1);
}

const admin = createClient(url, serviceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { data: page, error: listErr } = await admin.auth.admin.listUsers({
  page: 1,
  perPage: 200,
});

if (listErr) {
  console.error(listErr.message);
  process.exit(1);
}

const existing = page?.users.find(
  (u) => u.email?.toLowerCase() === email,
);

let userId: string;

if (existing) {
  const { data, error } = await admin.auth.admin.updateUserById(existing.id, {
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) {
    console.error(error?.message ?? "updateUserById failed");
    process.exit(1);
  }
  userId = data.user.id;
} else {
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) {
    console.error(error?.message ?? "createUser failed");
    process.exit(1);
  }
  userId = data.user.id;
}

const { error: profileErr } = await admin.from("profiles").upsert(
  { id: userId, email, role: "admin" },
  { onConflict: "id" },
);

if (profileErr) {
  console.error("profiles upsert failed:", profileErr.message);
  process.exit(1);
}

console.log("Admin profile ready for:", email);
