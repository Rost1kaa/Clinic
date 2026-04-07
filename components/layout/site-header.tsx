import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { BrandLogo } from "@/components/branding/brand-logo";
import {
  DesktopHeaderNavigation,
  MobileHeaderNavigation,
} from "@/components/layout/header-navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 px-4 py-3.5 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6 lg:px-8 lg:py-4">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3.5">
          <BrandLogo
            className="min-w-0"
            markClassName="h-12 w-12 drop-shadow-[0_12px_24px_rgba(49,149,140,0.18)]"
            titleClassName="whitespace-nowrap text-[1.16rem] leading-[1.04] sm:text-[1.24rem]"
            subtitleClassName="whitespace-nowrap text-[0.68rem] leading-[1.15] sm:text-[0.72rem]"
            priority
          />
        </Link>

        <div className="hidden min-w-0 justify-center lg:flex">
          <DesktopHeaderNavigation />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <Button asChild size="sm" className="hidden shadow-lg shadow-primary/20 lg:inline-flex">
            <Link href="/booking" className="whitespace-nowrap">
              <CalendarDays className="h-4 w-4" />
              დაჯავშნა
            </Link>
          </Button>
          <MobileHeaderNavigation />
        </div>
      </div>
    </header>
  );
}
