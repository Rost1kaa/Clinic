import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const roleKeys = ["super_admin", "manager", "content_editor"];

function parseEnvValue(rawValue) {
  const trimmed = rawValue.trim();

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }

  return trimmed;
}

function loadEnvFile(filePath, initialKeys) {
  if (!existsSync(filePath)) {
    return false;
  }

  const content = readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const normalized = trimmed.startsWith("export ")
      ? trimmed.slice("export ".length)
      : trimmed;
    const separatorIndex = normalized.indexOf("=");

    if (separatorIndex <= 0) {
      continue;
    }

    const key = normalized.slice(0, separatorIndex).trim();
    const value = normalized.slice(separatorIndex + 1);

    if (!key || initialKeys.has(key)) {
      continue;
    }

    process.env[key] = parseEnvValue(value);
  }

  return true;
}

function loadLocalEnv() {
  const cwd = process.cwd();
  const initialKeys = new Set(Object.keys(process.env));
  const loadedFiles = [];

  for (const fileName of [".env", ".env.local"]) {
    const filePath = path.join(cwd, fileName);

    if (loadEnvFile(filePath, initialKeys)) {
      loadedFiles.push(fileName);
    }
  }

  return loadedFiles;
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];

    if (!token.startsWith("--")) {
      continue;
    }

    const key = token.slice(2);
    const next = argv[index + 1];

    if (!next || next.startsWith("--")) {
      args[key] = "true";
      continue;
    }

    args[key] = next;
    index += 1;
  }

  return args;
}

function fail(message) {
  console.error(`\n[create-admin] ${message}\n`);
  process.exit(1);
}

const loadedEnvFiles = loadLocalEnv();
const args = parseArgs(process.argv.slice(2));
const email = args.email?.trim();
const password = args.password;
const fullName = args.name?.trim() || "Project Admin";
const roleKey = args.role?.trim() || "super_admin";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  fail("NEXT_PUBLIC_SUPABASE_URL is missing in .env or .env.local");
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  fail("SUPABASE_SERVICE_ROLE_KEY is missing in .env or .env.local");
}

if (!loadedEnvFiles.length) {
  console.warn("[create-admin] No .env or .env.local file was found. Using only existing process environment values.");
}

if (!email) {
  fail("Missing --email");
}

if (!password) {
  fail("Missing --password");
}

if (!roleKeys.includes(roleKey)) {
  fail(`Invalid --role. Use one of: ${roleKeys.join(", ")}`);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const { data: roleRow, error: roleError } = await supabase
  .from("roles")
  .select("id, key")
  .eq("key", roleKey)
  .single();

if (roleError || !roleRow) {
  fail(
    `Role "${roleKey}" was not found. Run supabase/seed.sql first. Error: ${roleError?.message ?? "unknown"}`,
  );
}

const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers({
  page: 1,
  perPage: 1000,
});

if (usersError) {
  fail(`Could not list auth users: ${usersError.message}`);
}

const existingUser = usersData.users.find(
  (user) => user.email?.toLowerCase() === email.toLowerCase(),
);

let userId = existingUser?.id;

if (!existingUser) {
  const { data: createdUserData, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

  if (createError || !createdUserData.user) {
    fail(`Could not create auth user: ${createError?.message ?? "unknown"}`);
  }

  userId = createdUserData.user.id;
  console.log(`[create-admin] Auth user created for ${email}`);
} else {
  const { error: updateError } = await supabase.auth.admin.updateUserById(
    existingUser.id,
    {
      password,
      email_confirm: true,
      user_metadata: {
        ...(existingUser.user_metadata ?? {}),
        full_name: fullName,
      },
    },
  );

  if (updateError) {
    fail(`Could not update existing auth user: ${updateError.message}`);
  }

  console.log(`[create-admin] Existing auth user updated for ${email}`);
}

const { error: profileError } = await supabase.from("profiles").upsert(
  {
    id: userId,
    email,
    full_name: fullName,
    role_id: roleRow.id,
    is_active: true,
  },
  {
    onConflict: "id",
  },
);

if (profileError) {
  fail(`Could not assign role in profiles: ${profileError.message}`);
}

console.log(`[create-admin] Role "${roleKey}" assigned to ${email}`);
console.log(`[create-admin] Login URL: ${siteUrl}/auth/login\n`);
