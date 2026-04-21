# Verifypeps

UK-focused research peptide verification storefront and Lab Portal: marketing site, Supabase-backed certificate lookup, QR-verified certificate views, and authenticated dashboard for submitting lab tests.

Stack: **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **shadcn/ui**, **Supabase Auth + Postgres**, **Zod**, **Recharts**, **jsPDF**, **qrcode**.

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project

## Environment variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_publishable_key
```

Optional (server-only, if you use service role scripts later):

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Restart `npm run dev` after changing env files.

## Supabase setup

1. **Create a project** in the Supabase dashboard (choose a region close to your users, e.g. London).

2. **Run the schema and seed**  
   - Open **SQL Editor** → New query.  
   - Paste the contents of [`seed.sql`](./seed.sql) at the project root.  
   - Run the script.  
   This creates:
   - `public.certificates` with RLS policies
   - RPC `get_certificate_by_code` (callable by `anon` for public verification)
   - Demo certificate rows (e.g. `VP-A3F7B2-KPVX` for BPC-157)

3. **Admin portal (profiles + admin RLS)** — if you use `/admin`, run once after `seed.sql`:  
   - New query → paste [`migration_profiles_admin.sql`](./migration_profiles_admin.sql) → Run.  
   - Idempotent and safe if you already ran `seed.sql` earlier without profiles.  
   - Then bootstrap an admin user (see `npm run bootstrap-admin` in package.json if configured).

4. **Authentication**  
   - Under **Authentication** → **Providers**, ensure **Email** is enabled.  
   - Configure **Site URL** to your deployed origin (e.g. `https://verifypeps.com`) and add `http://localhost:3000` for local dev.  
   - Add redirect URL: `http://localhost:3000/auth/callback` (and the production equivalent).

5. **Email templates** (optional)  
   Customize confirmation and reset emails in **Authentication** → **Email Templates**.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **Verify (public):** [http://localhost:3000/verify?code=VP-A3F7B2-KPVX](http://localhost:3000/verify?code=VP-A3F7B2-KPVX)  
- **Register / login:** `/register`, `/login`  
- **Lab Portal:** `/dashboard` (protected by middleware)

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Development server       |
| `npm run build`| Production build         |
| `npm run start`| Production server        |
| `npm run lint` | ESLint                   |

## Project notes

- **Certificate PDFs** are generated client-side with jsPDF; QR codes encode the live verification URL.

## Licence

Private / all rights reserved unless otherwise stated.
