import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/utils/env";
import type { UserRole } from "@/types/domain";

type ProfileRow = {
  id: string;
  full_name: string;
  email: string;
  roles: { key: UserRole; name: string } | null;
};

export async function getAdminContext() {
  if (!hasSupabasePublicEnv()) {
    return {
      requiresSetup: true as const,
      user: null,
      profile: null,
      roleKey: null,
    };
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      requiresSetup: true as const,
      user: null,
      profile: null,
      roleKey: null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      requiresSetup: false as const,
      user: null,
      profile: null,
      roleKey: null,
      supabase,
    };
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email, roles(key, name)")
    .eq("id", user.id)
    .maybeSingle();

  const profile = (data ?? null) as ProfileRow | null;
  const roleKey = profile?.roles?.key ?? null;

  return {
    requiresSetup: false as const,
    user,
    profile,
    roleKey,
    supabase,
  };
}

export async function requireStaff(allowedRoles?: UserRole[]) {
  const context = await getAdminContext();

  if (context.requiresSetup) {
    return context;
  }

  if (!context.user) {
    redirect("/auth/login?next=/admin");
  }

  if (!context.roleKey || (allowedRoles && !allowedRoles.includes(context.roleKey))) {
    redirect("/auth/login?forbidden=1");
  }

  return context;
}
