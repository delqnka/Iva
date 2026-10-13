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
      gallery: "Студио",
      team: "Екип",
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
    pricingLabel: "Цени и пакети",
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
      gallery: "Studio",
      team: "Team",
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
    pricingLabel: "Pricing and packages",
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
        "Reset Body Lab Pilates & Reformer Studio се управлява от Стрива ЕООД, ЕИК 208958117. Дата на влизане в сила: 12.10.2026. Настоящата Политика за поверителност пояснява как събираме, използваме, разкриваме и защитаваме вашата информация, когато посещавате нашия уебсайт и ползвате нашите услуги.",
      sections: [
        {
          title: "Информация, която събираме",
          body:
            "Може да събираме лична информация като име, имейл адрес, телефонен номер, пощенски адрес и данни за плащане, когато резервирате сесия или се регистрирате за нашите услуги. Ако е приложимо, може да обработваме и информация за акаунт, както и доброволно предоставени данни за фитнес цели, травми или медицински състояния, свързани с тренировките."
        },
        {
          title: "Технически данни и бисквитки",
          body:
            "Нашият уебсайт може да обработва технически данни като IP адрес, тип браузър, информация за устройството и данни за използването, включително чрез бисквитки и подобни технологии. Бисквитките се използват за подобряване на потребителското преживяване и анализ на трафика, като можете да ги управлявате от настройките на браузъра си."
        },
        {
          title: "Как използваме вашата информация",
          body:
            "Използваме информацията, за да предоставяме и управляваме услугите по пилатес, включително резервации и плащания; да комуникираме с вас относно класове, график, актуализации, промоции и подходящо съдържание за социалните ни канали; да подобряваме сайта, услугите и клиентското преживяване; както и да спазваме законови задължения и да защитаваме бизнеса си от измами или злоупотреби."
        },
        {
          title: "Как споделяме вашата информация",
          body:
            "Не продаваме вашата лична информация. Може да споделяме данни с доставчици на услуги, които ни помагат да обработваме плащания, резервации, комуникации или имейл маркетинг, както и с правни органи, когато това се изисква от закона, за спазване на правна процедура или за защита на нашите права."
        },
        {
          title: "Сигурност и съхранение на данните",
          body:
            "Прилагаме разумни технически и организационни мерки за защита на личната информация от неоторизиран достъп, промяна, разкриване или унищожаване. Данните се съхраняват само доколкото е необходимо за предоставяне на услугата, счетоводни и законови изисквания или защита на легитимни интереси. Никой метод за предаване по интернет обаче не е 100% сигурен."
        },
        {
          title: "Вашите права и избор",
          body:
            "В зависимост от приложимото право може да имате право да достъпвате, коригирате или изтривате личните си данни; да се откажете от маркетингови съобщения; както и да ограничите или възразите срещу определено обработване. За да упражните тези права, свържете се с нас на {contact}."
        },
        {
          title: "Връзки към трети страни и промени",
          body:
            "Нашият сайт може да съдържа връзки към сайтове на трети страни. Не носим отговорност за техните практики за защита на личните данни и препоръчваме да прегледате техните политики. Може периодично да актуализираме тази Политика за поверителност, като промените ще бъдат публикувани на тази страница."
        },
        {
          title: "Контакт",
          body:
            "Ако имате въпроси относно тази Политика за поверителност, моля, свържете се с нас на: {contact}."
        }
      ],
      note:
        "Този текст е изготвен според предоставената информация за студиото и е препоръчително да бъде финално прегледан от юрист."
    },
    terms: {
      title: "Общи условия",
      intro:
        "Reset Body Lab Pilates & Reformer Studio се управлява от Стрива ЕООД, ЕИК 208958117. Дата на влизане в сила: 12.10.2026. Настоящите Общи условия уреждат използването на нашия уебсайт и участието Ви в нашите услуги. С достъпа до сайта или резервирането на услуга Вие се съгласявате с тези условия.",
      sections: [
        {
          title: "1. Резервация и плащане",
          body:
            "Всички класове и сесии трябва да бъдат резервирани предварително чрез нашия уебсайт, системата за резервации или по телефон с предоставяне на необходимите клиентски данни. Плащането се изисква в момента на резервацията, освен ако не е посочено друго. Приемаме плащания чрез Stripe, по банков път и в брой. Клиентът носи отговорност да предостави коректни данни и да спази потвърдения час."
        },
        {
          title: "2. Политика за отмяна и възстановяване",
          body:
            "При отмяна най-малко 24 часа преди насрочената сесия клиентът получава 100% възстановяване на сумата или възможност за пренасрочване без допълнително таксуване. При резервация с пакет или абонаментен план използваният кредит се възстановява към плана."
        },
        {
          title: "3. Частично възстановяване",
          body:
            "За класове между 7:30 и 13:00 ч. при отмяна между 12 и 24 часа преди сесията се възстановяват 50% от заплатената сума. За класове между 13:00 и 19:00 ч. при отмяна между 6 и 24 часа преди сесията се възстановяват 50% от заплатената сума. При резервации с пакет или абонаментен план, направени в тези срокове, кредитът не се губи и може да бъде използван отново според условията на плана."
        },
        {
          title: "4. Късна отмяна и неявяване",
          body:
            "За класове между 7:30 и 13:00 ч. при отмяна по-малко от 12 часа преди сесията не се дължи възстановяване на сумата. За класове между 13:00 и 19:00 ч. при отмяна по-малко от 6 часа преди сесията не се дължи възстановяване на сумата. При резервация с пакет или абонаментен план в тези случаи се отнема един кредит за посещение от плана. Неявяването за клас се третира като късна отмяна."
        },
        {
          title: "5. Пренасрочване, пакети и абонаменти",
          body:
            "Клиентите могат да пренасрочат сесията си най-малко 12 часа предварително без санкция, когато има свободни места в графика. Искания за пренасрочване, направени по-малко от 12 часа преди сесията, се считат за късна отмяна. Възстановяване за неизползвани пакетни класове е възможно в рамките на 7 дни от покупката, при условие че не са използвани сесии. При уведомление можете да заявите удължаване на валидността на план с 10 календарни дни срещу такса от 15 евро."
        },
        {
          title: "6. Промени от страна на студиото",
          body:
            "Reset Body Lab си запазва правото да отменя или пренасрочва сесии при организационна необходимост, заболяване на инструктор, технически проблем или друга обективна причина, като уведомява клиентите възможно най-скоро. В такива случаи клиентът получава възможност за пренасрочване или възстановяване съгласно приложимите условия."
        },
        {
          title: "7. Здраве и безопасност",
          body:
            "Клиентите трябва да се консултират с лекар преди участие във фитнес програма, когато имат здравословни съмнения, травми, медицински състояния или ограничения. С участието си в класовете потвърждавате, че сте физически способни да изпълнявате пилатес упражнения и се съгласявате да информирате студиото за релевантни медицински състояния или травми преди посещение."
        },
        {
          title: "8. Кодекс за поведение",
          body:
            "Клиентите трябва да уважават инструкторите и другите участници по всяко време. Неприемливо поведение може да доведе до отказ, спиране или прекратяване на услугите без възстановяване на сумата. По време на сесиите се изискват подходящо облекло, лична хигиена и спазване на инструкциите за безопасност."
        },
        {
          title: "9. Интелектуална собственост",
          body:
            "Цялото съдържание на нашия уебсайт, включително текст, изображения и видеоклипове, е собственост на Reset Body Lab или се използва с право на ползване. Не можете да копирате, разпространявате или възпроизвеждате материали без предварително писмено съгласие."
        },
        {
          title: "10. Поверителност и отговорност",
          body:
            "Вашата лична информация се обработва съгласно нашата Политика за поверителност. Reset Body Lab не носи отговорност за загуба или повреда на лични вещи в помещенията, нито за травми, щети или здравословни усложнения, възникнали в резултат на участие в услугите, освен в случаите, предвидени от приложимото законодателство. Отговорността на студиото е ограничена до сумата, заплатена за конкретната услуга, доколкото това е допустимо по закон."
        },
        {
          title: "11. Приложимо право и промени",
          body:
            "Настоящите Общи условия се регулират от законите на Република България. Всички спорове ще се разрешават от компетентните съдилища във Варна, България. Reset Body Lab си запазва правото да актуализира тези условия по всяко време, като продължителното използване на услугите представлява приемане на актуализираните условия."
        },
        {
          title: "Контакт",
          body: "Ако имате въпроси относно настоящите Общи условия или политиката за възстановяване на суми, моля, свържете се с нас на: {contact}. Благодарим Ви, че избрахте Reset Body Lab."
        }
      ],
      note:
        "Този текст е изготвен според предоставената информация за студиото и е препоръчително да бъде финално прегледан от юрист."
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
        "Reset Body Lab Pilates & Reformer Studio is operated by Striva EOOD, UIC 208958117. Effective date: 12.10.2026. This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website and use our services.",
      sections: [
        {
          title: "Information we collect",
          body:
            "We may collect personal information such as your name, email address, phone number, postal address, and payment details when you book a session or register for our services. Where applicable, we may also process account information and health or fitness details that you voluntarily provide, such as fitness goals, injuries, or medical conditions relevant to your training."
        },
        {
          title: "Technical data and cookies",
          body:
            "Our website may process technical data such as IP address, browser type, device information, and usage data, including through cookies and similar technologies. Cookies may be used to improve the user experience and analyse website traffic, and you can manage cookie settings through your browser."
        },
        {
          title: "How we use your information",
          body:
            "We use your information to provide and manage our Pilates services, including bookings and payments; to communicate with you about classes, schedules, updates, promotions, and relevant social media content; to improve our website, services, and client experience; and to comply with legal obligations and protect our business from fraud or misuse."
        },
        {
          title: "How we share your information",
          body:
            "We do not sell your personal information. We may share data with service providers who help us process payments, bookings, communications, or email marketing, and with legal authorities where required by law, legal process, or the protection of our rights."
        },
        {
          title: "Data security and retention",
          body:
            "We apply reasonable technical and organisational measures to protect personal information from unauthorised access, alteration, disclosure, or destruction. Data is retained only as long as necessary for the service, accounting and legal obligations, or legitimate business interests. However, no method of internet transmission is 100% secure."
        },
        {
          title: "Your rights and choices",
          body:
            "Depending on applicable law, you may have the right to access, correct, or delete your personal data; opt out of marketing communications; and restrict or object to certain processing. To exercise these rights, contact us at {contact}."
        },
        {
          title: "Third-party links and updates",
          body:
            "Our website may contain links to third-party websites. We are not responsible for their privacy practices and recommend reviewing their policies. We may update this Privacy Policy periodically, and changes will be posted on this page."
        },
        {
          title: "Contact",
          body:
            "If you have questions about this Privacy Policy, please contact us at: {contact}."
        }
      ],
      note:
        "This text was prepared based on the information provided by the studio and should ideally be reviewed by a lawyer before final use."
    },
    terms: {
      title: "Terms and conditions",
      intro:
        "Reset Body Lab Pilates & Reformer Studio is operated by Striva EOOD, UIC 208958117. Effective date: 12.10.2026. These Terms and Conditions govern the use of our website and participation in our services. By accessing the site or booking a service, you agree to these terms.",
      sections: [
        {
          title: "1. Booking and payment",
          body:
            "All classes and sessions must be booked in advance through our website, booking system, or by phone with the required client details. Payment is required at the time of booking unless otherwise stated. We accept payments through Stripe, bank transfer, and cash. Clients are responsible for providing accurate details and attending the confirmed session."
        },
        {
          title: "2. Cancellation and refund policy",
          body:
            "If a booking is cancelled at least 24 hours before the scheduled session, the client receives a 100% refund or may reschedule without additional charge. For bookings made with a package or membership plan, the used credit is restored to the plan."
        },
        {
          title: "3. Partial refunds",
          body:
            "For classes between 7:30 and 13:00, cancellations made between 12 and 24 hours before the session are eligible for a 50% refund. For classes between 13:00 and 19:00, cancellations made between 6 and 24 hours before the session are eligible for a 50% refund. For package or membership bookings cancelled within these time windows, the credit is not lost and may be used again according to the plan terms."
        },
        {
          title: "4. Late cancellations and no-shows",
          body:
            "For classes between 7:30 and 13:00, cancellations made less than 12 hours before the session are not eligible for a refund. For classes between 13:00 and 19:00, cancellations made less than 6 hours before the session are not eligible for a refund. For package or membership bookings, one visit credit is deducted from the plan in these cases. No-shows are treated as late cancellations."
        },
        {
          title: "5. Rescheduling, packages, and memberships",
          body:
            "Clients may reschedule a session at least 12 hours in advance without penalty, subject to availability. Rescheduling requests made less than 12 hours before the session are treated as late cancellations. Refunds for unused package classes are possible within 7 days of purchase, provided no sessions have been used. With prior notice, clients may request a 10-calendar-day extension of a plan's validity for a fee of 15 euros."
        },
        {
          title: "6. Changes by the studio",
          body:
            "Reset Body Lab reserves the right to cancel or reschedule sessions due to organisational needs, instructor illness, technical issues, or other objective reasons, notifying clients as soon as possible. In such cases, the client will be offered rescheduling or refund options according to the applicable terms."
        },
        {
          title: "7. Health and safety",
          body:
            "Clients should consult a doctor before participating in any fitness programme if they have health concerns, injuries, medical conditions, or limitations. By joining our classes, you confirm that you are physically able to perform Pilates exercises and agree to inform the studio of any relevant medical conditions or injuries before attending."
        },
        {
          title: "8. Code of conduct",
          body:
            "Clients must respect instructors and other participants at all times. Unacceptable behaviour may result in refusal, suspension, or termination of services without refund. Appropriate clothing, hygiene, and compliance with safety instructions are required during sessions."
        },
        {
          title: "9. Intellectual property",
          body:
            "All content on our website, including text, images, and videos, is owned by Reset Body Lab or used with permission. You may not copy, distribute, or reproduce materials without prior written consent."
        },
        {
          title: "10. Privacy and liability",
          body:
            "Your personal information is processed according to our Privacy Policy. Reset Body Lab is not responsible for loss or damage to personal belongings on the premises or for injuries, damage, or health complications arising from participation in the services, except where required by applicable law. The studio's liability is limited to the amount paid for the specific service, to the extent permitted by law."
        },
        {
          title: "11. Applicable law and changes",
          body:
            "These Terms and Conditions are governed by the laws of the Republic of Bulgaria. Disputes will be resolved by the competent courts in Varna, Bulgaria. Reset Body Lab reserves the right to update these terms at any time, and continued use of the services constitutes acceptance of the updated terms."
        },
        {
          title: "Contact",
          body: "If you have questions about these Terms and Conditions or the refund policy, please contact us at: {contact}. Thank you for choosing Reset Body Lab."
        }
      ],
      note:
        "This text was prepared based on the information provided by the studio and should ideally be reviewed by a lawyer before final use."
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
