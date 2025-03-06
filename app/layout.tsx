import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import ModelProvider from "@/providers/model-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const ReadexPro = Readex_Pro({ subsets: ["arabic", "latin"] });
// Custom font for Kurdish locale (ku)
const KurdishFontClass = "kurdish-font";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePageMetaData");

  return {
    title: t("title"),
    description: t("description"),
    manifest: "/manifest.json",
    keywords: ["quran", "verse", "surah", "ramadan", "quran karim", "islam", "قورئان", "القرآن الكريم", "surat", "ayat", "ramazan"],
    viewport:
      "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
       icons: [
      { rel: "apple-touch-icon", url: "icon512_maskable.png" },
      { rel: "icon", url: "icon512_maskable.png" },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  // Apply Kurdish custom font for ku locale, otherwise use default font
  const fontClassName = locale === "ku" ? KurdishFontClass : ReadexPro.className;

  return (
    <html dir={locale === "ar" || locale === "ku" ? "rtl" : "ltr"} lang={locale}>
      <body className={fontClassName}>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
              {children}
              <Toaster />
              <ModelProvider />
            </ThemeProvider>
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
