"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { HeaderNavigationItem } from "@/types/domain";

const OPEN_DELAY_MS = 90;
const CLOSE_DELAY_MS = 140;

function getPathWithoutHash(href: string) {
  return href.split("#")[0] ?? href;
}

function isActivePath(pathname: string, href: string) {
  const targetPath = getPathWithoutHash(href);
  return pathname === targetPath || (targetPath !== "/" && pathname.startsWith(targetPath));
}

export function NavDropdown({ item }: { item: HeaderNavigationItem }) {
  const pathname = usePathname();
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState({
    left: 0,
    top: 0,
    width: 304,
  });

  const isActive =
    isActivePath(pathname, item.href) ||
    (item.items?.some((child) => isActivePath(pathname, child.href)) ?? false);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function queueOpen() {
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
  }

  function queueClose() {
    clearTimer();
    timerRef.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  function toggleOpen() {
    clearTimer();
    setOpen((value) => !value);
  }

  function openImmediately() {
    clearTimer();
    setOpen(true);
  }

  useEffect(() => {
    return () => clearTimer();
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function updatePosition() {
      const rect = rootRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const viewportPadding = 16;
      const preferredWidth = 304;
      const width = Math.min(preferredWidth, window.innerWidth - viewportPadding * 2);
      const halfWidth = width / 2;
      const idealCenter = rect.left + rect.width / 2;
      const left = Math.min(
        Math.max(idealCenter, viewportPadding + halfWidth),
        window.innerWidth - viewportPadding - halfWidth,
      );

      setPanelPosition({
        left,
        top: rect.bottom + 12,
        width,
      });
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={queueOpen}
      onMouseLeave={queueClose}
    >
      <div
        className={cn(
          "flex items-center rounded-full text-sm font-medium transition",
          open || isActive
            ? "bg-white text-secondary shadow-sm"
            : "text-muted hover:bg-white/70 hover:text-secondary",
        )}
      >
        <Link
          href={item.href}
          className="whitespace-nowrap px-4 py-2"
          onFocus={openImmediately}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="menu"
          className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-surface-muted hover:text-secondary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)]"
          onClick={toggleOpen}
          onFocus={openImmediately}
        >
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </div>

      <div
        id={panelId}
        role="menu"
        aria-label={item.label}
        className={cn(
          "fixed left-0 top-0 z-50 -translate-x-1/2 transition duration-200 ease-out",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
        style={{
          left: panelPosition.left,
          top: panelPosition.top,
          width: panelPosition.width,
        }}
      >
        <div className="overflow-hidden rounded-[1.5rem] border border-border bg-white/95 p-2 shadow-[0_24px_60px_rgba(8,46,48,0.14)] backdrop-blur-xl">
          {item.items?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block min-w-0 rounded-[1rem] px-3 py-3 text-sm leading-6 text-muted transition hover:bg-surface-muted hover:text-secondary"
              onClick={() => setOpen(false)}
            >
              <span className="block break-words">{child.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
