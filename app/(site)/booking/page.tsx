import { BookingForm } from "@/components/booking/booking-form";
import { PageHero } from "@/components/sections/page-hero";
import { getCatalogData } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "დაჯავშნა",
  path: "/booking",
});

export default async function BookingPage() {
  const catalog = await getCatalogData();

  return (
    <>
      <PageHero
        eyebrow="დაჯავშნა"
        title="დაჯავშნეთ მომსახურება მარტივად"
        description="აირჩიეთ სერვისი, დრო და გადახდა."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mx-auto w-full max-w-7xl">
            <BookingForm {...catalog} />
          </div>
        </div>
      </section>
    </>
  );
}
