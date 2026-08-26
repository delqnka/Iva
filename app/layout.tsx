import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { CookieBanner } from "./cookie-banner";
import "./globals.css";
import { Providers } from "./providers";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Reset body lab - Реформър Пилатес студио в град Варна",
  description:
    "Реформър пилатес за по-добра стойка, повече сила и по-стегната фигура.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://resetbodylab.com"
  ),
  openGraph: {
    title: "Reset body lab - Реформър Пилатес студио в град Варна",
    description:
      "Реформър пилатес: съвременен метод за сила, контрол и баланс.",
    images: ["/logo.svg"]
  },
  twitter: {
    card: "summary",
    title: "Reset body lab - Реформър Пилатес студио в град Варна",
    description:
      "Реформър пилатес за по-добра стойка, повече сила и по-стегната фигура.",
    images: ["/logo.svg"]
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={manrope.variable}>
      <body>
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
