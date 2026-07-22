import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Кто заработал на финале ЧМ-2026: киты, арбитражники и мошенники";
const description =
  "На финал ЧМ-2026 поставили $5,69 млрд. Мы посмотрели, куда ушли эти деньги — и кто реально их получил.";
const canonical = "https://kasymzhanov.com/blog/world-cup-final-money";
const image = "/blog/world-cup-final-money/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
    languages: {
      "ru-RU": canonical,
      "x-default": canonical,
    },
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: "article",
    publishedTime: "2026-07-21",
    locale: "ru_RU",
    images: [
      {
        url: image,
        width: 1200,
        height: 675,
        alt: "Кто-то поставил $4,2 млн на ничью Испания — Кабо-Верде и вывел $9 млн",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArticleJsonLd slug="world-cup-final-money" description={description} />
    </>
  );
}
