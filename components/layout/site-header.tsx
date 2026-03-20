import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { mainNavigation } from "@/lib/constants/site";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-3 py-4 xl:gap-4">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
            V
          </div>
          <div className="min-w-0">
            <p className="whitespace-nowrap font-serif text-xl text-secondary">Velora Care</p>
            <p className="whitespace-nowrap text-xs uppercase tracking-[0.26em] text-muted">
              Medical Group
            </p>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:block">
          <div className="mx-auto flex w-max items-center gap-1 rounded-full bg-surface-muted/80 p-1">
            {mainNavigation.slice(0, 8).map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 xl:gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href="tel:+995322585858" className="whitespace-nowrap">
              <Phone className="h-4 w-4" />
              +995 32 2 58 58 58
            </a>
          </Button>
          <Button asChild size="sm">
            <Link href="/booking" className="whitespace-nowrap">
              <CalendarDays className="h-4 w-4" />
              დაჯავშნა
            </Link>
          </Button>
        </div>

        <details className="lg:hidden">
          <summary className="cursor-pointer list-none rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-secondary">
            მენიუ
          </summary>
          <div className="absolute right-4 mt-3 w-72 max-w-[calc(100vw-2rem)] space-y-2 rounded-3xl border border-border bg-white p-4 shadow-2xl">
            {mainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm text-muted hover:bg-surface-muted hover:text-secondary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </header>
  );
}
