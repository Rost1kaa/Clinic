import Link from "next/link";
import {
  CalendarDays,
  Clock3,
  Newspaper,
  Sparkles,
} from "lucide-react";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireStaff } from "@/lib/auth/guard";

const quickActions = [
  {
    href: "/admin/bookings",
    label: "Bookings",
    description: "ჯავშნების კონტროლი და სტატუსების განახლება",
    icon: CalendarDays,
  },
  {
    href: "/admin/catalog",
    label: "Catalog",
    description: "ექიმები, სერვისები, დიაგნოსტიკა და ლაბორატორია",
    icon: Sparkles,
  },
  {
    href: "/admin/news",
    label: "News",
    description: "სტატიების შექმნა და გამოქვეყნება",
    icon: Newspaper,
  },
  {
    href: "/admin/availability",
    label: "Availability",
    description: "თავისუფალი სლოტების დაგეგმვა",
    icon: Clock3,
  },
] as const;

export default async function AdminHomePage() {
  const context = await requireStaff();

  if (context.requiresSetup) {
    return null;
  }

  const [
    { count: bookingsCount },
    { count: publishedNewsCount },
    { count: slotsCount },
  ] = await Promise.all([
    context.supabase.from("bookings").select("*", { count: "exact", head: true }),
    context.supabase
      .from("news_posts")
      .select("*", { count: "exact", head: true })
      .eq("is_published", true),
    context.supabase
      .from("availability_slots")
      .select("*", { count: "exact", head: true })
      .eq("status", "available"),
  ]);

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Operations overview"
        title={`გამარჯობა, ${context.profile?.full_name ?? "Admin"}`}
        description="აქედან შეგიძლიათ მართოთ ჯავშნები, კონტენტი, სერვისები და ხელმისაწვდომი სლოტები ერთი დაცული ადმინისტრაციული გარემოდან."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "აქტიური ჯავშნები",
            value: bookingsCount ?? 0,
            hint: "ყველა ჩანაწერი ერთ სივრცეში",
          },
          {
            label: "გამოქვეყნებული სიახლეები",
            value: publishedNewsCount ?? 0,
            hint: "საჯარო კონტენტის მიმდინარე მოცულობა",
          },
          {
            label: "ხელმისაწვდომი სლოტები",
            value: slotsCount ?? 0,
            hint: "დაჯავშნისთვის გახსნილი დროის ფანჯრები",
          },
        ].map((item) => (
          <Card key={item.label} className="p-6">
            <CardContent className="space-y-3">
              <Badge variant="neutral">{item.label}</Badge>
              <p className="font-serif text-4xl text-secondary">{item.value}</p>
              <p className="text-sm leading-6 text-muted">{item.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>სწრაფი მოქმედებები</CardTitle>
          <p className="text-sm leading-6 text-muted">
            ყველაზე ხშირად გამოყენებული ადმინისტრაციული ბლოკები სწრაფი გადასვლებისთვის.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 border-t border-border/70 pt-5 md:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group rounded-[1.6rem] border border-border bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white hover:shadow-[0_18px_40px_rgba(10,55,58,0.08)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/8 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold text-secondary">{item.label}</p>
                <p className="mt-2 break-words text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
