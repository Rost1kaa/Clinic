import { NextResponse } from "next/server";
import { getOnlinePaymentGateway } from "@/lib/payments/registry";
import { getCatalogData } from "@/lib/data/public";
import { bookingRequestSchema } from "@/lib/schemas/booking";
import { assertTrustedOrigin } from "@/lib/security/csrf";
import { bookingRateLimiter } from "@/lib/security/rate-limit";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/utils/env";
import { absoluteUrl } from "@/lib/utils/metadata";

type RpcBookingResponse = {
  booking_id: string;
  reference_code: string;
  payment_status: "pending" | "paid" | "failed" | "onsite_pending" | "refunded";
  booking_status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show";
  total_amount: number | string;
};

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() ?? "unknown";
}

function mapBookingErrorMessage(message: string) {
  if (message.includes("Selected time slot")) {
    return "არჩეული დრო უკვე დაკავებულია. გთხოვთ აირჩიოთ სხვა სლოტი.";
  }

  if (message.includes("Address is required")) {
    return "სახლში ვიზიტისთვის მისამართი სავალდებულოა.";
  }

  if (message.includes("Selected slot")) {
    return "არჩეული სლოტი ამ კომბინაციასთან აღარ შეესაბამება. განაახლეთ არჩევანი.";
  }

  if (message.includes("Could not resolve service pricing")) {
    return "სერვისის ღირებულების განსაზღვრა ვერ მოხერხდა. სცადეთ ხელახლა.";
  }

  return "ჯავშნის დაფიქსირება ვერ მოხერხდა. სცადეთ ხელახლა.";
}

export async function POST(request: Request) {
  try {
    assertTrustedOrigin(request);
  } catch {
    return NextResponse.json({ message: "არასანდო მოთხოვნის წყარო." }, { status: 403 });
  }

  const ip = getClientIp(request);
  const rate = bookingRateLimiter.check(ip);

  if (!rate.success) {
    return NextResponse.json(
      { message: "ცოტა ხნის წინ ბევრი მოთხოვნა გაიგზავნა. სცადეთ მოგვიანებით." },
      { status: 429 },
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = bookingRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "შეამოწმეთ შეყვანილი ველები." },
      { status: 400 },
    );
  }

  if (Date.now() - parsed.data.submittedAt < 1200) {
    return NextResponse.json(
      { message: "ფორმის გაგზავნა ზედმეტად სწრაფად მოხდა. სცადეთ ხელახლა." },
      { status: 400 },
    );
  }

  const catalog = await getCatalogData();
  const item =
    parsed.data.category === "specialty"
      ? catalog.services.find((service) => service.id === parsed.data.itemId)
      : parsed.data.category === "diagnostic"
        ? catalog.diagnostics.find((service) => service.id === parsed.data.itemId)
        : catalog.laboratoryServices.find((service) => service.id === parsed.data.itemId);

  if (!item) {
    return NextResponse.json(
      { message: "არჩეული სერვისი ვერ მოიძებნა." },
      { status: 400 },
    );
  }

  const slot = catalog.availabilitySlots.find(
    (candidate) =>
      candidate.id === parsed.data.slotId &&
      candidate.itemId === parsed.data.itemId &&
      candidate.category === parsed.data.category &&
      candidate.serviceType === parsed.data.serviceType,
  );

  if (!slot) {
    return NextResponse.json(
      { message: "არჩეული დრო აღარ არის ხელმისაწვდომი." },
      { status: 400 },
    );
  }

  if (!hasSupabasePublicEnv()) {
    return NextResponse.json(
      { message: "Booking backend ჯერ არ არის კონფიგურირებული. დაამატეთ Supabase გარემოს ცვლადები." },
      { status: 503 },
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ message: "Supabase კავშირი ვერ დამყარდა." }, { status: 503 });
  }

  const providerKey =
    parsed.data.paymentMethod === "online" ? getOnlinePaymentGateway().key : "onsite";

  const rpcPayload = {
    p_service_type: parsed.data.serviceType,
    p_booking_category: parsed.data.category,
    p_service_id: parsed.data.category === "specialty" ? item.id : null,
    p_diagnostic_id: parsed.data.category === "diagnostic" ? item.id : null,
    p_laboratory_service_id: parsed.data.category === "laboratory" ? item.id : null,
    p_doctor_id: slot.doctorId ?? null,
    p_slot_id: slot.id,
    p_patient_full_name: parsed.data.fullName,
    p_patient_phone: parsed.data.phone,
    p_patient_email: parsed.data.email,
    p_patient_address: parsed.data.address ?? null,
    p_symptoms_notes: parsed.data.notes ?? null,
    p_preferred_communication: parsed.data.preferredCommunication,
    p_payment_method: parsed.data.paymentMethod,
    p_provider_key: providerKey,
    p_submitted_ip: ip === "unknown" ? null : ip,
    p_user_agent: request.headers.get("user-agent"),
    p_metadata: {
      source: "website",
      selected_item_id: parsed.data.itemId,
    },
  };

  const { data, error } = await supabase.rpc("create_booking", rpcPayload);

  if (error) {
    return NextResponse.json(
      { message: mapBookingErrorMessage(error.message) },
      { status: 400 },
    );
  }

  const record = (Array.isArray(data) ? data[0] : data) as RpcBookingResponse | null;

  if (!record) {
    return NextResponse.json(
      { message: "ჯავშანი ვერ დაფიქსირდა. სცადეთ ხელახლა." },
      { status: 500 },
    );
  }

  if (parsed.data.paymentMethod === "online") {
    const gateway = getOnlinePaymentGateway();
    const intent = await gateway.createIntent({
      bookingId: record.booking_id,
      referenceCode: record.reference_code,
      amount: Number(record.total_amount ?? 0),
      currency: "GEL",
      returnUrl: absoluteUrl(`/booking/confirmation/${record.reference_code}`),
      cancelUrl: absoluteUrl(`/booking/confirmation/${record.reference_code}?payment=cancelled`),
    });

    const { error: attachError } = await supabase.rpc("attach_payment_intent", {
      p_booking_id: record.booking_id,
      p_reference_code: record.reference_code,
      p_provider_key: intent.providerKey,
      p_external_payment_id: intent.externalPaymentId,
      p_redirect_url: intent.redirectUrl,
      p_raw_response: intent.rawResponse,
    });

    if (attachError) {
      return NextResponse.json(
        { message: "გადახდის ინიციალიზაცია ვერ მოხერხდა." },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    {
      reference: record.reference_code,
      nextUrl: `/booking/confirmation/${record.reference_code}`,
    },
    { status: 201 },
  );
}
