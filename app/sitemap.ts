import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils/metadata";
import { getCatalogData, getNewsData } from "@/lib/data/public";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { specialties } = await getCatalogData();
  const { posts } = await getNewsData();

  const staticRoutes = [
    "/",
    "/services",
    "/specialties",
    "/diagnostics",
    "/laboratory",
    "/news",
    "/about",
    "/contact",
    "/booking",
    "/faq",
    "/privacy-policy",
    "/terms",
  ].map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const specialtyRoutes = specialties.map((item) => ({
    url: absoluteUrl(`/specialties/${item.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const newsRoutes = posts.map((item) => ({
    url: absoluteUrl(`/news/${item.slug}`),
    lastModified: new Date(item.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.64,
  }));

  return [...staticRoutes, ...specialtyRoutes, ...newsRoutes];
}
