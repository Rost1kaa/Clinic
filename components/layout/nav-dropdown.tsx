"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { isHeaderNavigationItemActive, NavSections } from "@/components/layout/nav-sections";
import { cn } from "@/lib/utils/cn";
import type { HeaderNavigationItem } from "@/types/domain";

export function NavDropdown({
  item,
  open,
  onToggle,
  onClose,
  onHoverStart,
  onHoverEnd,
}: {
  item: HeaderNavigationItem;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const pathname = usePathname();
  const active = isHeaderNavigationItemActive(pathname, item);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div
        className={cn(
          "flex h-10 items-center rounded-xl px-1 text-[0.95rem] font-medium leading-none transition",
          open || active
            ? "bg-surface-muted text-secondary"
            : "text-muted hover:bg-surface-muted/80 hover:text-secondary",
        )}
        >
          <Link
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="inline-flex min-w-0 items-center whitespace-nowrap px-3.5"
            onClick={onClose}
          >
            {item.label}
          </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-haspopup="menu"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
          onClick={onToggle}
        >
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
        </div>

      <div
        role="menu"
        aria-label={item.label}
        className={cn(
          "absolute left-0 top-full z-50 w-80 max-w-[min(24rem,calc(100vw-2rem))] origin-top-left pt-2.5 transition duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.98] opacity-0",
        )}
      >
        <div className="overflow-hidden rounded-[1.15rem] border border-border bg-white/98 p-2 shadow-[0_24px_60px_rgba(8,46,48,0.14)] backdrop-blur-xl">
          <NavSections item={item} pathname={pathname} onNavigate={onClose} linkRole="menuitem" />
        </div>
      </div>
    </div>
  );
}
