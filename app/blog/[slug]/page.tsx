import { posts } from "#site/content";
import { MdxContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Almas Kasymzhanov`,
    description: post.description,
  };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="max-w-2xl mx-auto px-6 py-16">
      <Link
        href="/blog"
        className="text-sm text-dim hover:text-accent transition-colors no-underline mb-8 inline-block"
      >
        ← Все посты
      </Link>

      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-3 font-heading">
          {post.title}
        </h1>
        <time className="text-sm text-dim tabular-nums">
          {new Date(post.date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </header>

      <div className="prose prose-invert max-w-none">
        <MdxContent code={post.body} />
      </div>
    </article>
  );
}
