import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { JsonLd } from "@/components/json-ld/json-ld";
import { SpecialtiesNavRail } from "@/components/sections/specialties-nav-rail";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { IconMark } from "@/components/ui/icon-mark";
import { LoopingCarousel } from "@/components/ui/looping-carousel";
import { LogoMark } from "@/components/branding/brand-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site";
import { getHomePageData } from "@/lib/data/public";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.legalName,
  path: "/",
});

export default async function HomePage() {
  const {
    services,
    specialties,
    valuePoints,
    testimonials,
    latestNews,
    siteSettings,
  } = await getHomePageData();

  const featuredSpecialties = specialties.slice(0, 6);
  const featuredNews = latestNews.slice(0, 3);
  const homeVisitService =
    services.find((service) => service.serviceMode === "home_visit") ?? services[0];
  const valuePointBackgrounds = [
    {
      src: "/feature-cards/1.jpg",
      position: "center 24%",
    },
    {
      src: "/feature-cards/2.jpg",
      position: "center 22%",
    },
    {
      src: "/feature-cards/3.jpg",
      position: "58% center",
    },
    {
      src: "/feature-cards/4.jpg",
      position: "56% center",
    },
  ] as const;
  const renderTestimonialCard = (testimonial: (typeof testimonials)[number]) => (
    <Card
      key={testimonial.id}
      className="group relative h-full w-[18.75rem] shrink-0 rounded-xl border border-white/60 bg-white/72 p-6 shadow-[0_2px_8px_rgba(15,48,22,0.035)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/75 hover:bg-white/76 hover:shadow-[0_6px_16px_rgba(15,48,22,0.05)] sm:w-[20rem] sm:p-7 lg:w-[21.5rem] xl:w-[22rem]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.9),rgba(238,249,240,0.76))]" />
        <div className="absolute inset-px rounded-[0.95rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04))]" />
        <div className="absolute -right-12 top-2 h-28 w-28 rounded-full bg-primary/[0.12] blur-3xl transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-primary/[0.08] blur-[60px] transition-transform duration-300 group-hover:scale-110" />
        <div className="absolute right-0 top-0 h-24 w-32 opacity-65">
          <svg
            viewBox="0 0 160 120"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 88 C 54 30, 104 26, 152 48"
              stroke="rgba(42,200,62,0.12)"
              strokeWidth="1.05"
              strokeLinecap="round"
            />
            <path
              d="M6 108 C 66 56, 116 56, 156 76"
              stroke="rgba(42,200,62,0.08)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="absolute left-0 top-0 text-[6.4rem] leading-none text-primary/[0.13]">
          ❝
        </div>
      </div>
      <CardContent className="relative z-10 flex h-full flex-col justify-between">
        <p className="pr-2 text-[1.02rem] leading-relaxed text-secondary">
          {testimonial.quote}
        </p>
        <div className="pt-5">
          <p className="text-base font-semibold text-secondary">{testimonial.fullName}</p>
          <p className="text-sm text-muted">
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </CardContent>
    </Card>
  );
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
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_left,rgba(42,200,62,0.09),transparent_52%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-0 top-4 hidden h-56 w-[26rem] opacity-70 lg:block"
            aria-hidden
          >
            <svg
              viewBox="0 0 420 220"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 168 C 86 68, 188 24, 404 56"
                stroke="rgba(42,200,62,0.16)"
                strokeWidth="1.2"
              />
              <path
                d="M10 196 C 104 88, 220 56, 408 96"
                stroke="rgba(42,200,62,0.1)"
                strokeWidth="1"
              />
              <path
                d="M56 210 C 136 126, 234 104, 382 134"
                stroke="rgba(42,200,62,0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div
            className="pointer-events-none absolute left-[47%] top-8 hidden h-[22rem] w-44 -translate-x-1/2 opacity-60 xl:block"
            aria-hidden
          >
            <svg
              viewBox="0 0 180 360"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 16 C 146 82, 28 182, 126 240 C 166 264, 170 314, 134 344"
                stroke="rgba(42,200,62,0.13)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <path
                d="M42 12 C 156 84, 58 176, 136 228 C 170 250, 170 296, 150 332"
                stroke="rgba(42,200,62,0.08)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div
            className="pointer-events-none absolute -right-10 top-6 hidden h-80 w-80 opacity-75 md:block"
            aria-hidden
          >
            <svg
              viewBox="0 0 320 320"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="164"
                cy="158"
                rx="118"
                ry="110"
                stroke="rgba(42,200,62,0.11)"
                strokeWidth="1.1"
              />
              <ellipse
                cx="164"
                cy="158"
                rx="88"
                ry="82"
                stroke="rgba(42,200,62,0.08)"
                strokeWidth="1"
              />
            </svg>
          </div>
          <div
            className="pointer-events-none absolute right-0 top-12 hidden h-36 w-36 opacity-[0.34] lg:block"
            aria-hidden
          >
            <div className="h-full w-full bg-[radial-gradient(circle,rgba(42,200,62,0.22)_1.4px,transparent_1.4px)] bg-[size:18px_18px] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_84%)]" />
          </div>
          <div
            className="pointer-events-none absolute right-[8%] bottom-8 hidden h-28 w-44 opacity-[0.22] md:block"
            aria-hidden
          >
            <div className="h-full w-full bg-[radial-gradient(circle,rgba(42,200,62,0.2)_1.2px,transparent_1.2px)] bg-[size:16px_16px] [mask-image:linear-gradient(135deg,transparent,black_22%,black_82%,transparent)]" />
          </div>
          <div
            className="pointer-events-none absolute bottom-4 right-12 hidden h-36 w-64 opacity-70 lg:block"
            aria-hidden
          >
            <svg
              viewBox="0 0 260 120"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 26 C 70 94, 166 106, 252 70"
                stroke="rgba(42,200,62,0.12)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <path
                d="M16 10 C 92 84, 176 90, 244 54"
                stroke="rgba(42,200,62,0.08)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
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
                    სხვადასხვა დარგის სპეციალისტები, მობილური დიაგნოსტიკა. მოქნილი
                    დაჯავშნა ერთ ციფრულ სივრცეში.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/services#home-visit"
                    className="group relative min-h-[170px] overflow-hidden rounded-2xl border border-white/25 p-5 pt-[70px] shadow-[0_10px_30px_rgba(15,64,67,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-white/35"
                  >
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                      <Image
                        src="/hero-info-blocks/1.jpg"
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: "62% center" }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,15,0.24),rgba(10,18,13,0.5))]" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(42,200,62,0.18),rgba(42,200,62,0.08))]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_34%)]" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[1.4rem] font-semibold leading-6 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                        მომსახურეობა ბინაზე
                      </p>
                      <p className="mt-2 text-[1.1rem] leading-6 text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                        ექიმის, ექთნის ვიზიტი, ლაბორატორიული და ინსტრუმენტული
                        დიაგნოსტიკა
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/services#online-consultation"
                    className="group relative min-h-[170px] overflow-hidden rounded-2xl border border-white/25 p-5 pt-[70px] shadow-[0_10px_30px_rgba(15,64,67,0.05)] transition duration-300 hover:-translate-y-0.5 hover:border-white/35"
                  >
                    <div className="pointer-events-none absolute inset-0" aria-hidden>
                      <Image
                        src="/hero-info-blocks/2.jpg"
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: "78% center" }}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,20,15,0.24),rgba(10,18,13,0.5))]" />
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(42,200,62,0.18),rgba(42,200,62,0.08))]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_34%)]" />
                    </div>
                    <div className="relative z-10">
                      <p className="text-[1.4rem] font-semibold leading-6 text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                        ონლაინ კონსულტაცია
                      </p>
                      <p className="mt-2 text-[1.1rem] leading-6 text-white/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.35)]">
                        ვიდეოვიზიტი ანალიზების, სიმპტომებისა და შემდგომი მართვისთვის.
                      </p>
                    </div>
                  </Link>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link href="/booking">
                      <CalendarDays className="h-4 w-4" />
                      ვიზიტის დაჯავშნა
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mx-auto flex h-full w-full max-w-[32rem] lg:max-w-[34rem]">
              <div className="surface-card h-full w-full p-4 sm:p-5">
                <div className="relative h-[22rem] sm:h-[25rem] lg:h-full lg:min-h-[100%]">
                  <div className="absolute inset-0 rounded-[1.65rem] bg-gradient-to-br from-white via-[#f6fcf6] to-[#ebf9ed] shadow-[0_28px_58px_rgba(15,64,67,0.12)]" />
                  <div className="absolute inset-0 rounded-[1.65rem] border border-white/70" />
                  <div className="pointer-events-none absolute -right-2 top-6 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-6 left-4 h-20 w-20 rounded-full bg-accent/10 blur-3xl" />

                  <div className="relative h-full overflow-hidden rounded-[1.42rem] border border-white/75 shadow-[0_18px_40px_rgba(15,64,67,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f3fbf6] to-[#e6f7ec]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_84%,rgba(42,200,62,0.16),transparent_24%),radial-gradient(circle_at_24%_76%,rgba(255,255,255,0.72),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.18),transparent_38%)]" />
                    <div
                      className="absolute inset-0"
                      style={{
                        WebkitMaskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 H100 V100 C76 96 58 90 38 80 C22 72 10 62 0 50 Z' fill='white'/%3E%3C/svg%3E\")",
                        maskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 0 H100 V100 C76 96 58 90 38 80 C22 72 10 62 0 50 Z' fill='white'/%3E%3C/svg%3E\")",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "100% 100%",
                        maskSize: "100% 100%",
                      }}
                    >
                      <Image
                        src={homeVisitService?.image?.src ?? services[0]?.image?.src ?? ""}
                        alt={homeVisitService?.image?.alt ?? services[0]?.image?.alt ?? ""}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(19,70,72,0.08)_100%)]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/16 to-transparent" />
                    </div>

                    <div
                      className="pointer-events-none absolute inset-0 z-10"
                      style={{
                        WebkitMaskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 100 H100 C76 96 58 90 38 80 C22 72 10 62 0 50 Z' fill='white'/%3E%3C/svg%3E\")",
                        maskImage:
                          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 100 H100 C76 96 58 90 38 80 C22 72 10 62 0 50 Z' fill='white'/%3E%3C/svg%3E\")",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskSize: "100% 100%",
                        maskSize: "100% 100%",
                      }}
                    >
                      <div className="absolute bottom-[3%] left-[4.5%] transition-transform duration-300 ease-out group-hover:scale-[1.05] sm:bottom-[4%] sm:left-[5.5%]">
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
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-10">
          <SectionHeader
            eyebrow="სპეციალობები"
            title="ექიმთა გუნდები სხვადასხვა საჭიროებისათვის"
            description="მედსერვისი აერთიანებს მულტიდისციპლინურ გუნდს, მობილურ დიაგნოსტიკასა და მოქნილ მომსახურებას პაციენტის ცხოვრების რიტმზე მორგებით."
          />
          <SpecialtiesNavRail specialties={featuredSpecialties} />
        </div>
      </section>

      <section className="section-shell relative overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,rgba(42,200,62,0.08),transparent_44%),radial-gradient(circle_at_top_right,rgba(42,200,62,0.08),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(191,165,113,0.08),transparent_28%),linear-gradient(180deg,rgba(248,252,248,0.96),rgba(242,248,243,0.98))]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 top-6 h-64 w-64 rounded-full bg-primary/[0.11] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-6 top-10 h-56 w-56 rounded-full bg-primary/[0.09] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-[20%] hidden h-28 w-28 rounded-full bg-primary/[0.07] blur-[88px] lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(42,200,62,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(42,200,62,0.045)_1px,transparent_1px)] bg-[size:34px_34px] [mask-image:radial-gradient(circle_at_center,black_24%,transparent_82%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-8 right-16 hidden h-40 w-72 opacity-60 lg:block"
          aria-hidden
        >
          <svg
            viewBox="0 0 320 140"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 90 C 90 18, 190 14, 310 72"
                stroke="rgba(42,200,62,0.14)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <path
                d="M4 114 C 82 34, 184 34, 296 90"
                stroke="rgba(42,200,62,0.1)"
                strokeWidth="1"
                strokeLinecap="round"
              />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute -left-[10px] -top-[10px] hidden h-44 w-64 opacity-55 md:block"
          aria-hidden
        >
          <svg
            viewBox="0 0 280 140"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 118 C 62 52, 156 24, 270 58"
                stroke="rgba(42,200,62,0.13)"
                strokeWidth="1.05"
                strokeLinecap="round"
              />
              <path
                d="M16 134 C 88 66, 170 56, 266 86"
                stroke="rgba(42,200,62,0.09)"
                strokeWidth="1"
                strokeLinecap="round"
              />
          </svg>
        </div>
        <div className="container-shell relative z-10 space-y-12 pt-[60px]">
          <SectionHeader
            eyebrow="რატომ მედსერვისი"
            title="მარტივი, სანდო და კომფორტული მომსახურება"
            description="ჩვენთან ყველაფერი მარტივად მუშაობს — რომ თავი უსაფრთხოდ და მშვიდად იგრძნოთ."
            className="max-w-3xl"
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePoints.map((point, index) => {
              const cardBackground =
                valuePointBackgrounds[index % valuePointBackgrounds.length];

              return (
                <Card
                  key={point.title}
                  className="group relative overflow-hidden isolate rounded-xl border border-white/35 bg-white/14 p-6 text-center shadow-none transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-white/55 hover:bg-white/18 hover:shadow-none sm:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl" aria-hidden>
                    <Image
                      src={cardBackground.src}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                      style={{ objectPosition: cardBackground.position }}
                    />
                    <div className="absolute inset-0 rounded-xl bg-[rgba(0,0,0,0.28)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35),rgba(0,0,0,0.5))] transition-opacity duration-300 ease-out group-hover:opacity-75" />
                    <div className="absolute inset-0 bg-[linear-gradient(150deg,rgba(12,140,143,0.2)_0%,rgba(42,200,62,0.12)_48%,rgba(0,0,0,0.02)_100%)] transition-opacity duration-300 ease-out group-hover:opacity-70" />
                    <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03),transparent)] transition-opacity duration-300 ease-out group-hover:opacity-60" />
                    <div className="absolute inset-0 rounded-xl border border-white/34 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/[0.12] blur-3xl transition-all duration-300 group-hover:bg-primary/[0.18] group-hover:scale-110" />
                    <div className="absolute -left-8 bottom-0 h-24 w-24 rounded-full bg-[#0C8C8F]/[0.12] blur-[68px] transition-all duration-300 group-hover:bg-[#0C8C8F]/[0.18]" />
                  </div>

                  <div className="relative z-10 pt-16 text-center">
                    <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl border border-white/55 bg-white/88 text-primary backdrop-blur-md">
                      <IconMark name={point.icon} />
                    </div>
                    <CardHeader className="pt-4 text-center">
                      <CardTitle className="text-[1.4rem] leading-snug text-white [text-shadow:0_2px_6px_rgba(0,0,0,0.4)]">
                        {point.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed text-green-50 [text-shadow:0_2px_6px_rgba(0,0,0,0.4)]">
                        {point.description}
                      </CardDescription>
                    </CardHeader>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-12">
          <SectionHeader
            eyebrow="სიახლეები"
            title="ბოლო განახლებები და კლინიკური რჩევები"
            description="პლატფორმის განვითარება, ახალი სერვისები და პრაქტიკული ჯანმრთელობის მასალა ერთ სივრცეში."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredNews.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                {post.coverImage ? (
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={post.coverImage.src}
                      alt={post.coverImage.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-6">
                  <CardHeader className="pt-4">
                    <CardTitle className="text-2xl">{post.title}</CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <Button asChild variant="ghost" className="mt-4 px-0 text-primary">
                    <Link href={`/news/${post.slug}`}>სტატიის ნახვა</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20 bg-[hsl(80,0%,90%)]">
        <div className="container-shell">
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(145deg,rgba(250,253,250,0.92),rgba(237,248,239,0.86)_42%,rgba(246,251,247,0.94)_100%)] shadow-[0_28px_90px_rgba(15,48,22,0.08)]">
        <div className="absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,252,248,0.78),rgba(232,247,235,0.94)_42%,rgba(244,250,245,0.98)_100%)]" />
          <div className="absolute -left-28 top-2 h-72 w-72 rounded-full bg-primary/[0.14] blur-[130px]" />
          <div className="absolute left-[32%] top-6 h-40 w-40 rounded-full bg-primary/[0.08] blur-[92px]" />
          <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-primary/[0.14] blur-[140px]" />
          <div className="absolute right-[24%] bottom-6 hidden h-28 w-28 rounded-full bg-primary/[0.08] blur-[80px] lg:block" />
          <div className="absolute right-10 top-8 hidden h-40 w-64 opacity-65 lg:block">
            <svg
              viewBox="0 0 280 140"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 104 C 78 28, 174 20, 270 64"
                stroke="rgba(42,200,62,0.16)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <path
                d="M10 126 C 96 60, 186 60, 270 94"
                stroke="rgba(42,200,62,0.1)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute left-2 top-1/2 hidden h-44 w-72 -translate-y-1/2 opacity-55 xl:block">
            <svg
              viewBox="0 0 320 180"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 142 C 92 36, 192 18, 308 64"
                stroke="rgba(42,200,62,0.15)"
                strokeWidth="1.15"
                strokeLinecap="round"
              />
              <path
                d="M22 164 C 116 78, 214 74, 302 110"
                stroke="rgba(42,200,62,0.09)"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="absolute left-8 bottom-10 hidden h-28 w-40 opacity-5 md:block">
            <svg
              viewBox="0 0 160 120"
              className="h-full w-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="28" cy="26" r="2" fill="rgba(42,200,62,0.14)" />
              <circle cx="64" cy="52" r="2" fill="rgba(42,200,62,0.1)" />
              <circle cx="102" cy="24" r="2" fill="rgba(42,200,62,0.12)" />
              <circle cx="122" cy="70" r="2" fill="rgba(42,200,62,0.1)" />
              <circle cx="52" cy="88" r="2" fill="rgba(42,200,62,0.1)" />
            </svg>
          </div>
        </div>
        <div className="relative z-10 space-y-10 px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
          <SectionHeader
            eyebrow="პაციენტების ხმა"
            title="რას ამბობენ ჩვენზე"
            description="მოხერხებულობა, სითბო და ორგანიზებულობა ყველაზე ხშირად განმეორებადი შეფასებებია."
          />
          {false && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group relative h-full rounded-xl border border-white/55 bg-white/72 p-6 shadow-[0_22px_52px_rgba(15,48,22,0.14)] backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/70 hover:shadow-[0_28px_60px_rgba(15,48,22,0.18)] sm:p-7"
              >
                <div className="pointer-events-none absolute inset-0" aria-hidden>
                  <div className="absolute inset-0 bg-[linear-gradient(155deg,rgba(255,255,255,0.9),rgba(238,249,240,0.76))]" />
                  <div className="absolute inset-px rounded-[0.95rem] border border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.04))]" />
                  <div className="absolute -right-12 top-2 h-28 w-28 rounded-full bg-primary/[0.12] blur-3xl transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-primary/[0.08] blur-[60px] transition-transform duration-300 group-hover:scale-110" />
                  <div className="absolute right-0 top-0 h-24 w-32 opacity-65">
                    <svg
                      viewBox="0 0 160 120"
                      className="h-full w-full"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 88 C 54 30, 104 26, 152 48"
                        stroke="rgba(42,200,62,0.12)"
                        strokeWidth="1.05"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 108 C 66 56, 116 56, 156 76"
                        stroke="rgba(42,200,62,0.08)"
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute left-0 top-0 text-[6.4rem] leading-none text-primary/[0.13]">
                    ❝
                  </div>
                </div>
                <CardContent className="relative z-10 flex h-full flex-col justify-between">
                  <p className="pr-2 text-[1.02rem] leading-relaxed text-secondary">
                    {testimonial.quote}
                  </p>
                  <div className="pt-5">
                    <p className="text-base font-semibold text-secondary">
                      {testimonial.fullName}
                    </p>
                    <p className="text-sm text-muted">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          )}
          <div className="relative overflow-hidden rounded-[1.65rem] border border-white/70 bg-white/34 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] sm:p-4 lg:p-5">
            <LoopingCarousel
              className="rounded-[1.35rem]"
              viewportClassName="px-3 py-3 sm:px-12 lg:px-14"
              trackClassName="gap-6"
              fadeClassName="from-[#edf7ef] via-[#edf7ef]/94 to-transparent"
              fadeWidthClassName="w-14 lg:w-20"
              previousLabel="წინა შეფასებები"
              nextLabel="შემდეგი შეფასებები"
            >
              {testimonials.map((testimonial) => renderTestimonialCard(testimonial))}
            </LoopingCarousel>
          </div>
        </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="mesh-panel p-8 sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div className="space-y-5">
                <h2 className="max-w-2xl font-serif text-4xl leading-tight text-secondary">
                  დაგეგმეთ ექიმის ვიზიტი, კვლევა ან ონლაინ კონსულტაცია რამდენიმე
                  ნაბიჯში
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-muted">
                  აირჩიეთ მომსახურების ტიპი, სასურველი დრო და გადახდის მეთოდი.
                  დანარჩენს ჩვენი გუნდი დადასტურებით დაგიბრუნებთ.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link href="/booking">დაჯავშნა</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/contact">კონტაქტი</Link>
                  </Button>
                </div>
              </div>
              <div className="surface-card p-6">
                <p className="text-sm font-semibold text-primary">საკონტაქტო ცენტრი</p>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted">
                  <p>{siteSettings.phone}</p>
                  <p>{siteSettings.email}</p>
                  <p>{siteSettings.address}</p>
                  <div className="rounded-3xl bg-surface-muted p-4 text-muted-strong">
                    {siteSettings.hours.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
