"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import type { ZodError } from "zod";
import type { AdminActionState } from "@/lib/actions/admin-state";
import { requireStaff } from "@/lib/auth/guard";
import {
  adminNewsPostSchema,
  adminPasswordSettingsSchema,
  adminProfileSettingsSchema,
} from "@/lib/schemas/admin";
import { env, hasSupabasePublicEnv } from "@/lib/utils/env";
import { slugify } from "@/lib/utils/slug";

function textValue(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function numberValue(formData: FormData, key: string, fallback = 0) {
  const value = Number(formData.get(key) ?? fallback);
  return Number.isFinite(value) ? value : fallback;
}

function boolValue(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function toIsoDate(value: string) {
  return value ? new Date(value).toISOString() : null;
}

function errorState<FieldKey extends string>(
  message: string,
  fieldErrors?: Partial<Record<FieldKey, string[]>>,
): AdminActionState<FieldKey> {
  return {
    status: "error",
    message,
    fieldErrors,
  };
}

function successState<FieldKey extends string>(
  message: string,
): AdminActionState<FieldKey> {
  return {
    status: "success",
    message,
  };
}

function flattenFieldErrors<FieldKey extends string>(
  error: ZodError,
): Partial<Record<FieldKey, string[]>> {
  return error.flatten().fieldErrors as Partial<Record<FieldKey, string[]>>;
}

export async function updateBookingStatusAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const bookingId = textValue(formData, "booking_id");
  const status = textValue(formData, "status");
  const internalNotes = textValue(formData, "internal_notes");

  await context.supabase
    .from("bookings")
    .update({
      status,
      internal_notes: internalNotes || null,
    })
    .eq("id", bookingId);

  revalidatePath("/admin/bookings");
}

export async function createSpecialtyAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const name = textValue(formData, "name_ka");
  const slug = textValue(formData, "slug") || slugify(name);

  await context.supabase.from("specialties").insert({
    slug,
    name_ka: name,
    summary_ka: textValue(formData, "summary_ka"),
    description_ka: textValue(formData, "description_ka"),
    care_path_ka: textValue(formData, "care_path_ka"),
    icon: textValue(formData, "icon") || "activity",
    featured: boolValue(formData, "featured"),
    is_active: true,
  });

  revalidatePath("/admin/catalog");
}

export async function createServiceAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const name = textValue(formData, "name_ka");
  const slug = textValue(formData, "slug") || slugify(name);

  await context.supabase.from("services").insert({
    specialty_id: textValue(formData, "specialty_id"),
    slug,
    name_ka: name,
    summary_ka: textValue(formData, "summary_ka"),
    description_ka: textValue(formData, "description_ka"),
    service_mode: textValue(formData, "service_mode"),
    price: numberValue(formData, "price"),
    duration_minutes: numberValue(formData, "duration_minutes", 30),
    requires_address: boolValue(formData, "requires_address"),
    requires_video_link: boolValue(formData, "requires_video_link"),
    featured: boolValue(formData, "featured"),
    is_active: true,
  });

  revalidatePath("/admin/catalog");
}

export async function createDiagnosticAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const name = textValue(formData, "name_ka");
  const slug = textValue(formData, "slug") || slugify(name);

  await context.supabase.from("diagnostics").insert({
    slug,
    name_ka: name,
    summary_ka: textValue(formData, "summary_ka"),
    description_ka: textValue(formData, "description_ka"),
    price: numberValue(formData, "price"),
    duration_minutes: numberValue(formData, "duration_minutes", 30),
    home_available: boolValue(formData, "home_available"),
    featured: boolValue(formData, "featured"),
    is_active: true,
  });

  revalidatePath("/admin/catalog");
}

export async function createLaboratoryAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const name = textValue(formData, "name_ka");
  const slug = textValue(formData, "slug") || slugify(name);

  await context.supabase.from("laboratory_services").insert({
    slug,
    category: textValue(formData, "category"),
    name_ka: name,
    summary_ka: textValue(formData, "summary_ka"),
    description_ka: textValue(formData, "description_ka"),
    price: numberValue(formData, "price"),
    duration_minutes: numberValue(formData, "duration_minutes", 20),
    home_available: boolValue(formData, "home_available"),
    featured: boolValue(formData, "featured"),
    is_active: true,
  });

  revalidatePath("/admin/catalog");
}

export async function createDoctorAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const fullName = textValue(formData, "full_name_ka");
  const slug = textValue(formData, "slug") || slugify(fullName);
  const languages = textValue(formData, "languages")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await context.supabase.from("doctors").insert({
    specialty_id: textValue(formData, "specialty_id"),
    slug,
    full_name_ka: fullName,
    title_ka: textValue(formData, "title_ka"),
    bio_ka: textValue(formData, "bio_ka"),
    experience_years: numberValue(formData, "experience_years"),
    languages: languages.length ? languages : ["ქართული"],
    is_featured: boolValue(formData, "is_featured"),
    is_active: true,
  });

  revalidatePath("/admin/catalog");
}

export async function createNewsPostAction(
  _prevState: AdminActionState<
    "category_id" | "title_ka" | "excerpt_ka" | "tags" | "content_markdown"
  >,
  formData: FormData,
): Promise<
  AdminActionState<
    "category_id" | "title_ka" | "excerpt_ka" | "tags" | "content_markdown"
  >
> {
  const context = await requireStaff(["super_admin", "manager", "content_editor"]);
  if (context.requiresSetup) {
    return errorState("Supabase კონფიგურაცია ვერ მოიძებნა.");
  }

  const parsed = adminNewsPostSchema.safeParse({
    category_id: textValue(formData, "category_id"),
    title_ka: textValue(formData, "title_ka"),
    excerpt_ka: textValue(formData, "excerpt_ka"),
    tags: textValue(formData, "tags"),
    content_markdown: textValue(formData, "content_markdown"),
    is_published: boolValue(formData, "is_published"),
  });

  if (!parsed.success) {
    return errorState(
      "გთხოვთ გადაამოწმოთ სავალდებულო ველები.",
      flattenFieldErrors(parsed.error),
    );
  }

  const tags = parsed.data.tags
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const { error } = await context.supabase.from("news_posts").insert({
    category_id: parsed.data.category_id || null,
    author_profile_id: context.user?.id ?? null,
    slug: slugify(parsed.data.title_ka),
    title_ka: parsed.data.title_ka,
    excerpt_ka: parsed.data.excerpt_ka,
    content_markdown: parsed.data.content_markdown,
    tags,
    is_published: parsed.data.is_published,
    published_at: parsed.data.is_published ? new Date().toISOString() : null,
  });

  if (error) {
    return errorState(
      "სტატიის შენახვა ვერ მოხერხდა. სცადეთ ხელახლა.",
    );
  }

  revalidatePath("/admin/news");
  revalidatePath("/news");

  return successState("სტატია წარმატებით შეინახა.");
}

export async function updateAdminProfileAction(
  _prevState: AdminActionState<"display_name">,
  formData: FormData,
): Promise<AdminActionState<"display_name">> {
  const context = await requireStaff();
  if (context.requiresSetup || !context.user) {
    return errorState("ადმინისტრატორის სესია ვერ დადასტურდა.");
  }

  const parsed = adminProfileSettingsSchema.safeParse({
    display_name: textValue(formData, "display_name"),
  });

  if (!parsed.success) {
    return errorState(
      "სახელის განახლება ვერ მოხერხდა.",
      flattenFieldErrors(parsed.error),
    );
  }

  const [{ error: profileError }, { error: authError }] = await Promise.all([
    context.supabase
      .from("profiles")
      .update({
        full_name: parsed.data.display_name,
      })
      .eq("id", context.user.id),
    context.supabase.auth.updateUser({
      data: {
        full_name: parsed.data.display_name,
      },
    }),
  ]);

  if (profileError || authError) {
    return errorState("პროფილის განახლება ვერ მოხერხდა. სცადეთ ხელახლა.");
  }

  revalidatePath("/admin");
  revalidatePath("/admin/settings");

  return successState("პროფილის ინფორმაცია წარმატებით განახლდა.");
}

export async function updateAdminPasswordAction(
  _prevState: AdminActionState<
    "current_password" | "new_password" | "confirm_password"
  >,
  formData: FormData,
): Promise<
  AdminActionState<"current_password" | "new_password" | "confirm_password">
> {
  const context = await requireStaff();
  if (context.requiresSetup || !context.user?.email) {
    return errorState("ადმინისტრატორის სესია ვერ დადასტურდა.");
  }

  if (!hasSupabasePublicEnv()) {
    return errorState("Supabase Auth კონფიგურაცია ვერ მოიძებნა.");
  }

  const parsed = adminPasswordSettingsSchema.safeParse({
    current_password: String(formData.get("current_password") ?? ""),
    new_password: String(formData.get("new_password") ?? ""),
    confirm_password: String(formData.get("confirm_password") ?? ""),
  });

  if (!parsed.success) {
    return errorState(
      "გთხოვთ გადაამოწმოთ პაროლის ველები.",
      flattenFieldErrors(parsed.error),
    );
  }

  const verifyClient = createClient(env.supabaseUrl!, env.supabaseAnonKey!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const { error: signInError } = await verifyClient.auth.signInWithPassword({
    email: context.user.email,
    password: parsed.data.current_password,
  });

  if (signInError) {
    return errorState("მიმდინარე პაროლი არასწორია.", {
      current_password: ["მიმდინარე პაროლი არასწორია."],
    });
  }

  const { error: updateError } = await context.supabase.auth.updateUser({
    password: parsed.data.new_password,
  });

  if (updateError) {
    return errorState(
      "პაროლის განახლება ვერ მოხერხდა. სცადეთ ხელახლა.",
    );
  }

  revalidatePath("/admin/settings");

  return successState("პაროლი წარმატებით განახლდა.");
}

export async function createAvailabilitySlotAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const category = textValue(formData, "category");
  const itemId = textValue(formData, "item_id");

  await context.supabase.from("availability_slots").insert({
    category,
    service_mode: textValue(formData, "service_mode"),
    service_id: category === "specialty" ? itemId : null,
    diagnostic_id: category === "diagnostic" ? itemId : null,
    laboratory_service_id: category === "laboratory" ? itemId : null,
    doctor_id: textValue(formData, "doctor_id") || null,
    slot_start: toIsoDate(textValue(formData, "slot_start")),
    slot_end: toIsoDate(textValue(formData, "slot_end")),
    capacity: numberValue(formData, "capacity", 1),
    status: textValue(formData, "status") || "available",
    is_public: true,
  });

  revalidatePath("/admin/availability");
  revalidatePath("/booking");
}

export async function toggleAvailabilityStatusAction(formData: FormData) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return;

  const slotId = textValue(formData, "slot_id");
  const nextStatus = textValue(formData, "next_status");

  await context.supabase
    .from("availability_slots")
    .update({
      status: nextStatus,
    })
    .eq("id", slotId);

  revalidatePath("/admin/availability");
  revalidatePath("/booking");
}
