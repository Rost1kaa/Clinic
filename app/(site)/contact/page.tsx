import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicSiteSettings } from "@/lib/data/public";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "კონტაქტი",
  path: "/contact",
});

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="კონტაქტი"
        title="დაგვიკავშირდით თქვენთვის სასურველი გზით"
        description="ჯავშნის, სერვისების, თანამშრომლობის ან ოჯახის მოვლის პროგრამების შესახებ ინფორმაცია ხელმისაწვდომია ტელეფონით, ელფოსტით და ადგილზე."
      />
      <section className="section-shell pt-0">
        <div className="container-shell grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Phone className="h-5 w-5 text-primary" />
                  ტელეფონი
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`tel:${settings.phone}`} className="text-lg text-secondary">
                  {settings.phone}
                </a>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Mail className="h-5 w-5 text-primary" />
                  ელფოსტა
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`mailto:${settings.email}`} className="text-lg text-secondary">
                  {settings.email}
                </a>
              </CardContent>
            </Card>
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MapPin className="h-5 w-5 text-primary" />
                  მისამართი
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-secondary">{settings.address}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-8">
              <CardHeader>
                <CardTitle>სამუშაო საათები</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted">
                {settings.hours.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </CardContent>
            </Card>
            <Card className="p-8">
              <CardHeader>
                <CardTitle>რუკის ადგილი</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex min-h-72 items-center justify-center rounded-[2rem] border border-dashed border-border-strong bg-surface-muted text-center text-muted">
                  ინტერაქტიული რუკის ინტეგრაცია შეიძლება დაემატოს deployment-ის დროს
                </div>
              </CardContent>
            </Card>
            <Alert
              title="ოპერატიული პასუხი"
              description="თუ ჯავშნის გადაუდებელი დადასტურება გჭირდებათ, გამოიყენეთ ტელეფონი ან პირდაპირ გადადით დაჯავშნის გვერდზე."
            />
          </div>
        </div>
      </section>
    </>
  );
}
