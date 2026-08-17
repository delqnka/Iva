import Link from "next/link";
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
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.body}</p>
        <Link className="btn btn-dark" href={localizedPath(locale, "/")}>
          {copy.cta}
        </Link>
      </section>
    </main>
  );
}
