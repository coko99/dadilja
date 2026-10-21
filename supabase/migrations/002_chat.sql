-- Chat between parents and nannies (per child thread)
create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table public.chat_reads (
  message_id uuid not null references public.chat_messages (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (message_id, user_id)
);

create index chat_messages_child_created_idx on public.chat_messages (child_id, created_at);

alter table public.chat_messages enable row level security;
alter table public.chat_reads enable row level security;

create or replace function public.can_chat_child(target_child uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin()
    or exists (
      select 1 from public.parent_children pc
      where pc.child_id = target_child and pc.parent_id = auth.uid()
    )
    or exists (
      select 1 from public.nanny_assignments na
      where na.child_id = target_child and na.nanny_id = auth.uid() and na.active
    );
$$;

create policy "chat_select"
  on public.chat_messages for select
  using (public.can_chat_child(child_id));

create policy "chat_insert"
  on public.chat_messages for insert
  with check (
    sender_id = auth.uid()
    and public.can_chat_child(child_id)
    and public.current_role() in ('parent', 'nanny', 'admin')
  );

create policy "chat_reads_all"
  on public.chat_reads for all
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

-- Realtime: enable for chat_messages
