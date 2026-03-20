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
  title: "ლაბორატორია",
  path: "/laboratory",
});

export default async function LaboratoryPage() {
  const { laboratoryServices } = await getCatalogData();

  return (
    <>
      <PageHero
        eyebrow="ლაბორატორია"
        title="ლაბორატორიული სერვისები სახლში აღებით და ციფრული პასუხებით"
        description="ჰემატოლოგია, ბიოქიმია, იმუნოლოგია და კოაგულაცია კოორდინირებულ პროცესში."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-2">
          {laboratoryServices.map((item) => (
            <Card key={item.id} className="p-6">
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{item.category}</span>
                  <span>{formatMoney(item.price)}</span>
                </div>
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
