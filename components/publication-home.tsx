import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { ArticleCard, NewsletterCard, getPublishedArticles, type Article } from "@/components/articles";
import { type Locale, dict } from "@/lib/i18n";

function SectionHeading({ eyebrow, title, href, linkLabel }: { eyebrow: string; title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6 border-t border-[var(--color-text)] pt-4">
      <div>
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{eyebrow}</p>
        <h2 className="mt-2 font-heading text-[26px] font-bold tracking-tight md:text-[32px]">{title}</h2>
      </div>
      {href && <Link href={href} className="shrink-0 font-mono text-[10px] uppercase tracking-[0.08em] hover:text-[var(--color-brand)]">{linkLabel} →</Link>}
    </div>
  );
}

function LeadStory({ article, locale }: { article: Article; locale: Locale }) {
  return (
    <Link href={article.href} className="group block font-body">
      <figure>
        <div className="relative aspect-[16/9] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={article.img}
            alt={article.title}
            fill
            sizes="(min-width: 1024px) 850px, 100vw"
            style={article.imgPosition ? { objectPosition: article.imgPosition } : undefined}
            className={`${article.coverBg ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.025]`}
            priority
          />
        </div>
        {article.credit && <figcaption className="mt-2 font-mono text-[9px] text-[var(--color-dim)]">{article.credit}</figcaption>}
      </figure>
      <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-brand)]">{article.rubric}</p>
      <h1 className="mt-3 max-w-[940px] font-heading text-[38px] font-bold leading-[0.99] tracking-[-0.035em] transition-colors group-hover:text-[var(--color-brand)] sm:text-[48px] lg:text-[58px]">
        {article.title}
      </h1>
      <p className="mt-5 max-w-[820px] text-[17px] leading-[1.55] text-[var(--color-dim)] md:text-[19px]">{article.subtitle}</p>
      <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.05em] text-[var(--color-dim)]">
        {locale === "en" ? "By" : "Автор"} {dict[locale].name} · <time dateTime={article.datePublished}>{article.date}</time> · {dict[locale].minRead(article.readMin)}
      </p>
    </Link>
  );
}

function TopicLink({ href, index, title, description }: { href: string; index: string; title: string; description: string }) {
  return (
    <Link href={href} className="group block border-t border-[var(--color-border)] py-6 md:py-8">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-dim)]">{index}</p>
      <h3 className="mt-3 font-heading text-[24px] font-bold tracking-tight group-hover:text-[var(--color-brand)] md:text-[29px]">{title} →</h3>
      <p className="mt-3 max-w-sm font-body text-[13px] leading-relaxed text-[var(--color-dim)]">{description}</p>
    </Link>
  );
}

export function PublicationHome({ locale }: { locale: Locale }) {
  const all = getPublishedArticles(locale);
  const [lead, ...rest] = all;
  const secondary = rest.slice(0, 2);
  const latest = rest.slice(2);
  const prefix = locale === "en" ? "/en" : "";
  const copy = locale === "en"
    ? {
        top: "Front page",
        secondary: "Also on the front page",
        latestEyebrow: "Chronology",
        latest: "Latest stories",
        all: "View all",
        topicsEyebrow: "Explore",
        topics: "Editorial beats",
        markets: ["Markets", "Platforms, retail, brands, and the signals hidden in demand."],
        technology: ["Technology", "AI, infrastructure, and the systems reshaping the region."],
        kazakhstan: ["Kazakhstan", "Local evidence for readers who need more than a press release."],
      }
    : {
        top: "Главная история",
        secondary: "Также на главной",
        latestEyebrow: "Хронология",
        latest: "Последние материалы",
        all: "Все материалы",
        topicsEyebrow: "Навигация",
        topics: "Редакционные темы",
        markets: ["Рынки", "Платформы, торговля, бренды и сигналы, спрятанные в спросе."],
        technology: ["Технологии", "AI, инфраструктура и системы, которые меняют регион."],
        kazakhstan: ["Казахстан", "Локальные факты для читателей, которым недостаточно пресс-релиза."],
      };

  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} variant="masthead" />
        <main id="main-content" className="flex-1">
          <section className="grid border-b border-[var(--color-border)] lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="p-6 md:p-10 lg:p-12">
              <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.top}</p>
              <LeadStory article={lead} locale={locale} />
            </div>
            <aside className="border-t border-[var(--color-border)] p-6 md:p-10 lg:border-l lg:border-t-0 lg:p-8">
              <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.secondary}</p>
              <div className="space-y-9">
                {secondary.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
              </div>
            </aside>
          </section>

          {latest.length > 0 && (
            <section className="border-b border-[var(--color-border)] px-6 py-12 md:px-10 md:py-16 lg:px-12">
              <SectionHeading eyebrow={copy.latestEyebrow} title={copy.latest} href={`${prefix}/latest`} linkLabel={copy.all} />
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
              </div>
            </section>
          )}

          <section className="border-b border-[var(--color-border)] px-6 py-12 md:px-10 md:py-16 lg:px-12">
            <NewsletterCard source={locale === "en" ? "home-en" : "home"} locale={locale} />
          </section>

          <section className="px-6 py-12 md:px-10 md:py-16 lg:px-12">
            <SectionHeading eyebrow={copy.topicsEyebrow} title={copy.topics} />
            <div className="grid gap-x-10 md:grid-cols-3">
              <TopicLink href={`${prefix}/market`} index="01" title={copy.markets[0]} description={copy.markets[1]} />
              <TopicLink href={`${prefix}/technology`} index="02" title={copy.technology[0]} description={copy.technology[1]} />
              <TopicLink href={`${prefix}/kazakhstan`} index="03" title={copy.kazakhstan[0]} description={copy.kazakhstan[1]} />
            </div>
          </section>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
