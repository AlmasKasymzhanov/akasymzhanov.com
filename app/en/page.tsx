import type { Metadata } from "next";
import { PublicationHome } from "@/components/publication-home";

export const metadata: Metadata = {
  title: "Kasymzhanov — Data journalism on digital markets and Central Asia",
  description: "Independent investigations, analysis, and data journalism on digital markets, technology, Kazakhstan, and Central Asia.",
  alternates: {
    canonical: "/en",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
  openGraph: {
    title: "Kasymzhanov — Data journalism on digital markets and Central Asia",
    description: "Independent investigations and analysis from Kazakhstan and Central Asia.",
    url: "https://kasymzhanov.com/en",
    locale: "en_US",
  },
};

export const revalidate = 120;

export default function HomeEn() {
  return <PublicationHome locale="en" />;
}
