import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { ARTICLES, ArticleCard, getViews, getEngagement, withEngagement } from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov Data — дата-журналистика и аналитика",
  description:
    "Расследования, аналитика и разборы рынков. Данные вместо мнений.",
  alternates: {
    canonical: "/data",
    languages: { "ru-RU": "/data", "en-US": "/en/data", "x-default": "/data" },
  },
};

export const revalidate = 120;

// Editorial stories: everything in ARTICLES except the tool guide.
const DATA_SLUGS = new Set(["wb-dual-use", "freedom-market", "russia-fuel-jerrycan", "nvidia-kazakhstan", "why-blogger-brands-fail"]);

export default async function DataPage() {
  const items = ARTICLES.filter((a) => DATA_SLUGS.has(a.slug));
  const slugs = items.map((a) => a.slug);
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;

  const [lead, ...rest] = items;

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="w-full max-w-[1040px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">
              Рубрика
            </p>
            <h1 className="text-[32px] md:text-[44px] font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-4">
              Kasymzhanov Data
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-[640px]">
              Расследования, аналитика и разборы, которые можно проверить по данным. Дата-журналистика о рынках.
            </p>
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          <div className="mb-14">
            <ArticleCard a={withEngagement(lead, eng)} views={v(lead.slug)} featured headingLevel="h2" />
          </div>

          {rest.length > 0 && (
            <>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-dim)] mb-7">
                [ Ещё материалы ]
              </p>
              <div className="grid gap-10 md:gap-x-10 md:gap-y-12 md:grid-cols-2">
                {rest.map((a) => (
                  <ArticleCard key={a.slug} a={withEngagement(a, eng)} views={v(a.slug)} />
                ))}
              </div>
            </>
          )}
        </main>

        <div className="flex-1" aria-hidden />
        <SiteFooter />
      </div>
    </div>
  );
}
