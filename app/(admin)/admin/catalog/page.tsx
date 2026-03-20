import {
  createDiagnosticAction,
  createDoctorAction,
  createLaboratoryAction,
  createServiceAction,
  createSpecialtyAction,
} from "@/lib/actions/admin";
import { AdminField } from "@/components/admin/admin-field";
import { AdminPageIntro } from "@/components/admin/admin-page-intro";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { requireStaff } from "@/lib/auth/guard";

export default async function AdminCatalogPage() {
  const context = await requireStaff(["super_admin", "manager"]);
  if (context.requiresSetup) return null;

  const [{ data: specialties }, { data: services }, { data: diagnostics }, { data: labs }, { data: doctors }] =
    await Promise.all([
      context.supabase.from("specialties").select("id, name_ka, slug").order("sort_order"),
      context.supabase.from("services").select("id, name_ka, service_mode").order("sort_order"),
      context.supabase.from("diagnostics").select("id, name_ka").order("sort_order"),
      context.supabase.from("laboratory_services").select("id, name_ka").order("sort_order"),
      context.supabase.from("doctors").select("id, full_name_ka, title_ka").order("full_name_ka"),
    ]);

  return (
    <div className="space-y-6">
      <AdminPageIntro
        eyebrow="Catalog manager"
        title="ექიმები, სერვისები და სამედიცინო კატალოგი"
        description="მოამზადეთ ახალი სპეციალობები, ექიმები და მომსახურებები ისე, რომ საჯარო საიტი და booking flow ყოველთვის სინქრონში დარჩეს."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "სპეციალობები", value: specialties?.length ?? 0 },
          { label: "სერვისები", value: services?.length ?? 0 },
          { label: "დიაგნოსტიკა", value: diagnostics?.length ?? 0 },
          { label: "ექიმები", value: doctors?.length ?? 0 },
        ].map((item) => (
          <Card key={item.label} className="p-6">
            <CardContent className="space-y-3">
              <Badge variant="neutral">{item.label}</Badge>
              <p className="font-serif text-4xl text-secondary">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>სპეციალობის დამატება</CardTitle>
          <CardDescription>
            შექმენით ახალი მიმართულება, რომელიც გამოჩნდება როგორც საიტზე, ისე booking flow-ში.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t border-border/70 pt-5">
          <form action={createSpecialtyAction} className="grid gap-5 xl:grid-cols-2">
            <AdminField label="დასახელება" htmlFor="specialty-name">
              <Input id="specialty-name" name="name_ka" placeholder="მაგ: თერაპევტი" />
            </AdminField>
            <AdminField label="Icon key" htmlFor="specialty-icon">
              <Input id="specialty-icon" name="icon" placeholder="stethoscope" />
            </AdminField>
            <AdminField
              label="მოკლე აღწერა"
              className="xl:col-span-2"
              htmlFor="specialty-summary"
            >
              <Input
                id="specialty-summary"
                name="summary_ka"
                placeholder="მოკლე აღწერა, რომელიც ბარათზე გამოჩნდება"
              />
            </AdminField>
            <AdminField
              label="სრული აღწერა"
              className="xl:col-span-2"
              htmlFor="specialty-description"
            >
              <Textarea
                id="specialty-description"
                name="description_ka"
                placeholder="სერვისის სრული აღწერა"
                className="min-h-36"
              />
            </AdminField>
            <AdminField
              label="Care path"
              className="xl:col-span-2"
              htmlFor="specialty-care-path"
            >
              <Input
                id="specialty-care-path"
                name="care_path_ka"
                placeholder="მაგ: სახლში ვიზიტი და ონლაინ შეფასება"
              />
            </AdminField>
            <label className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-surface-muted/55 px-4 py-3 text-sm text-muted xl:col-span-2">
              <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
              გამორჩეულ სიაში ჩვენება
            </label>
            <div className="flex justify-end xl:col-span-2">
              <AdminSubmitButton pendingLabel="ინახება...">სპეციალობის დამატება</AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>სერვისის დამატება</CardTitle>
          <CardDescription>
            ახალი სახლში ვიზიტი ან ონლაინ კონსულტაცია, შესაბამისი სპეციალობითა და პარამეტრებით.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t border-border/70 pt-5">
          <form action={createServiceAction} className="grid gap-5 xl:grid-cols-3">
            <AdminField label="სპეციალობა" htmlFor="service-specialty">
              <Select id="service-specialty" name="specialty_id">
                {specialties?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_ka}
                  </option>
                ))}
              </Select>
            </AdminField>
            <AdminField label="ფორმატი" htmlFor="service-mode">
              <Select id="service-mode" name="service_mode" defaultValue="home_visit">
                <option value="home_visit">home_visit</option>
                <option value="online_consultation">online_consultation</option>
              </Select>
            </AdminField>
            <AdminField label="დასახელება" htmlFor="service-name">
              <Input id="service-name" name="name_ka" placeholder="სერვისის დასახელება" />
            </AdminField>
            <AdminField
              label="მოკლე აღწერა"
              className="xl:col-span-3"
              htmlFor="service-summary"
            >
              <Input
                id="service-summary"
                name="summary_ka"
                placeholder="მოკლე აღწერა ბარათისა და listing-ისთვის"
              />
            </AdminField>
            <AdminField
              label="სრული აღწერა"
              className="xl:col-span-3"
              htmlFor="service-description"
            >
              <Textarea
                id="service-description"
                name="description_ka"
                placeholder="სერვისის სრული აღწერა"
                className="min-h-36"
              />
            </AdminField>
            <AdminField label="ფასი" htmlFor="service-price">
              <Input id="service-price" name="price" type="number" step="0.01" placeholder="120" />
            </AdminField>
            <AdminField label="ხანგრძლივობა" htmlFor="service-duration">
              <Input id="service-duration" name="duration_minutes" type="number" placeholder="45" />
            </AdminField>
            <div className="space-y-3 rounded-[1.5rem] border border-border bg-surface-muted/55 p-4 xl:col-span-3">
              <p className="text-sm font-medium text-secondary">დამატებითი პარამეტრები</p>
              <div className="flex flex-wrap gap-3 text-sm text-muted">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="requires_address" className="h-4 w-4 rounded border-border" />
                  საჭიროა მისამართი
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="requires_video_link" className="h-4 w-4 rounded border-border" />
                  საჭიროა ვიდეო ბმული
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
                  გამორჩეული სერვისი
                </label>
              </div>
            </div>
            <div className="flex justify-end xl:col-span-3">
              <AdminSubmitButton pendingLabel="ინახება...">სერვისის დამატება</AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>დიაგნოსტიკის დამატება</CardTitle>
            <CardDescription>
              მართეთ კვლევები, მათი საფასური და სახლში ხელმისაწვდომობის სტატუსი.
            </CardDescription>
          </CardHeader>
          <CardContent className="border-t border-border/70 pt-5">
            <form action={createDiagnosticAction} className="grid gap-5">
              <AdminField label="დასახელება" htmlFor="diagnostic-name">
                <Input id="diagnostic-name" name="name_ka" placeholder="მაგ: ელექტროკარდიოგრაფია" />
              </AdminField>
              <AdminField label="მოკლე აღწერა" htmlFor="diagnostic-summary">
                <Input id="diagnostic-summary" name="summary_ka" placeholder="მოკლე აღწერა" />
              </AdminField>
              <AdminField label="სრული აღწერა" htmlFor="diagnostic-description">
                <Textarea id="diagnostic-description" name="description_ka" placeholder="სრული აღწერა" />
              </AdminField>
              <div className="grid gap-5 md:grid-cols-2">
                <AdminField label="ფასი" htmlFor="diagnostic-price">
                  <Input
                    id="diagnostic-price"
                    name="price"
                    type="number"
                    step="0.01"
                    placeholder="55"
                  />
                </AdminField>
                <AdminField label="ხანგრძლივობა" htmlFor="diagnostic-duration">
                  <Input
                    id="diagnostic-duration"
                    name="duration_minutes"
                    type="number"
                    placeholder="30"
                  />
                </AdminField>
              </div>
              <div className="flex flex-wrap gap-3 rounded-[1.5rem] border border-border bg-surface-muted/55 p-4 text-sm text-muted">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="home_available" className="h-4 w-4 rounded border-border" />
                  სახლში ხელმისაწვდომი
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
                  გამორჩეული ბლოკი
                </label>
              </div>
              <div className="flex justify-end">
                <AdminSubmitButton pendingLabel="ინახება...">დიაგნოსტიკის დამატება</AdminSubmitButton>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>ლაბორატორიის დამატება</CardTitle>
            <CardDescription>
              შექმენით ანალიზის ახალი პაკეტი კატეგორიით, საფასურით და შესრულების პარამეტრებით.
            </CardDescription>
          </CardHeader>
          <CardContent className="border-t border-border/70 pt-5">
            <form action={createLaboratoryAction} className="grid gap-5">
              <AdminField label="დასახელება" htmlFor="lab-name">
                <Input id="lab-name" name="name_ka" placeholder="მაგ: ჰემატოლოგიური პანელი" />
              </AdminField>
              <AdminField label="კატეგორია" htmlFor="lab-category">
                <Input id="lab-category" name="category" placeholder="მაგ: Hematology" />
              </AdminField>
              <AdminField label="მოკლე აღწერა" htmlFor="lab-summary">
                <Input id="lab-summary" name="summary_ka" placeholder="მოკლე აღწერა" />
              </AdminField>
              <AdminField label="სრული აღწერა" htmlFor="lab-description">
                <Textarea id="lab-description" name="description_ka" placeholder="სრული აღწერა" />
              </AdminField>
              <div className="grid gap-5 md:grid-cols-2">
                <AdminField label="ფასი" htmlFor="lab-price">
                  <Input id="lab-price" name="price" type="number" step="0.01" placeholder="48" />
                </AdminField>
                <AdminField label="ხანგრძლივობა" htmlFor="lab-duration">
                  <Input id="lab-duration" name="duration_minutes" type="number" placeholder="20" />
                </AdminField>
              </div>
              <div className="flex flex-wrap gap-3 rounded-[1.5rem] border border-border bg-surface-muted/55 p-4 text-sm text-muted">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="home_available" className="h-4 w-4 rounded border-border" />
                  სახლში ხელმისაწვდომი
                </label>
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" name="featured" className="h-4 w-4 rounded border-border" />
                  გამორჩეული ბლოკი
                </label>
              </div>
              <div className="flex justify-end">
                <AdminSubmitButton pendingLabel="ინახება...">ლაბორატორიის დამატება</AdminSubmitButton>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card className="p-6 sm:p-7">
        <CardHeader className="space-y-3">
          <CardTitle>ექიმის დამატება</CardTitle>
          <CardDescription>
            დაამატეთ ექიმი შესაბამის სპეციალობასთან, გამოცდილებასთან და ენებთან ერთად.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-t border-border/70 pt-5">
          <form action={createDoctorAction} className="grid gap-5 xl:grid-cols-3">
            <AdminField label="სპეციალობა" htmlFor="doctor-specialty">
              <Select id="doctor-specialty" name="specialty_id">
                {specialties?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_ka}
                  </option>
                ))}
              </Select>
            </AdminField>
            <AdminField label="სახელი და გვარი" htmlFor="doctor-name">
              <Input id="doctor-name" name="full_name_ka" placeholder="სახელი და გვარი" />
            </AdminField>
            <AdminField label="ტიტული" htmlFor="doctor-title">
              <Input id="doctor-title" name="title_ka" placeholder="მაგ: კარდიოლოგი" />
            </AdminField>
            <AdminField label="ბიო" className="xl:col-span-3" htmlFor="doctor-bio">
              <Textarea id="doctor-bio" name="bio_ka" placeholder="ექიმის მოკლე პროფესიული ბიო" />
            </AdminField>
            <AdminField label="გამოცდილება (წლები)" htmlFor="doctor-experience">
              <Input
                id="doctor-experience"
                name="experience_years"
                type="number"
                placeholder="10"
              />
            </AdminField>
            <AdminField label="ენები" className="xl:col-span-2" htmlFor="doctor-languages">
              <Input
                id="doctor-languages"
                name="languages"
                placeholder="ქართული, ინგლისური"
              />
            </AdminField>
            <label className="flex items-center gap-3 rounded-[1.35rem] border border-border bg-surface-muted/55 px-4 py-3 text-sm text-muted xl:col-span-3">
              <input type="checkbox" name="is_featured" className="h-4 w-4 rounded border-border" />
              გამორჩეულ ექიმებში ჩვენება
            </label>
            <div className="flex justify-end xl:col-span-3">
              <AdminSubmitButton pendingLabel="ინახება...">ექიმის დამატება</AdminSubmitButton>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>სპეციალობები</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-border/70 pt-5 text-sm text-muted">
            {specialties?.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-border/70 bg-white/75 px-4 py-3">
                {item.name_ka}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>სერვისები</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-border/70 pt-5 text-sm text-muted">
            {services?.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-border/70 bg-white/75 px-4 py-3">
                {item.name_ka} • {item.service_mode}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="p-6 sm:p-7">
          <CardHeader className="space-y-3">
            <CardTitle>დიაგნოსტიკა, ლაბორატორია და ექიმები</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 border-t border-border/70 pt-5 text-sm text-muted">
            {diagnostics?.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-border/70 bg-white/75 px-4 py-3">
                {item.name_ka}
              </div>
            ))}
            {labs?.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-border/70 bg-white/75 px-4 py-3">
                {item.name_ka}
              </div>
            ))}
            {doctors?.map((item) => (
              <div key={item.id} className="rounded-[1.25rem] border border-border/70 bg-white/75 px-4 py-3">
                {item.full_name_ka} • {item.title_ka}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
