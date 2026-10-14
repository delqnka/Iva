import { NextResponse } from "next/server";

const engineUrl =
  process.env.NEXT_PUBLIC_ENGINE_URL?.trim() || "https://app.alternine.co";
const salonSlug =
  process.env.NEXT_PUBLIC_SALON_SLUG?.trim() || "salon";
const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    bookingId?: unknown;
  } | null;

  const bookingId = typeof body?.bookingId === "string" ? body.bookingId.trim() : "";
  if (!bookingId) {
    return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
  }
  if (!apiKey) {
    return NextResponse.json({ error: "Missing booking API key" }, { status: 500 });
  }

  const response = await fetch(
    `${engineUrl.replace(/\/$/, "")}/api/public/v1/salons/${encodeURIComponent(salonSlug)}/booking-payment-sync`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey
      },
      body: JSON.stringify({ bookingId }),
      cache: "no-store"
    }
  ).catch(() => null);

  if (!response) {
    return NextResponse.json({ error: "Payment sync unavailable" }, { status: 502 });
  }

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
