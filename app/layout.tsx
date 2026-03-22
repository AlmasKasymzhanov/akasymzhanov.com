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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${geist.variable} ${menlo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
