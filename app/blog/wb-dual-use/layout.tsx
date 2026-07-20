import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Я искал товары на атакованных складах Wildberries — и нашёл ниши, выросшие в десятки раз";
const description = "Связать семь проверенных карточек с конкретными складами не удалось. Тогда я поднял данные MPStats с 2021 года. В сопоставимых 12-месячных окнах оборот маскировочных костюмов вырос примерно с 42 млн до 3,15 млрд рублей, а продажи — более чем в 37 раз. Эти цифры не объясняют причину роста и не показывают, что лежало в атакованных корпусах.";
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
    publishedTime: "2026-07-20",
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
