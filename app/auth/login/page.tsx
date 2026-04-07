import { signInAction } from "@/lib/actions/auth";
import { hasSupabasePublicEnv } from "@/lib/utils/env";

type Props = {
  searchParams: Promise<{ next?: string; error?: string; forbidden?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { next, error, forbidden } = await searchParams;
  const configured = hasSupabasePublicEnv();

  return (
    <div className="container-shell flex min-h-screen items-center justify-center py-16">
      <div className="surface-card w-full max-w-lg space-y-6 p-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-semibold text-primary">
            Admin Login
          </p>
          <h1 className="font-serif text-4xl text-secondary">მედსერვისი ადმინისტრირება</h1>
          <p className="text-muted">
            გამოიყენეთ Supabase Auth-ით შექმნილი ადმინისტრატორის ანგარიში.
          </p>
        </div>

        {!configured ? (
          <div className="rounded-3xl border border-warning/20 bg-warning/10 p-5 text-sm text-muted">
            ჯერ არ არის დამატებული `NEXT_PUBLIC_SUPABASE_URL` და
            `NEXT_PUBLIC_SUPABASE_ANON_KEY`. admin login ჩაირთვება მათი
            კონფიგურაციის შემდეგ.
          </div>
        ) : null}

        {error ? (
          <div className="rounded-3xl border border-danger/20 bg-danger/10 p-5 text-sm text-danger">
            {error === "credentials"
              ? "ელფოსტა ან პაროლი არასწორია."
              : "Supabase კონფიგურაცია ვერ მოიძებნა."}
          </div>
        ) : null}

        {forbidden ? (
          <div className="rounded-3xl border border-warning/20 bg-warning/10 p-5 text-sm text-muted">
            ამ მომხმარებელს არ აქვს საკმარისი როლი admin dashboard-ზე წვდომისთვის.
          </div>
        ) : null}

        <form action={signInAction} className="space-y-4">
          <input type="hidden" name="next" value={next ?? "/admin"} />
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary" htmlFor="email">
              ელფოსტა
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-secondary" htmlFor="password">
              პაროლი
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!configured}
            className="h-12 w-full rounded-full bg-primary px-5 text-sm font-semibold text-white disabled:opacity-50"
          >
            შესვლა
          </button>
        </form>
      </div>
    </div>
  );
}
