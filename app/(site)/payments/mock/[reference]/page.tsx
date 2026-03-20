import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicBookingSummary } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";
import { formatMoney } from "@/lib/utils/format";

type Props = {
  params: Promise<{ reference: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { reference } = await params;
  return buildMetadata({
    title: `Mock Payment ${reference}`,
    path: `/payments/mock/${reference}`,
  });
}

export default async function MockPaymentPage({ params }: Props) {
  const { reference } = await params;
  const summary = await getPublicBookingSummary(reference);

  if (!summary) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="Mock Payment"
        title="გადახდის provider-ის სიმულაცია"
        description="ეს ეკრანი აჩვენებს payment abstraction-ს რეალური gateway-ის გარეშე. შესაძლებელია გადახდის წარმატებული ან წარუმატებელი სიმულაცია."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <Card className="max-w-3xl p-8">
            <CardHeader>
              <CardTitle>გადასახდელი თანხა: {formatMoney(summary.totalAmount)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted">
              <p>რეფერენს კოდი: {summary.referenceCode}</p>
              <p>გადახდის სტატუსი: {summary.paymentStatus}</p>
              <div className="flex flex-wrap gap-3">
                <form action="/api/payments/mock" method="post">
                  <input type="hidden" name="reference" value={summary.referenceCode} />
                  <input type="hidden" name="status" value="paid" />
                  <Button type="submit">წარმატებული გადახდის სიმულაცია</Button>
                </form>
                <form action="/api/payments/mock" method="post">
                  <input type="hidden" name="reference" value={summary.referenceCode} />
                  <input type="hidden" name="status" value="failed" />
                  <Button type="submit" variant="secondary">
                    წარუმატებელი გადახდის სიმულაცია
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
