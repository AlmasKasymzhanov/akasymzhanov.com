import Image from "next/image";
import Link from "next/link";
import { ArticleCard, NewsletterCard, getKaspiMarketArticles, type Article, type AnalysisPace } from "@/components/articles";
import { SiteFooter, SiteHeader } from "@/components/canon/site-chrome";
import { type Locale, dict } from "@/lib/i18n";

function PaceBadge({ pace, locale }: { pace?: AnalysisPace; locale: Locale }) {
  const label = pace === "fast"
    ? locale === "en" ? "Market snapshot" : "Рыночный срез"
    : locale === "en" ? "Deep research" : "Глубокое исследование";
  return <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--color-brand)]">{label}</span>;
}

function KaspiLead({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <Link href={article.href} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Image
          src={article.img}
          alt={article.title}
          fill
          priority
          sizes="(min-width: 1024px) 760px, 100vw"
          style={article.imgPosition ? { objectPosition: article.imgPosition } : undefined}
          className={`${article.coverBg ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.025]`}
        />
      </div>
      <div className="mt-5"><PaceBadge pace={article.analysisPace} locale={locale} /></div>
      <h2 className="mt-3 max-w-[840px] font-heading text-[38px] font-bold leading-[0.98] tracking-[-0.04em] transition-colors group-hover:text-[var(--color-brand)] sm:text-[48px] lg:text-[56px]">
        {article.title}
      </h2>
      <p className="mt-5 max-w-[760px] text-[17px] leading-[1.55] text-[var(--color-dim)]">{article.subtitle}</p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.05em] text-[var(--color-dim)]">
        {locale === "en" ? "By" : "Автор"} {dict[locale].name} · <time dateTime={article.datePublished}>{article.date}</time> · {dict[locale].minRead(article.readMin)}
      </p>
    </Link>
  );
}

function LatestRail({ articles, locale }: { articles: Article[]; locale: Locale }) {
  return (
    <aside className="border-b border-[var(--color-border)] p-6 lg:border-b-0 lg:border-r lg:p-7">
      <div className="border-b border-[var(--color-border)] pb-4">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
          {locale === "en" ? "Kaspi Market coverage" : "Материалы Kaspi Market"}
        </h2>
      </div>
      <div>
        {articles.map((article) => (
          <Link key={article.slug} href={article.href} className="group block border-b border-[var(--color-border)] py-5">
            <PaceBadge pace={article.analysisPace} locale={locale} />
            <h3 className="mt-2 text-[16px] font-bold leading-[1.08] transition-colors group-hover:text-[var(--color-brand)]">{article.title}</h3>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.04em] text-[var(--color-dim)]">{article.date} · {dict[locale].minRead(article.readMin)}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function KaspiMarketPage({ locale }: { locale: Locale }) {
  const all = getKaspiMarketArticles(locale);
  const fast = getKaspiMarketArticles(locale, "fast");
  const slow = getKaspiMarketArticles(locale, "slow");
  const lead = slow[0] ?? all[0];
  const fastFeature = fast[0];
  const secondary = all.filter((article) => article.slug !== lead?.slug && article.slug !== fastFeature?.slug);
  const copy = locale === "en"
    ? {
        eyebrow: "Kaspi market analytics",
        deck: "Category, product, demand, and competition analytics for current sellers and those preparing to enter Kaspi.",
        question: "Want to know what is really happening in your category?",
        questionBody: "I will prepare research around your specific decision: estimate market size and demand, map prices and assortments, analyze competitors, their listings and reviews, and identify unmet customer needs. This is useful whether you already sell and want to expand or are choosing a niche before entering Kaspi.",
        ask: "Discuss the research",
        whatsappText: "Hello! I would like to discuss personal research for a category or niche on Kaspi.",
        disclaimer: "Kaspi Market is an independent editorial project by Kasymzhanov. It is not affiliated with or endorsed by Kaspi.kz.",
      }
    : {
        eyebrow: "Аналитика рынка Kaspi",
        deck: "Аналитика категорий, товаров, спроса и конкуренции для действующих продавцов и тех, кто планирует выходить на Kaspi.",
        question: "Хотите понять, что на самом деле происходит в вашей категории?",
        questionBody: "Я подготовлю персональное исследование под вашу задачу: оценю объём рынка и спрос, разберу цены, ассортимент, конкурентов, их карточки и отзывы, найду незакрытые потребности покупателей. Такой разбор подходит и действующим продавцам, которые хотят расшириться, и тем, кто только выбирает нишу для выхода на Kaspi.",
        ask: "Обсудить исследование",
        whatsappText: "Здравствуйте! Хочу обсудить персональное исследование категории или ниши на Kaspi.",
        disclaimer: "Kaspi Market — независимый редакционный проект Kasymzhanov. Раздел не связан с Kaspi.kz и не является его официальным продуктом.",
      };
  const whatsappHref = `https://wa.me/77028290908?text=${encodeURIComponent(copy.whatsappText)}`;

  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1">
          <header className="border-b border-[var(--color-text)] px-6 py-12 md:px-10 md:py-16 lg:px-12 lg:py-20">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.eyebrow}</p>
            <div className="mt-5">
              <h1 className="font-heading text-[54px] font-bold leading-[0.88] tracking-[-0.055em] sm:text-[76px] md:text-[96px]">Kaspi Market</h1>
              <p className="mt-7 max-w-[820px] text-[18px] leading-relaxed text-[var(--color-dim)] md:text-[21px]">{copy.deck}</p>
            </div>
          </header>

          <section className="grid border-b border-[var(--color-border)] lg:grid-cols-[290px_minmax(0,1fr)]">
            <LatestRail articles={all} locale={locale} />
            <div className="min-w-0">
              <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_330px]">
                {lead && <div className="p-6 md:p-10 lg:p-12"><KaspiLead article={lead} locale={locale} /></div>}
                <aside className="border-t border-[var(--color-border)] p-6 md:p-8 lg:border-l lg:border-t-0">
                  {fastFeature && <ArticleCard a={fastFeature} views={0} locale={locale} />}
                  <div className="mt-8 border-t border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">
                      {locale === "en" ? "Personal analytics" : "Персональная аналитика"}
                    </p>
                    <h2 className="mt-3 font-heading text-[26px] font-bold leading-[1.02] tracking-tight">{copy.question}</h2>
                    <p className="mt-4 text-[13px] leading-relaxed text-[var(--color-dim)]">{copy.questionBody}</p>
                    <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center border border-[var(--color-text)] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.08em] hover:bg-[var(--color-text)] hover:text-[var(--color-bg)]">{copy.ask} →</a>
                  </div>
                </aside>
              </div>
              {secondary.length > 0 && (
                <div className="grid gap-8 border-t border-[var(--color-border)] p-6 sm:grid-cols-2 md:p-10 lg:p-12">
                  {secondary.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
                </div>
              )}
            </div>
          </section>

          <section className="border-b border-[var(--color-border)] px-6 py-12 md:px-10 md:py-16 lg:px-12">
            <NewsletterCard source={locale === "en" ? "kaspi-market-en" : "kaspi-market"} locale={locale} />
          </section>

          <p className="border-t border-[var(--color-border)] px-6 py-5 font-mono text-[9px] leading-relaxed text-[var(--color-dim)] md:px-10 lg:px-12">{copy.disclaimer}</p>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
