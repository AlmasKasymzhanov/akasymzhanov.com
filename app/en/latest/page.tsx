import type { Metadata } from "next";
import { SectionFront } from "@/components/section-front";
import { getPublishedArticles } from "@/components/articles";

export const metadata: Metadata = {
  title: "Latest — Kasymzhanov",
  description: "All translated investigations and data stories from Kasymzhanov in chronological order.",
  alternates: { canonical: "/en/latest", languages: { "ru-RU": "/latest", "en-US": "/en/latest", "x-default": "/latest" } },
};

export default function LatestPageEn() {
  return <SectionFront locale="en" eyebrow="Archive" title="Latest" description="Every translated investigation and data story, ordered by publication date." articles={getPublishedArticles("en")} />;
}
