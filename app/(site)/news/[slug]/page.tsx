import Image from "next/image";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { JsonLd } from "@/components/json-ld/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getNewsData, getNewsPostBySlug } from "@/lib/data/public";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";
import { formatDate } from "@/lib/utils/format";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    return buildMetadata({ title: "სიახლე" });
  }

  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    image: post.coverImage?.src,
  });
}

export default async function NewsDetailsPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { posts } = await getNewsData();
  const related = posts.filter((item) => post.relatedSlugs.includes(item.slug)).slice(0, 2);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          mainEntityOfPage: absoluteUrl(`/news/${post.slug}`),
        }}
      />
      <PageHero
        eyebrow="სიახლე"
        title={post.title}
        description={post.excerpt}
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-8 lg:grid-cols-[1fr_0.36fr]">
          <article className="space-y-8">
            {post.coverImage ? (
              <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem]">
                <Image
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <Card className="p-8">
              <div className="flex flex-wrap gap-3">
                <Badge variant="neutral">{formatDate(post.publishedAt)}</Badge>
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="prose prose-zinc mt-6 max-w-none prose-headings:font-serif prose-headings:text-secondary prose-p:text-muted prose-strong:text-secondary">
                <Markdown remarkPlugins={[remarkGfm]}>{post.contentMarkdown}</Markdown>
              </div>
            </Card>
          </article>

          <aside className="space-y-6">
            <Card className="p-6">
              <p className="text-sm font-semibold text-primary">
                დაკავშირებული სტატიები
              </p>
              <div className="mt-5 grid gap-4">
                {related.map((item) => (
                  <a
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="rounded-3xl border border-border bg-white p-4 text-sm text-muted hover:text-secondary"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </section>
    </>
  );
}
