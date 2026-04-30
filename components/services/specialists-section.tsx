import {
  Activity,
  Brain,
  HeartHandshake,
  HeartPulse,
  Pill,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ServiceOptionCard } from "@/components/services/service-option-card";
import { SectionHeader } from "@/components/ui/section-header";

type SpecialistCardData = {
  price: string;
  title: string;
  meta: string;
  description: string;
  services: string[];
  detailHref: string;
  icon: LucideIcon;
};

const specialists: SpecialistCardData[] = [
  {
    price: "120 ₾-დან",
    title: "თერაპევტი",
    meta: "ქეთევან გელაშვილი • 12+ წელი გამოცდილება",
    description: "პირველადი შეფასება, მწვავე სიმპტომების მართვა და შემდგომი გეგმა.",
    services: ["თერაპევტის სახლში ვიზიტი", "თერაპევტი, ოჯახის ექიმი"],
    detailHref: "/specialties/therapist",
    icon: Activity,
  },
  {
    price: "180 ₾-დან",
    title: "კარდიოლოგი",
    meta: "ლაშა ბაქრაძე • 14+ წელი გამოცდილება",
    description: "გულის რითმის, წნევის და ქრონიკული მართვის შეფასება.",
    services: ["კარდიოლოგის სახლში ვიზიტი", "კარდიოლოგი"],
    detailHref: "/specialties/cardiologist",
    icon: HeartPulse,
  },
  {
    price: "90 ₾-დან",
    title: "ნევროლოგი",
    meta: "ანა ხარაძე • 11+ წელი გამოცდილება",
    description: "თავის ტკივილი, თავბრუსხვევა, ნევროლოგიური სიმპტომების შეფასება.",
    services: ["ნევროლოგის ონლაინ კონსულტაცია", "ნევროლოგი"],
    detailHref: "/specialties/neurologist",
    icon: Brain,
  },
  {
    price: "210 ₾-დან",
    title: "პალიატიური მზრუნველობა",
    meta: "ნინო ლომიძე • 16+ წელი გამოცდილება",
    description: "სიმპტომების შემსუბუქება და ოჯახის მხარდაჭერა სახლში.",
    services: ["პალიატიური მზრუნველობის ვიზიტი", "პალიატიური მზრუნველობის სპეციალისტი"],
    detailHref: "/specialties/palliative-care",
    icon: HeartHandshake,
  },
  {
    price: "95 ₾-დან",
    title: "ენდოკრინოლოგი",
    meta: "გიორგი აბაძე • 9+ წელი გამოცდილება",
    description: "ჰორმონალური და მეტაბოლური მდგომარეობების მართვა.",
    services: ["ენდოკრინოლოგის ონლაინ კონსულტაცია", "ენდოკრინოლოგი"],
    detailHref: "/specialties/endocrinologist",
    icon: Pill,
  },
  {
    price: "70 ₾-დან",
    title: "ექთნის სახლში ვიზიტი",
    meta: "მარიამ წიკლაური • 10+ წელი გამოცდილება",
    description: "ინფუზია, ინექცია, გასინჯვა და მოვლის პროცესის მხარდაჭერა.",
    services: ["ექთნის სახლში ვიზიტი", "უფროსი ექთანი"],
    detailHref: "/specialties/nurse-home-visit",
    icon: Syringe,
  },
];

export function SpecialistsSection() {
  return (
    <section className="section-shell bg-white/42">
      <div className="container-shell space-y-8">
        <SectionHeader
          eyebrow="სპეციალისტები"
          title="აირჩიეთ სპეციალისტი"
          description="აირჩიეთ სასურველი სპეციალობა და საწყისი ფასი."
          align="center"
          className="max-w-[50rem]"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {specialists.map((specialist, index) => (
            <ScrollReveal
              key={specialist.title}
              delay={index * 70}
              variant="card"
              className="h-full"
            >
              <ServiceOptionCard
                {...specialist}
                plainServices
                emphasizePrice
                largeIcon
                centeredServiceRows
                emphasizeMetaName
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
