import Link from "next/link";
import { CalendarDays, Phone } from "lucide-react";
import { HeaderNavigation } from "@/components/layout/header-navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-4 py-3.5 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6 lg:px-8 lg:py-4">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.35rem] bg-primary text-lg font-bold text-white shadow-lg shadow-primary/20">
            V
          </div>
          <div className="flex min-w-0 flex-col items-start justify-center gap-0.5">
            <p className="whitespace-nowrap font-serif text-[1.16rem] leading-[1.04] text-secondary sm:text-[1.24rem]">
              მედსერვისი
            </p>
            <p className="whitespace-nowrap text-[0.68rem] font-medium leading-[1.15] tracking-[0.14em] text-muted sm:text-[0.72rem]">
              სამედიცინო ჯგუფი
            </p>
          </div>
        </Link>

        <div className="min-w-0 lg:justify-self-stretch">
          <HeaderNavigation />
        </div>

        <div className="hidden shrink-0 items-center justify-end gap-2.5 lg:flex">
          <Button asChild variant="ghost" size="md" className="bg-white/55 shadow-sm hover:bg-white">
            <a href="tel:+995322585858" className="whitespace-nowrap">
              <Phone className="h-4 w-4" />
              +995 32 2 58 58 58
            </a>
          </Button>
          <Button asChild size="md" className="shadow-lg shadow-primary/20">
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
