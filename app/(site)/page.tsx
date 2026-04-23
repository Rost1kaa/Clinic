import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { LogoMark } from "@/components/branding/brand-logo";
import { JsonLd } from "@/components/json-ld/json-ld";
import { HomeDiagnosticsSection } from "@/components/sections/home-diagnostics-section";
import { HomeTrustStatsSection } from "@/components/sections/home-trust-stats-section";
import { SpecialtiesNavRail } from "@/components/sections/specialties-nav-rail";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/section-header";
import { siteConfig } from "@/lib/constants/site";
import { getHomePageData } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.legalName,
  path: "/",
});

const heroPhoneNumber = "+995 555 12 34 56";

const heroHighlights = [
  {
    href: "/services#home-visit",
    title: "მომსახურება ბინაზე",
    description:
      "ექიმის, ექთნის ვიზიტი, ლაბორატორიული და ინსტრუმენტული დიაგნოსტიკა",
    imageSrc: "/hero-info-blocks/1.jpg",
    imagePosition: "62% center",
  },
  {
    href: "/services#online-consultation",
    title: "ონლაინ კონსულტაცია",
    description:
      "ვიდეოვიზიტი ანალიზების, სიმპტომებისა და შემდგომი მართვისთვის.",
    imageSrc: "/hero-info-blocks/2.jpg",
    imagePosition: "78% center",
  },
] as const;

export default async function HomePage() {
  const { services, specialties, stats, siteSettings } = await getHomePageData();

  const featuredSpecialties = specialties.slice(0, 6);
  const homeVisitService =
    services.find((service) => service.serviceMode === "home_visit") ?? services[0];
  const heroImage = homeVisitService?.image ?? services[0]?.image;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          name: siteSettings.companyName,
          url: absoluteUrl("/"),
          address: {
            "@type": "PostalAddress",
            streetAddress: siteSettings.address,
            addressCountry: "GE",
          },
          telephone: siteSettings.phone,
          email: siteSettings.email,
        }}
      />

      <section className="section-shell pt-8">
        <div className="container-shell relative">
          <div
            className="pointer-events-none absolute -left-2 top-24 h-36 w-36 rounded-full bg-primary/[0.08] blur-3xl sm:h-44 sm:w-44"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-4 top-20 h-44 w-44 rounded-full bg-primary/[0.1] blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-10 left-[42%] hidden h-24 w-24 rounded-full bg-primary/[0.07] blur-3xl lg:block"
            aria-hidden
          />

          <div className="relative z-10 grid items-stretch gap-8 lg:grid-cols-[1.16fr_0.84fr] lg:gap-10">
            <div className="mesh-panel flex h-full flex-col justify-center p-8 sm:p-10 lg:p-11 xl:p-12">
              <div className="mt-4 space-y-5">
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-serif text-[2.4rem] leading-[1.03] text-secondary">
                    სამედიცინო მომსახურება იქ, სადაც თქვენ ხართ
                  </h1>
                  <p className="max-w-2xl text-base leading-[1.9rem] text-muted sm:text-[1.02rem] sm:leading-[1.9rem]">
                    სხვადასხვა დარგის სპეციალისტები, მობილური დიაგნოსტიკა და მოქნილი
                    დაჯავშნა ერთ ციფრულ სივრცეში.
                  </p>
                </div>

                <div className="space-y-3.5">
                  <div className="grid gap-3 md:grid-cols-2">
                    {heroHighlights.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group relative min-h-[170px] overflow-hidden rounded-2xl border border-white/25 p-5 pt-[70px] shadow-[0_10px_30px_rgba(15,64,67,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-white/35"
                      >
                        <div className="pointer-events-none absolute inset-0" aria-hidden>
                          <Image
                            src={item.imageSrc}
                            alt=""
                            fill
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                            style={{ objectPosition: item.imagePosition }}
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,15,0.24),rgba(10,18,13,0.5))]" />
                          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(42,200,62,0.18),rgba(42,200,62,0.08))]" />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_34%)]" />
                        </div>
                        <div className="relative z-10">
                          <p className="text-[1.4rem] font-semibold leading-6 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                            {item.title}
                          </p>
                          <p className="mt-2 text-[1.1rem] leading-6 text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mx-auto grid max-w-[38rem] justify-items-center gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
                    <Button
                      asChild
                      size="md"
                      className="h-11 w-full rounded-[1.1rem] justify-center px-4 shadow-[0_12px_26px_rgba(42,200,62,0.14)]"
                    >
                      <Link href="/booking">
                        <CalendarDays className="h-4 w-4" />
                        ვიზიტის დაჯავშნა
                      </Link>
                    </Button>

                    <div className="flex justify-center">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/80 bg-surface-muted/88 text-[0.82rem] font-semibold text-secondary shadow-[0_8px_18px_rgba(10,55,58,0.05)]">
                        ან
                      </span>
                    </div>

                    <Button
                      asChild
                      variant="secondary"
                      size="md"
                      className="h-11 w-full rounded-[1.1rem] justify-center border border-border-strong bg-white/86 px-4 text-secondary shadow-[0_10px_22px_rgba(10,55,58,0.05)] hover:bg-white"
                    >
                      <a href={formatPhoneHref(heroPhoneNumber)}>
                        <Phone className="h-4 w-4" />
                        {heroPhoneNumber}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto flex h-full w-full max-w-[32rem] lg:max-w-[34rem]">
              <div className="surface-card h-full w-full p-4 sm:p-5">
                <div className="relative h-[22rem] overflow-hidden rounded-[1.65rem] border border-white/70 bg-gradient-to-br from-white via-[#f6fcf6] to-[#ebf9ed] shadow-[0_28px_58px_rgba(15,64,67,0.12)] sm:h-[25rem] lg:h-full">
                  <div className="pointer-events-none absolute -right-2 top-6 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-6 left-4 h-20 w-20 rounded-full bg-accent/10 blur-3xl" />

                  <div className="absolute inset-[0.42rem] overflow-hidden rounded-[1.42rem] border border-white/75 bg-gradient-to-br from-white via-[#f3fbf6] to-[#e6f7ec] shadow-[0_18px_40px_rgba(15,64,67,0.1)]">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_84%,rgba(42,200,62,0.16),transparent_24%),radial-gradient(circle_at_24%_76%,rgba(255,255,255,0.68),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent_38%)]" />

                    {heroImage ? (
                      <div className="diagonal-media-clip absolute inset-0">
                        <Image
                          src={heroImage.src}
                          alt={heroImage.alt}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(19,70,72,0.16))]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_84%,rgba(42,200,62,0.14),transparent_24%),radial-gradient(circle_at_24%_76%,rgba(255,255,255,0.46),transparent_26%)]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent" />
                      </div>
                    ) : null}
                  </div>

                  <div className="absolute bottom-[4%] left-[5.5%] transition-transform duration-300 ease-out hover:scale-[1.05]">
                    <div className="absolute inset-0 scale-[1.44] rounded-full bg-primary/[0.14] blur-[30px]" />
                    <div className="absolute inset-0 scale-[1.16] rounded-full bg-white/28 blur-[16px]" />
                    <LogoMark
                      className="relative h-[6.3rem] w-[6.3rem] drop-shadow-[0_10px_24px_rgba(42,200,62,0.26)] sm:h-[7.4rem] sm:w-[7.4rem]"
                      decorative
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-10">
          <SectionHeader
            eyebrow="სპეციალობები"
            title="ექიმთა გუნდები სხვადასხვა საჭიროებისთვის"
            description="მედსერვისი აერთიანებს მულტიდისციპლინურ გუნდს, მობილურ დიაგნოსტიკასა და მოქნილ მომსახურებას პაციენტის ცხოვრების რიტმზე მორგებით."
            align="center"
            className="max-w-[46rem]"
          />
          <SpecialtiesNavRail specialties={featuredSpecialties} />
        </div>
      </section>

      <HomeTrustStatsSection stats={stats} />
      <HomeDiagnosticsSection />
    </>
  );
}
