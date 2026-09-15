import Link from "next/link";
import { PrimaryBookingButton } from "../../booking-actions";
import { loadStaffMember } from "../../staff";

export default async function StaffProfilePage({
  params
}: {
  params: { staffSlug: string };
}) {
  const staff = await loadStaffMember(params.staffSlug);

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
          <PrimaryBookingButton>
            Запази час
          </PrimaryBookingButton>
          <Link href="/" style={{ borderRadius: 999, background: "#fff", color: "#111", padding: "13px 22px", textDecoration: "none", fontWeight: 700, border: "1px solid rgba(0,0,0,0.12)" }}>
            Обратно към сайта
          </Link>
        </div>
      </section>
    </main>
  );
}
