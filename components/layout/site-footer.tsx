import Link from "next/link";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { footerNavigation, mainNavigation, siteConfig } from "@/lib/constants/site";
import { getPublicSiteSettings } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";

export async function SiteFooter() {
  const settings = await getPublicSiteSettings();

  return (
    <footer className="mt-20 border-t border-white/70 bg-[#f0f7f6]">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="space-y-1">
              <p className="font-serif text-3xl leading-none text-secondary">მედსერვისი</p>
              <p className="text-[0.72rem] font-medium tracking-[0.16em] text-muted">
                სამედიცინო ჯგუფი
              </p>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted">{settings.tagline}</p>
          </div>
          <div className="grid gap-3 text-sm text-muted">
            <a className="flex items-center gap-3" href={formatPhoneHref(settings.phone)}>
              <Phone className="h-4 w-4 text-primary" />
              {settings.phone}
            </a>
            <a className="flex items-center gap-3" href={`mailto:${settings.email}`}>
              <Mail className="h-4 w-4 text-primary" />
              {settings.email}
            </a>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" />
              {settings.address}
            </p>
          </div>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-strong"
          >
            <CalendarDays className="h-4 w-4" />
            ვიზიტის დაჯავშნა
          </Link>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
            ნავიგაცია
          </p>
          <div className="grid gap-3">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted">
            სამართლებრივი
          </p>
          <div className="grid gap-3">
            {footerNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="rounded-3xl border border-border bg-white p-4 text-sm leading-6 text-muted">
            {siteConfig.emergencyNote}
          </p>
        </div>
      </div>
      <div className="soft-divider" />
      <div className="container-shell flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} მედსერვისი. ყველა უფლება დაცულია.</p>
        <p>Private medical company with in-home and online care services.</p>
      </div>
    </footer>
  );
}
