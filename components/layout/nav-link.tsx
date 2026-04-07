"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl px-4 text-[0.95rem] font-medium leading-none text-muted transition hover:bg-surface-muted/80 hover:text-secondary",
        active && "bg-surface-muted text-secondary",
      )}
    >
      {label}
    </Link>
  );
}
