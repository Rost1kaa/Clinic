import { createBrowserClient } from "@supabase/ssr";
import { env, hasSupabasePublicEnv } from "@/lib/utils/env";

export function createBrowserSupabaseClient() {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  return createBrowserClient(env.supabaseUrl!, env.supabaseAnonKey!);
}
