import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { Card } from "@/components/ui/card";
import { getPublicSiteSettings } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";
import { buildMetadata } from "@/lib/utils/metadata";

export const metadata = buildMetadata({
  title: "კონტაქტი",
  path: "/contact",
});

type ContactCardItem = {
  title: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  href?: string;
  lines?: string[];
};

export default async function ContactPage() {
  const settings = await getPublicSiteSettings();
  const mapQuery = encodeURIComponent(settings.address);
  const googleMapsEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
  const contactCards: ContactCardItem[] = [
    {
      title: "ტელეფონი",
      value: settings.phone,
      helper: "დაჯავშნა, კოორდინაცია და გადაუდებელი დაკავშირება.",
      icon: Phone,
      href: formatPhoneHref(settings.phone),
    },
    {
      title: "ელფოსტა",
      value: settings.email,
      helper: "დოკუმენტები, პარტნიორობა და ზოგადი მიმოწერა.",
      icon: Mail,
      href: `mailto:${settings.email}`,
    },
    {
      title: "მისამართი",
      value: settings.address,
      helper: "ვიზიტი და ადგილზე მომსახურება წინასწარი შეთანხმებით.",
      icon: MapPin,
    },
    {
      title: "სამუშაო საათები",
      value: settings.hours[0] ?? "",
      helper: "სამუშაო დროის მიღმა მოგვწერეთ და დაგიკავშირდებით.",
      icon: Clock3,
      lines: settings.hours,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="კონტაქტი"
        title="დაგვიკავშირდით თქვენთვის სასურველი გზით"
        description="ჯავშნის, სერვისების, თანამშრომლობის ან ოჯახის მოვლის პროგრამების შესახებ ინფორმაცია ხელმისაწვდომია ტელეფონით, ელფოსტით და ადგილზე."
      />

      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mx-auto max-w-5xl space-y-7 sm:space-y-8">
            <div className="max-w-[38rem] space-y-2.5">
              <h2 className="font-serif text-[2rem] leading-tight text-secondary sm:text-[2.15rem]">
                საკონტაქტო ინფორმაცია ერთ სუფთა სივრცეში
              </h2>
              <p className="max-w-[34rem] text-base leading-7 text-muted">
                აირჩიეთ თქვენთვის მოსახერხებელი არხი და დაგვიკავშირდით სწრაფად, ზედმეტი
                ნაბიჯების გარეშე.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
              {contactCards.map((item) => (
                <ContactInfoCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="container-shell">
          <div className="mx-auto max-w-5xl space-y-5 sm:space-y-6">
            <div className="max-w-[38rem] space-y-2">
              <p className="text-sm font-semibold tracking-[0.01em] text-muted-strong">რუკა</p>
              <h2 className="font-serif text-[2rem] leading-tight text-secondary sm:text-[2.35rem]">
                მარტივად მოსაძებნი მისამართი
              </h2>
              <p className="text-base leading-7 text-muted">
                სივრცე განთავსებულია ცენტრალურ ლოკაციაზე, რათა ვიზიტი და ადგილზე
                კოორდინაცია მაქსიმალურად მარტივი იყოს.
              </p>
            </div>

            <div className="surface-card overflow-hidden p-2.5 sm:p-3">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/70 bg-white">
                <iframe
                  title="მედსერვისის მდებარეობა რუკაზე"
                  src={googleMapsEmbedUrl}
                  className="h-[21rem] w-full border-0 sm:h-[25rem] lg:h-[29rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="flex flex-col gap-4 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 sm:pt-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-secondary">{settings.address}</p>
                  <p className="text-sm leading-6 text-muted">
                    გახსენით სრული რუკა და გამოიყენეთ ნავიგაცია პირდაპირ Google Maps-იდან.
                  </p>
                </div>

                <Button asChild variant="secondary" className="w-full lg:w-auto">
                  <a href={googleMapsUrl} target="_blank" rel="noreferrer">
                    Google Maps-ში გახსნა
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfoCard({ item }: { item: ContactCardItem }) {
  const Icon = item.icon;
  const valueContent = item.href ? (
    <a
      href={item.href}
      className="break-words text-[1.02rem] font-medium leading-7 text-secondary transition hover:text-primary"
    >
      {item.value}
    </a>
  ) : item.lines?.length ? (
    <div className="space-y-1.5">
      {item.lines.map((line) => (
        <p key={line} className="text-[1.02rem] font-medium leading-7 text-secondary">
          {line}
        </p>
      ))}
    </div>
  ) : (
    <p className="text-[1.02rem] font-medium leading-7 text-secondary">{item.value}</p>
  );

  return (
    <Card className="h-full p-5 sm:p-[1.35rem]">
      <div className="flex items-start gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.95rem] border border-primary/12 bg-primary-soft text-primary shadow-[0_8px_18px_rgba(42,200,62,0.08)]">
          <Icon className="h-[1.05rem] w-[1.05rem]" />
        </div>

        <div className="min-w-0 space-y-2">
          <p className="text-sm font-semibold tracking-[0.01em] text-muted-strong">{item.title}</p>
          {valueContent}
          <p className="max-w-[31ch] text-sm leading-6 text-muted">{item.helper}</p>
        </div>
      </div>
    </Card>
  );
}
