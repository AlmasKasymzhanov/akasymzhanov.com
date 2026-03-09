import Link from "next/link";
import { posts } from "#site/content";

export const metadata = {
  title: "Блог — Almas Kasymzhanov",
  description: "Заметки об аналитике маркетплейсов, данных и инструментах.",
};

export default function BlogPage() {
  const sorted = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
        Блог
      </h1>
      <p className="text-dim mb-10">
        Заметки об аналитике маркетплейсов, данных и инструментах.
      </p>

      {sorted.length === 0 ? (
        <p className="text-dim">Пока нет постов.</p>
      ) : (
        <div className="space-y-1">
          {sorted.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-4 -mx-4 rounded-lg hover:bg-surface-hover transition-colors no-underline group"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base font-medium text-white group-hover:text-accent transition-colors">
                  {post.title}
                </span>
                <time className="text-xs text-dim shrink-0 tabular-nums">
                  {new Date(post.date).toLocaleDateString("ru-RU", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </div>
              {post.description && (
                <p className="text-sm text-dim mt-1 leading-relaxed">
                  {post.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
