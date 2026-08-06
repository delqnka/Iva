import { Facebook, Instagram, MapPinned, Music4, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PrimaryBookingButton, ServiceBookingCard } from "./booking-actions";
import { ConsentMap } from "./consent-map";

const benefitCards = [
  {
    image: "/Pilates Reformer Workout – Core & Leg Strength.jpeg"
  },
  {
    image: "/AI Fitness Aesthetic – Pilates Reformer Workout.jpeg"
  },
  {
    image: "/reformer pilates studio branding.jpeg"
  }
];

const instructorCards = [
  {
    image: "/Studio Glide Pilates.jpeg"
  },
  {
    image: "/reformer pilates studio branding.jpeg"
  }
];

const fallbackGalleryImages = [
  {
    src: "/Studio Glide Pilates.jpeg",
    alt: "Минималистично Reformer Pilates студио"
  },
  {
    src: "/Mantyhose Çorap.jpeg",
    alt: "Pilates детайл от тренировка"
  },
  {
    src: "/_.jpeg",
    alt: "Reset Body Lab Pilates атмосфера"
  }
];

const fallbackFaqs = [
  {
    question: "Подходящ ли е Reformer Pilates за начинаещи?",
    answer:
      "Да. Тренировката може да се адаптира според опита, силата и мобилността на клиента."
  },
  {
    question: "Колко продължава една тренировка?",
    answer: "Стандартната процедура в Reset Body Lab е 50 минути."
  },
  {
    question: "Колко места има в една група?",
    answer:
      "Студиото работи с 5 reformer легла, което помага групата да остане малка."
  },
  {
    question: "Как да запазя час?",
    answer:
      "Натисни бутон за резервация, избери свободен час и потвърди данните си в сайта."
  }
];

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
    hero_title?: unknown;
    hero_subtitle?: unknown;
    faq_items?: unknown;
    images?: unknown[];
    site_content?: unknown;
    phone?: unknown;
    email?: unknown;
    city?: unknown;
    address?: unknown;
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
  googleMapsUrl: string;
  instagramUsername: string;
  facebookUsername: string;
  tiktokUsername: string;
};

function defaultSiteContent(): SiteContent {
  return {
    benefits: {
      title: "Ползи",
      intro: "Какво ще постигнеш с Reformer Pilates?",
      items: [
        {
          id: "benefit-1",
          title: "Стойка и център",
          text: "По-стабилен корем, по-изправена линия на тялото и повече контрол в ежедневните движения."
        },
        {
          id: "benefit-2",
          title: "Сила без грубост",
          text: "Пружинното съпротивление натоварва мускулите плавно, без усещане за хаотична тренировка."
        },
        {
          id: "benefit-3",
          title: "Лекота и мобилност",
          text: "Работиш за разтягане, координация и дишане в темпо, което позволява на тялото да се отпусне."
        }
      ]
    },
    reformer: {
      title: "Контролирано движение, което се усеща спокойно.",
      subtitle: "Reformer Pilates",
      body:
        "Reformer Pilates използва специализирано легло с пружинно съпротивление, за да съчетае сила, контрол, разтягане и прецизна техника в една плавна тренировка."
    },
    audience: {
      title: "За различни тела, различен опит и различен ден.",
      intro:
        "Тренировката е гъвкава и може да бъде спокойна, възстановяваща или по-интензивна според нуждите ти.",
      items: [
        "Начинаещи, които искат ясен и спокоен старт",
        "Хора със заседнал режим и напрежение в гърба",
        "Напреднали, които търсят по-прецизен контрол",
        "Всеки, който иска стегната фигура без хаотични тренировки"
      ],
      outro: ""
    },
    whyChooseUs: {
      title: "Малка група, повече внимание.",
      intro: "",
      items: [
        "5 reformer легла",
        "50 минути",
        "Ясен ритъм"
      ],
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
          price: "по запитване",
          text: "Подходящо за първи час или гъвкав график."
        },
        {
          id: "price-2",
          name: "Пакет 4 тренировки",
          price: "по запитване",
          text: "За плавен старт и видим ритъм в практиката."
        },
        {
          id: "price-3",
          name: "Пакет 8 тренировки",
          price: "по запитване",
          text: "За постоянство, по-добра стойка и устойчив резултат."
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
      title: "Тиха, чиста визуална среда за фокус.",
      subtitle: "Атмосфера",
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
      if (!name && !price && !text) return null;
      return {
        id: normalizeString(item.id) || `price-${index + 1}`,
        name,
        price,
        text
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

function normalizeSiteContent(raw: unknown) {
  const fallback = defaultSiteContent();
  const content = isRecord(raw) ? raw : {};

  return {
    benefits: {
      title: normalizeString(content.benefits && isRecord(content.benefits) ? content.benefits.title : undefined) || fallback.benefits.title,
      intro: normalizeString(content.benefits && isRecord(content.benefits) ? content.benefits.intro : undefined) || fallback.benefits.intro,
      items: normalizeBenefitItems(
        content.benefits && isRecord(content.benefits) ? content.benefits.items : undefined,
        fallback.benefits.items
      )
    },
    reformer: {
      title: normalizeString(content.reformer && isRecord(content.reformer) ? content.reformer.title : undefined) || fallback.reformer.title,
      subtitle: normalizeString(content.reformer && isRecord(content.reformer) ? content.reformer.subtitle : undefined) || fallback.reformer.subtitle,
      body: normalizeString(content.reformer && isRecord(content.reformer) ? content.reformer.body : undefined) || fallback.reformer.body
    },
    audience: {
      title: normalizeString(content.audience && isRecord(content.audience) ? content.audience.title : undefined) || fallback.audience.title,
      intro: normalizeString(content.audience && isRecord(content.audience) ? content.audience.intro : undefined) || fallback.audience.intro,
      items: normalizeStringList(
        content.audience && isRecord(content.audience) ? content.audience.items : undefined,
        fallback.audience.items
      ),
      outro: normalizeString(content.audience && isRecord(content.audience) ? content.audience.outro : undefined) || fallback.audience.outro
    },
    whyChooseUs: {
      title: normalizeString(content.whyChooseUs && isRecord(content.whyChooseUs) ? content.whyChooseUs.title : undefined) || fallback.whyChooseUs.title,
      intro: normalizeString(content.whyChooseUs && isRecord(content.whyChooseUs) ? content.whyChooseUs.intro : undefined) || fallback.whyChooseUs.intro,
      items: normalizeStringList(
        content.whyChooseUs && isRecord(content.whyChooseUs) ? content.whyChooseUs.items : undefined,
        fallback.whyChooseUs.items
      ),
      outro: normalizeString(content.whyChooseUs && isRecord(content.whyChooseUs) ? content.whyChooseUs.outro : undefined) || fallback.whyChooseUs.outro
    },
    pricing: {
      title: normalizeString(content.pricing && isRecord(content.pricing) ? content.pricing.title : undefined) || fallback.pricing.title,
      intro: normalizeString(content.pricing && isRecord(content.pricing) ? content.pricing.intro : undefined) || fallback.pricing.intro,
      items: normalizePriceItems(
        content.pricing && isRecord(content.pricing) ? content.pricing.items : undefined,
        fallback.pricing.items
      ),
      note: normalizeString(content.pricing && isRecord(content.pricing) ? content.pricing.note : undefined) || fallback.pricing.note
    },
    instructors: {
      title: normalizeString(content.instructors && isRecord(content.instructors) ? content.instructors.title : undefined) || fallback.instructors.title,
      subtitle: normalizeString(content.instructors && isRecord(content.instructors) ? content.instructors.subtitle : undefined) || fallback.instructors.subtitle,
      body: normalizeString(content.instructors && isRecord(content.instructors) ? content.instructors.body : undefined) || fallback.instructors.body
    },
    gallery: {
      title: normalizeString(content.gallery && isRecord(content.gallery) ? content.gallery.title : undefined) || fallback.gallery.title,
      subtitle: normalizeString(content.gallery && isRecord(content.gallery) ? content.gallery.subtitle : undefined) || fallback.gallery.subtitle,
      body: normalizeString(content.gallery && isRecord(content.gallery) ? content.gallery.body : undefined) || fallback.gallery.body
    },
    contact: {
      title: normalizeString(content.contact && isRecord(content.contact) ? content.contact.title : undefined) || fallback.contact.title,
      subtitle: normalizeString(content.contact && isRecord(content.contact) ? content.contact.subtitle : undefined) || fallback.contact.subtitle,
      body: normalizeString(content.contact && isRecord(content.contact) ? content.contact.body : undefined) || fallback.contact.body
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

function toSocialUrl(platform: "instagram" | "facebook" | "tiktok", value: string) {
  const normalized = value.trim();
  if (!normalized) return "";
  if (/^https?:\/\//i.test(normalized)) return normalized;
  const handle = normalized.replace(/^@/, "");
  if (platform === "instagram") return `https://instagram.com/${handle}`;
  if (platform === "facebook") return `https://facebook.com/${handle}`;
  return `https://tiktok.com/@${handle}`;
}

async function loadPageContent(): Promise<PageContent> {
  const fallback = defaultSiteContent();
  const engineUrl = process.env.NEXT_PUBLIC_ENGINE_URL?.trim();
  const salonSlug = process.env.NEXT_PUBLIC_SALON_SLUG?.trim();
  const apiKey = process.env.NEXT_PUBLIC_BOOKING_API_KEY?.trim();

  if (!engineUrl || !salonSlug) {
    return {
      salonName: "Reset Body Lab Pilates",
      heroTitle: "Reformer Pilates за сила, стойка и лекота.",
      heroSubtitle: fallback.reformer.body,
      about: fallback.reformer.body,
      faqItems: fallbackFaqs.map((item, index) => ({ id: `fallback-faq-${index + 1}`, ...item })),
      siteContent: fallback,
      galleryImages: fallbackGalleryImages,
      phone: "",
      email: "",
      city: "",
      address: "",
      googleMapsUrl: "",
      instagramUsername: "",
      facebookUsername: "",
      tiktokUsername: ""
    };
  }

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
    const siteContent = normalizeSiteContent(salon.site_content);

    const remoteImageUrls = Array.isArray(salon.images)
      ? salon.images
          .map((image) => normalizeString(image))
          .filter(Boolean)
          .slice(0, 6)
      : [];

    const version =
      remoteImageUrls.length > 0 ? buildGalleryVersion(remoteImageUrls) : "";

    const galleryImages =
      remoteImageUrls.length > 0
        ? remoteImageUrls.map((src, index) => ({
            src: toGalleryImageSrc(src, version),
            alt: `${normalizeString(salon.name) || "Reset Body Lab"} gallery image ${index + 1}`,
            version
          }))
        : fallbackGalleryImages;

    return {
      salonName: normalizeString(salon.name) || "Reset Body Lab Pilates",
      heroTitle:
        normalizeString(salon.hero_title) ||
        "Reformer Pilates за сила, стойка и лекота.",
      heroSubtitle:
        normalizeString(salon.hero_subtitle) ||
        normalizeString(salon.about) ||
        siteContent.reformer.body,
      about: normalizeString(salon.about) || siteContent.reformer.body,
      faqItems: normalizeFaqItems(salon.faq_items, fallbackFaqs.map((item, index) => ({ id: `fallback-faq-${index + 1}`, ...item }))),
      siteContent,
      galleryImages,
      phone: normalizeString(salon.phone),
      email: normalizeString(salon.email),
      city: normalizeString(salon.city),
      address: normalizeString(salon.address),
      googleMapsUrl: normalizeString(salon.google_maps_url),
      instagramUsername: normalizeString(salon.instagram_username),
      facebookUsername: normalizeString(salon.facebook_username),
      tiktokUsername: normalizeString(salon.tiktok_username)
    };
  } catch {
    return {
      salonName: "Reset Body Lab Pilates",
      heroTitle: "Reformer Pilates за сила, стойка и лекота.",
      heroSubtitle: fallback.reformer.body,
      about: fallback.reformer.body,
      faqItems: fallbackFaqs.map((item, index) => ({ id: `fallback-faq-${index + 1}`, ...item })),
      siteContent: fallback,
      galleryImages: fallbackGalleryImages,
      phone: "",
      email: "",
      city: "",
      address: "",
      googleMapsUrl: "",
      instagramUsername: "",
      facebookUsername: "",
      tiktokUsername: ""
    };
  }
}

export default async function HomePage() {
  const pageContent = await loadPageContent();
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
  ].filter((item) => item.href);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${pageContent.salonName} начало`}>
          <Image
            src="/logo.svg"
            alt={pageContent.salonName}
            width={78}
            height={78}
            priority
          />
        </a>
        <nav aria-label="Основна навигация">
          <a href="#reformer">Reformer Pilates</a>
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Цени</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Контакт</a>
        </nav>
        <PrimaryBookingButton />
      </header>

      <section id="top" className="hero">
        <Image
          className="hero__image"
          src="/reset-body-lab-hero.jpg"
          alt={`Reformer Pilates тренировка в ${pageContent.salonName}`}
          fill
          sizes="100vw"
          priority
        />
        <div className="hero__copy">
          <p className="eyebrow">{pageContent.salonName}</p>
          <h1>{pageContent.heroTitle}</h1>
          <p>{pageContent.heroSubtitle}</p>
          <div className="hero__actions">
            <PrimaryBookingButton />
            <a className="btn btn-light" href="#reformer">
              Научи повече
            </a>
          </div>
        </div>
      </section>

      <section className="studio-facts" aria-label="Бърза информация">
        <div>
          <strong>50</strong>
          <span>50 минути</span>
        </div>
        <div>
          <strong>5</strong>
          <span>5 reformer легла</span>
        </div>
        <div>
          <strong>малка</strong>
          <span>Малка група</span>
        </div>
      </section>

      <section id="reformer" className="intro-section">
        <div className="section-copy">
          <p className="section-label">{pageContent.siteContent.reformer.subtitle}</p>
          <h2>{pageContent.siteContent.reformer.title}</h2>
          <p>{pageContent.siteContent.reformer.body}</p>
        </div>
        <aside className="studio-note">
          <span>Фокусът е върху качеството на повторението, не върху бързането.</span>
          <p>{pageContent.about}</p>
        </aside>
      </section>

      <section className="benefits-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">{pageContent.siteContent.benefits.title}</p>
          <h2>По-малко шум. Повече усещане в тялото.</h2>
          <p>{pageContent.siteContent.benefits.intro}</p>
        </div>
        <div className="benefit-stories">
          {pageContent.siteContent.benefits.items.slice(0, benefitCards.length).map((benefit, index) => (
            <article className="benefit-story" key={benefit.id}>
              <Image
                src={benefitCards[index]?.image || benefitCards[0].image}
                alt={benefit.title}
                width={760}
                height={860}
                sizes="(max-width: 1040px) 100vw, 33vw"
              />
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="suitable-section">
        <div className="section-copy">
          <p className="section-label">Подходящо за</p>
          <h2>{pageContent.siteContent.audience.title}</h2>
          <p>{pageContent.siteContent.audience.intro}</p>
        </div>
        <div className="list-panel">
          {pageContent.siteContent.audience.items.map((item) => (
            <div key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">Студиото</p>
          <h2>{pageContent.siteContent.whyChooseUs.title}</h2>
          {pageContent.siteContent.whyChooseUs.intro ? (
            <p>{pageContent.siteContent.whyChooseUs.intro}</p>
          ) : null}
        </div>
        <div className="steps-section">
          {pageContent.siteContent.whyChooseUs.items.map((item, index) => (
            <article key={`${item}-${index}`}>
              <h3>{item}</h3>
              <p>{index === 0 ? "Групите остават малки, за да има внимание към техника, темпо и правилно изпълнение." : index === 1 ? "Форматът е достатъчно стегнат за графика ти и достатъчно пълен за реална работа." : "Избираш свободен час директно в сайта и запазваш мястото си без допълнителни стъпки."}</p>
            </article>
          ))}
        </div>
        {pageContent.siteContent.whyChooseUs.outro ? (
          <div className="section-copy section-copy--center">
            <p>{pageContent.siteContent.whyChooseUs.outro}</p>
          </div>
        ) : null}
      </section>

      <section id="booking" className="reservation-section">
        <div className="reservation-panel">
          <div>
            <p className="section-label">Резервация</p>
            <h2>Запази своето легло.</h2>
            <p>
              Избери свободен час и потвърди резервацията си директно тук, без
              излишни стъпки.
            </p>
          </div>
          <ServiceBookingCard />
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">Пакети</p>
          <h2>{pageContent.siteContent.pricing.title}</h2>
          <p>{pageContent.siteContent.pricing.intro}</p>
        </div>
        <div className="pricing-grid">
          {pageContent.siteContent.pricing.items.map((item) => (
            <article key={item.id}>
              <h3>{item.name}</h3>
              <p className="price">{item.price || "по запитване"}</p>
              <p>{item.text}</p>
              <PrimaryBookingButton>Запази</PrimaryBookingButton>
            </article>
          ))}
        </div>
        {pageContent.siteContent.pricing.note ? (
          <div className="section-copy section-copy--center">
            <p>{pageContent.siteContent.pricing.note}</p>
          </div>
        ) : null}
      </section>

      <section className="instructors-section">
        <div className="section-copy">
          <p className="section-label">{pageContent.siteContent.instructors.subtitle}</p>
          <h2>{pageContent.siteContent.instructors.title}</h2>
          <p>{pageContent.siteContent.instructors.body}</p>
        </div>
        <div className="instructor-grid">
          {instructorCards.map((item, index) => (
            <article key={`${item.image}-${index}`}>
              <Image
                src={item.image}
                alt={pageContent.salonName}
                width={960}
                height={600}
                sizes="(max-width: 1040px) 100vw, 50vw"
              />
              <h3>{index === 0 ? `${pageContent.salonName} екип` : "Персонално внимание"}</h3>
              <p>{index === 0 ? "Reformer Pilates" : "Корекция на техника"}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">{pageContent.siteContent.gallery.subtitle}</p>
          <h2>{pageContent.siteContent.gallery.title}</h2>
          {pageContent.siteContent.gallery.body ? <p>{pageContent.siteContent.gallery.body}</p> : null}
        </div>
        <div className="gallery-grid" aria-label={`${pageContent.salonName} галерия`}>
          {pageContent.galleryImages.map((image) => (
            <Image
              key={`${image.src}-${image.version ?? "local"}`}
              src={image.src}
              alt={image.alt}
              width={900}
              height={1100}
              sizes="(max-width: 1040px) 100vw, 33vw"
            />
          ))}
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-copy section-copy--center">
          <p className="section-label">FAQ</p>
          <h2>Често задавани въпроси</h2>
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

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <span>{pageContent.salonName}</span>
          <h2>{pageContent.siteContent.contact.title}</h2>
          <p>{pageContent.siteContent.contact.subtitle}</p>
          {contactLines.length > 0 ? (
            <p>{contactLines.join(" • ")}</p>
          ) : null}
          <div className="contact-meta">
            {pageContent.phone ? (
              <a className="contact-link" href={`tel:${pageContent.phone.replace(/\s/g, "")}`}>
                <Phone size={18} strokeWidth={2} />
                <span>{pageContent.phone}</span>
              </a>
            ) : null}
            {pageContent.googleMapsUrl ? (
              <a className="contact-link" href={pageContent.googleMapsUrl} target="_blank" rel="noreferrer">
                <MapPinned size={18} strokeWidth={2} />
                <span>Google Maps</span>
              </a>
            ) : null}
          </div>
          {socialLinks.length > 0 ? (
            <div className="social-links" aria-label="Social media">
              {socialLinks.map((item) => (
                <a key={item.label} className="social-link" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          ) : null}
          <div className="hero__actions">
            <PrimaryBookingButton>Резервирай сега</PrimaryBookingButton>
            {pageContent.googleMapsUrl ? (
              <a className="btn btn-light" href={pageContent.googleMapsUrl} target="_blank" rel="noreferrer">
                Отвори карта
              </a>
            ) : null}
          </div>
        </div>
        <ConsentMap
          title={`${pageContent.salonName} Google Maps`}
          src={mapSrc}
        />
      </section>

      <section className="final-cta">
        <h2>Готова ли си да започнеш?</h2>
        <p>Избери свободен час и запази едно от петте reformer легла.</p>
        <PrimaryBookingButton>Запази час</PrimaryBookingButton>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <span>{pageContent.salonName}</span>
          <p>Minimalist Reformer Pilates experience with modern booking and client-managed content.</p>
        </div>
        <div className="site-footer__links">
          <Link href="/privacy-policy">Поверителност</Link>
          <Link href="/terms">Общи условия</Link>
          <Link href="/cookies">Бисквитки</Link>
        </div>
        {socialLinks.length > 0 ? (
          <div className="social-links social-links--footer" aria-label="Footer social media">
            {socialLinks.map((item) => (
              <a key={`footer-${item.label}`} className="social-link" href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        ) : null}
      </footer>
    </main>
  );
}
