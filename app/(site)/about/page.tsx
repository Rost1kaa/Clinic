import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHomePageData } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "ჩვენ შესახებ",
  path: "/about",
});

export default async function AboutPage() {
  const { stats, valuePoints } = await getHomePageData();

  return (
    <>
      <PageHero
        eyebrow="ჩვენ შესახებ"
        title="მედსერვისი აერთიანებს პრემიუმ სერვისს და კლინიკურ დისციპლინას"
        description="კომპანია შექმნილია იმ იდეით, რომ კერძო სამედიცინო მომსახურება იყოს მშვიდი, სწრაფი, გამჭვირვალე და პაციენტზე ორიენტირებული."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>რას ვაკეთებთ</CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-8 text-muted">
              <p>
                მედსერვისი არის კერძო სამედიცინო კომპანია, რომელიც აერთიანებს სხვადასხვა
                სპეციალობის ექიმთა გუნდებს, მობილურ დიაგნოსტიკას, სახლში მოვლის
                სერვისებსა და ონლაინ კონსულტაციებს.
              </p>
              <p>
                ჩვენი მიზანია პაციენტის გზა იყოს უფრო მოკლე, ნაკლებად სტრესული და
                უკეთ დოკუმენტირებული, იქნება ეს ერთი ვიზიტი თუ ხანგრძლივი მონიტორინგი.
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="p-6">
                <p className="text-3xl font-semibold text-secondary">{stat.value}</p>
                <p className="mt-2 font-medium text-secondary">{stat.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{stat.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section-shell bg-white/45">
        <div className="container-shell grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {valuePoints.map((point) => (
            <Card key={point.title} className="p-6">
              <CardHeader>
                <CardTitle className="text-xl">{point.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-muted">{point.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
