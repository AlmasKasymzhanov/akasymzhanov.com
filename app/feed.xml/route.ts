import { getPublishedArticles } from "@/components/articles";

export const revalidate = 3600;

const SITE = "https://kasymzhanov.com";
const xml = (value: string) => value.replace(/[<>&'\"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '\"': "&quot;" })[char] ?? char);

export async function GET() {
  const items = getPublishedArticles("ru").map((article) => `
    <item>
      <title>${xml(article.title)}</title>
      <link>${SITE}${article.href}</link>
      <guid isPermaLink="true">${SITE}${article.href}</guid>
      <description>${xml(article.subtitle)}</description>
      <category>${xml(article.rubric)}</category>
      <pubDate>${new Date(`${article.datePublished}T09:00:00+05:00`).toUTCString()}</pubDate>
      <enclosure url="${SITE}${article.img}" type="image/webp" />
    </item>`).join("");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Kasymzhanov</title>
    <link>${SITE}</link>
    <description>Независимое дата-издание о цифровых рынках, технологиях и Центральной Азии.</description>
    <language>ru-RU</language>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
