"use client";

import { BookingButton } from "@clicka1/booking";
import { bookingCardCopy, type Locale } from "./i18n";

export const primaryServiceId =
  !process.env.NEXT_PUBLIC_PRIMARY_SERVICE_ID ||
  ["pilates-reformer-50", "pilates-bed"].includes(process.env.NEXT_PUBLIC_PRIMARY_SERVICE_ID)
    ? "svc-msahydgc"
    : process.env.NEXT_PUBLIC_PRIMARY_SERVICE_ID;

export const matPilatesServiceId =
  process.env.NEXT_PUBLIC_MAT_SERVICE_ID?.trim() || "svc-mt7a168p";

export function PrimaryBookingButton({
  children = "Запази час",
  variant = "dark",
  className = "",
  service = primaryServiceId
}: {
  children?: React.ReactNode;
  variant?: "dark" | "light";
  className?: string;
  service?: string;
}) {
  return (
    <BookingButton
      service={service}
      className={`${variant === "dark" ? "btn btn-dark" : "btn btn-light"} ${className}`.trim()}
    >
      {children}
    </BookingButton>
  );
}

export function ServiceBookingCard() {
  return <LocalizedServiceBookingCard locale="bg" />;
}

export function LocalizedServiceBookingCard({ locale }: { locale: Locale }) {
  const copy = bookingCardCopy[locale];

  return (
    <div className="service-card" aria-label={copy.ariaLabel}>
      <span className="service-card__top">
        <span>{copy.topLabel}</span>
        <span>{copy.topMeta}</span>
      </span>
      <span className="service-card__facts">
        <span>{copy.duration}</span>
        <span>{copy.capacity}</span>
      </span>
      <span className="service-card__body">{copy.body}</span>
      <span className="service-card__bottom">
        <PrimaryBookingButton>{copy.cta}</PrimaryBookingButton>
      </span>
    </div>
  );
}
