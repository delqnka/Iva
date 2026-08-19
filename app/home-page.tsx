import { Facebook, Instagram, MapPinned, Music4, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryPreview, OpenGalleryButton } from "./gallery-preview";
import { PrimaryBookingButton } from "./booking-actions";
import { homeCopy, isLocale, type Locale, localizedPath } from "./i18n";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type GalleryImage = {
  src: string;
  alt: string;
  version?: string;
};

type SiteContentBenefitItem = {
  id: string;
  title: string;
  text: string;
};

type SiteContentPriceItem = {
  id: string;
  name: string;
  price: string;
  text: string;
  serviceId: string;
};

type SiteContent = {
  benefits: {
    title: string;
    intro: string;
    items: SiteContentBenefitItem[];
  };
  reformer: {
    title: string;
    subtitle: string;
    body: string;
  };
  audience: {
    title: string;
    intro: string;
    items: string[];
    outro: string;
  };
  whyChooseUs: {
    title: string;
    intro: string;
    items: string[];
    outro: string;
  };
  pricing: {
    title: string;
    intro: string;
    items: SiteContentPriceItem[];
    note: string;
  };
  instructors: {
    title: string;
    subtitle: string;
    body: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    body: string;
  };
  contact: {
    title: string;
    subtitle: string;
    body: string;
  };
};

type PublicSalonPayload = {
  salon?: {
    name?: unknown;
    about?: unknown;
    about_en?: unknown;
    hero_title?: unknown;
    hero_title_en?: unknown;
    hero_subtitle?: unknown;
    hero_subtitle_en?: unknown;
    faq_items?: unknown;
    faq_items_en?: unknown;
    images?: unknown[];
    site_content?: unknown;
    site_content_en?: unknown;
    phone?: unknown;
    email?: unknown;
    city?: unknown;
    address?: unknown;
    working_hours?: unknown;
    working_hours_en?: unknown;
    google_maps_url?: unknown;
    instagram_username?: unknown;
    facebook_username?: unknown;
    tiktok_username?: unknown;
  };
};

type PageContent = {
  salonName: string;
  heroTitle: string;
  heroSubtitle: string;
  about: string;
  faqItems: FaqItem[];
  siteContent: SiteContent;
  galleryImages: GalleryImage[];
  phone: string;
  email: string;
  city: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  instagramUsername: string;
  facebookUsername: string;
  tiktokUsername: string;
};

function getFallbackFaqs(locale: Locale): FaqItem[] {
  if (locale === "en") {
    return [
      {
        id: "fallback-faq-1",
        question: "Is Reformer Pilates suitable for beginners?",
        answer:
          "Yes. The session can be adapted according to experience, strength, and mobility."
      },
      {
        id: "fallback-faq-2",
        question: "How long is one session?",
        answer: "The standard session at Reset Body Lab lasts 50 minutes."
      },
      {
        id: "fallback-faq-3",
        question: "How many places are there in one group?",
        answer:
          "The studio works with 5 reformer beds, which keeps the group intentionally small."
      },
      {
        id: "fallback-faq-4",
        question: "How do I reserve a session?",
        answer:
          "Use the booking button, choose an available time, and confirm your details directly on the site."
      }
    ];
  }

  return [
    {
      id: "fallback-faq-1",
      question: "Подходящ ли е Reformer Pilates за начинаещи?",
      answer:
        "Да. Тренировката може да се адаптира според опита, силата и мобилността на клиента."
    },
    {
      id: "fallback-faq-2",
      question: "Колко продължава една тренировка?",
      answer: "Стандартната процедура в Reset Body Lab е 50 минути."
    },
    {
      id: "fallback-faq-3",
      question: "Колко места има в една група?",
      answer:
        "Студиото работи с 5 reformer легла, което помага групата да остане малка."
    },
    {
      id: "fallback-faq-4",
      question: "Как да запазя час?",
      answer:
        "Натисни бутон за резервация, избери свободен час и потвърди данните си в сайта."
    }
  ];
}

function getFallbackGalleryImages(locale: Locale): GalleryImage[] {
  const copy = homeCopy[locale];
  return [
    {
      src: "/Studio Glide Pilates.jpeg",
      alt: copy.galleryAltStudio
    },
    {
      src: "/Mantyhose Çorap.jpeg",
      alt: copy.galleryAltDetail
    },
    {
      src: "/_.jpeg",
      alt: copy.galleryAltAtmosphere
    }
  ];
}

function defaultSiteContent(locale: Locale): SiteContent {
  if (locale === "en") {
    return {
      benefits: {
        title: "Benefits",
        intro: "A precise session that works the body without overcomplicating the experience.",
        items: [
          {
            id: "benefit-1",
            title: "Posture",
            text: "More stability through the centre and a cleaner body line."
          },
          {
            id: "benefit-2",
            title: "Strength",
            text: "Spring resistance builds tone with smooth, controlled effort."
          },
          {
            id: "benefit-3",
            title: "Mobility",
            text: "Stretch, coordination, and breath in one balanced rhythm."
          }
        ]
      },
      reformer: {
        title: "A focused reformer practice in a small group.",
        subtitle: "Reformer Pilates",
        body:
          "The session combines strength, control, stretch, and precise technique on a specialised reformer bed."
      },
      audience: {
        title: "Who is it for?",
        intro:
          "The class can be adapted to your current level and body.",
        items: [
          "Beginners",
          "Advanced clients",
          "People with back tension or a desk-based routine",
          "Anyone who wants better strength, flexibility, and posture"
        ],
        outro: ""
      },
      whyChooseUs: {
        title: "Why Reset Body Lab?",
        intro: "",
        items: ["Small groups", "Certified instructors", "Modern, calm studio"],
        outro: ""
      },
      pricing: {
        title: "A flexible start, without unnecessary complexity.",
        intro:
          "Packages are adjusted to the studio's current conditions. Open the booking flow for the most accurate information.",
        items: [
          {
            id: "price-1",
            name: "Single visit",
            price: "",
            text: "A good option for a first class or a flexible schedule.",
            serviceId: ""
          },
          {
            id: "price-2",
            name: "4-session package",
            price: "",
            text: "For a smooth start and a visible rhythm in your practice.",
            serviceId: ""
          },
          {
            id: "price-3",
            name: "8-session package",
            price: "",
            text: "For consistency, better posture, and a steadier result.",
            serviceId: ""
          }
        ],
        note: ""
      },
      instructors: {
        title: "Clear guidance and personal attention.",
        subtitle: "Practice",
        body:
          "At Reset Body Lab, the focus stays on correct movement, calm pacing, and clear instruction."
      },
      gallery: {
        title: "See the studio",
        subtitle: "",
        body: ""
      },
      contact: {
        title: "Contact",
        subtitle: "Book online or use the map to find the studio.",
        body: ""
      }
    };
  }

  return {
    benefits: {
      title: "Ползи",
      intro: "Шест ясни причини Reformer Pilates да се усеща едновременно ефективен, щадящ и устойчив като практика.",
      items: [
        {
          id: "benefit-1",
          title: "Повече сила и стабилност",
          text: "Упражненията активират не само големите мускулни групи, но и дълбоката мускулатура, която поддържа тялото стабилно. Резултатът е повече сила, контрол и увереност в движенията."
        },
        {
          id: "benefit-2",
          title: "По-добра гъвкавост и мобилност",
          text: "Плавните и контролирани движения помагат постепенно да увеличиш обхвата на движение и да освободиш натрупаното напрежение в тялото."
        },
        {
          id: "benefit-3",
          title: "Балансирана тренировка за цялото тяло",
          text: "На Reformer рядко работи само една мускулна група. Докато изпълняваш едно движение, тялото постоянно участва в поддържането на баланс и контрол – от корема и гърба до ръцете, краката и седалището."
        },
        {
          id: "benefit-4",
          title: "Ефективно натоварване без тежък удар върху ставите",
          text: "Reformer позволява мускулите да работят интензивно, докато движенията остават плавни и контролирани. Това го прави подходящ за различни нива на физическа подготовка и за хора, които предпочитат по-щадящ начин на трениране."
        },
        {
          id: "benefit-5",
          title: "Тренировка, която се адаптира към теб",
          text: "Съпротивлението на уреда може да се променя според упражнението, нивото и целите ти. Така една и съща тренировка може да бъде достъпна за начинаещ и достатъчно предизвикателна за напреднал."
        },
        {
          id: "benefit-6",
          title: "По-добра стойка и контрол над тялото",
          text: "Reformer Pilates развива усещането за позицията и движението на тялото. С времето това може да помогне за по-добра стойка, баланс и по-осъзнато движение и извън студиото."
        }
      ]
    },
    reformer: {
      title: "Какво е риформър пилатес?",
      subtitle: "Reformer Pilates",
      body:
        "Риформър пилатес съчетава контролирано движение и регулируемо съпротивление, за да натовари тялото ефективно, без излишен стрес върху ставите. Тренировките могат лесно да се адаптират както за начинаещи, така и за хора с повече опит."
    },
    audience: {
      title: "За кого е подходящо?",
      intro:
        "Класът може да се адаптира според твоето ниво и състояние.",
      items: [
        "Начинаещи",
        "Напреднали",
        "Хора с напрежение в гърба или заседнал режим",
        "Всеки, който иска повече сила, гъвкавост и по-добра стойка"
      ],
      outro: ""
    },
    whyChooseUs: {
      title: "Защо Reset Body Lab?",
      intro: "",
      items: ["Малки групи", "Сертифицирани инструктори", "Модерно и спокойно студио"],
      outro: ""
    },
    pricing: {
      title: "Гъвкаво начало, без излишна сложност.",
      intro:
        "Пакетите се настройват според актуалните условия на студиото. За най-точна информация отвори резервацията.",
      items: [
        {
          id: "price-1",
          name: "Единично посещение",
          price: "",
          text: "Подходящо за първи час или гъвкав график.",
          serviceId: ""
        },
        {
          id: "price-2",
          name: "Пакет 4 тренировки",
          price: "",
          text: "За плавен старт и видим ритъм в практиката.",
          serviceId: ""
        },
        {
          id: "price-3",
          name: "Пакет 8 тренировки",
          price: "",
          text: "За постоянство, по-добра стойка и устойчив резултат.",
          serviceId: ""
        }
      ],
      note: ""
    },
    instructors: {
      title: "Ясни инструкции и персонално внимание.",
      subtitle: "Практика",
      body:
        "В Reset Body Lab вниманието е насочено към правилно движение, спокойно темпо и ясни инструкции."
    },
    gallery: {
      title: "Виж студиото",
      subtitle: "",
      body: ""
    },
    contact: {
      title: "Контакти",
      subtitle: "Запази час онлайн или използвай картата, за да намериш студиото.",
      body: ""
    }
  };
}

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeStringList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const items = value.map((item) => normalizeString(item)).filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function normalizeBenefitItems(
  value: unknown,
  fallback: SiteContentBenefitItem[]
) {
  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const title = normalizeString(item.title);
      const text = normalizeString(item.text);
      if (!title && !text) return null;
      return {
        id: normalizeString(item.id) || `benefit-${index + 1}`,
        title,
        text
      };
    })
    .filter(Boolean) as SiteContentBenefitItem[];

  return items.length > 0 ? items : fallback;
}

function normalizePriceItems(value: unknown, fallback: SiteContentPriceItem[]) {
  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const name = normalizeString(item.name);
      const price = normalizeString(item.price);
      const text = normalizeString(item.text);
      const serviceId = normalizeString(
        item.serviceId ?? item.service ?? item.bookingServiceId ?? item.productId
      );
      if (!name && !price && !text && !serviceId) return null;
      return {
        id: normalizeString(item.id) || `price-${index + 1}`,
        name,
        price,
        text,
        serviceId
      };
    })
    .filter(Boolean) as SiteContentPriceItem[];

  return items.length > 0 ? items : fallback;
}

function normalizeFaqItems(value: unknown, fallback: FaqItem[]) {
  if (!Array.isArray(value)) return fallback;

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const question = normalizeString(item.question);
      const answer = normalizeString(item.answer);
      if (!question || !answer) return null;
      return {
        id: normalizeString(item.id) || `faq-${index + 1}`,
        question,
        answer
      };
    })
    .filter(Boolean) as FaqItem[];

  return items.length > 0 ? items : fallback;
}

function getPricingButtonLabel(item: SiteContentPriceItem, locale: Locale) {
  const singleVisitIds = new Set(["price-1", "single-visit", "single"]);
  const isSingleVisit =
    singleVisitIds.has(item.id) ||
    item.name.toLowerCase().includes(locale === "bg" ? "единично" : "single");

  if (isSingleVisit) {
    return locale === "bg" ? "Запази час" : "Book session";
  }

  return locale === "bg" ? "Купи пакет" : "Buy package";
}

function normalizeSiteContent(raw: unknown, fallback: SiteContent) {
  const content = isRecord(raw) ? raw : {};

  return {
    benefits: {
      title:
        normalizeString(
          content.benefits && isRecord(content.benefits)
            ? content.benefits.title
            : undefined
        ) || fallback.benefits.title,
      intro:
        normalizeString(
          content.benefits && isRecord(content.benefits)
            ? content.benefits.intro
            : undefined
        ) || fallback.benefits.intro,
      items: normalizeBenefitItems(
        content.benefits && isRecord(content.benefits)
          ? content.benefits.items
          : undefined,
        fallback.benefits.items
      )
    },
    reformer: {
      title:
        normalizeString(
          content.reformer && isRecord(content.reformer)
            ? content.reformer.title
            : undefined
        ) || fallback.reformer.title,
      subtitle:
        normalizeString(
          content.reformer && isRecord(content.reformer)
            ? content.reformer.subtitle
            : undefined
        ) || fallback.reformer.subtitle,
      body:
        normalizeString(
          content.reformer && isRecord(content.reformer)
            ? content.reformer.body
            : undefined
        ) || fallback.reformer.body
    },
    audience: {
      title:
        normalizeString(
          content.audience && isRecord(content.audience)
            ? content.audience.title
            : undefined
        ) || fallback.audience.title,
      intro:
        normalizeString(
          content.audience && isRecord(content.audience)
            ? content.audience.intro
            : undefined
        ) || fallback.audience.intro,
      items: normalizeStringList(
        content.audience && isRecord(content.audience)
          ? content.audience.items
          : undefined,
        fallback.audience.items
      ),
      outro:
        normalizeString(
          content.audience && isRecord(content.audience)
            ? content.audience.outro
            : undefined
        ) || fallback.audience.outro
    },
    whyChooseUs: {
      title:
        normalizeString(
          content.whyChooseUs && isRecord(content.whyChooseUs)
            ? content.whyChooseUs.title
            : undefined
        ) || fallback.whyChooseUs.title,
      intro:
        normalizeString(
          content.whyChooseUs && isRecord(content.whyChooseUs)
            ? content.whyChooseUs.intro
            : undefined
        ) || fallback.whyChooseUs.intro,
      items: normalizeStringList(
        content.whyChooseUs && isRecord(content.whyChooseUs)
          ? content.whyChooseUs.items
          : undefined,
        fallback.whyChooseUs.items
      ),
      outro:
        normalizeString(
          content.whyChooseUs && isRecord(content.whyChooseUs)
            ? content.whyChooseUs.outro
            : undefined
        ) || fallback.whyChooseUs.outro
    },
    pricing: {
      title:
        normalizeString(
          content.pricing && isRecord(content.pricing)
            ? content.pricing.title
            : undefined
        ) || fallback.pricing.title,
      intro:
        normalizeString(
          content.pricing && isRecord(content.pricing)
            ? content.pricing.intro
            : undefined
        ) || fallback.pricing.intro,
      items: normalizePriceItems(
        content.pricing && isRecord(content.pricing)
          ? content.pricing.items
          : undefined,
        fallback.pricing.items
      ),
      note:
        normalizeString(
          content.pricing && isRecord(content.pricing)
            ? content.pricing.note
            : undefined
        ) || fallback.pricing.note
    },
    instructors: {
      title:
        normalizeString(
          content.instructors && isRecord(content.instructors)
            ? content.instructors.title
            : undefined
        ) || fallback.instructors.title,
      subtitle:
        normalizeString(
          content.instructors && isRecord(content.instructors)
            ? content.instructors.subtitle
            : undefined
        ) || fallback.instructors.subtitle,
      body:
        normalizeString(
          content.instructors && isRecord(content.instructors)
            ? content.instructors.body
            : undefined
        ) || fallback.instructors.body
    },
    gallery: {
      title:
        normalizeString(
          content.gallery && isRecord(content.gallery)
            ? content.gallery.title
            : undefined
        ) || fallback.gallery.title,
      subtitle:
        normalizeString(
          content.gallery && isRecord(content.gallery)
            ? content.gallery.subtitle
            : undefined
        ) || fallback.gallery.subtitle,
      body:
        normalizeString(
          content.gallery && isRecord(content.gallery)
            ? content.gallery.body
            : undefined
        ) || fallback.gallery.body
    },
    contact: {
      title:
        normalizeString(
          content.contact && isRecord(content.contact)
            ? content.contact.title
            : undefined
        ) || fallback.contact.title,
      subtitle:
        normalizeString(
          content.contact && isRecord(content.contact)
            ? content.contact.subtitle
            : undefined
        ) || fallback.contact.subtitle,
      body:
        normalizeString(
          content.contact && isRecord(content.contact)
            ? content.contact.body
            : undefined
        ) || fallback.contact.body
    }
  };
}

function buildGalleryVersion(images: string[]) {
  const source = images.join("|");
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }
  return hash.toString(36);
}

function toGalleryImageSrc(src: string, version?: string) {
  if (!/^https?:\/\//i.test(src) || !version) return src;

  try {
    const url = new URL(src);
    url.searchParams.set("v", version);
    return url.toString();
  } catch {
    return src;
  }
}

function buildMapEmbedSrc({
  salonName,
  address,
  city
}: {
  salonName: string;
  address: string;
  city: string;
}) {
  const query = [salonName, address, city].filter(Boolean).join(", ");
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query || "Reset Body Lab Pilates"
  )}&output=embed`;
}

function toSocialUrl(
  platform: "instagram" | "facebook" | "tiktok",
  value: string
) {
  const normalized = value.trim();
  if (!normalized) return "";
  if (/^https?:\/\//i.test(normalized)) return normalized;
  const handle = normalized.replace(/^@/, "");
  if (platform === "instagram") return `https://instagram.com/${handle}`;
  if (platform === "facebook") return `https://facebook.com/${handle}`;
  return `https://tiktok.com/@${handle}`;
}

async function loadPageContent(locale: Locale): Promise<PageContent> {
  const fallbackSiteContent = defaultSiteContent(locale);
  const fallbackFaqs = getFallbackFaqs(locale);
  const fallbackGalleryImages = getFallbackGalleryImages(locale);
  const fallbackHeroTitle =
    locale === "en"
      ? "Reformer Pilates for strength, posture, and lightness."
      : "Reformer Pilates за сила, стойка и лекота.";
  const fallbackHeroSubtitle =
    locale === "en"
      ? "The session combines strength, control, stretch, and precise technique on a specialised reformer bed."
      : "Тренировката съчетава сила, контрол, разтягане и прецизна техника върху специализирано reformer легло.";

  const fallback = {
    salonName: "Reset Body Lab Pilates",
    heroTitle: fallbackHeroTitle,
    heroSubtitle: fallbackHeroSubtitle,
    about: fallbackSiteContent.reformer.body,
    faqItems: fallbackFaqs,
    siteContent: fallbackSiteContent,
    galleryImages: fallbackGalleryImages,
    phone: "",
    email: "",
    city: "",
    address: "",
    workingHours: "",
    googleMapsUrl: "",
    instagramUsername: "",
    facebookUsername: "",
    tiktokUsername: ""
  };

  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL?.trim();
  const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG?.trim();
  const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

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

    if (!response.ok) {
      throw new Error(`Salon fetch failed: ${response.status}`);
    }

    const payload = (await response.json()) as PublicSalonPayload;
    const salon = payload.salon ?? {};
    const siteContent = normalizeSiteContent(
      locale === "en" ? salon.site_content_en ?? salon.site_content : salon.site_content,
      fallbackSiteContent
    );

    const remoteImageUrls = Array.isArray(salon.images)
      ? salon.images
          .map((image) => normalizeString(image))
          .filter(Boolean)
          .slice(0, 6)
      : [];

    const version =
      remoteImageUrls.length > 0 ? buildGalleryVersion(remoteImageUrls) : "";
    const copy = homeCopy[locale];

    const galleryImages =
      remoteImageUrls.length > 0
        ? remoteImageUrls.map((src, index) => ({
            src: toGalleryImageSrc(src, version),
            alt: `${normalizeString(salon.name) || "Reset Body Lab"} ${copy.galleryImageAlt} ${index + 1}`,
            version
          }))
        : fallbackGalleryImages;

    return {
      salonName: normalizeString(salon.name) || fallback.salonName,
      heroTitle:
        normalizeString(
          locale === "en" ? salon.hero_title_en ?? salon.hero_title : salon.hero_title
        ) || fallbackHeroTitle,
      heroSubtitle:
        normalizeString(
          locale === "en"
            ? salon.hero_subtitle_en ?? salon.hero_subtitle
            : salon.hero_subtitle
        ) ||
        normalizeString(locale === "en" ? salon.about_en ?? salon.about : salon.about) ||
        fallbackHeroSubtitle,
      about:
        normalizeString(locale === "en" ? salon.about_en ?? salon.about : salon.about) ||
        siteContent.reformer.body,
      faqItems: normalizeFaqItems(
        locale === "en" ? salon.faq_items_en ?? salon.faq_items : salon.faq_items,
        fallbackFaqs
      ),
      siteContent,
      galleryImages,
      phone: normalizeString(salon.phone),
      email: normalizeString(salon.email),
      city: normalizeString(salon.city),
      address: normalizeString(salon.address),
      workingHours: normalizeString(
        locale === "en" ? salon.working_hours_en ?? salon.working_hours : salon.working_hours
      ),
      googleMapsUrl: normalizeString(salon.google_maps_url),
      instagramUsername: normalizeString(salon.instagram_username),
      facebookUsername: normalizeString(salon.facebook_username),
      tiktokUsername: normalizeString(salon.tiktok_username)
    };
  } catch {
    return fallback;
  }
}

export async function HomePage({ locale }: { locale: Locale }) {
  if (!isLocale(locale)) notFound();

  const copy = homeCopy[locale];
  const pageContent = await loadPageContent(locale);
  const mapSrc = buildMapEmbedSrc({
    salonName: pageContent.salonName,
    address: pageContent.address,
    city: pageContent.city
  });
  const contactLines = [
    pageContent.siteContent.contact.body,
    pageContent.address,
    pageContent.city,
    pageContent.phone,
    pageContent.email
  ].filter(Boolean);
  const footerContactLines =
    contactLines.length > 0
      ? contactLines
      : [`${copy.highlights[0].value} ${copy.highlights[0].label}`.trim()];
  const footerWorkingHours = `${copy.workingHoursLabel}: ${
    pageContent.workingHours || copy.workingHoursValue
  }`;
  const footerYear = new Date().getFullYear();
  const socialLinks = [
    {
      href: toSocialUrl("instagram", pageContent.instagramUsername),
      label: "Instagram",
      icon: <Instagram size={18} strokeWidth={2} />
    },
    {
      href: toSocialUrl("facebook", pageContent.facebookUsername),
      label: "Facebook",
      icon: <Facebook size={18} strokeWidth={2} />
    },
    {
      href: toSocialUrl("tiktok", pageContent.tiktokUsername),
      label: "TikTok",
      icon: <Music4 size={18} strokeWidth={2} />
    }
  ];
  const reformerSubtitle =
    locale === "bg" && pageContent.siteContent.reformer.subtitle.trim() === "Reformer Pilates"
      ? ""
      : pageContent.siteContent.reformer.subtitle;
  const reformerEmphasis =
    "Тренировките могат лесно да се адаптират както за начинаещи, така и за хора с повече опит.";
  const reformerBodyParts =
    locale === "bg" && pageContent.siteContent.reformer.body.includes(reformerEmphasis)
      ? pageContent.siteContent.reformer.body.split(reformerEmphasis)
      : null;

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label={`${pageContent.salonName} ${copy.headerHomeLabel}`}
        >
          <Image
            src="/reset-body-lab-logo.png"
            alt={pageContent.salonName}
            width={78}
            height={78}
            priority
          />
        </a>
        <nav aria-label={copy.localeLabel}>
          <a href="#reformer">{copy.nav.reformer}</a>
          <a href="#gallery">{copy.nav.gallery}</a>
          <a href="#pricing">{copy.nav.pricing}</a>
          <a href="#faq">{copy.nav.faq}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="header-actions">
          <div className="locale-switcher" aria-label={copy.localeLabel}>
            <Link
              href={localizedPath("bg")}
              className={locale === "bg" ? "is-active" : undefined}
            >
              BG
            </Link>
            <Link
              href={localizedPath("en")}
              className={locale === "en" ? "is-active" : undefined}
            >
              EN
            </Link>
          </div>
          <PrimaryBookingButton>
            <span className="header-booking-label">{copy.bookCta}</span>
          </PrimaryBookingButton>
        </div>
      </header>

      <section id="top" className="hero">
        <Image
          className="hero__image"
          src="/reset-body-lab-hero.jpg"
          alt={`${copy.heroImageAltPrefix} ${pageContent.salonName}`}
          fill
          sizes="100vw"
          priority
        />
        <div className="hero__copy">
          <p className="eyebrow">{pageContent.salonName}</p>
          <h1>{pageContent.heroTitle}</h1>
          <p>{pageContent.heroSubtitle}</p>
          <div className="hero__actions">
            <PrimaryBookingButton>{copy.bookCta}</PrimaryBookingButton>
            <OpenGalleryButton>
              {copy.learnMore}
            </OpenGalleryButton>
          </div>
        </div>
      </section>

      <section className="studio-facts" aria-label={copy.quickInfoLabel}>
        {copy.highlights.map((item, index) => {
          const isLocation = index === 0;
          const locationHref = pageContent.googleMapsUrl || "#contact";
          const factDetail = isLocation ? pageContent.address || item.detail : item.detail;
          const content = (
            <>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
              {factDetail ? <p>{factDetail}</p> : null}
            </>
          );

          return isLocation ? (
            <a
              key={item.label}
              className="studio-fact-card studio-fact-card--link"
              href={locationHref}
              target={pageContent.googleMapsUrl ? "_blank" : undefined}
              rel={pageContent.googleMapsUrl ? "noreferrer" : undefined}
            >
              <MapPinned
                className="studio-fact-card__pin"
                size={14}
                strokeWidth={2}
                aria-hidden="true"
              />
              {content}
            </a>
          ) : (
            <article key={item.label} className="studio-fact-card">
              {content}
            </article>
          );
        })}
      </section>

      <section className="vibe-title-section">
        <div className="vibe-title-mark" aria-hidden="true" />
        <div className="vibe-title-row">
          <span />
          <h2>{locale === "bg" ? "Открий тренировките" : "Discover the training"}</h2>
          <span />
        </div>
        <p>{locale === "bg" ? "по reformer pilates в Reset Body Lab" : "with reformer pilates at Reset Body Lab"}</p>
      </section>

      <section id="reformer" className="intro-section">
        <div className="split-section split-section--intro">
          <div className="split-section__media">
            <Image
              src={pageContent.galleryImages[0]?.src ?? "/Studio Glide Pilates.jpeg"}
              alt={pageContent.galleryImages[0]?.alt ?? pageContent.salonName}
              width={900}
              height={760}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="section-copy split-section__copy">
          {reformerSubtitle ? <p className="section-label">{reformerSubtitle}</p> : null}
          <h2>{pageContent.siteContent.reformer.title}</h2>
          <p>
            {reformerBodyParts ? (
              <>
                {reformerBodyParts[0]}
                <strong>{reformerEmphasis}</strong>
                {reformerBodyParts[1]}
              </>
            ) : (
              pageContent.siteContent.reformer.body
            )}
          </p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="split-section split-section--dark">
          <div className="section-copy split-section__copy">
            <h2>{locale === "bg" ? "Основните ползи включват:" : "Main benefits include:"}</h2>
            <ul className="check-list check-list--light">
              {pageContent.siteContent.benefits.items.map((benefit) => (
                <li key={benefit.id}>{benefit.title}</li>
              ))}
            </ul>
          </div>
          <div className="split-section__media">
            <Image
              src={pageContent.galleryImages[1]?.src ?? "/Mantyhose Çorap.jpeg"}
              alt={pageContent.galleryImages[1]?.alt ?? pageContent.salonName}
              width={900}
              height={760}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="details-section">
        <div className="split-section split-section--training">
          <div className="split-section__media">
            <Image
              src={pageContent.galleryImages[2]?.src ?? "/_.jpeg"}
              alt={pageContent.galleryImages[2]?.alt ?? pageContent.salonName}
              width={900}
              height={760}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <div className="section-copy split-section__copy">
            <h2>{locale === "bg" ? "Тренировките включват:" : "Training includes:"}</h2>
            <ul className="check-list">
              {pageContent.siteContent.audience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="booking" className="reservation-section">
        <p className="reservation-kicker">
          {locale === "bg"
            ? "Готова ли си да започнеш? Запази място сега:"
            : "Ready to begin? Reserve your place now:"}
        </p>
        <div className="reservation-panel">
          <div className="section-copy section-copy--center reservation-copy">
            <p className="section-label">{copy.bookingLabel}</p>
            <h2>{copy.bookingTitle}</h2>
            <p>{copy.bookingBody}</p>
            <div className="reservation-actions">
              <PrimaryBookingButton>{locale === "bg" ? "Запази час" : "Book session"}</PrimaryBookingButton>
              <a className="btn btn-light" href="#pricing">
                {copy.pricingLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="gallery-section__copy section-copy section-copy--center">
          {pageContent.siteContent.gallery.subtitle ? (
            <p className="section-label">{pageContent.siteContent.gallery.subtitle}</p>
          ) : null}
          <h2>{pageContent.siteContent.gallery.title}</h2>
          {pageContent.siteContent.gallery.body ? (
            <p>{pageContent.siteContent.gallery.body}</p>
          ) : null}
        </div>
        <GalleryPreview
          images={pageContent.galleryImages}
          label={`${pageContent.salonName} ${copy.nav.gallery}`}
          moreLabel={locale === "bg" ? "Виж още" : "See more"}
        />
      </section>

      <section id="pricing" className="pricing-section">
        <div className="section-copy section-copy--center">
          <h2>{copy.pricingLabel}</h2>
        </div>
        <div className="pricing-grid">
          {pageContent.siteContent.pricing.items.map((item) => (
            <article
              key={item.id}
              className={item.price ? "pricing-card pricing-card--with-price" : "pricing-card pricing-card--no-price"}
            >
              <div className="pricing-copy">
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
              {item.price ? <p className="price">{item.price}</p> : null}
              <PrimaryBookingButton
                className="btn-compact"
                service={item.serviceId || undefined}
              >
                {getPricingButtonLabel(item, locale)}
              </PrimaryBookingButton>
            </article>
          ))}
        </div>
        {pageContent.siteContent.pricing.note ? (
          <div className="section-copy section-copy--center pricing-note">
            <p>{pageContent.siteContent.pricing.note}</p>
          </div>
        ) : null}
      </section>

      <section id="faq" className="faq-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">{copy.nav.faq}</p>
          <h2>{copy.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {pageContent.faqItems.map((item) => (
            <details key={item.id}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="map" className="map-section" aria-label={`${pageContent.salonName} ${copy.mapLabel}`}>
        <div className="map-frame">
          <iframe
            title={`${pageContent.salonName} ${copy.mapLabel}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="final-cta">
        <h2>{copy.finalCtaTitle}</h2>
        <p>{copy.finalCtaBody}</p>
        <PrimaryBookingButton>{copy.bookCta}</PrimaryBookingButton>
      </section>

      <footer id="contact" className="site-footer">
        <div className="site-footer__brand">
          <span>{pageContent.salonName}</span>
          <p>{copy.footerTagline}</p>
        </div>
        <div className="site-footer__contact-block">
          <div className="site-footer__social">
            <span className="site-footer__heading">{copy.socialMediaLabel}</span>
            <div
              className="social-links social-links--footer"
              aria-label={`${copy.socialMediaLabel} footer`}
            >
              {socialLinks.map((item) =>
                item.href ? (
                  <a
                    key={`footer-${item.label}`}
                    className="social-link social-link--icon"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ) : (
                  <span
                    key={`footer-${item.label}`}
                    className="social-link social-link--icon social-link--placeholder"
                    aria-label={item.label}
                  >
                    {item.icon}
                  </span>
                )
              )}
            </div>
          </div>
          <span className="site-footer__heading">{copy.nav.contact}</span>
          <div className="site-footer__contact">
            {footerContactLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{footerWorkingHours}</p>
          </div>
          <div className="site-footer__contact-links">
            {pageContent.phone ? (
              <a href={`tel:${pageContent.phone.replace(/\s/g, "")}`}>{pageContent.phone}</a>
            ) : null}
            <a
              href={pageContent.googleMapsUrl || "#map"}
              target={pageContent.googleMapsUrl ? "_blank" : undefined}
              rel={pageContent.googleMapsUrl ? "noreferrer" : undefined}
            >
              {copy.openMap}
            </a>
          </div>
        </div>
        <div className="site-footer__links">
          <Link href={localizedPath(locale, "/privacy-policy")}>
            {copy.legalLinks.privacy}
          </Link>
          <Link href={localizedPath(locale, "/terms")}>
            {copy.legalLinks.terms}
          </Link>
          <Link href={localizedPath(locale, "/cookies")}>
            {copy.legalLinks.cookies}
          </Link>
        </div>
        <div className="site-footer__bottom">
          <p>
            {pageContent.salonName} {footerYear}.{" "}
            {locale === "bg" ? "Всички права запазени." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </main>
  );
}
