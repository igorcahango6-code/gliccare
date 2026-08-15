-- GlicCare — schema inicial do banco de dados
-- Cole este arquivo inteiro no SQL Editor do Supabase e clique em "Run".

create extension if not exists pgcrypto;

-- ==========================================================
-- Glicemia
-- ==========================================================
create table glucose_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  value_mgdl int not null check (value_mgdl > 0 and value_mgdl < 1000),
  method text not null check (method in ('manual', 'sensor')),
  measured_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

create index glucose_readings_user_time_idx on glucose_readings (user_id, measured_at desc);

alter table glucose_readings enable row level security;

create policy "own glucose readings" on glucose_readings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Insulina
-- ==========================================================
create table insulin_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  insulin_type text not null check (insulin_type in ('basal', 'bolus')),
  units numeric(5, 2) not null check (units > 0),
  applied_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

create index insulin_entries_user_time_idx on insulin_entries (user_id, applied_at desc);

alter table insulin_entries enable row level security;

create policy "own insulin entries" on insulin_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Refeições
-- ==========================================================
create table meals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  description text not null,
  eaten_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index meals_user_time_idx on meals (user_id, eaten_at desc);

alter table meals enable row level security;

create policy "own meals" on meals
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Atividade física
-- ==========================================================
create table activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  description text not null,
  performed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index activities_user_time_idx on activities (user_id, performed_at desc);

alter table activities enable row level security;

create policy "own activities" on activities
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Medicação oral
-- ==========================================================
create table oral_medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  medication_name text not null,
  dosage text,
  taken_at timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

create index oral_medications_user_time_idx on oral_medications (user_id, taken_at desc);

alter table oral_medications enable row level security;

create policy "own oral medications" on oral_medications
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Peso corporal
-- ==========================================================
create table weight_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  weight_kg numeric(5, 2) not null check (weight_kg > 0),
  measured_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index weight_entries_user_time_idx on weight_entries (user_id, measured_at desc);

alter table weight_entries enable row level security;

create policy "own weight entries" on weight_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Pressão arterial
-- ==========================================================
create table blood_pressure_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  systolic int not null check (systolic > 0),
  diastolic int not null check (diastolic > 0),
  measured_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index blood_pressure_entries_user_time_idx on blood_pressure_entries (user_id, measured_at desc);

alter table blood_pressure_entries enable row level security;

create policy "own blood pressure entries" on blood_pressure_entries
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Anotações / sintomas livres
-- ==========================================================
create table notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  content text not null,
  occurred_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index notes_user_time_idx on notes (user_id, occurred_at desc);

alter table notes enable row level security;

create policy "own notes" on notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Limites de alerta (uma linha por usuário, sem faixa padrão)
-- ==========================================================
create table alert_thresholds (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  min_mgdl int,
  max_mgdl int,
  updated_at timestamptz not null default now(),
  constraint min_less_than_max check (
    min_mgdl is null or max_mgdl is null or min_mgdl < max_mgdl
  )
);

alter table alert_thresholds enable row level security;

create policy "own alert thresholds" on alert_thresholds
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Lembretes
-- ==========================================================
create table reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  label text not null,
  time_of_day time not null,
  days_of_week int[] not null default '{0,1,2,3,4,5,6}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index reminders_user_idx on reminders (user_id);

alter table reminders enable row level security;

create policy "own reminders" on reminders
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ==========================================================
-- Timeline unificada (somente leitura) para o dashboard
-- ==========================================================
create view diary_timeline
  with (security_invoker = true) as
select id, user_id, 'glucose'::text as entry_type, measured_at as occurred_at,
       (value_mgdl::text || ' mg/dL (' ||
         case method when 'manual' then 'manual' else 'sensor' end || ')') as summary,
       value_mgdl::numeric as value
from glucose_readings
union all
select id, user_id, 'insulin', applied_at,
       (case insulin_type when 'basal' then 'Insulina basal' else 'Insulina bolus' end
         || ': ' || units || ' UI'),
       units
from insulin_entries
union all
select id, user_id, 'meal', eaten_at, description, null
from meals
union all
select id, user_id, 'activity', performed_at, description, null
from activities
union all
select id, user_id, 'oral_medication', taken_at,
       medication_name || coalesce(' (' || dosage || ')', ''), null
from oral_medications
union all
select id, user_id, 'weight', measured_at, (weight_kg::text || ' kg'), weight_kg
from weight_entries
union all
select id, user_id, 'blood_pressure', measured_at,
       (systolic::text || '/' || diastolic::text || ' mmHg'), systolic::numeric
from blood_pressure_entries
union all
select id, user_id, 'note', occurred_at, content, null
from notes;
