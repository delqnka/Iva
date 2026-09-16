import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage, loadPageContent } from "../home-page";
import { isLocale } from "../i18n";

export async function generateMetadata({
  params
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) notFound();

  const pageContent = await loadPageContent(locale);
  const title = pageContent.siteContent.seo.title || pageContent.salonName;
  const description = pageContent.siteContent.seo.description || pageContent.about;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/logo.svg"]
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["/logo.svg"]
    }
  };
}

export default async function LocalizedHomePage({
  params
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}
