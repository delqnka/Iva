import { notFound } from "next/navigation";
import { LegalPageView } from "../../legal-page-view";
import { isLocale, type Locale } from "../../i18n";

export default function LocalizedPrivacyPage({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return <LegalPageView locale={locale} pageKey="privacy" />;
}
