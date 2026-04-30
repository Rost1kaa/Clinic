import Link from "next/link";
import { SpecialistsSection } from "@/components/services/specialists-section";

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
      "ბინაზე ვიზიტი",
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
          <div className="pricing-section">
            <div className="flex items-stretch" style={{ gap: "32px" }}>

              {/* LEFT GROUP — ბინაზე მომსახურება */}
              <div className="flex flex-col" style={{ width: "900px", flexShrink: 0 }}>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px", textAlign: "center" }}>ბინაზე მომსახურება</h3>
                <div className="pricing-grid items-stretch" style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
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

              {/* RIGHT GROUP — ონლაინ კონსულტაცია */}
              <div className="flex flex-1 items-stretch">
                <div className="pricing-card flex min-h-full w-full flex-col justify-between" style={{  background: "#197258", color: "#ffffff" }}>
                  <h3 style={{ color: "#ffffff" }}>ონლაინ კონსულტაცია</h3>
                  <div className="price">
                    <strong style={{ color: "#ffffff" }}>60 ₾</strong>
                  </div>

                  <div className="divider" />

                  <ul className="features">
                    <li style={{ color: "#ffffff" }}><span className="check" style={{ color: "#ffffff" }}>✓</span>ვიდეო კონსულტაცია</li>
                    <li style={{ color: "#ffffff" }}><span className="check" style={{ color: "#ffffff" }}>✓</span>სპეციალისტის შეფასება</li>
                    <li style={{ color: "#ffffff" }}><span className="check" style={{ color: "#ffffff" }}>✓</span>რეცეპტი / რეკომენდაცია</li>
                    <li style={{ color: "#ffffff" }}><span className="check" style={{ color: "#ffffff" }}>✓</span>ჩაწერა 24 საათში</li>
                  </ul>

                  <Link href="/booking" className="choose-btn" style={{ background: "#ffffff", color: "#197258" }}>
                    არჩევა →
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <SpecialistsSection />
    </>
  );
}
