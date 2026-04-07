"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMark } from "@/components/ui/icon-mark";
import { cn } from "@/lib/utils/cn";
import type { Specialty } from "@/types/domain";

export function SpecialtyNavTile({
  specialty,
  tabIndex,
}: {
  specialty: Specialty;
  tabIndex?: number;
}) {
  const pathname = usePathname();
  const href = `/specialties/${specialty.slug}`;
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      tabIndex={tabIndex}
      aria-label={specialty.name}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group block min-h-[16.9rem] w-[10.75rem] shrink-0 cursor-pointer rounded-[1.08rem] border bg-white p-3.5 shadow-[0_14px_28px_rgba(17,43,45,0.08)] transition-all duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[10px] hover:shadow-[0_28px_52px_rgba(17,43,45,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[11.35rem] sm:min-h-[17.5rem]",
        isActive
          ? "border-primary shadow-[0_18px_36px_rgba(42,200,62,0.16)] ring-1 ring-primary/18"
          : "border-slate-200/90 hover:border-primary/26",
      )}
    >
      <div className="rounded-[0.88rem] bg-primary p-[1.125rem]">
        <div className="flex aspect-square items-center justify-center">
          <IconMark name={specialty.icon} className="h-12 w-12 text-white sm:h-[3.35rem] sm:w-[3.35rem]" />
        </div>
      </div>

      <div className="flex min-h-[7.4rem] w-full items-center justify-center px-1.5 pb-3 pt-[1.2rem] sm:px-2">
        <h3 className="w-full break-words text-center text-[0.96rem] font-semibold leading-[1.34] text-secondary sm:text-[1.02rem]">
          {specialty.name}
        </h3>
      </div>
    </Link>
  );
}
