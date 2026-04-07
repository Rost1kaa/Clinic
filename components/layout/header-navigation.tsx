"use client";

import Link from "next/link";
import { CalendarDays, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { Button } from "@/components/ui/button";
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

export function DesktopHeaderNavigation() {
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function clearCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function openDropdownMenu(href: string) {
    clearCloseTimer();
    setOpenDropdown(href);
  }

  function scheduleDropdownClose(href: string) {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown((current) => (current === href ? null : current));
      closeTimerRef.current = null;
    }, 140);
  }

  function toggleDropdownMenu(href: string) {
    clearCloseTimer();
    setOpenDropdown((current) => (current === href ? null : href));
  }

  useEffect(() => {
    if (!openDropdown) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <nav className="min-w-0" aria-label="ძირითადი ნავიგაცია">
      <div
        ref={desktopNavRef}
        className="inline-flex items-center gap-1 rounded-2xl border border-border/80 bg-white/90 p-1 shadow-[0_14px_32px_rgba(8,46,48,0.08)] backdrop-blur-xl"
      >
        {headerNavigation.map((item) =>
          item.items?.length ? (
            <NavDropdown
              key={item.href}
              item={item}
              open={openDropdown === item.href}
              onToggle={() => toggleDropdownMenu(item.href)}
              onClose={() => setOpenDropdown(null)}
              onHoverStart={() => openDropdownMenu(item.href)}
              onHoverEnd={() => scheduleDropdownClose(item.href)}
            />
          ) : (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ),
        )}
      </div>
    </nav>
  );
}

export function MobileHeaderNavigation() {
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

  function closeMenu() {
    setMenuOpen(false);
    setExpandedGroups([]);
  }

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  function toggleGroup(href: string) {
    setExpandedGroups((current) =>
      current.includes(href)
        ? current.filter((item) => item !== href)
        : [...current, href],
    );
  }

  return (
    <div ref={mobileMenuRef} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-panel"
        className="inline-flex h-11 items-center gap-2.5 rounded-xl border border-border bg-white/92 px-4 text-sm font-medium text-secondary shadow-sm backdrop-blur-sm transition hover:bg-white"
        onClick={() => setMenuOpen((current) => !current)}
      >
        <span className="whitespace-nowrap">მენიუ</span>
        {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>

      <div
        id="mobile-nav-panel"
        className={cn(
          "absolute right-0 top-full z-50 mt-3 w-80 max-w-[calc(100vw-2rem)] transition duration-200 ease-out",
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="space-y-2 rounded-[1.35rem] border border-border bg-white/96 p-4 shadow-[0_24px_60px_rgba(8,46,48,0.14)] backdrop-blur-xl">
          {headerNavigation.map((item) =>
            item.items?.length ? (
              <MobileDropdownGroup
                key={item.href}
                item={item}
                pathname={pathname}
                expanded={expandedGroups.includes(item.href)}
                onToggle={() => toggleGroup(item.href)}
                onNavigate={closeMenu}
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-[0.95rem] px-4 py-3 text-sm leading-6 text-muted transition hover:bg-surface-muted hover:text-secondary",
                  isActivePath(pathname, item.href) && "bg-surface-muted text-secondary",
                )}
                onClick={closeMenu}
              >
                <span className="block break-words">{item.label}</span>
              </Link>
            ),
          )}

          <div className="pt-2">
            <Button asChild className="w-full rounded-xl">
              <Link href="/booking" onClick={closeMenu}>
                <CalendarDays className="h-4 w-4" />
                დაჯავშნა
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileDropdownGroup({
  item,
  pathname,
  expanded,
  onToggle,
  onNavigate,
}: {
  item: HeaderNavigationItem;
  pathname: string;
  expanded: boolean;
  onToggle: () => void;
  onNavigate: () => void;
}) {
  const active =
    isActivePath(pathname, item.href) ||
    (item.items?.some((child) => isActivePath(pathname, child.href)) ?? false);

  return (
    <div className="rounded-[1.05rem] bg-surface-muted/60 p-1">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href={item.href}
          className={cn(
            "min-w-0 flex-1 rounded-[0.85rem] px-3.5 py-3 text-sm font-medium leading-6 text-secondary",
            active && "text-secondary",
          )}
          onClick={onNavigate}
        >
          <span className="block break-words">{item.label}</span>
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-white hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
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
                  "block rounded-[0.85rem] px-3.5 py-2.5 text-sm leading-6 text-muted transition hover:bg-white hover:text-secondary",
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
