import { notFound } from "next/navigation";
import { HomePage } from "../home-page";
import { isLocale } from "../i18n";

export default async function LocalizedHomePage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
