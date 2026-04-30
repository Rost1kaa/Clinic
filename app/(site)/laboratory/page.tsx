import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceOptionCard } from "@/components/services/service-option-card";
import { getCatalogData } from "@/lib/data/public";
import type { LaboratoryService } from "@/types/domain";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "ლაბორატორია",
  path: "/laboratory",
});

const laboratoryCardContent: Record<
  string,
  {
    price: string;
    description: string;
    serviceLine: string;
    duration: string;
    availability: string;
  }
> = {
  "hematology-panel": {
    price: "35 ₾",
    description: "ნიმუშის აღება სახლში, შედეგები ციფრულად.",
    serviceLine: "სისხლის ანალიზის სრული შეფასება",
    duration: "20 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  "biochemistry-panel": {
    price: "55 ₾",
    description: "სკრინინგისთვის და მიმდინარე მონიტორინგისთვის.",
    serviceLine: "ორგანიზმის ბიოქიმიური მაჩვენებლების შეფასება",
    duration: "25 წუთი",
    availability: "ხელმისაწვდომია სახლში ვიზიტის ფორმატშიც.",
  },
  "immunology-panel": {
    price: "85 ₾",
    description: "იმუნოლოგიური ტესტები ექიმის მითითებით.",
    serviceLine: "იმუნური სისტემის მდგომარეობის შეფასება",
    duration: "30 წუთი",
    availability: "ხელმისაწვდომია ექიმის რეკომენდაციით.",
  },
  "coagulation-panel": {
    price: "48 ₾",
    description: "შედედების კონტროლი თერაპიისა და ოპერაციული მზადებისთვის.",
    serviceLine: "სისხლის შედედების ფუნქციის შეფასება",
    duration: "20 წუთი",
    availability: "მნიშვნელოვანია ოპერაციული მზადებისთვის.",
  },
};

function getLaboratoryServices(item: LaboratoryService) {
  const content = laboratoryCardContent[item.slug];

  return [content.serviceLine, content.duration, content.availability];
}

export default async function LaboratoryPage() {
  const { laboratoryServices } = await getCatalogData();

  return (
    <>
      <PageHero
        eyebrow="ლაბორატორია"
        title="ლაბორატორიული ანალიზები სახლში აღებით"
        description="პასუხები სწრაფად და ციფრულად."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {laboratoryServices.map((item, index) => {
            const content = laboratoryCardContent[item.slug];

            return (
              <ScrollReveal key={item.id} delay={index * 70} variant="card" className="h-full">
                <ServiceOptionCard
                  id={item.slug}
                  className="scroll-mt-28"
                price={content.price}
                title={item.name}
                description={content.description}
                services={getLaboratoryServices(item)}
                detailHref={`/laboratory#${item.slug}`}
                bookingHref="/booking"
                plainServices
              />
            </ScrollReveal>
          );
          })}
        </div>
      </section>
    </>
  );
}
