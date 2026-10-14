"use client";

import type React from "react";
import { useState } from "react";
import { localizedPath, type Locale } from "./i18n";

type PackageCheckoutButtonProps = {
  packageId: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
};

const engineUrl =
  process.env.NEXT_PUBLIC_ENGINE_URL?.trim() || "https://app.alternine.co";
const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG?.trim() || "salon";
const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

export function PackageCheckoutButton({
  packageId,
  locale,
  children,
  className = ""
}: PackageCheckoutButtonProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function startCheckout() {
    if (busy) return;
    setBusy(true);
    setError("");

    try {
      const siteUrl = window.location.origin;
      const response = await fetch(
        `${engineUrl.replace(/\/$/, "")}/api/public/v1/salons/${encodeURIComponent(
          salonSlug
        )}/package-checkout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { "X-API-Key": apiKey } : {})
          },
          body: JSON.stringify({
            packageDefinitionId: packageId,
            successUrl: `${siteUrl}${localizedPath(locale, "/booking/success")}?package_id=${encodeURIComponent(packageId)}`,
            cancelUrl: `${siteUrl}${localizedPath(locale, "/booking/cancel")}?package_id=${encodeURIComponent(packageId)}`
          })
        }
      );
      const data = (await response.json().catch(() => ({}))) as {
        checkoutUrl?: string;
        error?: string;
      };

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(
          data.error ??
            (locale === "bg"
              ? "Плащането не можа да стартира."
              : "Payment could not be started.")
        );
      }

      window.location.href = data.checkoutUrl;
    } catch (err) {
      setBusy(false);
      setError(
        err instanceof Error
          ? err.message
          : locale === "bg"
            ? "Плащането не можа да стартира."
            : "Payment could not be started."
      );
    }
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-dark ${className}`.trim()}
        onClick={startCheckout}
        disabled={busy}
      >
        {busy ? (locale === "bg" ? "Зареждане..." : "Loading...") : children}
      </button>
      {error ? <p className="pricing-card__error">{error}</p> : null}
    </>
  );
}
