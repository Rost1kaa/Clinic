"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { headerNavigation } from "@/lib/constants/site";
import { cn } from "@/lib/utils/cn";
import type { HeaderNavigationItem } from "@/types/domain";

function getPathWithoutHash(href: string) {
  return href.split("#")[0] ?? href;
}

function isActivePath(pathname: string, href: string) {
  const targetPath = getPathWithoutHash(href);
  return pathname === targetPath || (targetPath !== "/" && pathname.startsWith(targetPath));
}

export function HeaderNavigation() {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  const navigationItems = useMemo(() => headerNavigation, []);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setExpandedGroups([]);
  }

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMobileMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  function toggleGroup(href: string) {
    setExpandedGroups((current) =>
      current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href],
    );
  }

  return (
    <div className="min-w-0">
      <nav className="hidden min-w-0 items-center justify-center lg:flex" aria-label="ძირითადი ნავიგაცია">
        <div className="min-w-0 max-w-full px-2 py-1">
          <div className="mx-auto w-fit">
            <div className="inline-flex items-center gap-1 rounded-full border border-border/80 bg-white/92 px-1.5 py-1 shadow-[0_14px_32px_rgba(8,46,48,0.08)] ring-1 ring-white/70 backdrop-blur-xl">
              {navigationItems.map((item) =>
                item.items?.length ? (
                  <NavDropdown key={item.href} item={item} />
                ) : (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      <div ref={menuRef} className="relative flex items-center justify-end lg:hidden">
        <button
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          className="inline-flex h-11 items-center gap-2.5 rounded-full border border-border bg-white/90 px-4 text-sm font-medium text-secondary shadow-sm backdrop-blur-sm transition hover:bg-white"
          onClick={() => {
            if (mobileMenuOpen) {
              closeMobileMenu();
              return;
            }

            setMobileMenuOpen(true);
          }}
        >
          <span className="whitespace-nowrap">მენიუ</span>
          {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>

        <div
          id="mobile-nav-panel"
          className={cn(
            "absolute right-0 top-full z-50 mt-3 w-[22rem] max-w-[calc(100vw-2rem)] transition duration-200 ease-out",
            mobileMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-1 opacity-0",
          )}
        >
          <div className="space-y-2 rounded-[1.8rem] border border-border bg-white/95 p-4 shadow-[0_24px_60px_rgba(8,46,48,0.14)] backdrop-blur-xl">
            {navigationItems.map((item) =>
              item.items?.length ? (
                <MobileDropdownGroup
                  key={item.href}
                  item={item}
                  expanded={expandedGroups.includes(item.href)}
                  pathname={pathname}
                  onToggle={() => toggleGroup(item.href)}
                  onNavigate={closeMobileMenu}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block rounded-[1.2rem] px-4 py-3 text-sm leading-6 text-muted transition hover:bg-surface-muted hover:text-secondary",
                    isActivePath(pathname, item.href) && "bg-surface-muted text-secondary",
                  )}
                  onClick={closeMobileMenu}
                >
                  <span className="block break-words">{item.label}</span>
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDropdownGroup({
  item,
  expanded,
  pathname,
  onToggle,
  onNavigate,
}: {
  item: HeaderNavigationItem;
  expanded: boolean;
  pathname: string;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const active =
    isActivePath(pathname, item.href) ||
    (item.items?.some((child) => isActivePath(pathname, child.href)) ?? false);

  return (
    <div className="rounded-[1.35rem] bg-surface-muted/55 p-1">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href={item.href}
          className={cn(
            "min-w-0 flex-1 rounded-[1rem] px-3.5 py-3 text-sm font-medium leading-6 text-secondary",
            active && "text-secondary",
          )}
          onClick={onNavigate}
        >
          <span className="block break-words">{item.label}</span>
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
          onClick={onToggle}
        >
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", expanded && "rotate-180")}
          />
        </button>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 ease-out",
          expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-1 px-2 pb-2 pt-1">
            {item.items?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-[1rem] px-3.5 py-2.5 text-sm leading-6 text-muted transition hover:bg-white hover:text-secondary",
                  isActivePath(pathname, child.href) && "bg-white text-secondary shadow-sm",
                )}
                onClick={onNavigate}
              >
                <span className="block break-words">{child.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
