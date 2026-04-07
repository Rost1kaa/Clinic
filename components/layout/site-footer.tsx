import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/branding/brand-logo";
import { footerMainNavigation, footerNavigation } from "@/lib/constants/site";
import { getPublicSiteSettings } from "@/lib/data/public";
import { formatPhoneHref } from "@/lib/utils/format";

export async function SiteFooter() {
  const settings = await getPublicSiteSettings();

  return (
    <footer className="mt-20 border-t border-white/70 bg-[#f3faf4]">
      <div className="container-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Link href="/" className="inline-flex">
              <BrandLogo
                markClassName="h-[3.85rem] w-[3.85rem] drop-shadow-[0_14px_26px_rgba(42,200,62,0.16)] sm:h-[4rem] sm:w-[4rem]"
                titleClassName="text-[1.9rem] sm:text-[2.05rem]"
                subtitleClassName="text-[0.76rem] sm:text-[0.82rem]"
              />
            </Link>
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

        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold text-muted">ნავიგაცია</p>
          <div className="grid gap-3">
            {footerMainNavigation.map((item) => (
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
          <p className="text-sm font-semibold text-muted">სამართლებრივი</p>
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
        <p>© 2026 მედსერვისი. ყველა უფლება დაცულია.</p>
        <p>კერძო სამედიცინო კომპანია ბინაზე და ონლაინ მომსახურებით.</p>
      </div>
    </footer>
  );
}
