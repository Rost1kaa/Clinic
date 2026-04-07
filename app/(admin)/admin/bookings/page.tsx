import Link from "next/link";
import { AdminField } from "@/components/admin/admin-field";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { updateBookingStatusAction } from "@/lib/actions/admin";
import { requireStaff } from "@/lib/auth/guard";
import { formatDateTime, formatMoney } from "@/lib/utils/format";

type Props = {
  searchParams: Promise<{
    service_type?: string;
    payment_method?: string;
    status?: string;
  }>;
};

export default async function AdminBookingsPage({ searchParams }: Props) {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return null;

  const { service_type, payment_method, status } = await searchParams;
  let query = context.supabase
    .from("bookings")
    .select(
      "id, reference_code, patient_full_name, service_type, booking_category, status, payment_method, payment_status, preferred_date, total_amount, internal_notes",
    )
    .order("preferred_date", { ascending: false })
    .limit(50);

  if (service_type) query = query.eq("service_type", service_type);
  if (payment_method) query = query.eq("payment_method", payment_method);
  if (status) query = query.eq("status", status);

  const { data: bookings } = await query;
  const totalBookings = bookings?.length ?? 0;
  const pendingBookings = bookings?.filter((booking) => booking.status === "pending").length ?? 0;
  const onlineBookings =
    bookings?.filter((booking) => booking.service_type === "online_consultation").length ?? 0;

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Bookings desk"
        title="ჯავშნები და პაციენტების ნაკადი"
        description="ფილტრაცია, სტატუსების განახლება და შიდა შენიშვნების მართვა ერთ დაცულ სამუშაო სივრცეში."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "შერჩეული ჩანაწერები",
            value: totalBookings,
            hint: "ფილტრის მიმდინარე შედეგი",
          },
          {
            label: "მოლოდინში",
            value: pendingBookings,
            hint: "დასტურების ან რეაგირების მოლოდინში",
          },
          {
            label: "ონლაინ ვიზიტები",
            value: onlineBookings,
            hint: "დისტანციური კონსულტაციების მოცულობა",
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
          <CardTitle>ფილტრი და ექსპორტი</CardTitle>
          <CardDescription>
            დააზუსტეთ ჩანაწერები სერვისის ფორმატის, გადახდის მეთოდის და სტატუსის მიხედვით.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 border-t border-border/70 pt-5">
          <form className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <AdminField
              label="სერვისის ფორმატი"
              description="აირჩიეთ ყველა ჩანაწერი ან კონკრეტული ვიზიტის ტიპი."
              htmlFor="service_type"
            >
              <Select id="service_type" name="service_type" defaultValue={service_type ?? ""}>
                <option value="">ყველა ფორმატი</option>
                <option value="home_visit">სახლში ვიზიტი</option>
                <option value="online_consultation">ონლაინ კონსულტაცია</option>
              </Select>
            </AdminField>

            <AdminField
              label="გადახდის მეთოდი"
              description="გაფილტრეთ ონლაინ ან ადგილზე გადასახდელი ვიზიტები."
              htmlFor="payment_method"
            >
              <Select
                id="payment_method"
                name="payment_method"
                defaultValue={payment_method ?? ""}
              >
                <option value="">ყველა გადახდა</option>
                <option value="online">ონლაინ</option>
                <option value="onsite">ადგილზე</option>
              </Select>
            </AdminField>

            <AdminField
              label="სტატუსი"
              description="მოიძიეთ ახალი, დადასტურებული ან დასრულებული ჩანაწერები."
              htmlFor="status"
            >
              <Select id="status" name="status" defaultValue={status ?? ""}>
                <option value="">ყველა სტატუსი</option>
                <option value="pending">pending</option>
                <option value="confirmed">confirmed</option>
                <option value="completed">completed</option>
                <option value="cancelled">cancelled</option>
                <option value="no_show">no_show</option>
              </Select>
            </AdminField>

            <div className="flex flex-wrap items-end gap-3 xl:justify-end">
              <Button type="submit" size="lg">
                გაფილტვრა
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link
                  href={`/api/admin/export/bookings?service_type=${service_type ?? ""}&payment_method=${payment_method ?? ""}&status=${status ?? ""}`}
                >
                  CSV ექსპორტი
                </Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>ბოლო ჯავშნები</CardTitle>
          <CardDescription>
            თითოეული ბარათიდან შეგიძლიათ სტატუსის კორექტირება და შიდა კომენტარის დამატება.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 border-t border-border/70 pt-5">
          {(bookings ?? []).length ? (
            (bookings ?? []).map((booking) => (
              <article
                key={booking.id}
                className="grid gap-5 rounded-[1.75rem] border border-border bg-white/85 p-5 shadow-sm lg:grid-cols-[minmax(0,1fr)_20rem]"
              >
                <div className="min-w-0 space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-2">
                      <p className="break-words text-lg font-semibold text-secondary">
                        {booking.patient_full_name}
                      </p>
                      <p className="text-sm text-muted">{booking.reference_code}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="neutral">{booking.booking_category}</Badge>
                      <Badge
                        variant={
                          booking.payment_status === "paid"
                            ? "primary"
                            : booking.payment_status === "onsite_pending"
                              ? "accent"
                              : "neutral"
                        }
                      >
                        {booking.payment_status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <div className="rounded-[1.25rem] border border-border/80 bg-surface-muted/50 p-4">
                      <p className="text-xs text-muted">ფორმატი</p>
                      <p className="mt-2 break-words text-sm font-medium text-secondary">
                        {booking.service_type}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-border/80 bg-surface-muted/50 p-4">
                      <p className="text-xs text-muted">ვიზიტის დრო</p>
                      <p className="mt-2 break-words text-sm font-medium text-secondary">
                        {formatDateTime(booking.preferred_date)}
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-border/80 bg-surface-muted/50 p-4">
                      <p className="text-xs text-muted">საფასური</p>
                      <p className="mt-2 break-words text-sm font-medium text-secondary">
                        {formatMoney(Number(booking.total_amount ?? 0))}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                    <span>გადახდა: {booking.payment_method}</span>
                    <span className="text-border-strong">•</span>
                    <span>მიმდინარე სტატუსი: {booking.status}</span>
                  </div>
                </div>

                <form
                  action={updateBookingStatusAction}
                  className="rounded-[1.5rem] border border-border/80 bg-surface-muted/55 p-4"
                >
                  <input type="hidden" name="booking_id" value={booking.id} />
                  <div className="space-y-4">
                    <AdminField label="სტატუსი" htmlFor={`status-${booking.id}`}>
                      <Select id={`status-${booking.id}`} name="status" defaultValue={booking.status}>
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="completed">completed</option>
                        <option value="cancelled">cancelled</option>
                        <option value="no_show">no_show</option>
                      </Select>
                    </AdminField>

                    <AdminField
                      label="შიდა შენიშვნა"
                      description="ეს ჩანაწერი მხოლოდ ადმინისტრაციული გუნდისთვის ჩანს."
                      htmlFor={`notes-${booking.id}`}
                    >
                      <Input
                        id={`notes-${booking.id}`}
                        name="internal_notes"
                        defaultValue={booking.internal_notes ?? ""}
                        placeholder="შიდა შენიშვნა"
                      />
                    </AdminField>

                    <AdminSubmitButton className="w-full justify-center" pendingLabel="ინახება...">
                      სტატუსის განახლება
                    </AdminSubmitButton>
                  </div>
                </form>
              </article>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-border bg-white/70 p-6 text-sm leading-6 text-muted">
              არჩეული ფილტრით ჯავშნები ვერ მოიძებნა.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
