-- Raspored / kalendar termina čuvanja
create type public.schedule_status as enum ('scheduled', 'cancelled', 'completed');

create table public.schedule_slots (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  location text,
  note text,
  status public.schedule_status not null default 'scheduled',
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  check (ends_at > starts_at)
);

create index schedule_slots_starts_at_idx on public.schedule_slots (starts_at);
create index schedule_slots_nanny_id_idx on public.schedule_slots (nanny_id);
create index schedule_slots_child_id_idx on public.schedule_slots (child_id);

alter table public.schedule_slots enable row level security;

create policy "admin all schedule"
  on public.schedule_slots for all
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin' and p.active
    )
  )
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin' and p.active
    )
  );

create policy "nanny read own schedule"
  on public.schedule_slots for select
  using (
    nanny_id = auth.uid()
    or exists (
      select 1 from public.parent_children pc
      where pc.child_id = schedule_slots.child_id and pc.parent_id = auth.uid()
    )
  );
