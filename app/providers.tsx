"use client";

import { BookingProvider } from "@clicka1/booking";
import "@clicka1/booking/styles.css";

export function Providers({ children }: { children: React.ReactNode }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  return (
    <BookingProvider
      salonSlug={process.env.NEXT_PUBLIC_SALON_SLUG}
      engineUrl={process.env.NEXT_PUBLIC_ENGINE_URL}
      successUrl={`${siteUrl}/booking/success`}
      cancelUrl={`${siteUrl}/booking/cancel`}
      accentGradient="linear-gradient(135deg, #bfe8cd 0%, #7fc79a 100%)"
    >
      {children}
    </BookingProvider>
  );
}
