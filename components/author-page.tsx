import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader, Socials } from "@/components/canon/site-chrome";
import { ArticleCard, getPublishedArticles } from "@/components/articles";
import { type Locale, dict } from "@/lib/i18n";

export function AuthorPage({ locale }: { locale: Locale }) {
  const isEn = locale === "en";
  const articles = getPublishedArticles(locale);
  const copy = isEn
    ? { eyebrow: "Author", title: "Almas Kasymzhanov", role: "Data journalist · analyst · founder", bio: "Almas Kasymzhanov reports on digital markets, technology, and Central Asia. He founded 10b.kz, Redstat, and Brock UI; more than 1.6 billion marketplace orders have passed through systems he built.", disclosure: "When a story uses data or expertise connected to those projects, the relationship is disclosed in the story and governed by the publication's editorial standards.", work: "Published work", standards: "Editorial standards" }
    : { eyebrow: "Автор", title: "Алмас Касымжанов", role: "Дата-журналист · аналитик · предприниматель", bio: "Алмас Касымжанов пишет о цифровых рынках, технологиях и Центральной Азии. Основал 10b.kz, Redstat и Brock UI; через построенные им системы прошло более 1,6 млрд заказов маркетплейсов.", disclosure: "Если материал использует данные или экспертизу, связанную с этими проектами, эта связь раскрывается в материале и регулируется редакционными стандартами издания.", work: "Материалы автора", standards: "Редакционные стандарты" };
  return (
    <div className="font-body text-[var(--color-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col border-x border-[var(--color-border)]">
        <SiteHeader locale={locale} />
        <main id="main-content" className="flex-1 px-6 py-12 md:px-10 md:py-16 lg:px-12">
          <header className="grid gap-10 border-b border-[var(--color-text)] pb-12 md:grid-cols-[230px_1fr] md:gap-16">
            <div>
              <div className="relative aspect-square w-full max-w-[230px] overflow-hidden rounded-full border border-[var(--color-border)]"><Image src="/avatar/almas.webp" alt={copy.title} fill sizes="230px" className="object-cover object-[center_25%]" priority /></div>
            </div>
            <div className="self-center">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-brand)]">{copy.eyebrow}</p>
              <h1 className="mt-4 font-heading text-[48px] font-bold leading-[0.96] tracking-[-0.04em] sm:text-[64px] md:text-[72px]">{copy.title}</h1>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--color-brand)]">{copy.role}</p>
              <p className="mt-7 max-w-[760px] text-[17px] leading-[1.7] text-[var(--color-dim)] md:text-[19px]">{copy.bio}</p>
              <p className="mt-4 max-w-[760px] text-[13px] leading-relaxed text-[var(--color-dim)]">{copy.disclosure} <Link href={isEn ? "/en/standards" : "/standards"} className="underline underline-offset-3 hover:text-[var(--color-brand)]">{copy.standards}</Link>.</p>
              <div className="mt-7"><Socials /></div>
            </div>
          </header>

          <section className="pt-12">
            <h2 className="font-heading text-[30px] font-bold tracking-tight md:text-[38px]">{copy.work}</h2>
            <div className="mt-8 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => <ArticleCard key={article.slug} a={article} views={0} locale={locale} />)}
            </div>
          </section>
        </main>
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
