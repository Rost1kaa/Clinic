import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateTime, formatMoney } from "@/lib/utils/format";

export function BookingSuccessCard({
  referenceCode,
  bookingStatus,
  paymentStatus,
  paymentMethod,
  preferredDate,
  totalAmount,
  redirectUrl,
}: {
  referenceCode: string;
  bookingStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  preferredDate: string;
  totalAmount: number;
  redirectUrl?: string | null;
}) {
  return (
    <Card className="p-8">
      <CardHeader>
        <Badge variant="accent">ჯავშანი დაფიქსირებულია</Badge>
        <CardTitle>რეფერენს კოდი: {referenceCode}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-base leading-7 text-muted">
        <p>სასურველი დრო: {formatDateTime(preferredDate)}</p>
        <p>ჯავშნის სტატუსი: {bookingStatus}</p>
        <p>გადახდის სტატუსი: {paymentStatus}</p>
        <p>გადახდის მეთოდი: {paymentMethod}</p>
        <p>თანხა: {formatMoney(totalAmount)}</p>
        <div className="flex flex-wrap gap-3 pt-4">
          {redirectUrl ? (
            <Button asChild>
              <Link href={redirectUrl}>გადახდის გაგრძელება</Link>
            </Button>
          ) : null}
          <Button asChild variant="secondary">
            <Link href="/">მთავარ გვერდზე დაბრუნება</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
