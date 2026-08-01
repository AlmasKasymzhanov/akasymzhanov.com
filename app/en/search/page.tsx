import type { Metadata } from "next";
import { SearchResultsPage } from "@/components/search-results-page";

export const metadata: Metadata = { title: "Search — Kasymzhanov", robots: { index: false, follow: true } };

export default async function SearchPageEn({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <SearchResultsPage locale="en" query={q} />;
}
