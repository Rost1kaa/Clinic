import { createClient } from "@supabase/supabase-js";
import { env, hasSupabaseServiceEnv } from "@/lib/utils/env";

export function createServiceRoleSupabaseClient() {
  if (!hasSupabaseServiceEnv()) {
    return null;
  }

  return createClient(env.supabaseUrl!, env.supabaseServiceRoleKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
