import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type {
  AvailabilitySlot,
  DiagnosticService,
  LaboratoryService,
  Service,
} from "@/types/domain";
import { formatDateTime, formatMoney } from "@/lib/utils/format";

type BookingItem = Service | DiagnosticService | LaboratoryService | null;

const serviceTypeLabels = {
  home_visit: "სახლში ვიზიტი",
  online_consultation: "ონლაინ კონსულტაცია",
} as const;

const categoryLabels = {
  specialty: "სპეციალისტი",
  diagnostic: "დიაგნოსტიკა",
  laboratory: "ლაბორატორია",
} as const;

const paymentMethodLabels = {
  online: "ონლაინ გადახდა",
  onsite: "ადგილზე გადახდა",
} as const;

export function BookingSummary({
  serviceType,
  category,
  item,
  slot,
  doctorName,
  paymentMethod,
}: {
  serviceType: "home_visit" | "online_consultation";
  category: "specialty" | "diagnostic" | "laboratory";
  item: BookingItem;
  slot?: AvailabilitySlot | null;
  doctorName?: string;
  paymentMethod: "online" | "onsite";
}) {
  return (
    <Card className="h-fit p-5 sm:p-6">
      <CardHeader className="space-y-4">
        <Badge variant="accent">ჯავშნის მიმოხილვა</Badge>
        <CardTitle>თქვენი არჩევანი</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 border-t border-border/70 pt-5 text-sm leading-6 text-muted">
        <div className="min-w-0 space-y-1.5">
          <p className="font-medium text-secondary">ფორმატი</p>
          <p className="break-words">{serviceTypeLabels[serviceType]}</p>
        </div>
        <div className="min-w-0 space-y-1.5">
          <p className="font-medium text-secondary">კატეგორია</p>
          <p className="break-words">{categoryLabels[category]}</p>
        </div>
        <div className="min-w-0 space-y-1.5">
          <p className="font-medium text-secondary">სერვისი</p>
          <p>{item?.name ?? "ჯერ არ არის არჩეული"}</p>
        </div>
        <div className="min-w-0 space-y-1.5">
          <p className="font-medium text-secondary">თარიღი და დრო</p>
          <p>{slot ? formatDateTime(slot.startsAt) : "აირჩიეთ ხელმისაწვდომი სლოტი"}</p>
        </div>
        {doctorName ? (
          <div className="min-w-0 space-y-1.5">
            <p className="font-medium text-secondary">ექიმი</p>
            <p className="break-words">{doctorName}</p>
          </div>
        ) : null}
        <div className="min-w-0 space-y-1.5">
          <p className="font-medium text-secondary">გადახდა</p>
          <p className="break-words">{paymentMethodLabels[paymentMethod]}</p>
        </div>
        <div className="rounded-[1.5rem] bg-surface-muted p-4 sm:p-5">
          <p className="font-medium text-secondary">სავარაუდო ღირებულება</p>
          <p className="mt-2 break-words text-2xl font-semibold text-secondary">
            {item ? formatMoney(item.price) : "აირჩიეთ სერვისი"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
