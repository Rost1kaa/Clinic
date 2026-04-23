import { cache } from "react";
import {
  availabilitySlots,
  diagnostics,
  doctors,
  faqItems,
  laboratoryServices,
  newsCategories,
  newsPosts,
  services,
  siteSettings,
  specialties,
  stats,
  valuePoints,
} from "@/lib/data/seed";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/utils/env";

type RawSpecialtyRow = {
  id: string;
  slug: string;
  name_ka: string;
  summary_ka: string;
  description_ka: string;
  icon: string;
  care_path_ka: string | null;
  featured: boolean;
  image_url: string | null;
  image_credit_url: string | null;
};

type RawServiceRow = {
  id: string;
  slug: string;
  specialty_id: string | null;
  name_ka: string;
  summary_ka: string;
  description_ka: string;
  service_mode: "home_visit" | "online_consultation";
  price: number | string | null;
  duration_minutes: number;
  featured: boolean;
  requires_address: boolean;
  requires_video_link: boolean;
  image_url: string | null;
  image_credit_url: string | null;
  tags: string[] | null;
};

type RawDiagnosticRow = {
  id: string;
  slug: string;
  name_ka: string;
  summary_ka: string;
  description_ka: string;
  price: number | string | null;
  duration_minutes: number;
  home_available: boolean;
  featured: boolean;
  image_url: string | null;
  image_credit_url: string | null;
};

type RawLaboratoryRow = {
  id: string;
  slug: string;
  category: string;
  name_ka: string;
  summary_ka: string;
  description_ka: string;
  price: number | string | null;
  duration_minutes: number;
  home_available: boolean;
  featured: boolean;
  image_url: string | null;
  image_credit_url: string | null;
};

type RawDoctorRow = {
  id: string;
  slug: string;
  full_name_ka: string;
  title_ka: string;
  specialty_id: string;
  bio_ka: string;
  experience_years: number | null;
  languages: string[] | null;
  is_featured: boolean;
};

type RawSlotRow = {
  id: string;
  slot_start: string;
  slot_end: string;
  service_mode: "home_visit" | "online_consultation";
  category: "specialty" | "diagnostic" | "laboratory";
  service_id: string | null;
  diagnostic_id: string | null;
  laboratory_service_id: string | null;
  doctor_id: string | null;
  capacity: number;
  status: "available" | "blocked";
};

type RawPublicBookingSummary = {
  reference_code: string;
  service_type: "home_visit" | "online_consultation";
  booking_category: "specialty" | "diagnostic" | "laboratory";
  booking_status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  payment_status: "pending" | "paid" | "failed" | "onsite_pending" | "refunded";
  payment_method: "online" | "onsite";
  preferred_date: string;
  total_amount: number | string;
  redirect_url: string | null;
};

function mapSiteSettings(rows: Array<{ key: string; value: unknown }>) {
  return rows.reduce<Record<string, unknown>>((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
}

export const getPublicSiteSettings = cache(async () => {
  if (!hasSupabasePublicEnv()) {
    return siteSettings;
  }

  try {
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return siteSettings;
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["contact"]);

    if (error || !data?.length) {
      return siteSettings;
    }

    const mapped = mapSiteSettings(data);
    return {
      ...siteSettings,
      ...(typeof mapped.contact === "object" ? mapped.contact : {}),
    };
  } catch {
    return siteSettings;
  }
});

export const getCatalogData = cache(async () => {
  if (!hasSupabasePublicEnv()) {
    return {
      services,
      specialties,
      diagnostics,
      laboratoryServices,
      doctors,
      availabilitySlots,
    };
  }

  try {
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      throw new Error("Supabase unavailable");
    }

    const [
      specialtyResult,
      serviceResult,
      diagnosticResult,
      labResult,
      doctorResult,
      slotResult,
    ] = await Promise.all([
      supabase
        .from("specialties")
        .select("*")
        .is("deleted_at", null)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("services")
        .select("*")
        .is("deleted_at", null)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("diagnostics")
        .select("*")
        .is("deleted_at", null)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("laboratory_services")
        .select("*")
        .is("deleted_at", null)
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      supabase
        .from("doctors")
        .select("*")
        .is("deleted_at", null)
        .eq("is_active", true)
        .order("full_name_ka", { ascending: true }),
      supabase
        .from("availability_slots")
        .select("*")
        .is("deleted_at", null)
        .eq("status", "available")
        .gte("slot_start", new Date().toISOString())
        .order("slot_start", { ascending: true }),
    ]);

    if (
      specialtyResult.error ||
      serviceResult.error ||
      diagnosticResult.error ||
      labResult.error ||
      doctorResult.error ||
      slotResult.error
    ) {
      throw new Error("Failed to load public data");
    }

    const specialtyRows = (specialtyResult.data ?? []) as RawSpecialtyRow[];
    const serviceRows = (serviceResult.data ?? []) as RawServiceRow[];
    const diagnosticRows = (diagnosticResult.data ?? []) as RawDiagnosticRow[];
    const labRows = (labResult.data ?? []) as RawLaboratoryRow[];
    const doctorRows = (doctorResult.data ?? []) as RawDoctorRow[];
    const slotRows = (slotResult.data ?? []) as RawSlotRow[];

    const specialtySlugById = new Map(specialtyRows.map((item) => [item.id, item.slug]));

    return {
      specialties: specialtyRows.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: item.name_ka,
        summary: item.summary_ka,
        description: item.description_ka,
        icon: item.icon,
        carePath: item.care_path_ka ?? item.summary_ka,
        featured: item.featured,
        image: item.image_url
          ? {
              src: item.image_url,
              alt: item.name_ka,
              creditUrl: item.image_credit_url ?? undefined,
            }
          : undefined,
      })),
      services: serviceRows.map((item) => ({
        id: item.id,
        slug: item.slug,
        specialtySlug: item.specialty_id
          ? specialtySlugById.get(item.specialty_id)
          : undefined,
        name: item.name_ka,
        summary: item.summary_ka,
        description: item.description_ka,
        serviceMode: item.service_mode,
        price: Number(item.price ?? 0),
        durationMinutes: item.duration_minutes,
        featured: item.featured,
        requiresAddress: item.requires_address,
        requiresVideoLink: item.requires_video_link,
        image: item.image_url
          ? {
              src: item.image_url,
              alt: item.name_ka,
              creditUrl: item.image_credit_url ?? undefined,
            }
          : undefined,
        tags: item.tags ?? [],
      })),
      diagnostics: diagnosticRows.map((item) => ({
        id: item.id,
        slug: item.slug,
        name: item.name_ka,
        summary: item.summary_ka,
        description: item.description_ka,
        price: Number(item.price ?? 0),
        durationMinutes: item.duration_minutes,
        homeAvailable: item.home_available,
        featured: item.featured,
        image: item.image_url
          ? {
              src: item.image_url,
              alt: item.name_ka,
              creditUrl: item.image_credit_url ?? undefined,
            }
          : undefined,
      })),
      laboratoryServices: labRows.map((item) => ({
        id: item.id,
        slug: item.slug,
        category: item.category,
        name: item.name_ka,
        summary: item.summary_ka,
        description: item.description_ka,
        price: Number(item.price ?? 0),
        durationMinutes: item.duration_minutes,
        homeAvailable: item.home_available,
        featured: item.featured,
        image: item.image_url
          ? {
              src: item.image_url,
              alt: item.name_ka,
              creditUrl: item.image_credit_url ?? undefined,
            }
          : undefined,
      })),
      doctors: doctorRows.map((item) => ({
        id: item.id,
        slug: item.slug,
        fullName: item.full_name_ka,
        title: item.title_ka,
        specialtySlug: specialtySlugById.get(item.specialty_id) ?? "",
        bio: item.bio_ka,
        experienceYears: item.experience_years ?? 0,
        languages: item.languages ?? ["ქართული"],
        isFeatured: item.is_featured,
      })),
      availabilitySlots: slotRows.map((item) => ({
        id: item.id,
        startsAt: item.slot_start,
        endsAt: item.slot_end,
        serviceType: item.service_mode,
        category: item.category,
        itemId:
          item.service_id ??
          item.diagnostic_id ??
          item.laboratory_service_id ??
          "",
        doctorId: item.doctor_id ?? undefined,
        capacity: item.capacity,
        status: item.status,
      })),
    };
  } catch {
    return {
      services,
      specialties,
      diagnostics,
      laboratoryServices,
      doctors,
      availabilitySlots,
    };
  }
});

export const getHomePageData = cache(async () => {
  const catalog = await getCatalogData();
  return {
    siteSettings: await getPublicSiteSettings(),
    services: catalog.services,
    specialties: catalog.specialties,
    diagnostics: catalog.diagnostics,
    stats,
    valuePoints,
  };
});

export const getNewsData = cache(async () => ({
  categories: newsCategories,
  posts: [...newsPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  ),
}));

export async function getNewsPostBySlug(slug: string) {
  const { posts } = await getNewsData();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getSpecialtyBySlug(slug: string) {
  const catalog = await getCatalogData();
  return catalog.specialties.find((item) => item.slug === slug) ?? null;
}

export async function getSpecialtyDoctors(slug: string) {
  const catalog = await getCatalogData();
  return catalog.doctors.filter((doctor) => doctor.specialtySlug === slug);
}

export async function getFAQs() {
  return faqItems;
}

export async function getPublicBookingSummary(referenceCode: string) {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  try {
    const supabase = await createServerSupabaseClient();

    if (!supabase) {
      return null;
    }

    const { data, error } = await supabase.rpc("get_public_booking_summary", {
      p_reference_code: referenceCode,
    });

    if (error) {
      return null;
    }

    const row = (Array.isArray(data) ? data[0] : data) as RawPublicBookingSummary | null;

    if (!row) {
      return null;
    }

    return {
      referenceCode: row.reference_code,
      serviceType: row.service_type,
      bookingCategory: row.booking_category,
      bookingStatus: row.booking_status,
      paymentStatus: row.payment_status,
      paymentMethod: row.payment_method,
      preferredDate: row.preferred_date,
      totalAmount: Number(row.total_amount ?? 0),
      redirectUrl: row.redirect_url,
    };
  } catch {
    return null;
  }
}
