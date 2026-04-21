-- Verifypeps — profiles + admin RLS (idempotent, safe on DBs that already ran seed.sql)
-- Run once in Supabase SQL Editor after `certificates` exists.
-- Does not insert demo data or alter certificate rows.

-- ---------------------------------------------------------------------------
-- profiles (synced from auth.users; role gate for admin RLS)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (id = auth.uid());

drop policy if exists "profiles_select_all_admins" on public.profiles;
create policy "profiles_select_all_admins"
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do update
    set email = excluded.email;
  return new;
end;
$$;

create or replace function public.handle_user_email_sync ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles set email = new.email where id = new.id;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user ();

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute procedure public.handle_user_email_sync ();

-- ---------------------------------------------------------------------------
-- certificates: admins may read (and update) all rows
-- ---------------------------------------------------------------------------
drop policy if exists "certificates_admin_select_all" on public.certificates;
create policy "certificates_admin_select_all"
  on public.certificates
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

drop policy if exists "certificates_admin_update_all" on public.certificates;
create policy "certificates_admin_update_all"
  on public.certificates
  for update
  to authenticated
  using (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  )
  with check (
    exists (
      select 1
      from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Optional one-time backfill for users that existed before this migration:
-- insert into public.profiles (id, email, role)
-- select u.id, u.email, 'user' from auth.users u
-- where not exists (select 1 from public.profiles p where p.id = u.id)
-- on conflict (id) do nothing;
