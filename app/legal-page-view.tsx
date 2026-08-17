import Link from "next/link";
import { legalCopy, localizedPath, type LegalPageKey, type Locale } from "./i18n";
import { getCustomDocumentHtml, normalizeLegalInfoFromDb } from "./legal-custom-documents";
import { loadSiteInfo } from "./site-info";

function fillTemplate(
  value: string,
  replacements: Record<string, string>
) {
  return value.replace(/\{(\w+)\}/g, (_, key: string) => replacements[key] || "");
}

export async function LegalPageView({
  locale,
  pageKey
}: {
  locale: Locale;
  pageKey: LegalPageKey;
}) {
  const site = await loadSiteInfo();
  const copy = legalCopy[locale];
  const page = copy[pageKey];
  const customHtml = getCustomDocumentHtml(normalizeLegalInfoFromDb(site.legalInfo), pageKey);
  const contact =
    pageKey === "privacy"
      ? site.email || (locale === "en" ? "the studio's official email" : "официалния имейл на студиото")
      : site.email || site.phone || (locale === "en" ? "the studio contact details" : "контактите на студиото");

  return (
    <main className="legal-page">
      <div className="legal-shell">
        <Link className="legal-back" href={localizedPath(locale, "/")}>
          {copy.shared.back}
        </Link>
        <div className="legal-prose">
          <p className="section-label">{copy.shared.label}</p>
          {customHtml ? (
            <div dangerouslySetInnerHTML={{ __html: customHtml }} />
          ) : (
            <>
              <h1>{page.title}</h1>
              <p>
                {fillTemplate(page.intro, {
                  salonName: site.salonName,
                  contact
                })}
              </p>
              {page.sections.map((section) => (
                <div key={section.title}>
                  <h2>{section.title}</h2>
                  <p>
                    {fillTemplate(section.body, {
                      salonName: site.salonName,
                      contact
                    })}
                  </p>
                </div>
              ))}
              {"note" in page ? <p className="legal-note">{page.note}</p> : null}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
