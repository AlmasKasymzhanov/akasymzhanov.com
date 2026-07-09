import type { Metadata } from "next";
import { ArticleJsonLd } from "@/components/articles";

const title = "The Marketplace Is Dead. It Will Call You | Almas Kasymzhanov";
const description =
  "How Timur Turlov's Freedom is buying a marketplace that stopped paying people, why the holding is resurrecting it under its own name - and why Kaspi, for the first time in a decade, faces a challenger with real ammunition.";
const image = "/blog/freedom-market/cover.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://kasymzhanov.com/en/blog/freedom-market",
    languages: {
      "ru-RU": "https://kasymzhanov.com/blog/freedom-market",
      "en-US": "https://kasymzhanov.com/en/blog/freedom-market",
    },
  },
  openGraph: {
    title,
    description,
    url: "https://kasymzhanov.com/en/blog/freedom-market",
    type: "article",
    locale: "en_US",
    images: [image],
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
      {/* Renders nothing until the article is added to ARTICLES (front-page rollout). */}
      <ArticleJsonLd slug="freedom-market" description={description} locale="en" />
    </>
  );
}
