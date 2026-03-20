import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/page-hero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconMark } from "@/components/ui/icon-mark";
import {
  getCatalogData,
  getSpecialtyBySlug,
  getSpecialtyDoctors,
} from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  if (!specialty) {
    return buildMetadata({ title: "სპეციალობა" });
  }

  return buildMetadata({
    title: specialty.name,
    description: specialty.description,
    path: `/specialties/${specialty.slug}`,
  });
}

export default async function SpecialtyDetailsPage({ params }: Props) {
  const { slug } = await params;
  const specialty = await getSpecialtyBySlug(slug);

  if (!specialty) {
    notFound();
  }

  const doctors = await getSpecialtyDoctors(slug);
  const { services } = await getCatalogData();
  const matchingServices = services.filter((service) => service.specialtySlug === slug);
  return (
    <>
      <PageHero
        eyebrow="სპეციალობის პროფილი"
        title={specialty.name}
        description={specialty.description}
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <IconMark name={specialty.icon} className="h-7 w-7" />
            </div>
            <CardHeader className="px-0 pt-6">
              <CardTitle>მიმართულების აღწერა</CardTitle>
            </CardHeader>
            <CardContent className="px-0 text-base leading-8 text-muted">
              <p>{specialty.summary}</p>
              <p>{specialty.carePath}</p>
            </CardContent>
          </Card>
          <Card className="p-8">
            <CardHeader>
              <CardTitle>ხელმისაწვდომი სერვისები</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {matchingServices.map((service) => (
                <div key={service.id} className="rounded-3xl border border-border bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-secondary">{service.name}</p>
                    <Badge>{service.serviceMode === "home_visit" ? "სახლში" : "ონლაინ"}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{service.summary}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
      <section className="section-shell bg-white/45">
        <div className="container-shell">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="p-6">
                <CardHeader>
                  <CardTitle className="text-2xl">{doctor.fullName}</CardTitle>
                  <p className="text-sm font-medium text-primary">{doctor.title}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-6 text-muted">{doctor.bio}</p>
                  <p className="text-sm text-muted">
                    გამოცდილება: {doctor.experienceYears} წელი
                  </p>
                  <p className="text-sm text-muted">
                    ენები: {doctor.languages.join(", ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
