import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld/json-ld";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconMark } from "@/components/ui/icon-mark";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/constants/site";
import { getHomePageData } from "@/lib/data/public";
import { formatDate, formatMoney } from "@/lib/utils/format";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.legalName,
  path: "/",
});

export default async function HomePage() {
  const {
    services,
    specialties,
    diagnostics,
    laboratoryServices,
    stats,
    valuePoints,
    testimonials,
    latestNews,
    siteSettings,
  } = await getHomePageData();

  const featuredServices = services.slice(0, 4);
  const featuredSpecialties = specialties.slice(0, 6);
  const featuredDiagnostics = diagnostics.slice(0, 3);
  const featuredLabs = laboratoryServices.slice(0, 4);
  const featuredNews = latestNews.slice(0, 3);

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
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="mesh-panel p-8 sm:p-10 lg:p-12">
              <Badge variant="accent">სახლში ვიზიტი და ონლაინ კონსულტაცია</Badge>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-serif text-5xl leading-tight text-secondary sm:text-6xl">
                    მშვიდი, პრემიუმ და სანდო სამედიცინო მომსახურება იქ, სადაც თქვენ ხართ
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-muted">
                    სხვადასხვა სპეციალობის ექიმთა გუნდები, მობილური დიაგნოსტიკა,
                    ლაბორატორიული სერვისები და მოქნილი დაჯავშნა ერთ ციფრულ სივრცეში.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button asChild size="lg">
                    <Link href="/booking">
                      <CalendarDays className="h-4 w-4" />
                      ვიზიტის დაჯავშნა
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/services">
                      სერვისების ნახვა
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <Clock3 className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        სწრაფი პასუხი
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      სამუშაო საათებში დაბრუნების საშუალო დრო 15 წუთზე ნაკლებია.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <ShieldCheck className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        დაცული პროცესი
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      დაჯავშნის, გადახდისა და ადმინისტრირების უსაფრთხო არქიტექტურა.
                    </p>
                  </div>
                  <div className="rounded-3xl border border-white/70 bg-white/80 p-5">
                    <div className="flex items-center gap-3 text-primary">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                        ერთიანი მოვლა
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      ექიმი, დიაგნოსტიკა და ლაბორატორია კოორდინირებულ გზაზე.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="surface-card overflow-hidden p-4">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={services[0]?.image?.src ?? ""}
                    alt={services[0]?.image?.alt ?? ""}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-2">
                  {stats.slice(0, 2).map((stat) => (
                    <div key={stat.label} className="rounded-3xl bg-surface-muted p-4">
                      <p className="text-2xl font-semibold text-secondary">{stat.value}</p>
                      <p className="mt-1 text-sm font-medium text-secondary">{stat.label}</p>
                      <p className="mt-2 text-sm text-muted">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-card p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  სწრაფი არჩევანი
                </p>
                <div className="mt-4 grid gap-4">
                  <Link
                    href="/services#home"
                    className="rounded-3xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <p className="text-lg font-semibold text-secondary">
                      სახლში სამედიცინო მომსახურება
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      ექიმის ვიზიტი, ექთანი, დიაგნოსტიკა და ლაბორატორიული აღება მისამართზე.
                    </p>
                  </Link>
                  <Link
                    href="/services#online"
                    className="rounded-3xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-primary/30"
                  >
                    <p className="text-lg font-semibold text-secondary">
                      ონლაინ სპეციალისტის კონსულტაცია
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      ვიდეოვიზიტი ანალიზების, სიმპტომებისა და შემდგომი მართვისთვის.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <SectionHeader
            eyebrow="ძირითადი სერვისები"
            title="აირჩიეთ საჭირო სამედიცინო გზა"
            description="მედსერვისი აერთიანებს მულტიდისციპლინურ გუნდს, მობილურ დიაგნოსტიკასა და მოქნილ მომსახურებას პაციენტის ცხოვრების რიტმზე მორგებით."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "სახლში სამედიცინო ვიზიტი",
                description:
                  "ექიმი, ექთანი, დიაგნოსტიკა და ლაბორატორია თქვენს მისამართზე, წინასწარ დადასტურებული სლოტით.",
                href: "/booking",
              },
              {
                title: "ონლაინ სპეციალისტის კონსულტაცია",
                description:
                  "ვიდეოკონსულტაცია განმეორებითი ვიზიტებისთვის, კვლევების განხილვისა და მკურნალობის კორექციისთვის.",
                href: "/booking",
              },
            ].map((pathway) => (
              <Card key={pathway.title} className="p-8">
                <CardHeader>
                  <CardTitle>{pathway.title}</CardTitle>
                  <CardDescription>{pathway.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <Button asChild variant="secondary">
                    <Link href={pathway.href}>არჩევა</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 grid gap-6 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <Card key={service.id} className="p-6">
                <CardHeader>
                  <Badge>{service.serviceMode === "home_visit" ? "სახლში" : "ონლაინ"}</Badge>
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>{service.durationMinutes} წუთი</span>
                    <span>{formatMoney(service.price)}</span>
                  </div>
                  <Button asChild variant="ghost" className="px-0 text-primary">
                    <Link href="/booking">დაჯავშნა</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-12">
          <SectionHeader
            eyebrow="სპეციალობები"
            title="ექიმთა გუნდები სხვადასხვა საჭიროებისთვის"
            description="ექიმთა გუნდი ისეა დაჯგუფებული, რომ პირველადი შეფასებიდან სიღრმისეულ სპეციალიზებულ მართვამდე ერთიან გზას გადიოდეთ."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredSpecialties.map((specialty) => {
              return (
                <Card key={specialty.id} className="p-6">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <IconMark name={specialty.icon} />
                    </div>
                    <CardTitle className="text-2xl">{specialty.name}</CardTitle>
                    <CardDescription>{specialty.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted">{specialty.carePath}</p>
                    <Button asChild variant="ghost" className="px-0 text-primary">
                      <Link href={`/specialties/${specialty.slug}`}>ვრცლად</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <SectionHeader
              eyebrow="დიაგნოსტიკა"
              title="მობილური კვლევები და კლინიკური სიზუსტე"
              description="დიაგნოსტიკური სერვისები დაგეხმარებათ ექიმის კონსულტაციის გაგრძელებაში ზედმეტი გადაადგილების გარეშე."
            />
            <div className="grid gap-4">
              {featuredDiagnostics.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-secondary">{item.name}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                    </div>
                    <Badge variant="neutral">{formatMoney(item.price)}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <SectionHeader
              eyebrow="ლაბორატორია"
              title="ლაბორატორიული სერვისები პასუხების ციფრული მიწოდებით"
              description="სახლში აღებული ნიმუშები, ორგანიზებული პასუხები და ექიმთან მარტივად გაზიარებადი შედეგები."
            />
            <div className="grid gap-4">
              {featuredLabs.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-secondary">{item.name}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{item.summary}</p>
                    </div>
                    <Badge variant="neutral">{formatMoney(item.price)}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-12">
          <SectionHeader
            eyebrow="რატომ მედსერვისი"
            title="პროცესი აგებულია ნდობაზე, სიმშვიდესა და სიზუსტეზე"
            description="დიზაინიდან სერვისამდე ყველაფერი გათვლილია იმაზე, რომ პაციენტმა თავი იგრძნოს დაცულად და ინფორმირებულად."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePoints.map((point) => {
              return (
                <Card key={point.title} className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <IconMark name={point.icon} />
                  </div>
                  <CardHeader className="pt-5">
                    <CardTitle className="text-xl">{point.title}</CardTitle>
                    <CardDescription>{point.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
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
                  <Badge variant="neutral">{formatDate(post.publishedAt)}</Badge>
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

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-10">
          <SectionHeader
            eyebrow="პაციენტების ხმა"
            title="რას ამბობენ ჩვენზე"
            description="მოხერხებულობა, სითბო და ორგანიზებულობა ყველაზე ხშირად განმეორებადი შეფასებებია."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-6">
                <CardContent>
                  <p className="text-lg leading-8 text-secondary">“{testimonial.quote}”</p>
                  <div className="pt-4">
                    <p className="font-semibold text-secondary">{testimonial.fullName}</p>
                    <p className="text-sm text-muted">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell">
          <div className="mesh-panel p-8 sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div className="space-y-5">
                <Badge>დაჯავშნეთ დღესვე</Badge>
                <h2 className="max-w-2xl font-serif text-4xl leading-tight text-secondary">
                  დაგეგმეთ ექიმის ვიზიტი, კვლევა ან ონლაინ კონსულტაცია რამდენიმე ნაბიჯში
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
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">
                  საკონტაქტო ცენტრი
                </p>
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
