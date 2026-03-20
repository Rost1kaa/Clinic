import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "წესები და პირობები",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="წესები და პირობები"
        title="სერვისის გამოყენების ძირითადი პირობები"
        description="ჯავშანი ძალაში შედის დადასტურების შემდეგ, ხოლო მომსახურების ტიპი, სლოტი და გადახდის რეჟიმი ფიქსირდება შეკვეთის ჩანაწერში."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>გამოყენების პირობები</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-base leading-8 text-muted">
              <p>სლოტის არჩევა არ ნიშნავს საბოლოო დადასტურებას მანამ, სანამ სისტემა წარმატებით არ დააფიქსირებს ჯავშანს და ადმინისტრაციული გუნდი არ დაადასტურებს საჭირო დეტალებს.</p>
              <p>ონლაინ გადახდის შემთხვევაში სტატუსი ინახება ცალკე გადახდის ჩანაწერში, ხოლო ადგილზე გადახდა აღინიშნება შესაბამის რეჟიმად.</p>
              <p>Velora Care იტოვებს უფლებას გადაანაწილოს სლოტი კლინიკური პრიორიტეტების გათვალისწინებით და მომხმარებელს შესთავაზოს ალტერნატიული დრო.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
