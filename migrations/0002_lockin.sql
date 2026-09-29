-- Shared study desk. Unowned rows: anyone with the link can read/write.
create table if not exists members (
  id text primary key,
  name text not null,
  status text not null default 'idle',
  session_started_at timestamptz,
  session_goal text not null default '',
  today_spent_min integer not null default 0,
  spent_on_date date,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists tasks (
  id text primary key,
  day_date date,
  title text not null default '',
  course text not null default '',
  owner_id text references members(id) on delete set null,
  status text not null default 'todo',
  priority text not null default 'normal',
  est_min integer,
  spent_min integer not null default 0,
  progress integer not null default 0,
  due_date date,
  notes text not null default '',
  honesty text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_day_date_idx on tasks (day_date);
create index if not exists tasks_owner_id_idx on tasks (owner_id);

create table if not exists events (
  id text primary key,
  member_id text references members(id) on delete set null,
  kind text not null,
  body text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists events_created_at_idx on events (created_at desc);
