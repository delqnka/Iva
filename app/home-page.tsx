import { Facebook, Instagram, Languages, MapPinned, Music4, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GalleryPreview } from "./gallery-preview";
import { matPilatesServiceId, primaryServiceId, PrimaryBookingButton } from "./booking-actions";
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

type ServiceDetail = {
  id: string;
  bookingServiceId: string;
  title: string;
  label: string;
  intro: string;
  paragraphs: string[];
  note: string;
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

function normalizeStringList(value: unknown, fallback: string[], hasEditableValue = true) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];
  const items = value.map((item) => normalizeString(item)).filter(Boolean);
  return items;
}

function normalizeBenefitItems(
  value: unknown,
  fallback: SiteContentBenefitItem[],
  hasEditableValue = true
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

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

  return items;
}

function normalizePriceItems(
  value: unknown,
  fallback: SiteContentPriceItem[],
  hasEditableValue = true
) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

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

  return items;
}

function normalizeFaqItems(value: unknown, fallback: FaqItem[], hasEditableValue = true) {
  if (!hasEditableValue) return fallback;
  if (!Array.isArray(value)) return [];

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

function getServiceDetails(locale: Locale): ServiceDetail[] {
  if (locale === "en") {
    return [
      {
        id: "reformer-bed",
        bookingServiceId: primaryServiceId,
        title: "Reformer Pilates",
        label: "Reformer bed",
        intro:
          "Reformer Pilates at Reset Body Lab is a balanced, intelligent, and joint-friendly training method for strength, posture, and lighter movement.",
        paragraphs: [
          "Each class focuses on strength, stability, and mobility through controlled movement. The instructor gives clear guidance, with attention to technique, breathing, body alignment, and deep core activation.",
          "The exercises gradually build strength and body control. The whole body works, with a special focus on the core, pelvis, glutes, and spine.",
          "Reformer Pilates improves the way you move in daily life by supporting posture, balance, coordination, and long-term functional strength.",
          "Classes are suitable for beginners and experienced clients. Every exercise can be adapted to the individual level so you can feel confident and comfortable."
        ],
        note:
          "Note: Classes are not suitable for pregnant women unless the instructor confirms otherwise."
      },
      {
        id: "mat-pilates",
        bookingServiceId: matPilatesServiceId,
        title: "Mat Pilates",
        label: "Mat class",
        intro:
          "Mat Pilates is a balanced and mindful practice that builds strength, stability, and a better connection with the body.",
        paragraphs: [
          "During class, you develop strength, mobility, and control through smooth, precise movement. The instructor guides you with clear cues and a focus on breathing, posture, and deep core activation.",
          "The exercises are sequenced to gradually develop both physical strength and mindful control. The whole body works, with a special focus on the core, pelvis, glutes, and spine.",
          "Mat Pilates supports better posture, balance, and long-term strength while bringing a sense of lightness, stability, and harmony.",
          "Classes are suitable for all levels. Each exercise can be adapted to your individual ability, whether you are starting now or already have experience."
        ],
        note:
          "Note: Classes are not suitable for pregnant women unless they are part of a specialised programme."
      }
    ];
  }

  return [
    {
      id: "reformer-bed",
      bookingServiceId: primaryServiceId,
      title: "Реформър пилатес на легло",
      label: "Тренировка на реформър",
      intro:
        "Реформър пилатес в Reset Body Lab е интелигентен, балансиран и щадящ метод на тренировка, който изгражда сила, подобрява стойката и създава усещане за лекота в движенията.",
      paragraphs: [
        "Всяка тренировка е създадена с фокус върху силата, стабилността и мобилността чрез контролирани и осъзнати движения. Ще получиш ясни насоки от инструктора, внимание към правилната техника и специален акцент върху дишането, подравняването на тялото и активирането на дълбоката коремна мускулатура.",
        "Упражненията са подредени така, че постепенно да развиват силата и контрола върху тялото. Работи се върху всички основни мускулни групи, с особен фокус върху корема, таза, седалището и гръбначния стълб. Резултатът е тренировка, която зарежда с енергия, вместо да изтощава.",
        "Реформър пилатес не е просто начин да тренираш. Това е метод, който подобрява начина, по който се движиш в ежедневието. Подобрява стойката, баланса и координацията, като ти помага да изградиш силно, стабилно и функционално тяло.",
        "Заниманията са подходящи както за начинаещи, така и за хора с опит. Всички упражнения могат да бъдат адаптирани спрямо индивидуалното ниво на подготовка, за да се чувстваш уверен и комфортно по време на всяка тренировка."
      ],
      note:
        "Забележка: Тренировките не са подходящи за бременни жени, освен ако не е указано друго от инструктора."
    },
    {
      id: "mat-pilates",
      bookingServiceId: matPilatesServiceId,
      title: "Пилатес на постелка",
      label: "Тренировка на постелка",
      intro:
        "Пилатесът на постелка е балансирана и осъзната тренировка, която изгражда сила, стабилност и по-добра връзка с тялото.",
      paragraphs: [
        "По време на заниманията ще развиваш сила, мобилност и контрол чрез плавни и прецизни движения. Всяка тренировка следва внимателно подбрана последователност от упражнения, а инструкторът ще те насочва с ясни указания, поставяйки акцент върху правилното дишане, добрата стойка и активирането на дълбоката коремна мускулатура.",
        "Упражненията са създадени така, че постепенно да развиват както физическата сила, така и осъзнатия контрол върху движенията. Работи се с цялото тяло, с особен фокус върху коремната мускулатура, таза, седалището и гръбначния стълб. Натоварването е ефективно, но щадящо, така че след всяка тренировка ще се чувстваш зареден с енергия, а не изтощен.",
        "Пилатесът на постелка е създаден, за да подобри начина, по който се движиш в ежедневието. Той подпомага правилната стойка, развива баланса и изгражда дългосрочна сила, като същевременно носи усещане за лекота, стабилност и хармония.",
        "Заниманията са подходящи за всички нива на подготовка. Всяко упражнение може да бъде адаптирано според индивидуалните възможности, така че да тренираш спокойно и уверено, независимо дали правиш първите си стъпки или вече имаш опит."
      ],
      note:
        "Забележка: Тренировките не са подходящи за бременни жени, освен ако не се провеждат по специализирана програма."
    }
  ];
}

function isComingSoonPricingItem(item: SiteContentPriceItem) {
  const normalizedName = item.name.toLowerCase();
  return (
    normalizedName.includes("8 посещения") ||
    normalizedName.includes("12 посещения") ||
    normalizedName.includes("8 visits") ||
    normalizedName.includes("12 visits")
  );
}

function normalizeSiteContent(raw: unknown, fallback: SiteContent) {
  const content = isRecord(raw) ? raw : {};
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
    benefits: {
      title: normalizeEditableString(benefits, "title", fallback.benefits.title),
      intro: normalizeEditableString(benefits, "intro", fallback.benefits.intro),
      items: normalizeBenefitItems(
        benefits.items,
        fallback.benefits.items,
        hasField(benefits, "items")
      )
    },
    reformer: {
      title: normalizeEditableString(reformer, "title", fallback.reformer.title),
      subtitle: normalizeEditableString(reformer, "subtitle", fallback.reformer.subtitle),
      body: normalizeEditableString(reformer, "body", fallback.reformer.body)
    },
    audience: {
      title: normalizeEditableString(audience, "title", fallback.audience.title),
      intro: normalizeEditableString(audience, "intro", fallback.audience.intro),
      items: normalizeStringList(
        audience.items,
        fallback.audience.items,
        hasField(audience, "items")
      ),
      outro: normalizeEditableString(audience, "outro", fallback.audience.outro)
    },
    whyChooseUs: {
      title: normalizeEditableString(whyChooseUs, "title", fallback.whyChooseUs.title),
      intro: normalizeEditableString(whyChooseUs, "intro", fallback.whyChooseUs.intro),
      items: normalizeStringList(
        whyChooseUs.items,
        fallback.whyChooseUs.items,
        hasField(whyChooseUs, "items")
      ),
      outro: normalizeEditableString(whyChooseUs, "outro", fallback.whyChooseUs.outro)
    },
    pricing: {
      title: normalizeEditableString(pricing, "title", fallback.pricing.title),
      intro: normalizeEditableString(pricing, "intro", fallback.pricing.intro),
      items: normalizePriceItems(
        pricing.items,
        fallback.pricing.items,
        hasField(pricing, "items")
      ),
      note: normalizeEditableString(pricing, "note", fallback.pricing.note)
    },
    instructors: {
      title: normalizeEditableString(instructors, "title", fallback.instructors.title),
      subtitle: normalizeEditableString(instructors, "subtitle", fallback.instructors.subtitle),
      body: normalizeEditableString(instructors, "body", fallback.instructors.body)
    },
    gallery: {
      title: normalizeEditableString(gallery, "title", fallback.gallery.title),
      subtitle: normalizeEditableString(gallery, "subtitle", fallback.gallery.subtitle),
      body: normalizeEditableString(gallery, "body", fallback.gallery.body)
    },
    contact: {
      title: normalizeEditableString(contact, "title", fallback.contact.title),
      subtitle: normalizeEditableString(contact, "subtitle", fallback.contact.subtitle),
      body: normalizeEditableString(contact, "body", fallback.contact.body)
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

async function loadPageContent(locale: Locale): Promise<PageContent> {
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

    const payload = (await response.json()) as PublicSalonPayload;
    const salon = payload.salon ?? {};
    const salonRecord = isRecord(salon) ? salon : {};
    const siteContent = normalizeSiteContent(
      getLocalizedEditableValue({
        record: salonRecord,
        locale,
        bgKey: "site_content",
        enKey: "site_content_en"
      }),
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
          : hasField(salonRecord, "faq_items")
      ),
      siteContent,
      galleryImages,
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
  const serviceDetails = getServiceDetails(locale);
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
          <a href="#reformer">{copy.nav.reformer}</a>
          <a href="#gallery">{copy.nav.gallery}</a>
          <a href="#pricing">{copy.nav.pricing}</a>
          {hasFaqItems ? <a href="#faq">{copy.nav.faq}</a> : null}
          <a href="#contact">{copy.nav.contact}</a>
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
            <Languages size={15} strokeWidth={1.8} aria-hidden="true" />
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
          src="/reset-body-lab-hero.webp"
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
            <h2>{locale === "bg" ? "Тренировките са подходящи за:" : "Training is suitable for:"}</h2>
            <ul className="check-list">
              {pageContent.siteContent.audience.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="services-section" aria-labelledby="services-heading">
        <div className="section-copy section-copy--center services-section__intro">
          <h2 id="services-heading">{locale === "bg" ? "Услугите на Reset body lab Варна" : "Reset Body Lab Varna services"}</h2>
          <p>
            {locale === "bg"
              ? "Избери тренировка според целта, нивото и начина, по който искаш да се движиш."
              : "Choose the class that fits your goal, level, and preferred way of moving."}
          </p>
        </div>
        <div className="services-grid">
          {serviceDetails.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-card__header">
                <span>{service.label}</span>
                <h3>{service.title}</h3>
              </div>
              <p className="service-card__intro">{service.intro}</p>
              <details className="service-card__details">
                <summary>
                  <span className="service-card__details-open">
                    {locale === "bg" ? "Прочети повече" : "Read more"}
                  </span>
                  <span className="service-card__details-close">
                    {locale === "bg" ? "Скрий" : "Hide"}
                  </span>
                </summary>
                <div className="service-card__body">
                  {service.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <p className="service-card__note">{service.note}</p>
              </details>
              <PrimaryBookingButton
                className="service-card__booking"
                service={service.bookingServiceId}
              >
                {locale === "bg" ? `Запази ${service.title}` : `Book ${service.title}`}
              </PrimaryBookingButton>
            </article>
          ))}
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
          {pageContent.siteContent.pricing.items.map((item, index) => {
            const pricingImage = pricingImages[index % pricingImages.length];
            const isComingSoon = isComingSoonPricingItem(item);

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
                  {isComingSoon ? (
                    <span className="pricing-card__badge">Coming soon...</span>
                  ) : null}
                </div>
                <div className="pricing-copy">
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
                {item.price ? <p className="price">{item.price}</p> : null}
                {isComingSoon ? (
                  <span className="btn btn-compact pricing-card__disabled-action">
                    Coming soon...
                  </span>
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
        {pageContent.siteContent.pricing.note ? (
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
      ) : null}

      <section id="booking" className="final-cta final-cta--booking">
        <p className="reservation-kicker">
          {locale === "bg"
            ? "Готова ли си да започнеш? Запази място сега:"
            : "Ready to begin? Reserve your place now:"}
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
