import Image from "next/image";
import Link from "next/link";
import { ViewCounter } from "@/components/view-counter";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { type Locale, dict } from "@/lib/i18n";

const TOPIC_BY_SLUG: Record<string, "market" | "technology" | "kazakhstan"> = {
  "wildberries-kazakhstan": "market",
  "wb-dual-use": "market",
  "freedom-market": "market",
  "russia-fuel-jerrycan": "market",
  "nvidia-kazakhstan": "technology",
  "why-blogger-brands-fail": "market",
  "kaspi-mcp": "technology",
};

// Canonical article header: kicker → headline → dek → author byline (left) +
// reading meta & engagement bar (right) → hero + credit.
// Must be rendered inside an <EngagementProvider> (provides the bar's data).
// Used by every article page so the layout stays consistent.

function ArticleAvatar({ size = 44, alt }: { size?: number; alt: string }) {
  return (
    <span
      className="relative block rounded-full overflow-hidden border border-[var(--color-border)] shrink-0"
      style={{ width: size, height: size }}
    >
      <Image src="/avatar/almas.webp" alt={alt} fill sizes={`${size}px`} className="object-cover object-[center_25%]" />
    </span>
  );
}

function ClockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9998 3.50009C7.30592 3.50009 3.49976 7.30536 3.49976 12.0001C3.49976 16.6939 7.30597 20.5001 11.9998 20.5001C16.6945 20.5001 20.4998 16.6939 20.4998 12.0001C20.4998 7.30531 16.6945 3.50009 11.9998 3.50009ZM1.99976 12.0001C1.99976 6.47682 6.4776 2.00009 11.9998 2.00009C17.523 2.00009 21.9998 6.47688 21.9998 12.0001C21.9998 17.5223 17.523 22.0001 11.9998 22.0001C6.47754 22.0001 1.99976 17.5223 1.99976 12.0001Z" />
      <path fillRule="evenodd" clipRule="evenodd" d="M11.6606 7.09619C12.0749 7.09619 12.4106 7.43198 12.4106 7.84619V11.9553L16.2029 12.0173C16.6171 12.0241 16.9473 12.3653 16.9405 12.7794C16.9338 13.1936 16.5926 13.5239 16.1784 13.5171L11.6484 13.4431C11.239 13.4364 10.9106 13.1026 10.9106 12.6932V7.84619C10.9106 7.43198 11.2464 7.09619 11.6606 7.09619Z" />
    </svg>
  );
}

export type ArticleHeaderProps = {
  kicker: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  slug: string;
  date: string;
  readMin: number;
  /** Hero illustration. Optional: articles may launch text-first and add art later. */
  hero?: { src: string; alt: string; credit: string; width?: number; height?: number };
  locale?: Locale;
};

export function ArticleHeader({ kicker, title, subtitle, slug, date, readMin, hero, locale = "ru" }: ArticleHeaderProps) {
  const t = dict[locale];
  const authorHref = locale === "en" ? "/en/authors/almas-kasymzhanov" : "/authors/almas-kasymzhanov";
  const prefix = locale === "en" ? "/en" : "";
  const primaryTopic = TOPIC_BY_SLUG[slug] ?? "market";
  const kickerHref = /инструмент|tool/i.test(kicker)
    ? `${prefix}/tools`
    : `${prefix}/${primaryTopic}`;
  return (
    <>
      <header className="mb-10 grid gap-8 md:mb-14 md:grid-cols-[190px_minmax(0,1fr)] md:gap-12 lg:gap-16">
        <aside className="order-2 border-t border-[var(--color-border)] pt-6 md:order-1 md:border-t-0 md:pt-0">
          <Link href={authorHref} className="group inline-block">
            <ArticleAvatar size={88} alt={t.name} />
            <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-text)] group-hover:text-[var(--color-brand)]">
              {locale === "en" ? "By" : "Автор"} {t.name}
            </p>
          </Link>
          <p className="mt-3 font-body text-[12px] leading-relaxed text-[var(--color-dim)]">
            {locale === "en" ? "Data journalist covering digital markets and Central Asia." : "Дата-журналист о цифровых рынках и Центральной Азии."}
          </p>
          <time className="mt-4 block font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-dim)]">{date}</time>
        </aside>

        <div className="order-1 md:order-2">
          <Link href={kickerHref} className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[var(--color-brand)] hover:underline underline-offset-4">{kicker}</Link>
          <h1 className="mt-5 max-w-[920px] text-[40px] font-bold tracking-[-0.035em] text-[var(--color-text)] leading-[0.98] sm:text-[48px] md:text-[58px] lg:text-[68px] font-heading">{title}</h1>
          <p className="mt-7 max-w-[880px] font-body text-[18px] text-[var(--color-dim)] leading-[1.5] md:text-[22px]">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-4 border-t border-[var(--color-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-[var(--color-dim)]">
              <span className="inline-flex items-center gap-1"><ClockIcon /> {t.minRead(readMin)}</span>
              <span aria-hidden>·</span>
              <ViewCounter slug={slug} />
            </div>
            <EngagementBar className="sm:justify-end" />
          </div>
        </div>
      </header>

      {/* Hero illustration (optional — some articles launch text-first) */}
      {hero && (
        <figure className="mb-0">
          <div className="border border-[var(--color-border)] overflow-hidden">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={hero.width ?? 1200}
              height={hero.height ?? 800}
              sizes="(max-width: 767px) calc(100vw - 48px), 1040px"
              priority
              className="w-full h-auto"
            />
          </div>
          <figcaption className="text-left text-[11px] text-[var(--color-dim)] mt-2">{hero.credit}</figcaption>
        </figure>
      )}
    </>
  );
}
