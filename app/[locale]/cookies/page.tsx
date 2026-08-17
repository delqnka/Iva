import { notFound } from "next/navigation";
import { LegalPageView } from "../../legal-page-view";
import { isLocale } from "../../i18n";

export default async function LocalizedCookiesPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();
  return <LegalPageView locale={locale} pageKey="cookies" />;
}
