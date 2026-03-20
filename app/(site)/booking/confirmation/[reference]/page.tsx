import { notFound } from "next/navigation";
import { BookingSuccessCard } from "@/components/booking/booking-success-card";
import { Alert } from "@/components/ui/alert";
import { PageHero } from "@/components/sections/page-hero";
import { getPublicBookingSummary } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

type Props = {
  params: Promise<{ reference: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { reference } = await params;
  return buildMetadata({
    title: `ჯავშნის დადასტურება ${reference}`,
    path: `/booking/confirmation/${reference}`,
  });
}

export default async function BookingConfirmationPage({ params }: Props) {
  const { reference } = await params;
  const summary = await getPublicBookingSummary(reference);

  if (!summary) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow="დადასტურება"
        title="ჯავშანი მიღებულია"
        description="ქვემოთ ნახავთ რეფერენს კოდს, სტატუსებს და საჭიროების შემთხვევაში გადახდის გაგრძელების ბმულს."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6">
          <BookingSuccessCard
            referenceCode={summary.referenceCode}
            bookingStatus={summary.bookingStatus}
            paymentStatus={summary.paymentStatus}
            paymentMethod={summary.paymentMethod}
            preferredDate={summary.preferredDate}
            totalAmount={summary.totalAmount}
            redirectUrl={summary.redirectUrl}
          />

          {summary.paymentStatus === "pending" ? (
            <Alert
              title="გადახდა მოლოდინშია"
              description="ონლაინ გადახდის არჩევის შემთხვევაში შეგიძლიათ გააგრძელოთ provider-ის გვერდზე. ადგილზე გადახდისას ეს სტატუსი ავტომატურად ჩანაცვლდება ვიზიტის დროს."
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
