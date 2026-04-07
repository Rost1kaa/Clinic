import Image from "next/image";
import Link from "next/link";
import { Clock3, HousePlus, MonitorSmartphone } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/sections/page-hero";
import { getCatalogData } from "@/lib/data/public";
import { formatMoney } from "@/lib/utils/format";
import { buildMetadata } from "@/lib/utils/metadata";
import type { Service } from "@/types/domain";

export const metadata = buildMetadata({
  title: "სერვისები",
  path: "/services",
});

function ServiceTile({
  service,
  modeLabel,
  tone,
  Icon,
}: {
  service: Service;
  modeLabel: string;
  tone: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.7rem] border border-border/80 bg-white/92 p-3 shadow-[0_20px_50px_rgba(10,48,50,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_58px_rgba(10,48,50,0.12)]">
      <div
        className={`relative overflow-hidden rounded-[1.35rem] border border-white/70 ${tone}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {service.image ? (
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Icon className="h-10 w-10 text-primary" />
            </div>
          )}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-3">
            <Badge className="border border-white/55 bg-white/88 text-secondary shadow-sm">
              {modeLabel}
            </Badge>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/70 bg-white/86 text-primary shadow-sm backdrop-blur-sm">
              <Icon className="h-4 w-4" />
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-secondary/30 via-secondary/10 to-transparent" />
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-2 pb-2 pt-5">
        <div className="space-y-3">
          <h3 className="line-clamp-2 min-h-[3.5rem] font-serif text-2xl leading-tight text-secondary">
            {service.name}
          </h3>
          <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted">
            {service.summary}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex min-w-0 flex-wrap items-center gap-2 text-sm text-muted">
            <span className="inline-flex items-center gap-1 rounded-full bg-surface-muted px-3 py-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {service.durationMinutes} წთ
            </span>
            <span className="inline-flex items-center rounded-full bg-surface-muted px-3 py-1.5 font-semibold text-secondary">
              {formatMoney(service.price)}
            </span>
          </div>

          <Button asChild size="sm" className="shrink-0">
            <Link href="/booking">დაჯავშნა</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

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

      <section id="home-visit" className="section-shell scroll-mt-28 pt-0">
        <div className="container-shell space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">
              სახლში ვიზიტი
            </p>
            <h2 className="font-serif text-4xl text-secondary">
              სამედიცინო გუნდი თქვენს მისამართზე
            </h2>
          </div>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {home.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 70} variant="card" className="h-full">
                <ServiceTile
                  service={service}
                modeLabel="ბინაზე"
                tone="bg-gradient-to-br from-[#dff4f2] via-[#edf8f7] to-[#f8fcfb]"
                Icon={HousePlus}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="online-consultation" className="section-shell scroll-mt-28 bg-white/45">
        <div className="container-shell space-y-10">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">
              ონლაინ კონსულტაცია
            </p>
            <h2 className="font-serif text-4xl text-secondary">
              სპეციალისტთან ვიდეოკონსულტაცია სახლიდან
            </h2>
          </div>
          <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {online.map((service, index) => (
              <ScrollReveal key={service.id} delay={index * 70} variant="card" className="h-full">
                <ServiceTile
                  service={service}
                modeLabel="ონლაინ"
                tone="bg-gradient-to-br from-[#e5f2fb] via-[#f0f8ff] to-[#f8fbff]"
                Icon={MonitorSmartphone}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
