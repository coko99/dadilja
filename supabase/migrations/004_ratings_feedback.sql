-- Ocene dadilja + poruke majki adminu (dadilje nemaju pristup)
create table public.nanny_ratings (
  id uuid primary key default gen_random_uuid(),
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  rater_id uuid not null references public.profiles (id) on delete cascade,
  rater_role public.user_role not null check (rater_role in ('admin', 'parent')),
  score int not null check (score between 1 and 5),
  comment text,
  child_id uuid references public.children (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (nanny_id, rater_id)
);

create table public.admin_feedback (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles (id) on delete cascade,
  nanny_id uuid not null references public.profiles (id) on delete cascade,
  child_id uuid references public.children (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now(),
  read_by_admin boolean not null default false
);

alter table public.nanny_ratings enable row level security;
alter table public.admin_feedback enable row level security;

-- Dadilje: nema SELECT/INSERT/UPDATE na ocene i feedback
create policy "ratings admin all"
  on public.nanny_ratings for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active)
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active)
  );

create policy "ratings parent read own and admin"
  on public.nanny_ratings for select
  using (
    rater_id = auth.uid()
    or (
      rater_role = 'admin'
      and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
    )
  );

create policy "ratings parent upsert own"
  on public.nanny_ratings for insert
  with check (
    rater_id = auth.uid()
    and rater_role = 'parent'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
  );

create policy "ratings parent update own"
  on public.nanny_ratings for update
  using (rater_id = auth.uid() and rater_role = 'parent')
  with check (rater_id = auth.uid() and rater_role = 'parent');

create policy "feedback admin all"
  on public.admin_feedback for all
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active)
  )
  with check (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.active)
  );

create policy "feedback parent own"
  on public.admin_feedback for select
  using (parent_id = auth.uid());

create policy "feedback parent insert"
  on public.admin_feedback for insert
  with check (
    parent_id = auth.uid()
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'parent')
  );
