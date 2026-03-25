import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geist = localFont({
  src: "../public/fonts/GeistVF.woff2",
  variable: "--font-geist",
  display: "swap",
});

const menlo = localFont({
  src: [
    { path: "../public/fonts/Menlo-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Menlo-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-menlo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Almas Kasymzhanov",
  description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
  metadataBase: new URL("https://akasymzhanov.com"),
  openGraph: {
    title: "Almas Kasymzhanov",
    description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
    url: "https://akasymzhanov.com",
    siteName: "akasymzhanov.com",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Almas Kasymzhanov",
    description: "Founder of Redstat & 10b.kz — Marketplace Analytics & Data Products",
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
    <html lang="ru" className={`${geist.variable} ${menlo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('theme') === 'light') {
              document.documentElement.classList.add('light');
            }
          } catch (e) {}
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
