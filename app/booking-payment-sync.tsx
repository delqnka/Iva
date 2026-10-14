"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function BookingPaymentSync() {
  const params = useSearchParams();

  useEffect(() => {
    const bookingId = params.get("booking_id");
    if (!bookingId) return;

    fetch("/api/booking/sync-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    }).catch(() => {});
  }, [params]);

  return null;
}
