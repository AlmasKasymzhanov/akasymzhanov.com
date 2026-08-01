import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Markets — Kasymzhanov",
  description: "Platforms, retail, brands, and the economic signals hidden in demand.",
  alternates: { canonical: "/en/market", languages: { "ru-RU": "/market", "en-US": "/en/market", "x-default": "/market" } },
};

export default function MarketPageEn() {
  return <SectionFront locale="en" eyebrow="Editorial beat" title="Markets" description="Platforms, retail, brands, and economic signals revealed through the behavior of buyers." articles={getArticlesByTopic("markets", "en")} />;
}
