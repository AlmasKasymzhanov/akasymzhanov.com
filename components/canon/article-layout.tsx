import { ReadTracker } from "@/components/read-tracker";
import { SiteHeader, SiteFooter, AuthorBlock } from "@/components/canon/site-chrome";
import { EngagementProvider } from "@/components/engagement/engagement-provider";
import { EngagementBar } from "@/components/engagement/engagement-bar";
import { Comments } from "@/components/engagement/comments";
import { ReadingProgress } from "@/components/canon/reading-progress";
import { RelatedArticles } from "@/components/canon/related-articles";
import { NewsletterCard } from "@/components/articles";
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
    <div className="font-body text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <ReadTracker slug={slug} />
        <ReadingProgress />
        <SiteHeader locale={locale} />

        <main id="main-content">
          <EngagementProvider slug={slug}>
            <article>
              <div className="mx-auto w-full max-w-[1120px] px-6 pb-12 pt-10 md:pb-16 md:pt-16 lg:px-10">
                {header}
              </div>

              <div className="article-content mx-auto w-full max-w-[760px] px-6 pb-12 md:pb-16">
                <div className="article-story-body" data-article-body>{children}</div>

                <div className="my-14">
                  <NewsletterCard source={`article-${slug}`} locale={locale} />
                </div>

                <div className="mt-12 flex justify-end">
                  <EngagementBar />
                </div>
                <Comments />
              </div>

              <div className="mx-auto w-full max-w-[1120px] px-6 pb-16 lg:px-10">
                <RelatedArticles currentSlug={slug} locale={locale} />
              </div>
            </article>
          </EngagementProvider>
        </main>

        <div className="flex-1" aria-hidden />
        {showAuthorBlock && <AuthorBlock variant="horizontal" locale={locale} />}
        <SiteFooter locale={locale} />
      </div>
    </div>
  );
}
