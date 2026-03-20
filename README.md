# Velora Care

Production-grade medical services booking platform built with Next.js App Router, TypeScript, Tailwind CSS, Supabase, and PostgreSQL.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS 4
- Supabase Auth + Postgres
- React Hook Form + Zod
- Server Components + Route Handlers

## What’s Included

- Georgian-first public website with premium healthcare UI
- Service, specialty, diagnostics, laboratory, news, about, contact, FAQ, privacy, and terms pages
- Multi-step booking flow with server-side validation
- Payment-ready abstraction with a mock provider and onsite mode
- Secure admin login with Supabase Auth
- Protected admin dashboard for bookings, catalog, news, and availability
- Supabase SQL schema, RLS, and seed data
- SEO setup with metadata, sitemap, robots, JSON-LD, and OG image

## Project Structure

```text
app/
  (site)/                Public site routes
  (admin)/admin/         Protected dashboard routes
  auth/login/            Admin login
  api/                   Booking, export, mock payment handlers
components/
  admin/                 Dashboard shell
  booking/               Booking UI and confirmation UI
  layout/                Header, footer, nav
  sections/              Shared marketing sections
  ui/                    Design system primitives
lib/
  actions/               Server actions
  auth/                  Role/session guards
  data/                  Seed content + Supabase-aware queries
  payments/              Provider abstraction
  schemas/               Zod validation
  security/              CSRF and rate-limit helpers
  supabase/              SSR and service-role clients
  utils/                 Formatting, metadata, slugs, env
supabase/
  migrations/            Database schema + RLS
  seed.sql               Initial content seed
```

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env.local
```

3. Fill in Supabase values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

4. Apply SQL:

- Run [`supabase/migrations/001_initial_schema.sql`](/d:/Projects/Clinic/supabase/migrations/001_initial_schema.sql) in Supabase SQL editor or via CLI migration workflow.
- Run [`supabase/seed.sql`](/d:/Projects/Clinic/supabase/seed.sql) afterwards.

5. Start the app:

```bash
npm run dev
```

6. Optional: create an admin user from the terminal:

```bash
npm run create-admin -- --email admin@example.com --password "StrongPass123!" --name "Project Admin" --role super_admin
```

## Supabase Auth Bootstrap

Recommended: create the admin user with the bundled script, then sign in at `/auth/login`.

```bash
npm run create-admin -- --email admin@example.com --password "StrongPass123!" --name "Project Admin" --role super_admin
```

If you prefer the dashboard, create a user in Supabase Auth first, then assign a role through `profiles.role_id`.

Example:

```sql
update public.profiles
set role_id = '00000000-0000-0000-0000-000000000001'
where email = 'admin@example.com';
```

Role IDs seeded by default:

- `super_admin`: `00000000-0000-0000-0000-000000000001`
- `manager`: `00000000-0000-0000-0000-000000000002`
- `content_editor`: `00000000-0000-0000-0000-000000000003`

## Security Notes

- Public booking writes are handled through database functions instead of broad insert policies
- Admin routes are protected by middleware and server-side role checks
- Public forms use Zod validation, CSRF-aware origin checks, and rate limiting
- Payment provider keys stay server-side
- Row Level Security is enabled across operational tables

## Payment Architecture

Online payment is abstracted behind `lib/payments/`.

- `mock`: internal simulation flow for local/demo usage
- `manual`: placeholder for manual/onsite-like provider handoff

Real gateways can be plugged in by implementing the `PaymentGateway` interface.

## Deployment Notes

- Recommended: Vercel for Next.js + hosted Supabase project
- Set all environment variables in the deployment target
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only
- If you deploy behind a custom domain, update `NEXT_PUBLIC_SITE_URL`
- For production rate limiting, replace the in-memory limiter with Redis/Upstash

## Verification

Run:

```bash
npm run check
npm run build
```
