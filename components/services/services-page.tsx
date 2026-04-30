import Link from "next/link";
import { SpecialistsSection } from "@/components/services/specialists-section";
import { SectionHeader } from "@/components/ui/section-header";

type PricingCardData = {
  title: string;
  price: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  featured?: boolean;
};

const pricingCards: PricingCardData[] = [
  {
    title: "საბაზისო",
    price: "70 ₾-დან",
    features: [
      "ონლაინ მომსახურება",
      "საწყისი შეფასება",
      "მარტივი დაჯავშნა",
      "სწრაფი უკუკავშირი",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
  },
  {
    title: "სტანდარტი",
    price: "120 ₾-დან",
    features: [
      "ბინაზე ვიზიტი ან ონლაინ",
      "სპეციალისტის შეფასება",
      "მომსახურების კოორდინაცია",
      "პაციენტზე მორგებული გეგმა",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
    featured: true,
  },
  {
    title: "გაფართოებული",
    price: "180 ₾-დან",
    features: [
      "სპეციალისტის ვიზიტი",
      "დამატებითი შეფასება",
      "კოორდინირებული მართვა",
      "გაფართოებული მომსახურებები",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
  },
];

export function ServicesPage() {
  return (
    <>
      <section className="section-shell pt-8">
        <div className="container-shell">
          <SectionHeader
            title="აირჩიეთ მომსახურება"
            description="მარტივი არჩევანი, წინასწარ ცნობილი ფასით და სწრაფი დაჯავშნით."
            align="center"
            className="mx-auto max-w-[42rem]"
          />

          <div className="pricing-section">
            <div className="pricing-grid">
              {pricingCards.map((card) => (
                <div
                  key={card.title}
                  className={`pricing-card${card.featured ? " pricing-card-featured" : ""}`}
                >
                  <h3>{card.title}</h3>
                  <div className="price">
                    <strong>{card.price}</strong>
                  </div>

                  <div className="divider" />

                  <ul className="features">
                    {card.features.map((feature) => (
                      <li key={feature}>
                        <span className="check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={card.ctaHref} className="choose-btn">
                    {card.ctaLabel} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpecialistsSection />
    </>
  );
}
