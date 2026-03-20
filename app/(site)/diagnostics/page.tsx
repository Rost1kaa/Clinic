import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHero } from "@/components/sections/page-hero";
import { getCatalogData } from "@/lib/data/public";
import { formatMoney } from "@/lib/utils/format";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "დიაგნოსტიკა",
  path: "/diagnostics",
});

export default async function DiagnosticsPage() {
  const { diagnostics } = await getCatalogData();

  return (
    <>
      <PageHero
        eyebrow="დიაგნოსტიკა"
        title="მობილური და კოორდინირებული დიაგნოსტიკური სერვისები"
        description="ECG-დან ჰოლტერ მონიტორინგამდე, კვლევები ინტეგრირებულია ექიმის ვიზიტსა და შემდგომ შეფასებაში."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {diagnostics.map((item) => (
            <Card key={item.id} id={item.slug} className="scroll-mt-28 p-6">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{item.durationMinutes} წუთი</span>
                  <span>{formatMoney(item.price)}</span>
                </div>
                <p className="mt-3 text-sm text-muted">
                  {item.homeAvailable
                    ? "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც."
                    : "ხელმისაწვდომობა საჭიროებს წინასწარ კოორდინაციას."}
                </p>
                <Button asChild className="mt-4">
                  <Link href="/booking">დაჯავშნა</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
