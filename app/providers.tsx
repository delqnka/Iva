"use client";

import { BookingProvider } from "@clicka1/booking";
import "@clicka1/booking/styles.css";
import { getLocaleFromPathname, localizedPath } from "./i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const locale =
    typeof window !== "undefined"
      ? getLocaleFromPathname(window.location.pathname)
      : "bg";

  return (
    <BookingProvider
      salonSlug={process.env.NEXT_PUBLIC_SALON_SLUG}
      engineUrl={process.env.NEXT_PUBLIC_ENGINE_URL}
      apiKey={process.env.NEXT_PUBLIC_BOOKING_API_KEY}
      successUrl={`${siteUrl}${localizedPath(locale, "/booking/success")}`}
      cancelUrl={`${siteUrl}${localizedPath(locale, "/booking/cancel")}`}
      accentGradient="linear-gradient(135deg, #bfe8cd 0%, #7fc79a 100%)"
    >
      {children}
    </BookingProvider>
  );
}
