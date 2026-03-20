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
  title: "სერვისები",
  path: "/services",
});

export default async function ServicesPage() {
  const { services } = await getCatalogData();
  const home = services.filter((item) => item.serviceMode === "home_visit");
  const online = services.filter((item) => item.serviceMode === "online_consultation");

  return (
    <>
      <PageHero
        eyebrow="სერვისები"
        title="ორი ძირითადი გზა: სახლში ვიზიტი ან ონლაინ კონსულტაცია"
        description="აირჩიეთ თქვენზე მორგებული ფორმატი და შემდეგ კონკრეტული სპეციალისტი ან სერვისი."
      />

      <section id="home" className="section-shell pt-0">
        <div className="container-shell space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              სახლში ვიზიტი
            </p>
            <h2 className="font-serif text-4xl text-secondary">
              სამედიცინო გუნდი თქვენს მისამართზე
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {home.map((service) => (
              <Card key={service.id} className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{service.durationMinutes} წუთი</span>
                    <span>{formatMoney(service.price)}</span>
                  </div>
                  <Button asChild className="mt-4">
                    <Link href="/booking">დაჯავშნა</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="online" className="section-shell bg-white/45">
        <div className="container-shell space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
              ონლაინ კონსულტაცია
            </p>
            <h2 className="font-serif text-4xl text-secondary">
              სპეციალისტთან ვიდეოკონსულტაცია სახლიდან
            </h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {online.map((service) => (
              <Card key={service.id} className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{service.durationMinutes} წუთი</span>
                    <span>{formatMoney(service.price)}</span>
                  </div>
                  <Button asChild className="mt-4">
                    <Link href="/booking">დაჯავშნა</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
