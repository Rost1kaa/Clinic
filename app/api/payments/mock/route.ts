import { NextResponse } from "next/server";
import { assertTrustedOrigin } from "@/lib/security/csrf";
import { createServiceRoleSupabaseClient } from "@/lib/supabase/service";

export async function POST(request: Request) {
  const redirectTo = (path: string) =>
    NextResponse.redirect(new URL(path, request.url));

  try {
    assertTrustedOrigin(request);
  } catch {
    return redirectTo("/booking");
  }

  const formData = await request.formData();
  const reference = String(formData.get("reference") ?? "");
  const status = String(formData.get("status") ?? "");
  const paymentStatus = status === "paid" ? "paid" : "failed";

  if (!reference) {
    return redirectTo("/booking");
  }

  const supabase = createServiceRoleSupabaseClient();

  if (!supabase) {
    return redirectTo(`/booking/confirmation/${reference}`);
  }

  const { data: booking } = await supabase
    .from("bookings")
    .select("id, reference_code")
    .eq("reference_code", reference)
    .single();

  if (!booking) {
    return redirectTo("/booking");
  }

  await supabase
    .from("payment_records")
    .update({
      status: paymentStatus,
      external_payment_id: `mock_${reference}`,
      raw_response: {
        simulated: true,
        status: paymentStatus,
      },
    })
    .eq("booking_id", booking.id);

  await supabase
    .from("bookings")
    .update({
      payment_status: paymentStatus,
    })
    .eq("id", booking.id);

  return redirectTo(`/booking/confirmation/${reference}?payment=${paymentStatus}`);
}
