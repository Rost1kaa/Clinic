import { NextResponse } from "next/server";
import { getAdminContext } from "@/lib/auth/guard";

function escapeCsv(value: string | number | null | undefined) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET(request: Request) {
  const context = await getAdminContext();

  if (context.requiresSetup || !context.user || !["super_admin", "manager"].includes(context.roleKey ?? "")) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const serviceType = searchParams.get("service_type");
  const paymentMethod = searchParams.get("payment_method");
  const status = searchParams.get("status");

  let query = context.supabase
    .from("bookings")
    .select("reference_code, patient_full_name, service_type, booking_category, payment_method, payment_status, status, preferred_date, total_amount")
    .order("preferred_date", { ascending: false })
    .limit(500);

  if (serviceType) query = query.eq("service_type", serviceType);
  if (paymentMethod) query = query.eq("payment_method", paymentMethod);
  if (status) query = query.eq("status", status);

  const { data } = await query;

  const lines = [
    [
      "reference_code",
      "patient_full_name",
      "service_type",
      "booking_category",
      "payment_method",
      "payment_status",
      "status",
      "preferred_date",
      "total_amount",
    ].join(","),
    ...(data ?? []).map((row) =>
      [
        escapeCsv(row.reference_code),
        escapeCsv(row.patient_full_name),
        escapeCsv(row.service_type),
        escapeCsv(row.booking_category),
        escapeCsv(row.payment_method),
        escapeCsv(row.payment_status),
        escapeCsv(row.status),
        escapeCsv(row.preferred_date),
        escapeCsv(row.total_amount),
      ].join(","),
    ),
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="velora-bookings.csv"',
    },
  });
}
