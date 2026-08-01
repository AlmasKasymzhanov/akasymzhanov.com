import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getPublishedArticles } from "@/components/articles";

export const metadata: Metadata = {
  title: "Последнее — Kasymzhanov",
  description: "Все расследования, дата-разборы и практические материалы Kasymzhanov в хронологическом порядке.",
  alternates: { canonical: "/latest", languages: { "ru-RU": "/latest", "en-US": "/en/latest", "x-default": "/latest" } },
};

export default function LatestPage() {
  return <SectionFront locale="ru" eyebrow="Архив" title="Последнее" description="Все опубликованные материалы в хронологическом порядке — от новых расследований до практических дата-разборов." articles={getPublishedArticles()} />;
}
