import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Wildberries ищет склады в Казахстане. Единого блока на 100 тыс. кв. м нет";
const description =
  "Разбор атак на логистику Wildberries, различий между FBO и FBS, экономики ПВЗ, дефицита складов в Казахстане и авторской панели MPStats: что уже видно в данных и почему победа Kaspi пока не доказана.";
const canonical = "https://kasymzhanov.com/blog/wildberries-kazakhstan";
const image = "/blog/wildberries-kazakhstan/og.png";
const alt =
  "Темная схема логистического комплекса со светящимися посылками и каркасами складов";

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
    publishedTime: "2026-07-31",
    locale: "ru_RU",
    images: [{ url: image, width: 1200, height: 630, alt }],
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
      <ArticleJsonLd slug="wildberries-kazakhstan" description={description} />
    </>
  );
}
