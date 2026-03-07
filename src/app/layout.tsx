import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Алмас Касымжанов — Аналитика маркетплейсов",
  description:
    "Персональный сайт, блог и аналитические инструменты для маркетплейсов",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
