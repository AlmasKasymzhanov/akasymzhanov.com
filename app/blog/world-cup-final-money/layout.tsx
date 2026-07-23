import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "Кто заработал и кто потерял деньги на ЧМ-2026";
const description =
  "$5,69 млрд оборота на рынках финала ЧМ-2026 — это не банк и не прибыль. Разбираем, кто реально заработал и потерял, и какие суммы нельзя сравнивать.";
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
    modifiedTime: "2026-07-23",
    locale: "ru_RU",
    images: [
      {
        url: image,
        width: 1200,
        height: 675,
        alt: title,
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
