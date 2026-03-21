import { DashboardShell } from "@/components/admin/dashboard-shell";
import { requireStaff } from "@/lib/auth/guard";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = await requireStaff();

  if (context.requiresSetup) {
    return (
      <div className="container-shell py-16">
        <div className="surface-card max-w-3xl p-8">
          <h1 className="font-serif text-4xl text-secondary">Admin setup required</h1>
          <p className="mt-4 text-muted">
            Supabase გარემოს ცვლადები არ არის კონფიგურირებული. დაამატეთ Auth და
            database credentials, შემდეგ ხელახლა გახსენით dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <DashboardShell
      roleLabel={context.profile?.roles?.name ?? context.roleKey ?? "staff"}
      profileName={context.profile?.full_name ?? "Admin"}
      profileEmail={context.profile?.email ?? context.user?.email ?? "admin@medservice.ge"}
    >
      {children}
    </DashboardShell>
  );
}
