import Link from "next/link";
import { Suspense } from "react";
import { BookingCancelCleanup } from "./booking-cancel-cleanup";
import { SuccessPageContent } from "./package-purchase-success";
import { localizedPath, returnPageCopy, type Locale, type ReturnPageKey } from "./i18n";

export function ReturnPageView({
  locale,
  pageKey
}: {
  locale: Locale;
  pageKey: ReturnPageKey;
}) {
  const copy = returnPageCopy[locale][pageKey];

  return (
    <main className="return-page">
      <section>
        {pageKey === "cancel" ? (
          <Suspense fallback={null}>
            <BookingCancelCleanup />
          </Suspense>
        ) : null}
        {pageKey === "success" ? (
          <Suspense fallback={null}>
            <SuccessPageContent locale={locale} />
          </Suspense>
        ) : null}
        {pageKey !== "success" ? (
          <>
        <div className={`return-page__mark return-page__mark--${pageKey}`} aria-hidden>
          {"!"}
        </div>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <p className="return-page__note">{copy.note}</p>
        <Link className="btn btn-dark" href={localizedPath(locale, "/")}>
          {copy.cta}
        </Link>
          </>
        ) : null}
      </section>
    </main>
  );
}
