import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
      <title>Quran App</title>
        <link rel="apple-touch-icon" href="/logo2.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="description" content="Read and study the Holy Quran with translations" />
        <meta name="keywords" content="quran, islam, surah, verses, translations, القرآن الكريم, قورئان, surat, ayat, zekr" />
        <meta property="og:description" content="Read and study the Holy Quran with translations" />
        <meta property="og:title" content="Quran App" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="Quran App" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
