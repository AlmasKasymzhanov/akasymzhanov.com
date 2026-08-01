import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getArticlesByTopic } from "@/components/articles";

export const metadata: Metadata = {
  title: "Technology — Kasymzhanov",
  description: "AI, digital infrastructure, and technologies reshaping Central Asian markets.",
  alternates: { canonical: "/en/technology", languages: { "ru-RU": "/technology", "en-US": "/en/technology", "x-default": "/technology" } },
};

export default function TechnologyPageEn() {
  return <SectionFront locale="en" eyebrow="Editorial beat" title="Technology" description="AI, digital infrastructure, and systems reshaping companies, markets, and daily life across the region." articles={getArticlesByTopic("technology", "en")} />;
}
