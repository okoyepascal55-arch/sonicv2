-- ============================================================
-- Sonic Group - Supabase Setup
-- Run this ONCE in: Supabase Dashboard -> SQL Editor -> New Query
-- Safe to re-run (idempotent).
-- ============================================================

-- ------------------------------------------------------------
-- 1. media_store table
--    Holds the whole media-overrides JSON as a single row (id = 1).
--    The anon key can read AND write so the dashboard (client-side)
--    can sync changes across browsers without a backend.
-- ------------------------------------------------------------
create table if not exists public.media_store (
  id          int          primary key,
  data        jsonb        not null default '{}'::jsonb,
  updated_at  timestamptz  not null default now()
);

insert into public.media_store (id, data, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

alter table public.media_store enable row level security;

drop policy if exists "anon can read media_store"   on public.media_store;
drop policy if exists "anon can upsert media_store" on public.media_store;

create policy "anon can read media_store"
  on public.media_store
  for select
  to anon
  using (true);

create policy "anon can upsert media_store"
  on public.media_store
  for all
  to anon
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- 2. Storage bucket "media" (private)
--    Uploaded dashboard images live under the dashboard/ prefix.
--    Rendering happens through the media-proxy Edge Function,
--    which mints short-lived signed URLs, so the bucket stays private.
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', false)
on conflict (id) do nothing;

-- ------------------------------------------------------------
-- 3. Storage RLS - let the anon key upload/read only under dashboard/
-- ------------------------------------------------------------
drop policy if exists "anon can upload to dashboard prefix" on storage.objects;
drop policy if exists "anon can read dashboard uploads"     on storage.objects;

create policy "anon can upload to dashboard prefix"
  on storage.objects
  for insert
  to anon
  with check (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = 'dashboard'
  );

create policy "anon can read dashboard uploads"
  on storage.objects
  for select
  to anon
  using (
    bucket_id = 'media'
    and (storage.foldername(name))[1] = 'dashboard'
  );

-- ============================================================
-- 4. Edge Function (do this outside SQL)
--
--    a) Deploy the function in supabase/functions/media-proxy:
--         supabase functions deploy media-proxy --no-verify-jwt
--       (or create it in Dashboard -> Edge Functions and paste
--        supabase/functions/media-proxy/index.ts)
--
--    b) Set its secret so it can mint signed URLs:
--         supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
--       (SUPABASE_URL is injected automatically.)
--       Dashboard path: Project Settings -> Edge Functions -> Secrets
--
--    The service_role key is at:
--       Project Settings -> API -> service_role (secret)
-- ============================================================
