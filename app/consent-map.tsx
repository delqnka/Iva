"use client";

import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY } from "./cookie-banner";

export function ConsentMap({
  title,
  src,
  heading,
  body,
  action
}: {
  title: string;
  src: string;
  heading: string;
  body: string;
  action: string;
}) {
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);

  useEffect(() => {
    const readConsent = () => {
      const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      setConsent(
        stored === "accepted" || stored === "rejected" ? stored : null
      );
    };

    readConsent();
    window.addEventListener("cookie-consent-change", readConsent);
    window.addEventListener("storage", readConsent);

    return () => {
      window.removeEventListener("cookie-consent-change", readConsent);
      window.removeEventListener("storage", readConsent);
    };
  }, []);

  if (consent === "accepted") {
    return (
      <div className="map-frame">
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="map-frame map-frame--placeholder">
      <div className="map-consent-card">
        <h3>{heading}</h3>
        <p>{body}</p>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => {
            window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
            window.dispatchEvent(
              new CustomEvent("cookie-consent-change", { detail: "accepted" })
            );
          }}
        >
          {action}
        </button>
      </div>
    </div>
  );
}
