-- ============================================================
-- Sonic Group — live dashboard text
-- Run ONCE in: Supabase Dashboard -> SQL Editor -> New Query
-- (after setup.sql). Safe to re-run.
--
-- text_store holds dashboard text edits as a single row (id = 1):
--   { "<sectionKey>": { "<entryId>": "<value>" } }
-- Same access model as media_store: the anon key can read and write,
-- so the dashboard (client-side) publishes edits to every visitor.
-- ============================================================
create table if not exists public.text_store (
  id          int          primary key,
  data        jsonb        not null default '{}'::jsonb,
  updated_at  timestamptz  not null default now()
);

insert into public.text_store (id, data, updated_at)
values (1, '{}'::jsonb, now())
on conflict (id) do nothing;

alter table public.text_store enable row level security;

drop policy if exists "anon can read text_store"   on public.text_store;
drop policy if exists "anon can upsert text_store" on public.text_store;

create policy "anon can read text_store"
  on public.text_store
  for select
  to anon
  using (true);

create policy "anon can upsert text_store"
  on public.text_store
  for all
  to anon
  using (true)
  with check (true);
