import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFAQs } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "ხშირად დასმული კითხვები",
  path: "/faq",
});

export default async function FAQPage() {
  const items = await getFAQs();

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="ყველაზე ხშირი კითხვები"
        description="აქ ნახავთ მოკლე პასუხებს ჯავშნის, ონლაინ კონსულტაციის, მონაცემთა დაცვისა და მომსახურების ხელმისაწვდომობის შესახებ."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6">
          {items.map((item) => (
            <Card key={item.id} className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl">{item.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-8 text-muted">{item.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
