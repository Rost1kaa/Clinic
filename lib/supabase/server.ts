import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { env, hasSupabasePublicEnv } from "@/lib/utils/env";

export async function createServerSupabaseClient() {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components may not write cookies; middleware handles refresh.
        }
      },
    },
  });
}
