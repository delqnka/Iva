"use client";

import { useEffect, useState } from "react";

export const COOKIE_CONSENT_KEY = "reset-body-lab-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem(COOKIE_CONSENT_KEY)
        : null;

    if (!stored) setVisible(true);
  }, []);

  function saveConsent(value: "accepted" | "rejected") {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Cookie consent">
      <div className="cookie-banner__copy">
        <strong>Бисквитки и външно съдържание</strong>
        <p>
          Използваме само необходимите технологии за работата на сайта. Картата
          и бъдещи външни услуги се зареждат след съгласие.
        </p>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn-light" onClick={() => saveConsent("rejected")}>
          Откажи
        </button>
        <button type="button" className="btn btn-dark" onClick={() => saveConsent("accepted")}>
          Приеми
        </button>
      </div>
    </aside>
  );
}
