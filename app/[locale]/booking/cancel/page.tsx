import { notFound } from "next/navigation";
import { isLocale } from "../../../i18n";
import { ReturnPageView } from "../../../return-page-view";

export default async function LocalizedBookingCancelPage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();
  return <ReturnPageView locale={locale} pageKey="cancel" />;
}
