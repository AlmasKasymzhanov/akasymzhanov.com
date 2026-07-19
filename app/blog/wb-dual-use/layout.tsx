import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Почему склады Wildberries оказались под ударом: что я нашёл в 7 500 категориях | Almas Kasymzhanov";
const description = "Что показал анализ 7 500 уникальных категорий Wildberries после атаки на логистические комплексы и чего эти данные не доказывают.";
const canonical = "https://kasymzhanov.com/blog/wb-dual-use";
const image = "/blog/wb-dual-use/og.png";

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
    publishedTime: "2026-07-19",
    locale: "ru_RU",
    images: [{ url: image, width: 1200, height: 630, alt: "Открытая коробка Wildberries с переносным электронным устройством, защитной плитой, аптечкой, оптическим кабелем и обычными товарами" }],
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
      <ArticleJsonLd slug="wb-dual-use" description={description} />
    </>
  );
}
