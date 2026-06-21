-- Run in Supabase SQL Editor after creating your project

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  name text not null,
  city text default 'Miami',
  identity text not null default 'personal',
  followers int default 0,
  following int default 0,
  pulse_score int default 50,
  energy int default 50,
  verified boolean default false,
  live boolean default false,
  current_vibe text,
  email text,
  phone text,
  identity_topic text,
  identity_topic_label text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, name, email, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    new.phone
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Run on existing projects to add new columns:
-- alter table public.profiles add column if not exists email text;
-- alter table public.profiles add column if not exists phone text;
-- alter table public.profiles add column if not exists identity_topic text;
-- alter table public.profiles add column if not exists identity_topic_label text;
