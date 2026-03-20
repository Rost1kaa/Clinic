import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";
import { getNewsData } from "@/lib/data/public";
import { formatDate } from "@/lib/utils/format";
import { buildMetadata } from "@/lib/utils/metadata";

type Props = {
  searchParams: Promise<{ category?: string; page?: string }>;
};

export const metadata = buildMetadata({
  title: "სიახლეები",
  path: "/news",
});

export default async function NewsPage({ searchParams }: Props) {
  const { category, page } = await searchParams;
  const { categories, posts } = await getNewsData();
  const activeCategory = category ?? "all";
  const currentPage = Number(page ?? "1");
  const pageSize = 6;
  const filtered =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.categorySlug === activeCategory);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <PageHero
        eyebrow="სიახლეები"
        title="კლინიკური განახლებები, რჩევები და პლატფორმის სიახლეები"
        description="Velora Care-ის ახალი სერვისები, გზამკვლევები და სამედიცინო კომუნიკაციის პრაქტიკული მასალები."
      />
      <section className="section-shell pt-0">
        <div className="container-shell space-y-8">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/news"
              className={`rounded-full px-4 py-2 text-sm ${
                activeCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-white text-muted"
              }`}
            >
              ყველა
            </Link>
            {categories.map((item) => (
              <Link
                key={item.id}
                href={`/news?category=${item.slug}`}
                className={`rounded-full px-4 py-2 text-sm ${
                  activeCategory === item.slug
                    ? "bg-primary text-white"
                    : "bg-white text-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {paginated.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.coverImage ? (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <Badge variant="neutral">{formatDate(post.publishedAt)}</Badge>
                  <CardHeader className="px-0 pt-4">
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <Link
                    href={`/news/${post.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-primary"
                  >
                    სრულად ნახვა
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            makeHref={(targetPage) =>
              activeCategory === "all"
                ? `/news?page=${targetPage}`
                : `/news?category=${activeCategory}&page=${targetPage}`
            }
          />
        </div>
      </section>
    </>
  );
}
