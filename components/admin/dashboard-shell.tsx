"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  LayoutDashboard,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { adminNavigation } from "@/lib/constants/site";
import { signOutAction } from "@/lib/actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

const navigationIcons = {
  "/admin": LayoutDashboard,
  "/admin/bookings": CalendarDays,
  "/admin/catalog": Sparkles,
  "/admin/news": Newspaper,
  "/admin/availability": Clock3,
  "/admin/settings": Settings,
} as const;

const pageMeta = {
  "/admin": {
    title: "Dashboard",
    description: "მთავარი ხედვა ჯავშნების, კონტენტის და ოპერაციული პროცესების სამართავად.",
  },
  "/admin/bookings": {
    title: "Bookings",
    description: "ფილტრაცია, სტატუსების განახლება და პაციენტის ჩანაწერების სწრაფი მართვა.",
  },
  "/admin/catalog": {
    title: "Catalog",
    description: "ექიმების, სერვისების, დიაგნოსტიკის და ლაბორატორიული კატალოგის ადმინისტრირება.",
  },
  "/admin/news": {
    title: "News",
    description: "კონტენტის დაგეგმვა, სტატიების გამოქვეყნება და ბრენდული კომუნიკაციის კონტროლი.",
  },
  "/admin/availability": {
    title: "Availability",
    description: "სლოტების დაგეგმვა, დატვირთვის ბალანსი და რესურსების მართვა.",
  },
  "/admin/settings": {
    title: "Settings",
    description: "ანგარიშის ინფორმაცია, პაროლი და ადმინისტრატორის პროფილის პარამეტრები.",
  },
} as const;

function initialsFromName(name: string) {
  const parts = name
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  if (!parts.length) {
    return "VA";
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

function roleLabelValue(roleLabel: string) {
  return roleLabel.replace(/_/g, " ");
}

export function DashboardShell({
  roleLabel,
  profileName,
  profileEmail,
  children,
}: {
  roleLabel: string;
  profileName: string;
  profileEmail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const currentPage = useMemo(() => {
    return (
      pageMeta[pathname as keyof typeof pageMeta] ?? {
        title: "Admin",
        description: "ადმინისტრაციული ხელსაწყოები მედსერვისი გუნდისთვის.",
      }
    );
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(115,204,198,0.16),transparent_24rem),linear-gradient(180deg,#f7fbfb_0%,#eef6f5_100%)]">
      {mobileSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-secondary/15 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      ) : null}

      <div className="mx-auto flex min-h-screen w-full max-w-[1680px]">
        <aside
          className={cn(
            "fixed inset-y-3 left-3 z-50 flex w-[19rem] max-w-[calc(100vw-1.5rem)] flex-col rounded-[2rem] border border-white/65 bg-white/90 p-4 shadow-[0_24px_80px_rgba(10,55,58,0.12)] backdrop-blur-xl transition-transform duration-200 lg:sticky lg:inset-y-auto lg:left-auto lg:top-3 lg:ml-3 lg:h-[calc(100vh-1.5rem)] lg:translate-x-0",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-[calc(100%+1rem)]",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <Link
              href="/admin"
              className="flex min-w-0 items-center gap-3"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-base font-bold text-white shadow-lg shadow-primary/20">
                V
              </div>
              <div className="min-w-0">
                <p className="truncate font-serif text-xl text-secondary">მედსერვისი</p>
                <p className="truncate text-xs uppercase tracking-[0.22em] text-muted">სამედიცინო ჯგუფი</p>
              </div>
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-white text-secondary lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 rounded-[1.75rem] border border-border/80 bg-surface-muted/70 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-sm font-semibold text-white">
                {initialsFromName(profileName)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-secondary">{profileName}</p>
                <p className="truncate text-sm text-muted">{profileEmail}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="accent">{roleLabelValue(roleLabel)}</Badge>
              <Badge variant="neutral">Secure staff access</Badge>
            </div>
          </div>

          <nav className="mt-6 grid gap-2">
            {adminNavigation.map((item) => {
              const Icon =
                navigationIcons[item.href as keyof typeof navigationIcons] ?? ShieldCheck;
              const isActive =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={cn(
                    "group flex min-w-0 items-center gap-3 rounded-[1.35rem] px-4 py-3 text-sm transition",
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/15"
                      : "text-muted hover:bg-surface-muted hover:text-secondary",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition",
                      isActive
                        ? "border-white/15 bg-white/10 text-white"
                        : "border-border bg-white text-secondary group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium">{item.label}</span>
                    <span
                      className={cn(
                        "block truncate text-xs",
                        isActive ? "text-white/75" : "text-muted",
                      )}
                    >
                      {item.description ?? "მართვა და განახლება"}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-4 w-4 shrink-0 transition",
                      isActive ? "text-white/80" : "text-muted/60 group-hover:text-primary",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 pt-6">
            <div className="rounded-[1.5rem] border border-border/70 bg-white/80 p-4 text-sm text-muted">
              <p className="font-medium text-secondary">Secure workspace</p>
              <p className="mt-1 leading-6">
                Supabase Auth session protected admin გარემო მედსერვისი გუნდისთვის.
              </p>
            </div>

            <form action={signOutAction}>
              <Button
                type="submit"
                variant="secondary"
                className="w-full justify-between rounded-[1.35rem] border-danger/15 bg-white px-4 py-6 text-secondary hover:border-danger/30 hover:text-danger"
              >
                <span className="inline-flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  გამოსვლა
                </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:pl-[0.75rem]">
          <header className="sticky top-0 z-30 border-b border-white/60 bg-background/80 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-white text-secondary lg:hidden"
                  onClick={() => setMobileSidebarOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </button>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">Admin</Badge>
                    <Badge variant="primary">{roleLabelValue(roleLabel)}</Badge>
                  </div>
                  <h1 className="mt-2 truncate font-serif text-3xl text-secondary sm:text-4xl">
                    {currentPage.title}
                  </h1>
                  <p className="mt-1 max-w-3xl break-words text-sm leading-6 text-muted sm:text-base">
                    {currentPage.description}
                  </p>
                </div>
              </div>

              <div className="hidden shrink-0 items-center gap-3 sm:flex">
                <Button asChild variant="secondary">
                  <Link href="/admin/settings">
                    <Settings className="h-4 w-4" />
                    პარამეტრები
                  </Link>
                </Button>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-sm font-semibold text-white">
                  {initialsFromName(profileName)}
                </div>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="min-w-0 space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
