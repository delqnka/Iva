type SiteInfoPayload = {
  salon?: {
    name?: unknown;
    email?: unknown;
    phone?: unknown;
    city?: unknown;
    address?: unknown;
  };
};

export type SiteInfo = {
  salonName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function loadSiteInfo(): Promise<SiteInfo> {
  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL?.trim();
  const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG?.trim();
  const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

  const fallback = {
    salonName: "Reset Body Lab Pilates",
    email: "",
    phone: "",
    city: "",
    address: ""
  };

  if (!engineUrl || !salonSlug) return fallback;

  try {
    const response = await fetch(
      `${engineUrl.replace(/\/$/, "")}/api/public/v1/salons/${encodeURIComponent(
        salonSlug
      )}`,
      {
        cache: "no-store",
        headers: apiKey ? { "X-API-Key": apiKey } : undefined
      }
    );

    if (!response.ok) return fallback;

    const payload = (await response.json()) as SiteInfoPayload;
    const salon = payload.salon ?? {};

    return {
      salonName: normalizeString(salon.name) || fallback.salonName,
      email: normalizeString(salon.email),
      phone: normalizeString(salon.phone),
      city: normalizeString(salon.city),
      address: normalizeString(salon.address)
    };
  } catch {
    return fallback;
  }
}
