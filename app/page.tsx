import Image from "next/image";
import { PrimaryBookingButton, ServiceBookingCard } from "./booking-actions";

const benefits = [
  {
    title: "Стойка и център",
    text: "По-стабилен корем, по-изправена линия на тялото и повече контрол в ежедневните движения.",
    image: "/Pilates Reformer Workout – Core & Leg Strength.jpeg"
  },
  {
    title: "Сила без грубост",
    text: "Пружинното съпротивление натоварва мускулите плавно, без усещане за хаотична тренировка.",
    image: "/AI Fitness Aesthetic – Pilates Reformer Workout.jpeg"
  },
  {
    title: "Лекота и мобилност",
    text: "Работиш за разтягане, координация и дишане в темпо, което позволява на тялото да се отпусне.",
    image: "/reformer pilates studio branding.jpeg"
  }
];

const suitableFor = [
  "Начинаещи, които искат ясен и спокоен старт",
  "Хора със заседнал режим и напрежение в гърба",
  "Напреднали, които търсят по-прецизен контрол",
  "Всеки, който иска стегната фигура без хаотични тренировки"
];

const whyUs = [
  {
    title: "Само 5 легла",
    text: "Групите остават малки, за да има внимание към техника, темпо и правилно изпълнение."
  },
  {
    title: "50 минути фокус",
    text: "Форматът е достатъчно стегнат за графика ти и достатъчно пълен за реална работа."
  },
  {
    title: "Лесна резервация",
    text: "Избираш свободен час директно в сайта и запазваш мястото си без допълнителни стъпки."
  }
];

const packages = [
  { name: "Единично посещение", price: "по запитване", note: "Подходящо за първи час или гъвкав график." },
  { name: "Пакет 4 тренировки", price: "по запитване", note: "За плавен старт и видим ритъм в практиката." },
  { name: "Пакет 8 тренировки", price: "по запитване", note: "За постоянство, по-добра стойка и устойчив резултат." }
];

const instructors = [
  {
    name: "Reset Body Lab екип",
    role: "Reformer Pilates",
    image: "/Studio Glide Pilates.jpeg"
  },
  {
    name: "Персонално внимание",
    role: "Корекция на техника",
    image: "/reformer pilates studio branding.jpeg"
  }
];

const galleryImages = [
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

const faqs = [
  {
    question: "Подходящ ли е Reformer Pilates за начинаещи?",
    answer:
      "Да. Тренировката може да се адаптира според опита, силата и мобилността на клиента."
  },
  {
    question: "Колко продължава една тренировка?",
    answer:
      "Стандартната процедура в Reset Body Lab е 50 минути."
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

export default function HomePage() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Reset Body Lab начало">
          <Image
            src="/logo.svg"
            alt="Reset Body Lab Pilates"
            width={78}
            height={78}
            priority
          />
        </a>
        <nav aria-label="Основна навигация">
          <a href="#reformer">Reformer Pilates</a>
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
          alt="Reformer Pilates тренировка в Reset Body Lab"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero__copy">
          <p className="eyebrow">Reset Body Lab Pilates</p>
          <h1>Reformer Pilates: най-модерната форма на пилатес</h1>
          <p>По-добра стойка. Повече сила. По-стегната фигура.</p>
          <div className="hero__actions">
            <PrimaryBookingButton />
            <a className="btn btn-light" href="#reformer">
              Научи повече
            </a>
          </div>
        </div>
      </section>

      <section className="booking-strip" aria-label="Бърза информация">
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
          <h2>За Reformer Pilates</h2>
          <p>
            Reformer Pilates използва специализирано легло с пружинно
            съпротивление, за да съчетае сила, контрол, разтягане и прецизна
            техника в една плавна тренировка.
          </p>
        </div>
        <div className="intro-card">
          <span>Движение с контрол</span>
          <p>
            Всяко упражнение се изпълнява с внимание към стойката, дишането и
            усещането в тялото.
          </p>
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-copy">
          <h2>Ползи</h2>
          <p>
            Вместо списък с обещания, фокусът е върху усещането след
            тренировката: по-ясна стойка, по-уверено движение и спокойно тяло.
          </p>
        </div>
        <div className="benefit-stories">
          {benefits.map((benefit) => (
            <article className="benefit-story" key={benefit.title}>
              <Image
                src={benefit.image}
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
          <h2>За кого е подходящ</h2>
          <p>
            Тренировката е гъвкава и може да бъде спокойна, възстановяваща или
            по-интензивна според нуждите ти.
          </p>
        </div>
        <div className="list-panel">
          {suitableFor.map((item) => (
            <div key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="section-copy">
          <h2>Защо да изберете нас</h2>
        </div>
        <div className="steps-section">
          {whyUs.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="booking" className="reservation-section">
        <div className="reservation-panel">
          <div>
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
        <div className="section-copy">
          <h2>Цени и пакети</h2>
          <p>
            Пакетите се настройват според актуалните условия на студиото. За
            най-точна информация отвори резервацията.
          </p>
        </div>
        <div className="pricing-grid">
          {packages.map((item) => (
            <article key={item.name}>
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
              <p>{item.note}</p>
              <PrimaryBookingButton>Запази</PrimaryBookingButton>
            </article>
          ))}
        </div>
      </section>

      <section className="instructors-section">
        <div className="section-copy">
          <h2>Инструктори</h2>
          <p>
            В Reset Body Lab вниманието е насочено към правилно движение,
            спокойно темпо и ясни инструкции.
          </p>
        </div>
        <div className="instructor-grid">
          {instructors.map((item) => (
            <article key={item.name}>
              <Image
                src={item.image}
                alt={item.name}
                width={960}
                height={600}
                sizes="(max-width: 1040px) 100vw, 50vw"
              />
              <h3>{item.name}</h3>
              <p>{item.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-copy">
          <h2>Галерия</h2>
        </div>
        <div className="gallery-grid" aria-label="Reset Body Lab галерия">
          {galleryImages.map((image) => (
            <Image
              key={image.src}
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
        <div className="section-copy">
          <h2>Често задавани въпроси</h2>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-copy">
          <span>Reset Body Lab Pilates</span>
          <h2>Контакти</h2>
          <p>
            Запази час онлайн или използвай картата, за да намериш студиото.
          </p>
          <PrimaryBookingButton>Резервирай сега</PrimaryBookingButton>
        </div>
        <div className="map-frame">
          <iframe
            title="Reset Body Lab Pilates Google Maps"
            src="https://www.google.com/maps?q=Reset%20Body%20Lab%20Pilates&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="final-cta">
        <h2>Готова ли си да започнеш?</h2>
        <p>Избери свободен час и запази едно от петте reformer легла.</p>
        <PrimaryBookingButton>Запази час</PrimaryBookingButton>
      </section>
    </main>
  );
}
