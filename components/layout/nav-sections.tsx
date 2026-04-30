"use client";

import Link from "next/link";
import { ChevronRight, Diamond } from "lucide-react";
import { Fragment, useId } from "react";
import { cn } from "@/lib/utils/cn";
import type { HeaderNavigationItem } from "@/types/domain";

export function getPathWithoutHash(href: string) {
  return href.split("#")[0] ?? href;
}

export function isActivePath(pathname: string, href: string) {
  const targetPath = getPathWithoutHash(href);
  return pathname === targetPath || (targetPath !== "/" && pathname.startsWith(targetPath));
}

export function getDropdownItems(item: HeaderNavigationItem) {
  return item.sections?.flatMap((section) => section.items) ?? [];
}

export function isHeaderNavigationItemActive(pathname: string, item: HeaderNavigationItem) {
  return (
    isActivePath(pathname, item.href) ||
    (item.matchHrefs?.some((href) => isActivePath(pathname, href)) ?? false) ||
    getDropdownItems(item).some((child) => isActivePath(pathname, child.href))
  );
}

export function NavSections({
  item,
  pathname,
  onNavigate,
  linkRole,
  linksContainerClassName,
  sectionClassName,
  sectionDividerClassName,
  sectionTitleClassName,
  linkClassName,
  activeLinkClassName,
}: {
  item: HeaderNavigationItem;
  pathname: string;
  onNavigate: () => void;
  linkRole?: "menuitem";
  linksContainerClassName?: string;
  sectionClassName?: string;
  sectionDividerClassName?: string;
  sectionTitleClassName?: string;
  linkClassName?: string;
  activeLinkClassName?: string;
}) {
  const sectionIdPrefix = useId();

  return (
    <div className={linksContainerClassName}>
      {item.sections?.map((section, index) => {
        const titleId = section.title ? `${sectionIdPrefix}-${index}` : undefined;

        return (
          <Fragment key={`${item.href}-${section.title ?? "section"}-${index}`}>
            {index > 0 ? (
              <div
                role={linkRole ? "separator" : undefined}
                className={cn("mx-2 my-2 h-px bg-border/80", sectionDividerClassName)}
              />
            ) : null}

            <div className={cn("space-y-1", sectionClassName)}>
              {section.title ? (
                <p
                  id={titleId}
                  className={cn(
                    "px-3.5 pt-1 text-[0.82rem] font-semibold tracking-[0.01em] text-secondary",
                    sectionTitleClassName,
                  )}
                >
                  {section.title}
                </p>
              ) : null}

              <div
                role={linkRole ? "group" : undefined}
                aria-labelledby={linkRole && titleId ? titleId : undefined}
              >
                {section.items.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    role={linkRole}
                    className={cn(
                      "block rounded-[0.85rem] px-3.5 py-3 text-sm leading-6 text-muted transition hover:bg-surface-muted hover:text-secondary",
                      isActivePath(pathname, child.href) && "bg-surface-muted text-secondary",
                      linkClassName,
                      isActivePath(pathname, child.href) && activeLinkClassName,
                    )}
                    onClick={onNavigate}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {child.href.startsWith('/specialties/') && (
                        <Diamond size={10} style={{ marginRight: '8px', flexShrink: 0 }} />
                      )}
                      {child.href.startsWith('/services#') && (
                        <ChevronRight size={14} style={{ marginRight: '8px', flexShrink: 0 }} />
                      )}
                      <span className="break-words">{child.label}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
