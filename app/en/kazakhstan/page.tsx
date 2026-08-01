import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Kazakhstan — Kasymzhanov",
  description: "Kazakhstan's economy, technology, and digital markets in data.",
  alternates: { canonical: "/en/kazakhstan", languages: { "ru-RU": "/kazakhstan", "en-US": "/en/kazakhstan", "x-default": "/kazakhstan" } },
};

export default function KazakhstanPageEn() {
  return <SectionFront locale="en" eyebrow="Region" title="Kazakhstan" description="The country's economy, technology, and digital markets, reported with local sources and Central Asian context." articles={getArticlesByTopic("kazakhstan", "en")} />;
}
