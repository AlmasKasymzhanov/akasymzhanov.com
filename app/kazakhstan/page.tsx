import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Казахстан — Kasymzhanov",
  description: "Экономика, технологии и цифровые рынки Казахстана в данных.",
  alternates: { canonical: "/kazakhstan", languages: { "ru-RU": "/kazakhstan", "en-US": "/en/kazakhstan", "x-default": "/kazakhstan" } },
};

export default function KazakhstanPage() {
  return <SectionFront locale="ru" eyebrow="Регион" title="Казахстан" description="Экономика, технологии и цифровые рынки страны — с локальными источниками, проверяемыми расчётами и контекстом Центральной Азии." articles={getArticlesByTopic("kazakhstan")} />;
}
