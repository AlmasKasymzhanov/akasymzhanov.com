import type { Metadata } from "next";
import { SearchResultsPage } from "@/components/search-results-page";

export const metadata: Metadata = { title: "Поиск — Kasymzhanov", robots: { index: false, follow: true } };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q = "" } = await searchParams;
  return <SearchResultsPage locale="ru" query={q} />;
}
