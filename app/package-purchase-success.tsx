"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookingPaymentSync } from "./booking-payment-sync";
import { localizedPath, type Locale } from "./i18n";

export function SuccessPageContent({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const isPackagePurchase = Boolean(searchParams.get("package_id"));

  if (!isPackagePurchase) {
    const copy = locale === "bg"
      ? {
          eyebrow: "Плащането е прието",
          title: "Резервацията е потвърдена.",
          body: "Благодарим ти. Ще получиш потвърждение за часа и плащането на посочения имейл.",
          note: "Ще те очакваме в студиото!",
          cta: "Обратно към сайта"
        }
      : {
          eyebrow: "Payment received",
          title: "Your booking is confirmed.",
          body: "Thank you. You’ll receive your session and payment confirmation at the email provided.",
          note: "We look forward to seeing you at the studio!",
          cta: "Back to site"
        };
    return (
      <>
        <p className="eyebrow">{copy.eyebrow}</p>
        <div className="return-page__mark return-page__mark--success" aria-hidden>✓</div>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <BookingPaymentSync locale={locale} />
        <p className="return-page__note">{copy.note}</p>
        <Link className="btn btn-dark" href={localizedPath(locale, "/")}>{copy.cta}</Link>
      </>
    );
  }

  const copy = locale === "bg"
    ? {
        eyebrow: "Плащането е прието",
        title: "Пакетът ти е активен.",
        body: "Чудесно — можеш да запазиш първия си час още сега. При резервацията избери „Имам пакет“ и ще използваме 1 посещение.",
        note: "Ще получиш потвърждение за пакета на посочения имейл.",
        cta: "Избери час сега",
        later: "Ще резервирам по-късно"
      }
    : {
        eyebrow: "Payment received",
        title: "Your package is active.",
        body: "Great — you can book your first session now. In the booking form, choose “I have a package” and we’ll use one session.",
        note: "You’ll receive your package confirmation at the email provided.",
        cta: "Book a class now",
        later: "I’ll book later"
      };

  return (
    <>
      <p className="eyebrow">{copy.eyebrow}</p>
      <div className="return-page__mark return-page__mark--success" aria-hidden>✓</div>
      <h1>{copy.title}</h1>
      <p>{copy.body}</p>
      <p className="return-page__note">{copy.note}</p>
      <Link className="btn btn-dark" href={`${localizedPath(locale, "/")}?book=1`}>
        {copy.cta}
      </Link>
      <Link className="return-page__later" href={localizedPath(locale, "/")}>
        {copy.later}
      </Link>
    </>
  );
}
