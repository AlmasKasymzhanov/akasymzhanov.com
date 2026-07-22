import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import {
  ARTICLES,
  ArticleCard,
  CompactCard,
  NewsletterCard,
  getViews,
  getEngagement,
  withEngagement,
  type Article,
} from "@/components/articles";

export const metadata: Metadata = {
  title: "Kasymzhanov — дата-медиа",
  description:
    "Расследования, аналитика и разборы рынков. Данные вместо мнений.",
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/", "en-US": "/en", "x-default": "/" },
  },
};

export const revalidate = 120;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-brand)] mb-7">
      [ {children} ]
    </p>
  );
}

function HeroCard({ a, views }: { a: Article; views: number }) {
  return (
    <Link href={a.href} className="group block">
      <div className="relative aspect-[16/9] md:aspect-[2.8/1] border border-[var(--color-border)] overflow-hidden mb-6 bg-[var(--color-surface)]">
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="(min-width: 1400px) 1400px, 100vw"
          style={a.imgPosition ? { objectPosition: a.imgPosition } : undefined}
          className={`${a.coverBg ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
          priority
        />
      </div>
      {a.credit && <p className="text-[11px] text-[var(--color-dim)] mb-4">{a.credit}</p>}
      <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.1em] text-[var(--color-brand)] mb-3">
        {a.rubric}
      </p>
      <h1 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-5 font-heading">
        {a.title}
      </h1>
      <p className="text-[16px] md:text-[18px] text-[var(--color-dim)] leading-relaxed max-w-[720px] mb-5">
        {a.subtitle}
      </p>
      <div className="flex items-center gap-2 text-[11px] text-[var(--color-dim)] font-mono">
        <span>{a.date}</span>
        <span aria-hidden>·</span>
        <span>{a.readMin} мин</span>
        <span aria-hidden>·</span>
        <span>{views.toLocaleString("ru-RU")} просмотров</span>
      </div>
    </Link>
  );
}

function TrendingItem({ a, views }: { a: Article; views: number }) {
  return (
    <Link href={a.href} className="group flex gap-4">
      <div className="relative w-20 h-14 shrink-0 overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Image
          src={a.img}
          alt={a.title}
          fill
          sizes="160px"
          style={a.imgPosition ? { objectPosition: a.imgPosition } : undefined}
          className={`${a.coverBg ? "object-contain" : "object-cover"} transition-transform duration-500 group-hover:scale-[1.03]`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--color-brand)] mb-1">
          {a.rubric}
        </p>
        <h3 className="text-[15px] font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors mb-1">
          {a.title}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-[var(--color-dim)] font-mono">
          <span>{a.date}</span>
          <span aria-hidden>·</span>
          <span>{views.toLocaleString("ru-RU")}</span>
        </div>
      </div>
    </Link>
  );
}

function SectionCard({ title, desc, href, label }: { title: string; desc: string; href: string; label: string }) {
  return (
    <Link href={href} className="group block p-6 md:p-8 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-colors">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-3">{label}</p>
      <h3 className="text-[20px] md:text-[24px] font-bold tracking-tight text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors mb-2 font-heading">
        {title}
      </h3>
      <p className="text-[13px] md:text-[14px] text-[var(--color-dim)] leading-relaxed">{desc}</p>
    </Link>
  );
}

function HomeSections() {
  return (
    <section className="px-6 md:px-10 lg:px-12 py-12 md:py-16 border-b border-[var(--color-border)]">
      <SectionLabel>Рубрики</SectionLabel>
      <div className="grid gap-4 md:grid-cols-3">
        <SectionCard
          title="Kasymzhanov Data"
          desc="Расследования, аналитика и дата-журналистика, которую можно проверить по цифрам."
          href="/data"
          label="Разборы"
        />
        <SectionCard
          title="Практика"
          desc="Инструменты, гайды и практические кейсы для аналитики маркетплейсов."
          href="/tools"
          label="Инструменты"
        />
        <SectionCard
          title="Market"
          desc="Всё о маркетплейсах: Kaspi, Wildberries, Freedom."
          href="/market"
          label="Маркетплейсы"
        />
      </div>
    </section>
  );
}

export default async function Home() {
  const all = ARTICLES;
  const slugs = all.map((a) => a.slug);
  const [views, eng] = await Promise.all([getViews(slugs), getEngagement(slugs)]);
  const v = (slug: string) => views[slug] ?? 0;
  const withEng = (a: Article) => withEngagement(a, eng);

  const [lead, ...rest] = all;
  const latest = rest.slice(0, 3);
  const trending = [...all].sort((a, b) => v(b.slug) - v(a.slug)).slice(0, 3);

  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader />

        <main className="flex-1">
          {/* ── Hero + Trending ── */}
          <section className="grid grid-cols-1 lg:grid-cols-[1fr_400px] border-b border-[var(--color-border)]">
            <div className="p-6 md:p-10 lg:p-12">
              <HeroCard a={withEng(lead)} views={v(lead.slug)} />
            </div>
            <aside className="border-t lg:border-t-0 lg:border-l border-[var(--color-border)] p-6 md:p-10 lg:p-8">
              <SectionLabel>Сейчас читают</SectionLabel>
              <div className="space-y-8">
                {trending.map((a) => (
                  <TrendingItem key={a.slug} a={withEng(a)} views={v(a.slug)} />
                ))}
              </div>
            </aside>
          </section>

          {/* ── Latest ── */}
          <section className="px-6 md:px-10 lg:px-12 py-12 md:py-16 border-b border-[var(--color-border)]">
            <SectionLabel>Последние материалы</SectionLabel>
            <div className="grid gap-10 md:gap-x-10 md:gap-y-12 md:grid-cols-2">
              {latest.map((a) => (
                <ArticleCard key={a.slug} a={withEng(a)} views={v(a.slug)} />
              ))}
            </div>
          </section>

          {/* ── Newsletter ── */}
          <section className="px-6 md:px-10 lg:px-12 py-12 md:py-16 border-b border-[var(--color-border)]">
            <NewsletterCard source="home" />
          </section>

          {/* ── Sections ── */}
          <HomeSections />
        </main>

        <SiteFooter />
      </div>
    </div>
  );
}
