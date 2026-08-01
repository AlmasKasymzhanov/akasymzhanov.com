import { SiteFooter, SiteHeader } from "@/components/canon/site-chrome";
import { ArticleCard, type Article } from "@/components/articles";
import { type Locale } from "@/lib/i18n";

export function SectionFront({
  locale,
  eyebrow,
  title,
  description,
  articles,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  description: string;
  articles: Article[];
}) {
  const [lead, ...rest] = articles;
  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1 px-6 py-12 md:px-10 md:py-16 lg:px-12">
          <header className="max-w-[900px] border-b border-[var(--color-text)] pb-10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{eyebrow}</p>
            <h1 className="mt-4 font-heading text-[44px] font-bold leading-[0.96] tracking-[-0.04em] sm:text-[56px] md:text-[68px]">{title}</h1>
            <p className="mt-6 max-w-[720px] text-[17px] leading-relaxed text-[var(--color-dim)] md:text-[20px]">{description}</p>
          </header>

          {lead ? (
            <div className="mt-12">
              <div className="max-w-[940px]">
                <ArticleCard a={lead} views={0} featured headingLevel="h2" locale={locale} />
              </div>
              {rest.length > 0 && (
                <div className="mt-16 grid gap-x-10 gap-y-14 border-t border-[var(--color-border)] pt-12 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-12 text-[15px] text-[var(--color-dim)]">{locale === "en" ? "No published stories yet." : "Здесь пока нет опубликованных материалов."}</p>
          )}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
