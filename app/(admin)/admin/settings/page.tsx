import { AdminPageIntro } from "@/components/admin/admin-page-intro";
import { AdminSettingsForms } from "@/components/admin/admin-settings-forms";
import { requireStaff } from "@/lib/auth/guard";

export default async function AdminSettingsPage() {
  const context = await requireStaff();

  if (context.requiresSetup || !context.user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Account settings"
        title="პროფილი და უსაფრთხოება"
        description="განაახლეთ ადმინისტრატორის სახელი, გადაამოწმეთ ანგარიშის ელფოსტა და უსაფრთხოდ შეცვალეთ პაროლი Supabase Auth სესიის ფარგლებში."
      />

      <AdminSettingsForms
        email={context.profile?.email ?? context.user.email ?? ""}
        displayName={context.profile?.full_name ?? "Admin"}
      />
    </div>
  );
}
