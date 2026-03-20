import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex items-center justify-between gap-3 py-4 xl:gap-4">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
            V
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="whitespace-nowrap font-serif text-[1.12rem] leading-none text-secondary sm:text-xl">
              მედსერვისი
            </p>
            <p className="whitespace-nowrap text-[0.68rem] font-medium tracking-[0.16em] text-muted sm:text-[0.72rem]">
              სამედიცინო ჯგუფი
            </p>
          </div>
        </Link>

        <HeaderNavigation />

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
      </div>
    </header>
  );
}
