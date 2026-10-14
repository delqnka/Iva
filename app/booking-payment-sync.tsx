"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "./i18n";

type SyncState = "idle" | "syncing" | "paid" | "pending" | "error";

const copy = {
  bg: {
    syncing: "Потвърждаваме плащането със Stripe...",
    paid: "Плащането е потвърдено.",
    pending: "Плащането се обработва. Ако статусът не се обнови до няколко минути, свържи се със студиото.",
    error: "Не успяхме да обновим статуса веднага. Плащането ще бъде проверено автоматично."
  },
  en: {
    syncing: "Confirming the payment with Stripe...",
    paid: "Payment confirmed.",
    pending: "The payment is still processing. If the status does not update in a few minutes, contact the studio.",
    error: "We could not update the status immediately. The payment will be checked automatically."
  }
} as const;

export function BookingPaymentSync({ locale }: { locale: Locale }) {
  const params = useSearchParams();
  const [state, setState] = useState<SyncState>("idle");

  useEffect(() => {
    const bookingId = params.get("booking_id");
    if (!bookingId) return;

    setState("syncing");
    fetch("/api/booking/sync-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId })
    })
      .then((response) => response.json().catch(() => ({})))
      .then((data: { status?: string }) => {
        setState(data.status === "paid" ? "paid" : "pending");
      })
      .catch(() => setState("error"));
  }, [params]);

  if (state === "idle") return null;
  const text = copy[locale][state === "syncing" ? "syncing" : state === "paid" ? "paid" : state === "pending" ? "pending" : "error"];
  return <p className={`return-page__sync return-page__sync--${state}`}>{text}</p>;
}
