import { AdminNewsForm } from "@/components/admin/admin-news-form";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireStaff } from "@/lib/auth/guard";
import { formatDate } from "@/lib/utils/format";

export default async function AdminNewsPage() {
  const context = await requireStaff(["super_admin", "manager", "content_editor"]);
  if (context.requiresSetup) return null;

  const [{ data: categories }, { data: posts }] = await Promise.all([
    context.supabase.from("news_categories").select("id, name_ka").order("name_ka"),
    context.supabase
      .from("news_posts")
      .select("id, title_ka, slug, is_published, published_at, excerpt_ka")
      .order("created_at", { ascending: false }),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Content studio"
        title="სიახლეები და კლინიკური განახლებები"
        description="მართეთ news pipeline ერთი ადგილიდან: შექმენით ახალი სტატია, განსაზღვრეთ კატეგორია, შეავსეთ markdown შინაარსი და გადაწყვიტეთ გამოქვეყნდეს თუ draft რეჟიმში დარჩეს."
      />

      <div className="grid gap-6 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>ახალი სტატიის დამატება</CardTitle>
            <p className="text-sm leading-6 text-muted">
              ფორმა აგებულია სწრაფი შევსებისთვის, მაგრამ ყველა მნიშვნელოვანი ველი დაცულია
              validation-ით და feedback-ით.
            </p>
          </CardHeader>
          <CardContent className="border-t border-border/70 pt-5">
            <AdminNewsForm categories={categories ?? []} />
          </CardContent>
        </Card>

        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>არსებული პოსტები</CardTitle>
            <p className="text-sm leading-6 text-muted">
              ბოლო დამატებული ან განახლებული სტატიები status ნიშნულებით.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 border-t border-border/70 pt-5">
            {(posts ?? []).length ? (
              (posts ?? []).map((post) => (
                <article
                  key={post.id}
                  className="rounded-[1.6rem] border border-border bg-white/85 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-2">
                      <p className="break-words text-lg font-semibold leading-7 text-secondary">
                        {post.title_ka}
                      </p>
                      <p className="break-all text-sm text-muted">{post.slug}</p>
                    </div>
                    <Badge variant={post.is_published ? "primary" : "neutral"}>
                      {post.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>

                  {post.excerpt_ka ? (
                    <p className="mt-3 break-words text-sm leading-6 text-muted">
                      {post.excerpt_ka}
                    </p>
                  ) : null}

                  <p className="mt-4 text-sm text-muted">
                    {post.is_published
                      ? `გამოქვეყნდა ${post.published_at ? formatDate(post.published_at) : ""}`
                      : "სტატია ჯერ გამოქვეყნებული არ არის"}
                  </p>
                </article>
              ))
            ) : (
              <div className="rounded-[1.6rem] border border-dashed border-border bg-white/70 p-6 text-sm leading-6 text-muted">
                ჯერ არცერთი სტატია არ არის დამატებული.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
