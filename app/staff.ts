export type StaffMember = {
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

export const fallbackStaff: StaffMember[] = [
  {
    id: "yoanna",
    name: "Йоанна",
    slug: "yoanna",
    bio:
      "Йоанна води реформър класове с внимание към правилното движение, стабилността и спокойния ритъм на тренировката.",
    avatarUrl: null,
    serviceIds: []
  },
  {
    id: "iva",
    name: "Ива",
    slug: "iva",
    bio:
      "Ива работи с фокус върху техника, контрол и адаптиране на упражненията спрямо нивото на всеки клиент.",
    avatarUrl: null,
    serviceIds: []
  },
  {
    id: "zheni",
    name: "Жени",
    slug: "zheni",
    bio:
      "Жени преподава реформър пилатес и стречинг, като комбинира сила, мобилност и осъзнато движение.",
    avatarUrl: null,
    serviceIds: []
  }
];

export function normalizeStaffSlug(value: string): string {
  return decodeURIComponent(value)
    .trim()
    .toLocaleLowerCase("bg-BG")
    .replace(/\s+/g, "-");
}

export async function loadStaffMembers(): Promise<StaffMember[]> {
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
      const visibleStaff = staff
        .filter((member) => member.name?.trim())
        .map((member) => ({
          ...member,
          slug: member.slug || member.name
        }));

      if (visibleStaff.length > 0) return visibleStaff;
    }
  } catch {
    // The booking API may be unavailable during local development; fall back to known trainers.
  }

  return fallbackStaff;
}

export async function loadStaffMember(slug: string): Promise<StaffMember | null> {
  const staff = await loadStaffMembers();
  return staff.find((member) => normalizeStaffSlug(member.slug) === normalizeStaffSlug(slug)) ?? null;
}
