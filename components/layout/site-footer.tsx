import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { footerNavigation, mainNavigation, siteConfig } from "@/lib/constants/site";
import { getPublicSiteSettings } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";

const filteredMainNavigation = mainNavigation.filter(
  (item) => !["/specialties", "/laboratory", "/news", "/about"].includes(item.href),
);

export async function SiteFooter() {
  const settings = await getPublicSiteSettings();

  return (
    <footer className="mt-20 border-t border-white/70 bg-[#f0f7f6]">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <div className="space-y-1">
              <p className="text-3xl leading-none text-secondary">
                {settings.companyName}
              </p>
              <p className="text-[0.72rem] font-medium text-muted">
                {siteConfig.subtitle}
              </p>
            </div>
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
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted">
            ნავიგაცია
          </p>
          <div className="grid gap-3">
            {filteredMainNavigation.map((item) => (
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
          <p className="text-sm font-semibold text-muted">
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
        </div>
      </div>

      <div className="soft-divider" />

      <div className="container-shell flex flex-col gap-3 py-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} მედსერვისი. ყველა უფლება დაცულია.</p>
        <p>კერძო სამედიცინო კომპანია ბინაზე და ონლაინ მომსახურებით.</p>
      </div>
    </footer>
  );
}
