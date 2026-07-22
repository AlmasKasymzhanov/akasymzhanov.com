import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SOCIAL_SAMEAS } from "@/lib/social";
import { HtmlLang } from "@/components/html-lang";
import "./globals.css";

// Display + UI: Inter Tight — tech-forward, works well in both RU and EN.
const interTight = Inter_Tight({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Body: Inter — maximum readability for long-form.
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Mono: JetBrains Mono for data labels, code, and UI metrics.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Kasymzhanov",
  description:
    "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
  metadataBase: new URL("https://kasymzhanov.com"),
  openGraph: {
    title: "Kasymzhanov",
    description:
      "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
    url: "https://kasymzhanov.com",
    siteName: "kasymzhanov.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kasymzhanov",
    description:
      "Kasymzhanov — независимое дата-медиа. Расследования, аналитика и дата-журналистика о рынках, экономике и технологиях. Данные вместо мнений.",
    creator: "@akasymzhanov",
    site: "@akasymzhanov",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${interTight.variable} ${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLMs Full" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  name: "Almas Kasymzhanov",
                  alternateName: "Алмас Касымжанов",
                  url: "https://kasymzhanov.com",
                  email: "almas@kasymzhanov.com",
                  jobTitle: "Дата-журналист, аналитик, предприниматель",
                  description:
                    "Автор Kasymzhanov — независимого дата-медиа о рынках, экономике и технологиях.",
                  sameAs: SOCIAL_SAMEAS,
                },
                {
                  "@type": "WebSite",
                  name: "Kasymzhanov",
                  url: "https://kasymzhanov.com",
                  description:
                    "Независимое дата-медиа. Расследования, аналитика и дата-журналистика. Данные вместо мнений.",
                  publisher: { "@type": "Person", name: "Almas Kasymzhanov" },
                },
              ],
            }),
          }}
        />
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var m = localStorage.getItem('theme');
            var dark = m === 'dark' || ((m === 'system' || !m) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (!dark) document.documentElement.classList.add('light');
          } catch (e) {
            document.documentElement.classList.add('light');
          }
        `}} />
      </head>
      <body><HtmlLang />{children}{process.env.VERCEL === "1" && <Analytics />}</body>
    </html>
  );
}
