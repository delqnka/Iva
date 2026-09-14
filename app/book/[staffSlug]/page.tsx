import Link from "next/link";

type StaffMember = {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  avatarUrl: string | null;
  serviceIds: string[];
};

type StaffResponse = {
  staff?: StaffMember[];
};

const fallbackStaff: StaffMember[] = [
  { id: "yoanna", name: "Йоанна", slug: "yoanna", bio: null, avatarUrl: null, serviceIds: [] },
  { id: "iva", name: "Ива", slug: "iva", bio: null, avatarUrl: null, serviceIds: [] },
  { id: "jeni", name: "Жени", slug: "zheni", bio: null, avatarUrl: null, serviceIds: [] }
];

function normalizeSlug(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLocaleLowerCase("bg-BG")
    .replace(/\s+/g, "-");
}

async function getStaff(slug: string): Promise<StaffMember | null> {
  const engineUrl = (process.env.NEXT_PUBLIC_ENGINE_URL || "https://app.alternine.co").replace(/\/$/, "");
  const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG || "salon";
  const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY;

  try {
    const response = await fetch(
      `${engineUrl}/api/public/v1/salons/${encodeURIComponent(salonSlug)}/staff`,
      {
        cache: "no-store",
        headers: apiKey ? { "X-API-Key": apiKey } : undefined
      }
    );
    if (response.ok) {
      const data = (await response.json()) as StaffResponse;
      const staff = Array.isArray(data.staff) ? data.staff : [];
      const match = staff.find((member) => normalizeSlug(member.slug) === normalizeSlug(slug));
      if (match) return match;
    }
  } catch {
    // The booking API may be unavailable during local development; fall back to known trainers.
  }

  return fallbackStaff.find((member) => normalizeSlug(member.slug) === normalizeSlug(slug)) ?? null;
}

export default async function StaffProfilePage({
  params
}: {
  params: { staffSlug: string };
}) {
  const staff = await getStaff(params.staffSlug);

  if (!staff) {
    return (
      <main style={{ minHeight: "100vh", padding: "96px 20px", background: "#f5f2ea" }}>
        <section style={{ maxWidth: 720, margin: "0 auto", borderRadius: 28, background: "#fff", padding: 32 }}>
          <p style={{ margin: 0, fontSize: 14, letterSpacing: "0.16em", textTransform: "uppercase", color: "#7a7a70" }}>
            Reset Body Lab
          </p>
          <h1 style={{ margin: "12px 0", fontSize: 36, lineHeight: 1.05 }}>Треньорката не е намерена</h1>
          <Link href="/" style={{ color: "#111", fontWeight: 700 }}>Към началната страница</Link>
        </section>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", padding: "96px 20px", background: "#f5f2ea" }}>
      <section style={{ maxWidth: 760, margin: "0 auto", borderRadius: 32, background: "#fff", padding: 32, boxShadow: "0 24px 80px rgba(0,0,0,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ width: 112, height: 112, borderRadius: "50%", overflow: "hidden", background: "#e6e1d7", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {staff.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={staff.avatarUrl} alt={staff.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span style={{ fontSize: 36, fontWeight: 700, color: "#7a7a70" }}>{staff.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", color: "#7a7a70", fontWeight: 700 }}>
              Треньор
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: 44, lineHeight: 1.05 }}>Клас с {staff.name}</h1>
          </div>
        </div>

        <div style={{ marginTop: 28, borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 24 }}>
          <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: "#3d3d38" }}>
            {staff.bio?.trim() || "Скоро ще добавим кратко био и снимка за тази треньорка."}
          </p>
        </div>

        <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/#booking" style={{ borderRadius: 999, background: "#111", color: "#fff", padding: "13px 22px", textDecoration: "none", fontWeight: 700 }}>
            Запази час
          </Link>
          <Link href="/" style={{ borderRadius: 999, background: "#fff", color: "#111", padding: "13px 22px", textDecoration: "none", fontWeight: 700, border: "1px solid rgba(0,0,0,0.12)" }}>
            Обратно към сайта
          </Link>
        </div>
      </section>
    </main>
  );
}
