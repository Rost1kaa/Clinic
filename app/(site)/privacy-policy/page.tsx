import { PageHero } from "@/components/sections/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "კონფიდენციალურობა",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="კონფიდენციალურობა"
        title="როგორ ვიცავთ პერსონალურ და სამედიცინო მონაცემებს"
        description="Velora Care იყენებს მინიმალური წვდომის, სერვერული ვალიდაციის და როლებზე დაფუძნებული ავტორიზაციის პრინციპებს."
      />
      <section className="section-shell pt-0">
        <div className="container-shell">
          <Card className="p-8">
            <CardHeader>
              <CardTitle>ძირითადი პრინციპები</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-base leading-8 text-muted">
              <p>ვაგროვებთ მხოლოდ იმ მონაცემებს, რაც აუცილებელია ჯავშნის, სერვისის მიწოდებისა და ადმინისტრაციული პროცესებისთვის.</p>
              <p>ადმინისტრაციულ წვდომას მართავს როლებზე დაფუძნებული ავტორიზაცია, ხოლო ცვლილებები ლოგდება სტატუსებისა და ჩანაწერების ისტორიის დონეზე.</p>
              <p>მომხმარებლის მიერ გაგზავნილი ფორმები მოწმდება სერვერზე, ხოლო საიდუმლო გასაღებები ინახება მხოლოდ გარემოს ცვლადებში.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
