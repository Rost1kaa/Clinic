import {
  createAvailabilitySlotAction,
  toggleAvailabilityStatusAction,
} from "@/lib/actions/admin";
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
import { requireStaff } from "@/lib/auth/guard";
import { formatDateTime } from "@/lib/utils/format";

export default async function AdminAvailabilityPage() {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return null;

  const [{ data: slots }, { data: services }, { data: diagnostics }, { data: labs }, { data: doctors }] =
    await Promise.all([
      context.supabase
        .from("availability_slots")
        .select(
          "id, category, service_mode, slot_start, slot_end, status, capacity, doctor_id, service_id, diagnostic_id, laboratory_service_id",
        )
        .order("slot_start", { ascending: true })
        .limit(50),
      context.supabase.from("services").select("id, name_ka").order("name_ka"),
      context.supabase.from("diagnostics").select("id, name_ka").order("name_ka"),
      context.supabase.from("laboratory_services").select("id, name_ka").order("name_ka"),
      context.supabase.from("doctors").select("id, full_name_ka").order("full_name_ka"),
    ]);

  const itemOptions = [
    ...(services ?? []).map((item) => ({ id: item.id, label: `[სპეციალისტი] ${item.name_ka}` })),
    ...(diagnostics ?? []).map((item) => ({ id: item.id, label: `[დიაგნოსტიკა] ${item.name_ka}` })),
    ...(labs ?? []).map((item) => ({ id: item.id, label: `[ლაბორატორია] ${item.name_ka}` })),
  ];

  const availableCount = slots?.filter((slot) => slot.status === "available").length ?? 0;
  const blockedCount = slots?.filter((slot) => slot.status === "blocked").length ?? 0;

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Schedule control"
        title="ხელმისაწვდომობის და სლოტების მართვა"
        description="დააგეგმეთ ახალი დროის ფანჯრები, მიუთითეთ რესურსი და სწრაფად დაბლოკეთ ან გახსენით არსებული სლოტები."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "აქტიური სლოტები",
            value: availableCount,
            hint: "ჯავშნისთვის ღია ჩანაწერები",
          },
          {
            label: "დაბლოკილი სლოტები",
            value: blockedCount,
            hint: "დროებით შეჩერებული ფანჯრები",
          },
          {
            label: "საერთო მოცულობა",
            value: slots?.length ?? 0,
            hint: "ბოლო 50 ჩანაწერის მიმოხილვა",
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
          <CardTitle>ახალი სლოტის დამატება</CardTitle>
          <CardDescription>
            აირჩიეთ კატეგორია, სერვისის ფორმატი და შესაბამისი დროის მონაკვეთი.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t border-border/70 pt-5">
          <form action={createAvailabilitySlotAction} className="grid gap-5 xl:grid-cols-3">
            <AdminField label="კატეგორია" htmlFor="availability-category">
              <Select id="availability-category" name="category" defaultValue="specialty">
                <option value="specialty">specialty</option>
                <option value="diagnostic">diagnostic</option>
                <option value="laboratory">laboratory</option>
              </Select>
            </AdminField>

            <AdminField label="ფორმატი" htmlFor="availability-mode">
              <Select id="availability-mode" name="service_mode" defaultValue="home_visit">
                <option value="home_visit">home_visit</option>
                <option value="online_consultation">online_consultation</option>
              </Select>
            </AdminField>

            <AdminField
              label="ტევადობა"
              description="რამდენი პაციენტის მიღება შეუძლია ამ სლოტს."
              htmlFor="availability-capacity"
            >
              <Input
                id="availability-capacity"
                name="capacity"
                type="number"
                defaultValue="1"
              />
            </AdminField>

            <AdminField
              label="მომსახურება"
              description="აირჩიეთ სპეციალისტი, დიაგნოსტიკა ან ლაბორატორიული სერვისი."
              className="xl:col-span-3"
              htmlFor="availability-item"
            >
              <Select id="availability-item" name="item_id">
                {itemOptions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </AdminField>

            <AdminField
              label="ექიმი"
              description="აირჩიეთ კონკრეტული ექიმი მხოლოდ საჭიროების შემთხვევაში."
              className="xl:col-span-3"
              htmlFor="availability-doctor"
            >
              <Select id="availability-doctor" name="doctor_id" defaultValue="">
                <option value="">მორიგე გუნდი / არჩევანის გარეშე</option>
                {doctors?.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.full_name_ka}
                  </option>
                ))}
              </Select>
            </AdminField>

            <AdminField label="დაწყება" htmlFor="slot_start">
              <Input id="slot_start" name="slot_start" type="datetime-local" />
            </AdminField>

            <AdminField label="დასრულება" htmlFor="slot_end">
              <Input id="slot_end" name="slot_end" type="datetime-local" />
            </AdminField>

            <div className="flex items-end justify-start xl:justify-end">
              <AdminSubmitButton className="w-full justify-center xl:w-auto" pendingLabel="ინახება...">
                სლოტის დამატება
              </AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>არსებული სლოტები</CardTitle>
          <CardDescription>
            მიმდინარე ხელმისაწვდომობა ქრონოლოგიურად. თითოეული ბარათიდან შეგიძლიათ სტატუსის
            გადართვა.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 border-t border-border/70 pt-5">
          {slots?.length ? (
            slots.map((slot) => (
              <article
                key={slot.id}
                className="flex flex-col gap-5 rounded-[1.75rem] border border-border bg-white/85 p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between"
              >
                <div className="min-w-0 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="neutral">{slot.category}</Badge>
                    <Badge variant="accent">{slot.service_mode}</Badge>
                    <Badge variant={slot.status === "available" ? "primary" : "neutral"}>
                      {slot.status}
                    </Badge>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted">ინტერვალი</p>
                      <p className="mt-2 break-words text-sm font-medium text-secondary">
                        {formatDateTime(slot.slot_start)} - {formatDateTime(slot.slot_end)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">ტევადობა</p>
                      <p className="mt-2 text-sm font-medium text-secondary">{slot.capacity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">დაკავშირებული რესურსი</p>
                      <p className="mt-2 break-words text-sm font-medium text-secondary">
                        {slot.service_id ??
                          slot.diagnostic_id ??
                          slot.laboratory_service_id ??
                          "საერთო რესურსი"}
                      </p>
                    </div>
                  </div>
                </div>

                <form action={toggleAvailabilityStatusAction} className="shrink-0">
                  <input type="hidden" name="slot_id" value={slot.id} />
                  <input
                    type="hidden"
                    name="next_status"
                    value={slot.status === "available" ? "blocked" : "available"}
                  />
                  <Button variant="secondary" size="lg" className="w-full justify-center lg:w-auto">
                    {slot.status === "available" ? "დაბლოკვა" : "გახსნა"}
                  </Button>
                </form>
              </article>
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-border bg-white/70 p-6 text-sm leading-6 text-muted">
              ჯერ არცერთი სლოტი არ არის დამატებული.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
