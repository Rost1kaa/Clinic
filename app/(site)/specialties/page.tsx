import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconMark } from "@/components/ui/icon-mark";
import { PageHero } from "@/components/sections/page-hero";
import { getCatalogData } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "სპეციალობები",
  path: "/specialties",
});

export default async function SpecialtiesPage() {
  const { specialties, doctors } = await getCatalogData();

  return (
    <>
      <PageHero
        eyebrow="სპეციალობები"
        title="ექიმთა გუნდი სხვადასხვა სამედიცინო საჭიროებისთვის"
        description="იხილეთ სპეციალობები, მომსახურების აქცენტები და გუნდის წევრები თითოეული მიმართულებით."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {specialties.map((specialty) => {
            const doctorCount = doctors.filter(
              (doctor) => doctor.specialtySlug === specialty.slug,
            ).length;

            return (
              <Card key={specialty.id} className="p-6">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <IconMark name={specialty.icon} />
                  </div>
                  <CardTitle>{specialty.name}</CardTitle>
                  <CardDescription>{specialty.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted">{doctorCount} აქტიური სპეციალისტი</p>
                  <Button asChild variant="secondary" className="mt-4">
                    <Link href={`/specialties/${specialty.slug}`}>დეტალები</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
}
