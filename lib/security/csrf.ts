import { env } from "@/lib/utils/env";

function normalizeOrigin(value: string) {
  return value.replace(/\/$/, "");
}

export function assertTrustedOrigin(request: Request) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return;
  }

  const allowed = new Set([
    normalizeOrigin(env.siteUrl),
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);

  if (!allowed.has(normalizeOrigin(origin))) {
    throw new Error("Untrusted origin");
  }
}
