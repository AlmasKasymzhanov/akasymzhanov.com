import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Рынки — Kasymzhanov",
  description: "Платформы, маркетплейсы, торговля, бренды и данные о спросе.",
  alternates: { canonical: "/market", languages: { "ru-RU": "/market", "en-US": "/en/market", "x-default": "/market" } },
};

export default function MarketPage() {
  return <SectionFront locale="ru" eyebrow="Редакционная тема" title="Рынки" description="Платформы, торговля, бренды и экономические сигналы, которые можно увидеть в поведении покупателей." articles={getArticlesByTopic("markets")} />;
}
