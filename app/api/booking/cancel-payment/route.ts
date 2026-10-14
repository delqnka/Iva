import { NextResponse } from "next/server";

const engineUrl =
  process.env.NEXT_PUBLIC_ENGINE_URL?.trim() || "https://app.alternine.co";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    bookingId?: unknown;
  } | null;

  const bookingId = typeof body?.bookingId === "string" ? body.bookingId.trim() : "";
  if (!bookingId) {
    return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
  }

  const response = await fetch(`${engineUrl.replace(/\/$/, "")}/api/bookings/cancel-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId }),
    cache: "no-store"
  }).catch(() => null);

  if (!response) {
    return NextResponse.json({ error: "Cancel service unavailable" }, { status: 502 });
  }

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
