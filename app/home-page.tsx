import { Facebook, Instagram, MapPinned, Music4, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryPreview } from "./gallery-preview";
import { PrimaryBookingButton, strongMatServiceId, stretchMatServiceId } from "./booking-actions";
import { homeCopy, isLocale, type Locale, localizedPath } from "./i18n";
import { loadStaffMembers, type StaffMember } from "./staff";
import { TeamSection } from "./team-section";

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
  seo: {
    title: string;
    description: string;
  };
  labels: {
    navReformer: string;
    navGallery: string;
    navTeam: string;
    navPricing: string;
    navFaq: string;
    navContact: string;
    benefitsHeading: string;
    audienceHeading: string;
    pricingHeading: string;
    faqHeading: string;
    finalCtaTitle: string;
    finalCtaBody: string;
  };
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
  heroImage: GalleryImage;
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
  staffMembers: StaffMember[];
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
      question: "Подходящ ли е реформър пилатес за начинаещи?",
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
        "Студиото работи с 5 реформър легла, което помага групата да остане малка."
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
      seo: {
        title: "Reset Body Lab - Reformer Pilates studio in Varna",
        description:
          "Reformer Pilates for better posture, more strength, mobility and balance in a calm boutique studio in Varna."
      },
      labels: {
        navReformer: "Reformer Pilates",
        navGallery: "Studio",
        navTeam: "Team",
        navPricing: "Pricing",
        navFaq: "FAQ",
        navContact: "Contact",
        benefitsHeading: "Main benefits include:",
        audienceHeading: "Training is suitable for:",
        pricingHeading: "Packages",
        faqHeading: "Frequently asked questions",
        finalCtaTitle: "Ready to begin?",
        finalCtaBody: "Choose an available time and reserve one of the five reformer beds."
      },
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
            name: "4-session package",
            price: "",
            text: "Validity: 30 days.",
            serviceId: ""
          },
          {
            id: "price-2",
            name: "8-session package",
            price: "",
            text: "Validity: 30 days.",
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
        title: "Our studio",
        subtitle: "",
        body:
          "Step into a calm atmosphere, modern setting, and professional Reformer equipment."
      },
      contact: {
        title: "Contact",
        subtitle: "Book online or use the map to find the studio.",
        body: ""
      }
    };
  }

  return {
    seo: {
      title: "Reset body lab - Реформър Пилатес студио в град Варна",
      description:
        "Реформър пилатес за по-добра стойка, повече сила, мобилност и баланс в спокойно бутиково студио във Варна."
    },
    labels: {
      navReformer: "Реформър пилатес",
      navGallery: "Студио",
      navTeam: "Екип",
      navPricing: "Цени",
      navFaq: "FAQ",
      navContact: "Контакт",
      benefitsHeading: "Основните ползи включват:",
      audienceHeading: "Тренировките са подходящи за:",
      pricingHeading: "Пакети",
      faqHeading: "Често задавани въпроси",
      finalCtaTitle: "Готова ли си да започнеш?",
      finalCtaBody: "Избери свободен час и запази едно от петте реформър легла."
    },
    benefits: {
      title: "Ползи",
      intro: "Шест ясни причини реформър пилатес да се усеща едновременно ефективен, щадящ и устойчив като практика.",
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
          text: "На реформър рядко работи само една мускулна група. Докато изпълняваш едно движение, тялото постоянно участва в поддържането на баланс и контрол - от корема и гърба до ръцете, краката и седалището."
        },
        {
          id: "benefit-4",
          title: "Ефективно натоварване без тежък удар върху ставите",
          text: "Реформърът позволява мускулите да работят интензивно, докато движенията остават плавни и контролирани. Това го прави подходящ за различни нива на физическа подготовка и за хора, които предпочитат по-щадящ начин на трениране."
        },
        {
          id: "benefit-5",
          title: "Тренировка, която се адаптира към теб",
          text: "Съпротивлението на уреда може да се променя според упражнението, нивото и целите ти. Така една и съща тренировка може да бъде достъпна за начинаещ и достатъчно предизвикателна за напреднал."
        },
        {
          id: "benefit-6",
          title: "По-добра стойка и контрол над тялото",
          text: "Реформър пилатес развива усещането за позицията и движението на тялото. С времето това може да помогне за по-добра стойка, баланс и по-осъзнато движение и извън студиото."
        }
      ]
    },
    reformer: {
      title: "Какво е реформър пилатес?",
      subtitle: "Реформър пилатес",
      body:
        "Реформър пилатес съчетава контролирано движение и регулируемо съпротивление, за да натовари тялото ефективно, без излишен стрес върху ставите. Тренировките могат лесно да се адаптират както за начинаещи, така и за хора с повече опит."
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
            name: "Пакет 4 тренировки",
            price: "",
          text: "Валидност: 30 дни.",
          serviceId: ""
        },
        {
          id: "price-2",
          name: "Пакет 8 тренировки",
          price: "",
          text: "Валидност: 30 дни.",
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
      title: "Нашето студио",
      subtitle: "",
      body:
        "Потопи се в спокойната атмосфера, модерната обстановка и професионалните реформър уреди."
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

const WORKING_DAY_ORDER = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday"
] as const;

const WORKING_DAY_LABELS: Record<Locale, Record<(typeof WORKING_DAY_ORDER)[number], string>> = {
  bg: {
    monday: "Понеделник",
    tuesday: "Вторник",
    wednesday: "Сряда",
    thursday: "Четвъртък",
    friday: "Петък",
    saturday: "Събота",
    sunday: "Неделя"
  },
  en: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  }
};

function normalizeTime(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatDayRange(
  days: Array<(typeof WORKING_DAY_ORDER)[number]>,
  locale: Locale
) {
  const labels = WORKING_DAY_LABELS[locale];
  if (days.length === 1) return labels[days[0]];
  const start = labels[days[0]];
  const end = labels[days[days.length - 1]];
  return `${start} - ${end}`;
}

function formatWorkingHours(value: unknown, locale: Locale) {
  const text = normalizeString(value);
  if (text) return text;
  if (!isRecord(value)) return "";

  const groups: Array<{
    days: Array<(typeof WORKING_DAY_ORDER)[number]>;
    open: string;
    close: string;
  }> = [];

  for (const day of WORKING_DAY_ORDER) {
    const rawDay = value[day];
    if (!isRecord(rawDay) || rawDay.closed === true) continue;
    const open = normalizeTime(rawDay.open);
    const close = normalizeTime(rawDay.close);
    if (!open || !close) continue;

    const last = groups[groups.length - 1];
    if (last && last.open === open && last.close === close) {
      last.days.push(day);
    } else {
      groups.push({ days: [day], open, close });
    }
  }

  return groups
    .map((group) => `${formatDayRange(group.days, locale)} · ${group.open} - ${group.close}`)
    .join("; ");
}

function hasField(record: Record<string, unknown>, key: string) {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function normalizeEditableString(
  record: Record<string, unknown>,
  key: string,
  fallback: string
) {
  return hasField(record, key) ? normalizeString(record[key]) : fallback;
}

function containsCyrillic(value: string) {
  return /[\u0400-\u04FF]/.test(value);
}

function isWrongLocaleText(value: string, locale: Locale) {
  const text = value.trim();
  if (!text) return false;

  if (locale === "en") {
    return containsCyrillic(text);
  }

  if (containsCyrillic(text)) return false;

  const remainingLatin = text
    .toLowerCase()
    .replace(/reset\s*body\s*lab/g, "")
    .replace(/google\s*maps/g, "")
    .replace(/\b(faq|bg|en|instagram|facebook|tiktok)\b/g, "")
    .replace(/[^a-z]+/g, "");

  return remainingLatin.length > 0;
}

function normalizeLocalizedContentString(
  record: Record<string, unknown>,
  key: string,
  fallback: string,
  locale: Locale
) {
  if (!hasField(record, key)) return fallback;
  const value = normalizeString(record[key]);
  return isWrongLocaleText(value, locale) ? fallback : value;
}

function normalizeLocalizedEditableString({
  record,
  locale,
  bgKey,
  enKey,
  fallback
}: {
  record: Record<string, unknown>;
  locale: Locale;
  bgKey: string;
  enKey: string;
  fallback: string;
}) {
  if (locale === "en" && hasField(record, enKey)) {
    return normalizeString(record[enKey]);
  }

  if (hasField(record, bgKey)) {
    return normalizeString(record[bgKey]);
  }

  return fallback;
}

function normalizeLocalizedRequiredString({
  record,
  locale,
  bgKey,
  enKey,
  fallback
}: {
  record: Record<string, unknown>;
  locale: Locale;
  bgKey: string;
  enKey: string;
  fallback: string;
}) {
  const value = normalizeLocalizedEditableString({
    record,
    locale,
    bgKey,
    enKey,
    fallback
  });

  return value || fallback;
}

function getLocalizedEditableValue({
  record,
  locale,
  bgKey,
  enKey
}: {
  record: Record<string, unknown>;
  locale: Locale;
  bgKey: string;
  enKey: string;
}) {
  if (locale === "en" && hasField(record, enKey)) return record[enKey];
  if (hasField(record, bgKey)) return record[bgKey];
  return undefined;
}

function normalizeStringList(
  value: unknown,
  fallback: string[],
  hasEditableValue = true,
  locale?: Locale
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];
  const items = value
    .map((item, index) => {
      const text = normalizeString(item);
      if (!text) return "";
      if (locale && isWrongLocaleText(text, locale)) return fallback[index] ?? "";
      return text;
    })
    .filter(Boolean);
  return items.length > 0 ? items : fallback;
}

function normalizeBenefitItems(
  value: unknown,
  fallback: SiteContentBenefitItem[],
  hasEditableValue = true,
  locale?: Locale
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const fallbackItem = fallback[index];
      const rawTitle = normalizeString(item.title);
      const rawText = normalizeString(item.text);
      const title =
        locale && isWrongLocaleText(rawTitle, locale)
          ? fallbackItem?.title ?? ""
          : rawTitle;
      const text =
        locale && isWrongLocaleText(rawText, locale)
          ? fallbackItem?.text ?? ""
          : rawText;
      if (!title && !text) return null;
      return {
        id: normalizeString(item.id) || `benefit-${index + 1}`,
        title,
        text
      };
    })
    .filter(Boolean) as SiteContentBenefitItem[];

  return items;
}

function normalizePriceItems(
  value: unknown,
  fallback: SiteContentPriceItem[],
  hasEditableValue = true,
  locale?: Locale
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const fallbackItem = fallback[index];
      const rawName = normalizeString(item.name);
      const price = normalizeString(item.price);
      const rawText = normalizeString(item.text);
      const name =
        locale && isWrongLocaleText(rawName, locale)
          ? fallbackItem?.name ?? ""
          : rawName;
      const text =
        locale && isWrongLocaleText(rawText, locale)
          ? fallbackItem?.text ?? ""
          : rawText;
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

  return items;
}

function normalizeFaqItems(
  value: unknown,
  fallback: FaqItem[],
  hasEditableValue = true,
  locale?: Locale
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

  const items = value
    .map((item, index) => {
      if (!isRecord(item)) return null;
      const fallbackItem = fallback[index];
      const rawQuestion = normalizeString(item.question);
      const rawAnswer = normalizeString(item.answer);
      const question =
        locale && isWrongLocaleText(rawQuestion, locale)
          ? fallbackItem?.question ?? ""
          : rawQuestion;
      const answer =
        locale && isWrongLocaleText(rawAnswer, locale)
          ? fallbackItem?.answer ?? ""
          : rawAnswer;
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

function getPricingDescription(item: SiteContentPriceItem) {
  return item.text
    .replace(/^\s*Очаквайте скоро\.?\s*/i, "")
    .replace(/^\s*Coming soon\.?\s*/i, "")
    .trim();
}

function isPlaceholderPricingNote(note: string) {
  const normalizedNote = note.trim().toLowerCase();
  return (
    normalizedNote === "добави реалните цени, когато клиентът ги изпрати." ||
    normalizedNote === "add the real prices when the client sends them."
  );
}

function isComingSoonPricingItem(item: SiteContentPriceItem) {
  const normalizedName = item.name.toLowerCase();
  const normalizedText = item.text.toLowerCase();
  return (
    normalizedText.includes("очаквайте") ||
    normalizedText.includes("coming soon") ||
    normalizedName.includes("пакет 4") ||
    normalizedName.includes("пакет 8") ||
    normalizedName.includes("4 тренировки") ||
    normalizedName.includes("8 тренировки") ||
    normalizedName.includes("4-session") ||
    normalizedName.includes("8-session")
  );
}

function normalizeSiteContent(raw: unknown, fallback: SiteContent, locale: Locale) {
  const content = isRecord(raw) ? raw : {};
  const seo = content.seo && isRecord(content.seo) ? content.seo : {};
  const labels = content.labels && isRecord(content.labels) ? content.labels : {};
  const benefits = content.benefits && isRecord(content.benefits) ? content.benefits : {};
  const reformer = content.reformer && isRecord(content.reformer) ? content.reformer : {};
  const audience = content.audience && isRecord(content.audience) ? content.audience : {};
  const whyChooseUs =
    content.whyChooseUs && isRecord(content.whyChooseUs) ? content.whyChooseUs : {};
  const pricing = content.pricing && isRecord(content.pricing) ? content.pricing : {};
  const instructors =
    content.instructors && isRecord(content.instructors) ? content.instructors : {};
  const gallery = content.gallery && isRecord(content.gallery) ? content.gallery : {};
  const contact = content.contact && isRecord(content.contact) ? content.contact : {};

  return {
    seo: {
      title: normalizeEditableString(seo, "title", fallback.seo.title),
      description: normalizeEditableString(seo, "description", fallback.seo.description)
    },
    labels: {
      navReformer: normalizeLocalizedContentString(labels, "navReformer", fallback.labels.navReformer, locale),
      navGallery: normalizeLocalizedContentString(labels, "navGallery", fallback.labels.navGallery, locale),
      navTeam: normalizeLocalizedContentString(labels, "navTeam", fallback.labels.navTeam, locale),
      navPricing: normalizeLocalizedContentString(labels, "navPricing", fallback.labels.navPricing, locale),
      navFaq: normalizeLocalizedContentString(labels, "navFaq", fallback.labels.navFaq, locale),
      navContact: normalizeLocalizedContentString(labels, "navContact", fallback.labels.navContact, locale),
      benefitsHeading: normalizeLocalizedContentString(
        labels,
        "benefitsHeading",
        fallback.labels.benefitsHeading,
        locale
      ),
      audienceHeading: normalizeLocalizedContentString(
        labels,
        "audienceHeading",
        fallback.labels.audienceHeading,
        locale
      ),
      pricingHeading: normalizeLocalizedContentString(
        labels,
        "pricingHeading",
        fallback.labels.pricingHeading,
        locale
      ),
      faqHeading: normalizeLocalizedContentString(labels, "faqHeading", fallback.labels.faqHeading, locale),
      finalCtaTitle: normalizeLocalizedContentString(
        labels,
        "finalCtaTitle",
        fallback.labels.finalCtaTitle,
        locale
      ),
      finalCtaBody: normalizeLocalizedContentString(
        labels,
        "finalCtaBody",
        fallback.labels.finalCtaBody,
        locale
      )
    },
    benefits: {
      title: normalizeLocalizedContentString(benefits, "title", fallback.benefits.title, locale),
      intro: normalizeLocalizedContentString(benefits, "intro", fallback.benefits.intro, locale),
      items: normalizeBenefitItems(
        benefits.items,
        fallback.benefits.items,
        hasField(benefits, "items"),
        locale
      )
    },
    reformer: {
      title: normalizeLocalizedContentString(reformer, "title", fallback.reformer.title, locale),
      subtitle: normalizeLocalizedContentString(reformer, "subtitle", fallback.reformer.subtitle, locale),
      body: normalizeLocalizedContentString(reformer, "body", fallback.reformer.body, locale)
    },
    audience: {
      title: normalizeLocalizedContentString(audience, "title", fallback.audience.title, locale),
      intro: normalizeLocalizedContentString(audience, "intro", fallback.audience.intro, locale),
      items: normalizeStringList(
        audience.items,
        fallback.audience.items,
        hasField(audience, "items"),
        locale
      ),
      outro: normalizeLocalizedContentString(audience, "outro", fallback.audience.outro, locale)
    },
    whyChooseUs: {
      title: normalizeLocalizedContentString(whyChooseUs, "title", fallback.whyChooseUs.title, locale),
      intro: normalizeLocalizedContentString(whyChooseUs, "intro", fallback.whyChooseUs.intro, locale),
      items: normalizeStringList(
        whyChooseUs.items,
        fallback.whyChooseUs.items,
        hasField(whyChooseUs, "items"),
        locale
      ),
      outro: normalizeLocalizedContentString(whyChooseUs, "outro", fallback.whyChooseUs.outro, locale)
    },
    pricing: {
      title: normalizeLocalizedContentString(pricing, "title", fallback.pricing.title, locale),
      intro: normalizeLocalizedContentString(pricing, "intro", fallback.pricing.intro, locale),
      items: normalizePriceItems(
        pricing.items,
        fallback.pricing.items,
        hasField(pricing, "items"),
        locale
      ),
      note: normalizeLocalizedContentString(pricing, "note", fallback.pricing.note, locale)
    },
    instructors: {
      title: normalizeLocalizedContentString(instructors, "title", fallback.instructors.title, locale),
      subtitle: normalizeLocalizedContentString(instructors, "subtitle", fallback.instructors.subtitle, locale),
      body: normalizeLocalizedContentString(instructors, "body", fallback.instructors.body, locale)
    },
    gallery: {
      title: normalizeLocalizedContentString(gallery, "title", fallback.gallery.title, locale),
      subtitle: normalizeLocalizedContentString(gallery, "subtitle", fallback.gallery.subtitle, locale),
      body: normalizeLocalizedContentString(gallery, "body", fallback.gallery.body, locale)
    },
    contact: {
      title: normalizeLocalizedContentString(contact, "title", fallback.contact.title, locale),
      subtitle: normalizeLocalizedContentString(contact, "subtitle", fallback.contact.subtitle, locale),
      body: normalizeLocalizedContentString(contact, "body", fallback.contact.body, locale)
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
  address,
  city,
  googleMapsUrl
}: {
  address: string;
  city: string;
  googleMapsUrl: string;
}) {
  let googleMapsQuery = "";
  try {
    const url = googleMapsUrl ? new URL(googleMapsUrl) : null;
    googleMapsQuery =
      url?.searchParams.get("query") ||
      url?.searchParams.get("q") ||
      "";
  } catch {
    googleMapsQuery = "";
  }

  const query = googleMapsQuery.trim() || [address, city].filter(Boolean).join(", ");
  return `https://www.google.com/maps?q=${encodeURIComponent(
    query || "Reset Body Lab Pilates"
  )}&z=17&output=embed`;
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

export async function loadPageContent(locale: Locale): Promise<PageContent> {
  const fallbackSiteContent = defaultSiteContent(locale);
  const fallbackFaqs = getFallbackFaqs(locale);
  const fallbackGalleryImages = getFallbackGalleryImages(locale);
  const fallbackHeroTitle =
    locale === "en"
      ? "Reformer Pilates for strength, posture, and lightness."
      : "Реформър пилатес за сила, стойка и лекота.";
  const fallbackHeroSubtitle =
    locale === "en"
      ? "The session combines strength, control, stretch, and precise technique on a specialised reformer bed."
      : "Тренировката съчетава сила, контрол, разтягане и прецизна техника върху специализирано реформър легло.";

  const fallback = {
    salonName: "Reset Body Lab Pilates",
    heroTitle: fallbackHeroTitle,
    heroSubtitle: fallbackHeroSubtitle,
    heroImage: {
      src: "/reset-body-lab-hero.webp",
      alt: "Reset Body Lab Pilates"
    },
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
    tiktokUsername: "",
    staffMembers: await loadStaffMembers()
  };

  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL?.trim() || "https://app.alternine.co";
  const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG?.trim() || "salon";
  const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

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

    const [payload, staffMembers] = await Promise.all([
      response.json() as Promise<PublicSalonPayload>,
      loadStaffMembers()
    ]);
    const salon = payload.salon ?? {};
    const salonRecord = isRecord(salon) ? salon : {};
    const siteContent = normalizeSiteContent(
      getLocalizedEditableValue({
        record: salonRecord,
        locale,
        bgKey: "site_content",
        enKey: "site_content_en"
      }),
      fallbackSiteContent,
      locale
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

    const remoteGalleryImages =
      remoteImageUrls.length > 0
        ? remoteImageUrls.map((src, index) => ({
            src: toGalleryImageSrc(src, version),
            alt: `${normalizeString(salon.name) || "Reset Body Lab"} ${copy.galleryImageAlt} ${index + 1}`,
            version
          }))
        : fallbackGalleryImages;
    const heroImage = remoteGalleryImages[0] ?? fallback.heroImage;
    const galleryImages = remoteGalleryImages.length > 1 ? remoteGalleryImages.slice(1) : remoteGalleryImages;

    return {
      salonName: normalizeString(salon.name) || fallback.salonName,
      heroTitle: normalizeLocalizedRequiredString({
        record: salonRecord,
        locale,
        bgKey: "hero_title",
        enKey: "hero_title_en",
        fallback: fallbackHeroTitle
      }),
      heroSubtitle: normalizeLocalizedRequiredString({
        record: salonRecord,
        locale,
        bgKey: "hero_subtitle",
        enKey: "hero_subtitle_en",
        fallback:
          normalizeLocalizedEditableString({
            record: salonRecord,
            locale,
            bgKey: "about",
            enKey: "about_en",
            fallback: ""
          }) || fallbackHeroSubtitle
      }),
      heroImage,
      about:
        normalizeLocalizedEditableString({
          record: salonRecord,
          locale,
          bgKey: "about",
          enKey: "about_en",
          fallback: siteContent.reformer.body
        }),
      faqItems: normalizeFaqItems(
        getLocalizedEditableValue({
          record: salonRecord,
          locale,
          bgKey: "faq_items",
          enKey: "faq_items_en"
        }),
        fallbackFaqs,
        locale === "en"
          ? hasField(salonRecord, "faq_items_en") || hasField(salonRecord, "faq_items")
          : hasField(salonRecord, "faq_items"),
        locale
      ),
      siteContent,
      galleryImages: galleryImages.length > 0 ? galleryImages : fallbackGalleryImages,
      phone: normalizeString(salon.phone),
      email: normalizeString(salon.email),
      city: normalizeString(salon.city),
      address: normalizeString(salon.address),
      workingHours: formatWorkingHours(
        locale === "en" ? salon.working_hours_en ?? salon.working_hours : salon.working_hours,
        locale
      ),
      googleMapsUrl: normalizeString(salon.google_maps_url),
      instagramUsername: normalizeString(salon.instagram_username),
      facebookUsername: normalizeString(salon.facebook_username),
      tiktokUsername: normalizeString(salon.tiktok_username),
      staffMembers
    };
  } catch {
    return fallback;
  }
}

export async function HomePage({ locale }: { locale: Locale }) {
  if (!isLocale(locale)) notFound();

  const copy = homeCopy[locale];
  const pageContent = await loadPageContent(locale);
  const labels = pageContent.siteContent.labels;
  const hasFaqItems = pageContent.faqItems.length > 0;
  const mapSrc = buildMapEmbedSrc({
    address: pageContent.address,
    city: pageContent.city,
    googleMapsUrl: pageContent.googleMapsUrl
  });
  const contactLines = [
    pageContent.address,
    pageContent.city,
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
    locale === "bg" ? "" : pageContent.siteContent.reformer.subtitle;
  const reformerTitle =
    locale === "bg"
      ? pageContent.siteContent.reformer.title
          .replace(/реформер/gi, "реформър")
          .replace(/\s+\?/g, "?")
      : pageContent.siteContent.reformer.title;
  const reformerBody =
    locale === "bg"
      ? pageContent.siteContent.reformer.body.replace(/Reformer Pilates/g, "Реформър пилатес")
      : pageContent.siteContent.reformer.body;
  const reformerEmphasis =
    "Тренировките могат лесно да се адаптират както за начинаещи, така и за хора с повече опит.";
  const reformerBodyParts =
    locale === "bg" && reformerBody.includes(reformerEmphasis)
      ? reformerBody.split(reformerEmphasis)
      : null;
  const pricingImages =
    pageContent.galleryImages.length > 0 ? pageContent.galleryImages : getFallbackGalleryImages(locale);
  const headerMapHref = pageContent.googleMapsUrl || "#map";

  return (
    <main>
      <header className="site-header">
        <a
          className="brand"
          href="#top"
          aria-label={`${pageContent.salonName} ${copy.headerHomeLabel}`}
        >
          <Image
            src="/reset-body-lab-logo.webp"
            alt={pageContent.salonName}
            width={78}
            height={78}
          />
        </a>
        <nav aria-label={copy.localeLabel}>
          <a href="#reformer">{labels.navReformer}</a>
          <a href="#gallery">{labels.navGallery}</a>
          <a href="#team">{labels.navTeam}</a>
          <a href="#pricing">{labels.navPricing}</a>
          {hasFaqItems ? <a href="#faq">{labels.navFaq}</a> : null}
          <a href="#contact">{labels.navContact}</a>
        </nav>
        <div className="header-actions">
          <a
            className="header-map-link"
            href={headerMapHref}
            target={pageContent.googleMapsUrl ? "_blank" : undefined}
            rel={pageContent.googleMapsUrl ? "noreferrer" : undefined}
            aria-label={copy.openMap}
            title={copy.openMap}
          >
            <MapPinned size={18} strokeWidth={2} aria-hidden="true" />
          </a>
          <div className="locale-switcher" aria-label={copy.localeLabel}>
            <Link
              href={localizedPath("bg")}
              className={locale === "bg" ? "is-active" : undefined}
              aria-current={locale === "bg" ? "page" : undefined}
            >
              BG
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={localizedPath("en")}
              className={locale === "en" ? "is-active" : undefined}
              aria-current={locale === "en" ? "page" : undefined}
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
          src={pageContent.heroImage.src}
          alt={pageContent.heroImage.alt || `${copy.heroImageAltPrefix} ${pageContent.salonName}`}
          fill
          sizes="100vw"
          priority
        />
        <div className="hero__copy">
          <h1>{pageContent.heroTitle}</h1>
          <p>{pageContent.heroSubtitle}</p>
          <div className="hero__actions">
            <PrimaryBookingButton>{copy.bookCta}</PrimaryBookingButton>
            <a className="btn btn-light" href="#gallery">
              {copy.learnMore}
            </a>
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
        <p>{locale === "bg" ? "по реформър пилатес в Reset Body Lab" : "with reformer pilates at Reset Body Lab"}</p>
      </section>

      <section className="mat-announcement-section" aria-labelledby="mat-announcement-title">
        <div className="mat-announcement">
          <div className="mat-announcement__intro">
            <p className="section-label">
              {locale === "bg" ? "Ново в графика" : "New in the schedule"}
            </p>
            <h2 id="mat-announcement-title">
              {locale === "bg" ? "Strong Mat и Stretch Mat" : "Strong Mat and Stretch Mat"}
            </h2>
            <p>
              {locale === "bg"
                ? "Два нови mat формата с малки групи до 4 места, 50 минути фокусирано движение и цена 13 €."
                : "Two new mat formats with small groups of up to 4 spots, 50 minutes of focused movement, and a 13 € price."}
            </p>
          </div>

          <div className="mat-class-grid">
            {[
              {
                name: "Strong Mat",
                serviceId: strongMatServiceId,
                tone: "strong",
                body:
                  locale === "bg"
                    ? "По-интензивен клас за сила, стабилност и контрол на тялото."
                    : "A stronger class for body strength, stability, and control.",
                cta: locale === "bg" ? "Запази Strong Mat" : "Book Strong Mat"
              },
              {
                name: "Stretch Mat",
                serviceId: stretchMatServiceId,
                tone: "stretch",
                body:
                  locale === "bg"
                    ? "По-мек формат за мобилност, разтягане и освобождаване на напрежението."
                    : "A softer format for mobility, stretching, and releasing tension.",
                cta: locale === "bg" ? "Запази Stretch Mat" : "Book Stretch Mat"
              }
            ].map((matClass) => (
              <article className={`mat-class-card mat-class-card--${matClass.tone}`} key={matClass.name}>
                <div>
                  <span className="mat-class-card__eyebrow">Mat Pilates</span>
                  <h3>{matClass.name}</h3>
                  <p>{matClass.body}</p>
                </div>
                <div className="mat-class-card__facts" aria-label={locale === "bg" ? "Детайли" : "Details"}>
                  <span>{locale === "bg" ? "4 места" : "4 spots"}</span>
                  <span>50 min</span>
                  <span>13 €</span>
                </div>
                <PrimaryBookingButton
                  className="mat-class-card__button"
                  service={matClass.serviceId}
                  lockService
                >
                  {matClass.cta}
                </PrimaryBookingButton>
              </article>
            ))}
          </div>
        </div>
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
          <h2>{reformerTitle}</h2>
          <p>
            {reformerBodyParts ? (
              <>
                {reformerBodyParts[0]}
                <strong>{reformerEmphasis}</strong>
                {reformerBodyParts[1]}
              </>
            ) : (
              reformerBody
            )}
          </p>
          </div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="split-section split-section--dark">
          <div className="section-copy split-section__copy">
            <h2>{labels.benefitsHeading}</h2>
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
            <h2>{labels.audienceHeading}</h2>
            <ul className="check-list">
              {pageContent.siteContent.audience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="gallery-section__copy section-copy section-copy--center">
          <h2>{pageContent.siteContent.gallery.title}</h2>
          {pageContent.siteContent.gallery.body ? (
            <p>{pageContent.siteContent.gallery.body}</p>
          ) : null}
        </div>
        <GalleryPreview
          images={pageContent.galleryImages}
          label={`${pageContent.salonName} ${labels.navGallery}`}
          moreLabel={locale === "bg" ? "Виж още" : "See more"}
        />
      </section>

      <TeamSection
        staffMembers={pageContent.staffMembers}
        locale={locale}
        title={pageContent.siteContent.instructors.title}
        body={pageContent.siteContent.instructors.body}
      />

      <section id="pricing" className="pricing-section">
        <div className="section-copy section-copy--center">
          <h2>{labels.pricingHeading}</h2>
        </div>
        <div className="pricing-grid">
          {pageContent.siteContent.pricing.items.map((item, index) => {
            const pricingImage = pricingImages[index % pricingImages.length];
            const isComingSoon = isComingSoonPricingItem(item);
            const pricingDescription = getPricingDescription(item);

            return (
              <article
                key={item.id}
                className={`pricing-card${isComingSoon ? " pricing-card--coming-soon" : ""}`}
              >
                <div className="pricing-card__image">
                  <Image
                    src={pricingImage.src}
                    alt={`${item.name} ${pageContent.salonName}`}
                    width={640}
                    height={560}
                    sizes="(max-width: 820px) 100vw, 33vw"
                  />
                </div>
                <div className="pricing-copy">
                  <h3>{item.name}</h3>
                  {pricingDescription ? <p>{pricingDescription}</p> : null}
                </div>
                {item.price ? <p className="price">{item.price}</p> : null}
                {isComingSoon ? (
                  <button
                    type="button"
                    className="btn btn-compact pricing-card__disabled-action"
                    disabled
                    aria-disabled="true"
                  >
                    {locale === "bg" ? "Очаквайте скоро" : "Coming soon"}
                  </button>
                ) : (
                  <PrimaryBookingButton
                    className="btn-compact"
                    service={item.serviceId || undefined}
                  >
                    {getPricingButtonLabel(item, locale)}
                  </PrimaryBookingButton>
                )}
              </article>
            );
          })}
        </div>
        {pageContent.siteContent.pricing.note &&
        !isPlaceholderPricingNote(pageContent.siteContent.pricing.note) ? (
          <div className="section-copy section-copy--center pricing-note">
            <p>{pageContent.siteContent.pricing.note}</p>
          </div>
        ) : null}
      </section>

      <section id="map" className="map-section" aria-label={`${pageContent.salonName} ${copy.mapLabel}`}>
        <div className="map-frame">
          <iframe
            title={`${pageContent.salonName} ${copy.mapLabel}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="map-location-callout" aria-hidden="true">
            <div className="map-location-card">
              <strong>{pageContent.salonName}</strong>
              <span>{locale === "bg" ? "Ние сме тук" : "We are here"}</span>
            </div>
            <span className="map-location-arrow" />
            <span className="map-location-dot" />
          </div>
        </div>
      </section>

      {hasFaqItems ? (
        <section id="faq" className="faq-section">
          <div className="section-copy section-copy--center">
            <p className="section-label">{labels.navFaq}</p>
            <h2>{labels.faqHeading}</h2>
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
      ) : null}

      <section id="booking" className="final-cta final-cta--booking">
        <p className="reservation-kicker">
          {labels.finalCtaTitle} {labels.finalCtaBody}
        </p>
        <div className="reservation-panel">
          <div className="section-copy section-copy--center reservation-copy reservation-copy--button-only">
            <div className="reservation-actions">
              <PrimaryBookingButton className="btn-mint">
                {locale === "bg" ? "Запази час" : "Book session"}
              </PrimaryBookingButton>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="site-footer__brand">
          <Image
            src="/reset-body-lab-logo.webp"
            alt={pageContent.salonName}
            width={82}
            height={82}
            className="site-footer__logo"
          />
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
                    aria-hidden="true"
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
        <div className="site-footer__bottom">
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
          <p>
            {pageContent.salonName} {footerYear}.{" "}
            {locale === "bg" ? "Всички права запазени." : "All rights reserved."}
          </p>
        </div>
      </footer>
    </main>
  );
}
