import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
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
import { formatDate } from "@/lib/utils/format";
import { absoluteUrl, buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  absoluteTitle: siteConfig.legalName,
  path: "/",
});

export default async function HomePage() {
  const {
    services,
    specialties,
    stats,
    valuePoints,
    testimonials,
    latestNews,
    siteSettings,
  } = await getHomePageData();

  const featuredSpecialties = specialties.slice(0, 6);
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
          <div className="grid items-start gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:items-center">
            <div className="mesh-panel p-8 sm:p-10 lg:p-12">
              <Badge variant="accent">ბინაზე ვიზიტი და ონლაინ კონსულტაცია</Badge>
              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-serif text-5xl leading-tight text-secondary sm:text-6xl">
                    სამედიცინო მომსახურება იქ, სადაც თქვენთვის ყველაზე მოსახერხებელია
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-muted">
                    სხვადასხვა სპეციალობის ექიმთა გუნდები, ონლაინ კონსულტაციები და
                    კოორდინირებული ჯავშნის პროცესი ერთ მშვიდ ციფრულ გამოცდილებაში.
                  </p>
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

            <div className="surface-card mx-auto flex h-fit w-full max-w-[32rem] flex-col items-center overflow-hidden p-4 sm:p-5">
              <div className="relative aspect-[5/4] w-full max-w-[27rem] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={services[0]?.image?.src ?? ""}
                  alt={services[0]?.image?.alt ?? ""}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid w-full max-w-[27rem] gap-3 p-4 pt-5 sm:grid-cols-2 sm:px-0 sm:pb-0">
                {stats.slice(0, 2).map((stat) => (
                  <div
                    key={stat.label}
                    className="flex h-full flex-col items-center justify-center rounded-3xl bg-surface-muted p-4 text-center sm:p-5"
                  >
                    <p className="text-2xl font-semibold text-secondary">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium text-secondary">{stat.label}</p>
                    <p className="mt-2 max-w-[16rem] text-sm leading-6 text-muted">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white/45">
        <div className="container-shell space-y-12">
          <SectionHeader
            eyebrow="სპეციალობები"
            title="ექიმთა გუნდები სხვადასხვა საჭიროებისთვის"
            description="ექიმთა გუნდი ისეა დაჯგუფებული, რომ პირველადი შეფასებიდან სიღრმისეულ სპეციალიზებულ მართვამდე ერთი თანმიმდევრული გზა მიიღოთ."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredSpecialties.map((specialty) => (
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
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell space-y-12">
          <SectionHeader
            eyebrow="რატომ მედსერვისი"
            title="პროცესი აგებულია ნდობაზე, სიმშვიდესა და სიზუსტეზე"
            description="დიზაინიდან მომსახურებამდე ყველაფერი გათვლილია იმაზე, რომ პაციენტმა თავი იგრძნოს დაცულად და ინფორმირებულად."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {valuePoints.map((point) => (
              <Card key={point.title} className="p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <IconMark name={point.icon} />
                </div>
                <CardHeader className="pt-5">
                  <CardTitle className="text-xl">{point.title}</CardTitle>
                  <CardDescription>{point.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
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

      <section className="section-shell">
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
                  <p className="text-lg leading-8 text-secondary">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
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
