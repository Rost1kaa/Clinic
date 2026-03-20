create extension if not exists pgcrypto;
create extension if not exists citext;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'staff_role_key_enum') then
    create type public.staff_role_key_enum as enum ('super_admin', 'manager', 'content_editor');
  end if;

  if not exists (select 1 from pg_type where typname = 'service_mode_enum') then
    create type public.service_mode_enum as enum ('home_visit', 'online_consultation');
  end if;

  if not exists (select 1 from pg_type where typname = 'booking_category_enum') then
    create type public.booking_category_enum as enum ('specialty', 'diagnostic', 'laboratory');
  end if;

  if not exists (select 1 from pg_type where typname = 'booking_status_enum') then
    create type public.booking_status_enum as enum ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_method_enum') then
    create type public.payment_method_enum as enum ('online', 'onsite');
  end if;

  if not exists (select 1 from pg_type where typname = 'payment_status_enum') then
    create type public.payment_status_enum as enum ('pending', 'paid', 'failed', 'onsite_pending', 'refunded');
  end if;

  if not exists (select 1 from pg_type where typname = 'availability_status_enum') then
    create type public.availability_status_enum as enum ('available', 'blocked');
  end if;

  if not exists (select 1 from pg_type where typname = 'communication_method_enum') then
    create type public.communication_method_enum as enum ('phone', 'whatsapp', 'email');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.generate_booking_reference()
returns text
language plpgsql
as $$
declare
  generated text;
begin
  generated := 'VLR-' || to_char(timezone('utc', now()), 'YYMMDD') || '-' || upper(substr(md5(gen_random_uuid()::text), 1, 6));
  return generated;
end;
$$;

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  key public.staff_role_key_enum not null unique,
  name text not null,
  description text,
  permissions jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  email citext unique,
  full_name text not null default '',
  avatar_url text,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.specialties (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ka text not null,
  summary_ka text not null,
  description_ka text not null,
  care_path_ka text,
  icon text not null default 'activity',
  image_url text,
  image_credit_url text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_active boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  specialty_id uuid references public.specialties(id) on delete set null,
  slug text not null unique,
  name_ka text not null,
  summary_ka text not null,
  description_ka text not null,
  service_mode public.service_mode_enum not null,
  price numeric(10,2) not null default 0,
  duration_minutes integer not null default 30,
  requires_address boolean not null default false,
  requires_video_link boolean not null default false,
  image_url text,
  image_credit_url text,
  tags text[] not null default '{}',
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_active boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.diagnostics (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ka text not null,
  summary_ka text not null,
  description_ka text not null,
  price numeric(10,2) not null default 0,
  duration_minutes integer not null default 30,
  home_available boolean not null default false,
  image_url text,
  image_credit_url text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_active boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.laboratory_services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null,
  name_ka text not null,
  summary_ka text not null,
  description_ka text not null,
  price numeric(10,2) not null default 0,
  duration_minutes integer not null default 20,
  home_available boolean not null default true,
  image_url text,
  image_credit_url text,
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_active boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  specialty_id uuid not null references public.specialties(id) on delete restrict,
  slug text not null unique,
  full_name_ka text not null,
  title_ka text not null,
  bio_ka text not null,
  experience_years integer not null default 0,
  languages text[] not null default '{"ქართული"}',
  image_url text,
  image_credit_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.availability_slots (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid references public.doctors(id) on delete set null,
  category public.booking_category_enum not null,
  service_mode public.service_mode_enum not null,
  service_id uuid references public.services(id) on delete cascade,
  diagnostic_id uuid references public.diagnostics(id) on delete cascade,
  laboratory_service_id uuid references public.laboratory_services(id) on delete cascade,
  slot_start timestamptz not null,
  slot_end timestamptz not null,
  capacity integer not null default 1 check (capacity > 0),
  status public.availability_status_enum not null default 'available',
  is_public boolean not null default true,
  notes text,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint availability_slot_target_check check (
    (category = 'specialty' and service_id is not null and diagnostic_id is null and laboratory_service_id is null) or
    (category = 'diagnostic' and diagnostic_id is not null and service_id is null and laboratory_service_id is null) or
    (category = 'laboratory' and laboratory_service_id is not null and service_id is null and diagnostic_id is null)
  ),
  constraint availability_slot_dates_check check (slot_end > slot_start)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference_code text not null unique default public.generate_booking_reference(),
  service_type public.service_mode_enum not null,
  booking_category public.booking_category_enum not null,
  service_id uuid references public.services(id) on delete set null,
  diagnostic_id uuid references public.diagnostics(id) on delete set null,
  laboratory_service_id uuid references public.laboratory_services(id) on delete set null,
  doctor_id uuid references public.doctors(id) on delete set null,
  slot_id uuid not null references public.availability_slots(id) on delete restrict,
  preferred_date timestamptz not null,
  patient_full_name text not null,
  patient_phone text not null,
  patient_email citext not null,
  patient_address text,
  symptoms_notes text,
  preferred_communication public.communication_method_enum not null default 'phone',
  payment_method public.payment_method_enum not null,
  payment_status public.payment_status_enum not null default 'pending',
  status public.booking_status_enum not null default 'pending',
  total_amount numeric(10,2) not null default 0,
  source text not null default 'website',
  video_meeting_url text,
  internal_notes text,
  submitted_ip inet,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint booking_target_check check (
    (booking_category = 'specialty' and service_id is not null and diagnostic_id is null and laboratory_service_id is null) or
    (booking_category = 'diagnostic' and diagnostic_id is not null and service_id is null and laboratory_service_id is null) or
    (booking_category = 'laboratory' and laboratory_service_id is not null and service_id is null and diagnostic_id is null)
  ),
  constraint booking_address_check check (
    (service_type = 'home_visit' and patient_address is not null and length(trim(patient_address)) > 0) or
    service_type = 'online_consultation'
  )
);

create table if not exists public.booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  previous_status public.booking_status_enum,
  new_status public.booking_status_enum not null,
  changed_by uuid references public.profiles(id) on delete set null,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.news_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_ka text not null,
  description_ka text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.news_categories(id) on delete set null,
  author_profile_id uuid references public.profiles(id) on delete set null,
  slug text not null unique,
  title_ka text not null,
  excerpt_ka text not null,
  content_markdown text not null,
  cover_image_url text,
  cover_image_credit_url text,
  tags text[] not null default '{}',
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title_ka text,
  seo_description_ka text,
  related_slugs text[] not null default '{}',
  deleted_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  full_name_ka text not null,
  role_ka text not null,
  quote_ka text not null,
  location_ka text,
  rating integer not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  is_public boolean not null default false,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.payment_records (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  provider_key text not null,
  external_payment_id text,
  amount numeric(10,2) not null,
  currency text not null default 'GEL',
  status public.payment_status_enum not null default 'pending',
  payment_method public.payment_method_enum not null,
  redirect_url text,
  raw_response jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists payment_records_external_payment_idx
  on public.payment_records (external_payment_id)
  where external_payment_id is not null;

create index if not exists profiles_role_idx on public.profiles(role_id);
create index if not exists services_specialty_idx on public.services(specialty_id);
create index if not exists doctors_specialty_idx on public.doctors(specialty_id);
create index if not exists availability_slots_window_idx on public.availability_slots(slot_start, slot_end);
create index if not exists availability_slots_doctor_idx on public.availability_slots(doctor_id);
create index if not exists bookings_slot_idx on public.bookings(slot_id);
create index if not exists bookings_reference_idx on public.bookings(reference_code);
create index if not exists bookings_status_idx on public.bookings(status, payment_status, service_type);
create index if not exists bookings_preferred_date_idx on public.bookings(preferred_date);
create index if not exists booking_history_booking_idx on public.booking_status_history(booking_id, created_at desc);
create index if not exists news_posts_published_idx on public.news_posts(is_published, published_at desc);
create index if not exists payment_records_booking_idx on public.payment_records(booking_id, created_at desc);

create or replace function public.current_role_key()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select r.key::text
  from public.profiles p
  join public.roles r on r.id = p.role_id
  where p.id = auth.uid()
    and p.is_active = true
  limit 1;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role_key() in ('super_admin', 'manager', 'content_editor'), false);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role_key() = 'super_admin', false);
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create or replace function public.log_booking_status_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.booking_status_history (booking_id, new_status, changed_by, note)
    values (new.id, new.status, auth.uid(), 'Booking created');
    return new;
  end if;

  if new.status is distinct from old.status then
    insert into public.booking_status_history (
      booking_id,
      previous_status,
      new_status,
      changed_by,
      note
    )
    values (
      new.id,
      old.status,
      new.status,
      auth.uid(),
      new.internal_notes
    );
  end if;

  return new;
end;
$$;

create or replace function public.create_booking(
  p_service_type public.service_mode_enum,
  p_booking_category public.booking_category_enum,
  p_service_id uuid default null,
  p_diagnostic_id uuid default null,
  p_laboratory_service_id uuid default null,
  p_doctor_id uuid default null,
  p_slot_id uuid default null,
  p_patient_full_name text default null,
  p_patient_phone text default null,
  p_patient_email text default null,
  p_patient_address text default null,
  p_symptoms_notes text default null,
  p_preferred_communication public.communication_method_enum default 'phone',
  p_payment_method public.payment_method_enum default 'online',
  p_provider_key text default null,
  p_submitted_ip inet default null,
  p_user_agent text default null,
  p_metadata jsonb default '{}'::jsonb
)
returns table (
  booking_id uuid,
  reference_code text,
  payment_status public.payment_status_enum,
  booking_status public.booking_status_enum,
  total_amount numeric
)
language plpgsql
security definer
set search_path = public
as $$
declare
  slot_row public.availability_slots%rowtype;
  active_bookings integer;
  resolved_amount numeric(10,2);
  resolved_payment_status public.payment_status_enum;
  resolved_reference text;
  resolved_doctor_id uuid;
begin
  if p_slot_id is null then
    raise exception 'Selected slot is required';
  end if;

  if coalesce(trim(p_patient_full_name), '') = '' then
    raise exception 'Patient full name is required';
  end if;

  if coalesce(trim(p_patient_phone), '') = '' then
    raise exception 'Patient phone is required';
  end if;

  if coalesce(trim(p_patient_email), '') = '' then
    raise exception 'Patient email is required';
  end if;

  if p_service_type = 'home_visit' and coalesce(trim(p_patient_address), '') = '' then
    raise exception 'Address is required for home visits';
  end if;

  if p_service_type = 'online_consultation' and p_booking_category <> 'specialty' then
    raise exception 'Online consultation is only available for specialty bookings';
  end if;

  select *
  into slot_row
  from public.availability_slots
  where id = p_slot_id
    and deleted_at is null
    and status = 'available'
  for update;

  if not found then
    raise exception 'Selected slot is unavailable';
  end if;

  if slot_row.service_mode <> p_service_type then
    raise exception 'Selected slot does not match service type';
  end if;

  if slot_row.category <> p_booking_category then
    raise exception 'Selected slot does not match category';
  end if;

  if slot_row.slot_start <= timezone('utc', now()) then
    raise exception 'Selected slot is already in the past';
  end if;

  if p_booking_category = 'specialty' and slot_row.service_id is distinct from p_service_id then
    raise exception 'Selected specialty service does not match slot';
  elsif p_booking_category = 'diagnostic' and slot_row.diagnostic_id is distinct from p_diagnostic_id then
    raise exception 'Selected diagnostic does not match slot';
  elsif p_booking_category = 'laboratory' and slot_row.laboratory_service_id is distinct from p_laboratory_service_id then
    raise exception 'Selected laboratory service does not match slot';
  end if;

  if slot_row.doctor_id is not null and p_doctor_id is not null and slot_row.doctor_id <> p_doctor_id then
    raise exception 'Selected doctor does not match slot';
  end if;

  resolved_doctor_id := coalesce(slot_row.doctor_id, p_doctor_id);

  select count(*)
  into active_bookings
  from public.bookings
  where slot_id = p_slot_id
    and deleted_at is null
    and status in ('pending', 'confirmed', 'completed');

  if active_bookings >= slot_row.capacity then
    raise exception 'Selected time slot is no longer available';
  end if;

  if p_booking_category = 'specialty' then
    select price into resolved_amount
    from public.services
    where id = p_service_id
      and deleted_at is null
      and is_active = true;
  elsif p_booking_category = 'diagnostic' then
    select price into resolved_amount
    from public.diagnostics
    where id = p_diagnostic_id
      and deleted_at is null
      and is_active = true;
  else
    select price into resolved_amount
    from public.laboratory_services
    where id = p_laboratory_service_id
      and deleted_at is null
      and is_active = true;
  end if;

  if resolved_amount is null then
    raise exception 'Could not resolve service pricing';
  end if;

  resolved_payment_status := case
    when p_payment_method = 'online' then 'pending'::public.payment_status_enum
    else 'onsite_pending'::public.payment_status_enum
  end;

  resolved_reference := public.generate_booking_reference();

  insert into public.bookings (
    reference_code,
    service_type,
    booking_category,
    service_id,
    diagnostic_id,
    laboratory_service_id,
    doctor_id,
    slot_id,
    preferred_date,
    patient_full_name,
    patient_phone,
    patient_email,
    patient_address,
    symptoms_notes,
    preferred_communication,
    payment_method,
    payment_status,
    status,
    total_amount,
    submitted_ip,
    user_agent,
    metadata
  )
  values (
    resolved_reference,
    p_service_type,
    p_booking_category,
    p_service_id,
    p_diagnostic_id,
    p_laboratory_service_id,
    resolved_doctor_id,
    p_slot_id,
    slot_row.slot_start,
    trim(p_patient_full_name),
    trim(p_patient_phone),
    trim(p_patient_email),
    nullif(trim(coalesce(p_patient_address, '')), ''),
    nullif(trim(coalesce(p_symptoms_notes, '')), ''),
    p_preferred_communication,
    p_payment_method,
    resolved_payment_status,
    'pending',
    resolved_amount,
    p_submitted_ip,
    p_user_agent,
    coalesce(p_metadata, '{}'::jsonb)
  )
  returning id, reference_code, payment_status, status, total_amount
  into booking_id, reference_code, payment_status, booking_status, total_amount;

  insert into public.payment_records (
    booking_id,
    provider_key,
    amount,
    status,
    payment_method,
    raw_response
  )
  values (
    booking_id,
    coalesce(nullif(trim(coalesce(p_provider_key, '')), ''), case when p_payment_method = 'online' then 'pending_gateway' else 'onsite' end),
    resolved_amount,
    resolved_payment_status,
    p_payment_method,
    coalesce(p_metadata, '{}'::jsonb)
  );

  return next;
end;
$$;

create or replace function public.attach_payment_intent(
  p_booking_id uuid,
  p_reference_code text,
  p_provider_key text,
  p_external_payment_id text,
  p_redirect_url text,
  p_raw_response jsonb default '{}'::jsonb
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.bookings
    where id = p_booking_id
      and reference_code = p_reference_code
      and payment_method = 'online'
  ) then
    raise exception 'Booking not found for payment attachment';
  end if;

  update public.payment_records
  set
    provider_key = coalesce(nullif(trim(coalesce(p_provider_key, '')), ''), provider_key),
    external_payment_id = p_external_payment_id,
    redirect_url = p_redirect_url,
    raw_response = coalesce(p_raw_response, '{}'::jsonb),
    updated_at = timezone('utc', now())
  where booking_id = p_booking_id
    and payment_method = 'online';
end;
$$;

create or replace function public.get_public_booking_summary(p_reference_code text)
returns table (
  reference_code text,
  service_type public.service_mode_enum,
  booking_category public.booking_category_enum,
  booking_status public.booking_status_enum,
  payment_status public.payment_status_enum,
  payment_method public.payment_method_enum,
  preferred_date timestamptz,
  total_amount numeric,
  redirect_url text
)
language sql
security definer
set search_path = public
as $$
  select
    b.reference_code,
    b.service_type,
    b.booking_category,
    b.status as booking_status,
    b.payment_status,
    b.payment_method,
    b.preferred_date,
    b.total_amount,
    (
      select pr.redirect_url
      from public.payment_records pr
      where pr.booking_id = b.id
      order by pr.created_at desc
      limit 1
    ) as redirect_url
  from public.bookings b
  where b.reference_code = p_reference_code
    and b.deleted_at is null
  limit 1;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists roles_set_updated_at on public.roles;
create trigger roles_set_updated_at before update on public.roles for each row execute procedure public.set_updated_at();
drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists specialties_set_updated_at on public.specialties;
create trigger specialties_set_updated_at before update on public.specialties for each row execute procedure public.set_updated_at();
drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at before update on public.services for each row execute procedure public.set_updated_at();
drop trigger if exists diagnostics_set_updated_at on public.diagnostics;
create trigger diagnostics_set_updated_at before update on public.diagnostics for each row execute procedure public.set_updated_at();
drop trigger if exists laboratory_services_set_updated_at on public.laboratory_services;
create trigger laboratory_services_set_updated_at before update on public.laboratory_services for each row execute procedure public.set_updated_at();
drop trigger if exists doctors_set_updated_at on public.doctors;
create trigger doctors_set_updated_at before update on public.doctors for each row execute procedure public.set_updated_at();
drop trigger if exists availability_slots_set_updated_at on public.availability_slots;
create trigger availability_slots_set_updated_at before update on public.availability_slots for each row execute procedure public.set_updated_at();
drop trigger if exists bookings_set_updated_at on public.bookings;
create trigger bookings_set_updated_at before update on public.bookings for each row execute procedure public.set_updated_at();
drop trigger if exists news_categories_set_updated_at on public.news_categories;
create trigger news_categories_set_updated_at before update on public.news_categories for each row execute procedure public.set_updated_at();
drop trigger if exists news_posts_set_updated_at on public.news_posts;
create trigger news_posts_set_updated_at before update on public.news_posts for each row execute procedure public.set_updated_at();
drop trigger if exists testimonials_set_updated_at on public.testimonials;
create trigger testimonials_set_updated_at before update on public.testimonials for each row execute procedure public.set_updated_at();
drop trigger if exists payment_records_set_updated_at on public.payment_records;
create trigger payment_records_set_updated_at before update on public.payment_records for each row execute procedure public.set_updated_at();

drop trigger if exists bookings_status_history on public.bookings;
create trigger bookings_status_history
  after insert or update on public.bookings
  for each row execute procedure public.log_booking_status_change();

create trigger site_settings_set_updated_at
  before update on public.site_settings
  for each row execute procedure public.set_updated_at();

alter table public.roles enable row level security;
alter table public.profiles enable row level security;
alter table public.specialties enable row level security;
alter table public.services enable row level security;
alter table public.diagnostics enable row level security;
alter table public.laboratory_services enable row level security;
alter table public.doctors enable row level security;
alter table public.availability_slots enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.news_categories enable row level security;
alter table public.news_posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.site_settings enable row level security;
alter table public.payment_records enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.specialties, public.services, public.diagnostics, public.laboratory_services, public.doctors, public.availability_slots, public.news_categories, public.news_posts, public.testimonials, public.site_settings to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant execute on function public.current_role_key() to anon, authenticated;
grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_super_admin() to anon, authenticated;
grant execute on function public.create_booking(public.service_mode_enum, public.booking_category_enum, uuid, uuid, uuid, uuid, uuid, text, text, text, text, text, public.communication_method_enum, public.payment_method_enum, text, inet, text, jsonb) to anon, authenticated;
grant execute on function public.attach_payment_intent(uuid, text, text, text, text, jsonb) to anon, authenticated;
grant execute on function public.get_public_booking_summary(text) to anon, authenticated;

create policy "roles_select_staff"
  on public.roles for select
  using (public.is_staff());

create policy "roles_manage_super_admin"
  on public.roles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

create policy "profiles_select_self_or_staff"
  on public.profiles for select
  using (auth.uid() = id or public.is_staff());

create policy "profiles_update_staff_only"
  on public.profiles for update
  using (public.is_staff())
  with check (public.is_staff());

create policy "specialties_public_read"
  on public.specialties for select
  using (is_active = true and deleted_at is null);

create policy "specialties_staff_manage"
  on public.specialties for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "services_public_read"
  on public.services for select
  using (is_active = true and deleted_at is null);

create policy "services_staff_manage"
  on public.services for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "diagnostics_public_read"
  on public.diagnostics for select
  using (is_active = true and deleted_at is null);

create policy "diagnostics_staff_manage"
  on public.diagnostics for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "laboratory_public_read"
  on public.laboratory_services for select
  using (is_active = true and deleted_at is null);

create policy "laboratory_staff_manage"
  on public.laboratory_services for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "doctors_public_read"
  on public.doctors for select
  using (is_active = true and deleted_at is null);

create policy "doctors_staff_manage"
  on public.doctors for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "availability_public_read"
  on public.availability_slots for select
  using (
    is_public = true
    and deleted_at is null
    and status = 'available'
    and slot_start >= timezone('utc', now())
  );

create policy "availability_staff_manage"
  on public.availability_slots for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "bookings_staff_select"
  on public.bookings for select
  using (public.is_staff());

create policy "bookings_staff_modify"
  on public.bookings for insert
  with check (public.is_staff());

create policy "bookings_staff_update"
  on public.bookings for update
  using (public.is_staff())
  with check (public.is_staff());

create policy "booking_history_staff_read"
  on public.booking_status_history for select
  using (public.is_staff());

create policy "booking_history_staff_insert"
  on public.booking_status_history for insert
  with check (public.is_staff());

create policy "news_categories_public_read"
  on public.news_categories for select
  using (true);

create policy "news_categories_staff_manage"
  on public.news_categories for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "news_posts_public_read"
  on public.news_posts for select
  using (is_published = true and deleted_at is null and published_at <= timezone('utc', now()));

create policy "news_posts_staff_manage"
  on public.news_posts for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "testimonials_public_read"
  on public.testimonials for select
  using (is_featured = true);

create policy "testimonials_staff_manage"
  on public.testimonials for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "site_settings_public_read"
  on public.site_settings for select
  using (is_public = true or public.is_staff());

create policy "site_settings_staff_manage"
  on public.site_settings for all
  using (public.is_staff())
  with check (public.is_staff());

create policy "payment_records_staff_select"
  on public.payment_records for select
  using (public.is_staff());

create policy "payment_records_staff_manage"
  on public.payment_records for all
  using (public.is_staff())
  with check (public.is_staff());
