import { SiteFooter, SiteHeader } from "@/components/canon/site-chrome";
import { ArticleCard, getPublishedArticles } from "@/components/articles";
import { type Locale } from "@/lib/i18n";

export function SearchResultsPage({ locale, query }: { locale: Locale; query: string }) {
  const q = query.trim().toLocaleLowerCase(locale === "en" ? "en-US" : "ru-RU");
  const matches = q
    ? getPublishedArticles(locale).filter((article) =>
        [article.title, article.subtitle, article.rubric].some((value) => value.toLocaleLowerCase(locale === "en" ? "en-US" : "ru-RU").includes(q)),
      )
    : [];
  const action = locale === "en" ? "/en/search" : "/search";
  const copy = locale === "en"
    ? { eyebrow: "Archive search", title: "Search", placeholder: "Story, company, or topic", button: "Search", empty: "Enter a query to search the editorial archive.", none: "No stories matched this query.", found: "stories found" }
    : { eyebrow: "Поиск по архиву", title: "Поиск", placeholder: "Материал, компания или тема", button: "Найти", empty: "Введите запрос, чтобы найти материал в редакционном архиве.", none: "По этому запросу материалов не найдено.", found: "материалов найдено" };

  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1 px-6 py-12 md:px-10 md:py-16 lg:px-12">
          <header className="max-w-[900px]">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.eyebrow}</p>
            <h1 className="mt-4 font-heading text-[48px] font-bold tracking-[-0.04em] md:text-[68px]">{copy.title}</h1>
            <form action={action} method="get" className="mt-9 flex max-w-[760px] border-b-2 border-[var(--color-text)]">
              <input name="q" type="search" defaultValue={query} placeholder={copy.placeholder} autoFocus className="min-w-0 flex-1 bg-transparent py-4 font-body text-[18px] outline-none placeholder:text-[var(--color-dim)]" />
              <button className="px-4 font-mono text-[11px] font-bold uppercase tracking-[0.08em] hover:text-[var(--color-brand)]">{copy.button} →</button>
            </form>
          </header>

          <section className="mt-14 border-t border-[var(--color-border)] pt-8" aria-live="polite">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-dim)]">
              {!q ? copy.empty : matches.length ? `${matches.length} ${copy.found}` : copy.none}
            </p>
            {matches.length > 0 && (
              <div className="mt-8 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
              </div>
            )}
          </section>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
