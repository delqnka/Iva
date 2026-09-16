import type { Metadata } from "next";
import { HomePage, loadPageContent } from "./home-page";

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await loadPageContent("bg");
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

export default async function Page() {
  return <HomePage locale="bg" />;
}
