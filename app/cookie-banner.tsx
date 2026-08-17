"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cookieBannerCopy, getLocaleFromPathname } from "./i18n";

export const COOKIE_CONSENT_KEY = "reset-body-lab-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = cookieBannerCopy[locale];

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
        <strong>{copy.title}</strong>
        <p>{copy.body}</p>
      </div>
      <div className="cookie-banner__actions">
        <button type="button" className="btn btn-light" onClick={() => saveConsent("rejected")}>
          {copy.reject}
        </button>
        <button type="button" className="btn btn-dark" onClick={() => saveConsent("accepted")}>
          {copy.accept}
        </button>
      </div>
    </aside>
  );
}
