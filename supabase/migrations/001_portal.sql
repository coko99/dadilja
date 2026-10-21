-- Moja Dadilja portal schema
create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'nanny', 'parent');
create type public.activity_kind as enum (
  'meal', 'sleep', 'play', 'walk', 'hygiene', 'note', 'other', 'shift_start', 'shift_end'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  role public.user_role not null,
  phone text,
  active boolean not null default true,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  birth_date date,
  notes text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create table public.parent_children (
  parent_id uuid not null references public.profiles (id) on delete cascade,
  child_id uuid not null references public.children (id) on delete cascade,
  primary key (parent_id, child_id)
);

create table public.nanny_assignments (
  id uuid primary key default gen_random_uuid(),
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  child_id uuid not null references public.children (id) on delete cascade,
  assigned_by uuid references public.profiles (id),
  assigned_at timestamptz not null default now(),
  active boolean not null default true,
  unique (nanny_id, child_id)
);

create table public.care_shifts (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  note text
);

create table public.diary_entries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  shift_id uuid references public.care_shifts (id) on delete set null,
  kind public.activity_kind not null default 'note',
  title text not null,
  body text,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.diary_photos (
  id uuid primary key default gen_random_uuid(),
  entry_id uuid not null references public.diary_entries (id) on delete cascade,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table public.access_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index diary_entries_child_occurred_idx on public.diary_entries (child_id, occurred_at desc);
create index nanny_assignments_nanny_idx on public.nanny_assignments (nanny_id) where active;
create index parent_children_parent_idx on public.parent_children (parent_id);

alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.parent_children enable row level security;
alter table public.nanny_assignments enable row level security;
alter table public.care_shifts enable row level security;
alter table public.diary_entries enable row level security;
alter table public.diary_photos enable row level security;
alter table public.access_logs enable row level security;

create or replace function public.current_role()
returns public.user_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin' and active
  );
$$;

-- Profiles
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles_admin_all"
  on public.profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- Children
create policy "children_admin_all"
  on public.children for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "children_parent_select"
  on public.children for select
  using (
    exists (
      select 1 from public.parent_children pc
      where pc.child_id = children.id and pc.parent_id = auth.uid()
    )
  );

create policy "children_nanny_select"
  on public.children for select
  using (
    exists (
      select 1 from public.nanny_assignments na
      where na.child_id = children.id and na.nanny_id = auth.uid() and na.active
    )
  );

-- Parent links
create policy "parent_children_admin"
  on public.parent_children for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "parent_children_select_own"
  on public.parent_children for select
  using (parent_id = auth.uid() or public.is_admin());

-- Assignments
create policy "assignments_admin"
  on public.nanny_assignments for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "assignments_nanny_select"
  on public.nanny_assignments for select
  using (nanny_id = auth.uid() or public.is_admin());

-- Shifts
create policy "shifts_admin"
  on public.care_shifts for select
  using (public.is_admin());

create policy "shifts_nanny_rw"
  on public.care_shifts for all
  using (nanny_id = auth.uid() or public.is_admin())
  with check (nanny_id = auth.uid() or public.is_admin());

create policy "shifts_parent_select"
  on public.care_shifts for select
  using (
    exists (
      select 1 from public.parent_children pc
      where pc.child_id = care_shifts.child_id and pc.parent_id = auth.uid()
    )
  );

-- Diary
create policy "diary_admin"
  on public.diary_entries for select
  using (public.is_admin());

create policy "diary_nanny_rw"
  on public.diary_entries for all
  using (nanny_id = auth.uid() or public.is_admin())
  with check (nanny_id = auth.uid() or public.is_admin());

create policy "diary_parent_select"
  on public.diary_entries for select
  using (
    exists (
      select 1 from public.parent_children pc
      where pc.child_id = diary_entries.child_id and pc.parent_id = auth.uid()
    )
  );

-- Photos
create policy "photos_via_entry"
  on public.diary_photos for select
  using (
    exists (
      select 1 from public.diary_entries de
      where de.id = diary_photos.entry_id
        and (
          public.is_admin()
          or de.nanny_id = auth.uid()
          or exists (
            select 1 from public.parent_children pc
            where pc.child_id = de.child_id and pc.parent_id = auth.uid()
          )
        )
    )
  );

create policy "photos_nanny_insert"
  on public.diary_photos for insert
  with check (
    exists (
      select 1 from public.diary_entries de
      where de.id = entry_id and (de.nanny_id = auth.uid() or public.is_admin())
    )
  );

create policy "access_logs_admin"
  on public.access_logs for all
  using (public.is_admin())
  with check (public.is_admin());

-- Storage bucket (run in dashboard or via API): diary-photos (private)
-- Realtime: enable for diary_entries
