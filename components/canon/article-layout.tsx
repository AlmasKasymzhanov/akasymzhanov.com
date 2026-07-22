import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import { ReadingProgress } from "@/components/canon/reading-progress";
import { RelatedArticles } from "@/components/canon/related-articles";
import { type Locale } from "@/lib/i18n";

export function ArticleLayout({
  header,
  children,
  slug,
  locale = "ru",
  showAuthorBlock = true,
}: {
  header: React.ReactNode;
  children: React.ReactNode;
  slug: string;
  locale?: Locale;
  showAuthorBlock?: boolean;
}) {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug={slug} />
        <ReadingProgress />
        <SiteHeader locale={locale} />

        <EngagementProvider slug={slug}>
          <article className="w-full max-w-[720px] mx-auto px-6 py-12 md:py-20">
            {header}
            <hr className="border-[var(--color-border)] mb-12" />
            {children}

            <div className="mt-12 flex justify-end">
              <EngagementBar />
            </div>
            <Comments />

            <RelatedArticles currentSlug={slug} locale={locale} />
          </article>
        </EngagementProvider>

        <div className="flex-1" aria-hidden />
        {showAuthorBlock && <AuthorBlock variant="horizontal" locale={locale} />}
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
