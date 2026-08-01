"use client";

import { BookingButton, useBooking } from "@clicka1/booking";

const primaryServiceId =
  process.env.NEXT_PUBLIC_PRIMARY_SERVICE_ID || "pilates-reformer-50";

export function PrimaryBookingButton({
  children = "Запази час",
  variant = "dark"
}: {
  children?: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <BookingButton
      service={primaryServiceId}
      className={variant === "dark" ? "btn btn-dark" : "btn btn-light"}
    >
      {children}
    </BookingButton>
  );
}

export function ServiceBookingCard() {
  const { open, isReady } = useBooking();

  return (
    <button
      type="button"
      className="service-card"
      onClick={() => open(primaryServiceId)}
      aria-label="Резервирай Pilates reformer 50 минути"
    >
      <span className="service-card__top">
        <span>Reformer Pilates</span>
        <span>50 мин</span>
      </span>
      <span className="service-card__title">Запази своето легло</span>
      <span className="service-card__body">
        Избери свободен час директно в сайта. Местата са ограничени до 5
        reformer легла.
      </span>
      <span className="service-card__bottom">
        <span>5 легла</span>
        <span>{isReady ? "Резервирай" : "Зарежда..."}</span>
      </span>
    </button>
  );
}
