import Link from "next/link";
import {
  Activity,
  Brain,
  Check,
  HeartHandshake,
  HeartPulse,
  MonitorSmartphone,
  Pill,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils/cn";

type PricingPlan = {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  icon: LucideIcon;
  featured?: boolean;
};

type SpecialistCardData = {
  price: string;
  title: string;
  meta: string;
  description: string;
  services: string[];
  detailHref: string;
  icon: LucideIcon;
};

const pricingPlans: PricingPlan[] = [
  {
    title: "საბაზისო",
    price: "70 ₾-დან",
    description: "საწყისი კონსულტაცია და ძირითადი მომსახურებები ყოველდღიური საჭიროებისთვის.",
    features: [
      "ონლაინ მომსახურება",
      "საწყისი შეფასება",
      "მარტივი დაჯავშნა",
      "სწრაფი უკუკავშირი",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
    icon: MonitorSmartphone,
  },
  {
    title: "სტანდარტი",
    price: "120 ₾-დან",
    description: "პოპულარული არჩევანი სპეციალისტის ჩართულობით და მოქნილი ფორმატით.",
    features: [
      "ბინაზე ვიზიტი ან ონლაინ",
      "სპეციალისტის შეფასება",
      "მომსახურების კოორდინაცია",
      "პაციენტზე მორგებული გეგმა",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
    icon: Stethoscope,
    featured: true,
  },
  {
    title: "გაფართოებული",
    price: "180 ₾-დან",
    description:
      "დიაგნოსტიკა და სპეციალისტების გაფართოებული ჩართულობა რთული საჭიროებებისთვის.",
    features: [
      "სპეციალისტის ვიზიტი",
      "დამატებითი შეფასება",
      "კოორდინირებული მართვა",
      "გაფართოებული მომსახურებები",
    ],
    ctaLabel: "არჩევა",
    ctaHref: "/booking",
    icon: ShieldCheck,
  },
  {
    title: "ინდივიდუალური",
    price: "შეთანხმებით",
    description:
      "ინდივიდუალური მოთხოვნებისთვის, პაკეტებისა და კომპლექსური მომსახურებების შესარჩევად.",
    features: [
      "პერსონალური შეთავაზება",
      "მომსახურების პაკეტები",
      "გრძელვადიანი მხარდაჭერა",
      "ინდივიდუალური პირობები",
    ],
    ctaLabel: "დაგვიკავშირდით",
    ctaHref: "/contact",
    icon: Sparkles,
  },
];

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

function PlanCard({
  title,
  price,
  description,
  features,
  ctaLabel,
  ctaHref,
  icon: Icon,
  featured,
}: PricingPlan) {
  return (
    <Card
      className={cn(
        "flex h-full flex-col rounded-[1.8rem] border border-white/90 bg-white p-6 shadow-[0_16px_40px_rgba(18,52,54,0.06)] sm:p-7",
        featured &&
          "border-primary/25 shadow-[0_24px_54px_rgba(42,200,62,0.16)] ring-1 ring-primary/10",
      )}
    >
      <CardHeader className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-[linear-gradient(180deg,rgba(233,248,235,0.96),rgba(255,255,255,1))] text-primary-strong shadow-[0_12px_24px_rgba(42,200,62,0.12)]">
            <Icon className="h-6 w-6" />
          </div>

          {featured ? (
            <Badge className="border border-primary/15 bg-primary-soft text-primary-strong">
              რეკომენდებული
            </Badge>
          ) : null}
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="text-[1.7rem]">{title}</CardTitle>
            <p className="font-serif text-[2.3rem] leading-none text-secondary">{price}</p>
          </div>
          <CardDescription className="min-h-[4.5rem] text-sm leading-6 text-muted">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-3">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3 rounded-2xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,249,248,0.9))] px-4 py-3"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary-strong">
                <Check className="h-3.5 w-3.5" />
              </span>
              <span className="text-sm leading-6 text-muted">{feature}</span>
            </div>
          ))}
        </div>

        <CardFooter className="border-t border-border/70 pt-6">
          <Button
            asChild
            variant={featured ? "primary" : "secondary"}
            className={cn(
              "w-full justify-center rounded-[1rem]",
              featured && "shadow-[0_14px_28px_rgba(42,200,62,0.2)]",
            )}
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

function SpecialistCard({
  price,
  title,
  meta,
  description,
  services,
  detailHref,
  icon: Icon,
}: SpecialistCardData) {
  return (
    <Card className="flex h-full flex-col rounded-[1.8rem] border border-white/90 bg-white p-6 shadow-[0_16px_40px_rgba(18,52,54,0.06)] sm:p-7">
      <CardHeader className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <Badge className="border border-primary/15 bg-primary-soft text-primary-strong">
            {price}
          </Badge>
          <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(180deg,rgba(233,248,235,0.96),rgba(255,255,255,1))] text-primary-strong">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <CardTitle className="text-[1.55rem]">{title}</CardTitle>
            <p className="text-sm font-medium leading-6 text-secondary">{meta}</p>
          </div>
          <CardDescription className="min-h-[4.5rem] text-sm leading-6 text-muted">
            {description}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-strong">
            მომსახურებები
          </p>
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-start gap-3 rounded-2xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,249,248,0.9))] px-4 py-3"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary-strong">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm leading-6 text-muted">{service}</span>
              </div>
            ))}
          </div>
        </div>

        <CardFooter className="flex-wrap border-t border-border/70 pt-6 sm:flex-nowrap">
          <Button asChild variant="secondary" className="flex-1 rounded-[1rem]">
            <Link href={detailHref}>დეტალურად</Link>
          </Button>
          <Button asChild className="flex-1 rounded-[1rem]">
            <Link href="/booking">დაჯავშნა</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export function ServicesPage() {
  return (
    <>
      <section className="section-shell pt-8">
        <div className="container-shell space-y-8">
          <SectionHeader
            eyebrow="ღირებულება"
            title="აირჩიეთ თქვენთვის შესაფერისი ფორმატი"
            description="გამჭვირვალე პირობები, წინასწარ განსაზღვრული საწყისი ღირებულება და მოქნილი არჩევანი სხვადასხვა საჭიროებისთვის."
            align="center"
            className="max-w-[44rem]"
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pricingPlans.map((plan, index) => (
              <ScrollReveal key={plan.title} delay={index * 70} variant="card" className="h-full">
                <PlanCard {...plan} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/42">
        <div className="container-shell space-y-8">
          <SectionHeader
            eyebrow="სპეციალისტები"
            title="ხელმისაწვდომი მიმართულებები მარტივი არჩევანისთვის"
            description="თუ კონკრეტული ექიმი ჯერ არ გაქვთ შერჩეული, დაიწყეთ სპეციალობის არჩევით. თითოეულ ბარათზე წინასწარ ჩანს მიმართულება, მომსახურებები და საწყისი ფასი."
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
                <SpecialistCard {...specialist} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
