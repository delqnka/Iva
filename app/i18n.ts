export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];
export type LegalPageKey = "privacy" | "terms" | "cookies";
export type ReturnPageKey = "success" | "cancel";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname?: string | null): Locale {
  if (!pathname) return "bg";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "bg";
}

export function localizedPath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "bg") return normalized;
  return normalized === "/" ? "/en" : `/en${normalized}`;
}

export const homeCopy = {
  bg: {
    localeLabel: "Език",
    nav: {
      reformer: "Реформър пилатес",
      gallery: "Галерия",
      pricing: "Цени",
      faq: "FAQ",
      contact: "Контакт"
    },
    headerHomeLabel: "начало",
    learnMore: "Виж студиото",
    quickInfoLabel: "Бърза информация",
    highlights: [
      {
        value: "Квартал Чайка,",
        label: "гр. Варна",
        detail: ""
      },
      {
        value: "50 мин",
        label: "тренировка",
        detail: ""
      },
      {
        value: "5",
        label: "реформър легла",
        detail: ""
      }
    ],
    studioNoteTitle:
      "Подходящо както за начинаещи, така и за хора с повече опит.",
    studioNoteHighlights: [
      "Контролирано движение",
      "Регулируемо съпротивление",
      "Щадящо ставите натоварване"
    ],
    benefitsHeading: "Сила, стойка и контрол.",
    audienceLabel: "Подходящо за",
    studioLabel: "Студиото",
    whyStepDescriptions: [
      "Групите остават малки, за да има внимание към техника, темпо и правилно изпълнение.",
      "Форматът е достатъчно стегнат за графика ти и достатъчно пълен за реална работа.",
      "Избираш свободен час директно в сайта и запазваш мястото си без допълнителни стъпки."
    ],
    bookingLabel: "Резервация",
    bookingTitle: "Запази час.",
    bookingBody:
      "Избери удобен час и запази мястото си директно през сайта.",
    pricingLabel: "Пакети",
    bookCta: "Запази",
    faqTitle: "Често задавани въпроси",
    socialMediaLabel: "Социални мрежи",
    mapLabel: "Google Maps",
    reserveNow: "Резервирай сега",
    openMap: "Отвори карта",
    workingHoursLabel: "Работно време",
    workingHoursValue: "Понеделник - събота · 09:00 - 19:00",
    finalCtaTitle: "Готова ли си да започнеш?",
    finalCtaBody: "Избери свободен час и запази едно от петте реформър легла.",
    footerTagline:
      "Модерно студио за реформър пилатес с 5 легла, онлайн резервация и персонално внимание към всяка тренировка.",
    legalLinks: {
      privacy: "Поверителност",
      terms: "Общи условия",
      cookies: "Бисквитки"
    },
    galleryAltStudio: "Минималистично студио за реформър пилатес",
    galleryAltDetail: "Pilates детайл от тренировка",
    galleryAltAtmosphere: "Reset Body Lab Pilates атмосфера",
    galleryImageAlt: "галерия",
    heroImageAltPrefix: "Реформър пилатес тренировка в",
    instructorsTeam: "екип",
    instructorsSupport: "Персонално внимание",
    instructorsSupportBody: "Корекция на техника"
  },
  en: {
    localeLabel: "Language",
    nav: {
      reformer: "Reformer Pilates",
      gallery: "Gallery",
      pricing: "Pricing",
      faq: "FAQ",
      contact: "Contact"
    },
    headerHomeLabel: "home",
    learnMore: "See the studio",
    quickInfoLabel: "Quick overview",
    highlights: [
      {
        value: "Chaika",
        label: "Varna",
        detail: ""
      },
      {
        value: "50 min",
        label: "session",
        detail: ""
      },
      {
        value: "5",
        label: "5 reformer beds",
        detail: ""
      }
    ],
    studioNoteTitle:
      "Small format, clear guidance, and attention to every movement.",
    studioNoteHighlights: [
      "Reformer Pilates in a small group",
      "50 minutes of focused movement",
      "Booking directly on the site"
    ],
    benefitsHeading: "Strength, posture, and control.",
    audienceLabel: "Ideal for",
    studioLabel: "The studio",
    whyStepDescriptions: [
      "Groups stay intentionally small so there is more attention to technique, pace, and correct execution.",
      "The format is concise enough for a real schedule and full enough to deliver meaningful work.",
      "You choose a free slot directly on the site and reserve your place without extra steps."
    ],
    bookingLabel: "Booking",
    bookingTitle: "Book your session.",
    bookingBody:
      "Choose a convenient time and reserve your place directly on the site.",
    pricingLabel: "Packages",
    bookCta: "Book now",
    faqTitle: "Frequently asked questions",
    socialMediaLabel: "Social media",
    mapLabel: "Google Maps",
    reserveNow: "Reserve now",
    openMap: "Open map",
    workingHoursLabel: "Working hours",
    workingHoursValue: "Monday - Saturday · 09:00 - 19:00",
    finalCtaTitle: "Ready to begin?",
    finalCtaBody: "Choose an available time and reserve one of the five reformer beds.",
    footerTagline:
      "A modern reformer pilates studio with 5 beds, online booking, and personal attention in every session.",
    legalLinks: {
      privacy: "Privacy policy",
      terms: "Terms",
      cookies: "Cookie policy"
    },
    galleryAltStudio: "Minimalist Reformer Pilates studio",
    galleryAltDetail: "Pilates training detail",
    galleryAltAtmosphere: "Reset Body Lab Pilates atmosphere",
    galleryImageAlt: "gallery image",
    heroImageAltPrefix: "Reformer Pilates session at",
    instructorsTeam: "team",
    instructorsSupport: "Personal guidance",
    instructorsSupportBody: "Technique correction"
  }
} as const;

export const cookieBannerCopy = {
  bg: {
    title: "Бисквитки и външно съдържание",
    body:
      "Използваме само необходимите технологии за работата на сайта. Картата и бъдещи външни услуги се зареждат след съгласие.",
    reject: "Откажи",
    accept: "Приеми"
  },
  en: {
    title: "Cookies and external content",
    body:
      "We use only the essential technologies needed for the site to work. The map and any future external services load only after consent.",
    reject: "Decline",
    accept: "Accept"
  }
} as const;

export const mapConsentCopy = {
  bg: {
    title: "Картата е изключена до съгласие",
    body:
      "Google Maps е външна услуга и може да поставя cookies. Приеми функционалните cookies, за да я заредиш.",
    action: "Зареди картата"
  },
  en: {
    title: "The map is disabled until consent is given",
    body:
      "Google Maps is an external service and may place cookies. Accept functional cookies to load it.",
    action: "Load map"
  }
} as const;

export const bookingCardCopy = {
  bg: {
    ariaLabel: "Резервирай реформър пилатес 50 минути",
    topLabel: "Реформър пилатес",
    topMeta: "Квартал Чайка, Варна",
    duration: "50 минути",
    capacity: "5 реформър легла",
    body:
      "Малка група, ясен формат и директна онлайн резервация.",
    cta: "Запази час"
  },
  en: {
    ariaLabel: "Reserve a 50-minute reformer pilates class",
    topLabel: "Reformer Pilates",
    topMeta: "Chaika, Varna",
    duration: "50 minutes",
    capacity: "5 reformer beds",
    body:
      "Small group format, clear structure, and direct online booking.",
    cta: "Book session"
  }
} as const;

export const legalCopy = {
  bg: {
    shared: {
      back: "Към сайта",
      label: "Правна информация"
    },
    privacy: {
      title: "Политика за поверителност",
      intro:
        "Тази страница описва как {salonName} обработва лични данни при използване на сайта и формите за резервация.",
      sections: [
        {
          title: "Какви данни се обработват",
          body:
            "При онлайн резервация могат да бъдат обработвани име, телефон, имейл, избрана услуга и данни, свързани с часа за посещение."
        },
        {
          title: "За какво се използват",
          body:
            "Данните се използват за потвърждение на резервации, връзка с клиента, организация на графика и обслужване на запитвания."
        },
        {
          title: "Срок на съхранение",
          body:
            "Данните се съхраняват само доколкото е необходимо за услугата, счетоводни и законови изисквания или защита на легитимни интереси."
        },
        {
          title: "Права на потребителите",
          body:
            "Всеки потребител има право на достъп, корекция, ограничаване, възражение и изтриване, когато това е приложимо по закон."
        },
        {
          title: "Контакт",
          body:
            "За въпроси относно личните данни можеш да се свържеш с {contact}."
        }
      ],
      note:
        "Текстът е базова правна рамка и е добре да бъде прегледан от юрист според конкретната фирма, платежни процеси и вътрешни политики."
    },
    terms: {
      title: "Общи условия",
      intro:
        "Настоящият сайт предоставя информация за услугите на {salonName} и възможност за онлайн заявка или резервация.",
      sections: [
        {
          title: "Резервации",
          body:
            "Подаването на резервация през сайта не освобождава клиента от задължението да предостави коректни данни и да спази потвърдения час."
        },
        {
          title: "Промени и отмяна",
          body:
            "Студиото може да изисква предварително известие при отмяна или пренасрочване според актуалната си политика."
        },
        {
          title: "Съдържание и отговорност",
          body:
            "Информацията в сайта се поддържа актуална, но е възможно да има временни разлики в цени, наличности или график."
        },
        {
          title: "Контакт",
          body: "За въпроси по условията и записванията: {contact}."
        }
      ],
      note:
        "Това е работеща базова версия. При ваучери, абонаменти, онлайн плащания или специални cancellation правила е добре текстът да се финализира с юрист."
    },
    cookies: {
      title: "Политика за бисквитки",
      intro:
        "Сайтът на {salonName} използва само необходимите технологии за работа на основните функции и външни услуги при изрично съгласие.",
      sections: [
        {
          title: "Необходими",
          body:
            "Те са нужни за базовата работа на сайта и резервационния поток."
        },
        {
          title: "Функционални и външни услуги",
          body:
            "Google Maps и бъдещи външни вграждания могат да поставят свои cookies едва след съгласие от посетителя."
        },
        {
          title: "Управление на избора",
          body:
            "При първо посещение се показва банер. Изборът може да бъде променен чрез изчистване на данните в браузъра или бъдещ control panel за cookies."
        },
        {
          title: "Контакт",
          body:
            "За въпроси относно cookies и поверителност: {contact}."
        }
      ]
    }
  },
  en: {
    shared: {
      back: "Back to site",
      label: "Legal information"
    },
    privacy: {
      title: "Privacy policy",
      intro:
        "This page explains how {salonName} processes personal data when you use the website and booking forms.",
      sections: [
        {
          title: "What data may be processed",
          body:
            "When booking online, the studio may process your name, phone number, email, selected service, and information related to the booked visit."
        },
        {
          title: "Why it is used",
          body:
            "The data is used to confirm bookings, contact the client, organise the schedule, and handle enquiries."
        },
        {
          title: "Retention period",
          body:
            "Data is stored only as long as needed for the service, accounting and legal obligations, or the protection of legitimate interests."
        },
        {
          title: "User rights",
          body:
            "Each user has the right to access, correct, restrict, object to, and request deletion of data where applicable under law."
        },
        {
          title: "Contact",
          body:
            "For questions about personal data, you can contact {contact}."
        }
      ],
      note:
        "This is a practical baseline legal text and should ideally be reviewed by a lawyer based on the specific company, payment flows, and internal policies."
    },
    terms: {
      title: "Terms and conditions",
      intro:
        "This website provides information about the services of {salonName} and the option to request or book services online.",
      sections: [
        {
          title: "Bookings",
          body:
            "Submitting a booking through the site does not remove the client's responsibility to provide correct details and attend the confirmed appointment."
        },
        {
          title: "Changes and cancellations",
          body:
            "The studio may require advance notice for cancellations or rescheduling according to its current policy."
        },
        {
          title: "Content and liability",
          body:
            "The information on the site is kept up to date, but temporary differences in prices, availability, or scheduling may still occur."
        },
        {
          title: "Contact",
          body: "For questions about the terms or bookings: {contact}."
        }
      ],
      note:
        "This is a working baseline version. If there are vouchers, memberships, online payments, or special cancellation rules, the text should be finalised with legal review."
    },
    cookies: {
      title: "Cookie policy",
      intro:
        "The website of {salonName} uses only the essential technologies needed for core functions and external services after explicit consent.",
      sections: [
        {
          title: "Essential cookies",
          body:
            "These are required for the basic operation of the site and the booking flow."
        },
        {
          title: "Functional and external services",
          body:
            "Google Maps and future external embeds may place their own cookies only after visitor consent."
        },
        {
          title: "Managing your choice",
          body:
            "A banner is shown on the first visit. The choice can be changed by clearing browser data or through a future cookie control panel."
        },
        {
          title: "Contact",
          body: "For questions about cookies and privacy: {contact}."
        }
      ]
    }
  }
} as const;

export const returnPageCopy = {
  bg: {
    success: {
      eyebrow: "Резервацията е приета",
      title: "Часът е запазен.",
      body: "Ще получиш потвърждение според настройките на Reset Body Lab.",
      cta: "Обратно към сайта"
    },
    cancel: {
      eyebrow: "Резервацията не е завършена",
      title: "Можеш да избереш друг час.",
      body: "Върни се към сайта и отвори резервацията отново, когато си готова.",
      cta: "Избери час"
    }
  },
  en: {
    success: {
      eyebrow: "Your booking was received",
      title: "Your session is reserved.",
      body: "You will receive a confirmation based on Reset Body Lab's booking settings.",
      cta: "Back to site"
    },
    cancel: {
      eyebrow: "The booking was not completed",
      title: "You can choose another time.",
      body: "Return to the site and open the booking flow again whenever you are ready.",
      cta: "Choose a time"
    }
  }
} as const;
