import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Технологии — Kasymzhanov",
  description: "AI, цифровая инфраструктура и технологии, которые меняют рынки Центральной Азии.",
  alternates: { canonical: "/technology", languages: { "ru-RU": "/technology", "en-US": "/en/technology", "x-default": "/technology" } },
};

export default function TechnologyPage() {
  return <SectionFront locale="ru" eyebrow="Редакционная тема" title="Технологии" description="AI, цифровая инфраструктура и системы, которые меняют компании, рынки и повседневную жизнь региона." articles={getArticlesByTopic("technology")} />;
}
