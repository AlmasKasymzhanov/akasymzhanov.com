import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { ARTICLES, ArticleCard, getViews, getEngagement, withEngagement, localizeArticle } from "@/components/articles";

export const metadata: Metadata = {
  title: "Market — Marketplaces",
  description:
    "Analysis, investigations, and explainers on marketplaces: Kaspi, Wildberries, Freedom, and more.",
  alternates: {
    canonical: "/en/market",
    languages: { "ru-RU": "/market", "en-US": "/en/market", "x-default": "/market" },
  },
};

export const revalidate = 120;

const L = "en" as const;

export default async function MarketPageEn() {
  const items = ARTICLES.map((a) => localizeArticle(a, L));
  const slugs = items.map((a) => a.slug);
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader locale="en" />

        <main className="w-full max-w-[1040px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">
              Section
            </p>
            <h1 className="text-[32px] md:text-[44px] font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-4">
              Market
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-[640px]">
              Everything on marketplaces: Kaspi, Wildberries, Freedom, and more.
            </p>
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          <div className="grid gap-10 md:gap-x-10 md:gap-y-12 md:grid-cols-2">
            {items.map((a) => (
              <ArticleCard key={a.slug} a={withEngagement(a, eng)} views={v(a.slug)} locale={L} />
            ))}
          </div>
        </main>

        <div className="flex-1" aria-hidden />
        <SiteFooter locale={L} />
      </div>
    </div>
  );
}
