import type { Metadata } from "next";
import { AuthorPage } from "@/components/author-page";

export const metadata: Metadata = { title: "Алмас Касымжанов — автор", description: "Дата-журналист, аналитик и автор независимого издания Kasymzhanov.", alternates: { canonical: "/authors/almas-kasymzhanov", languages: { "ru-RU": "/authors/almas-kasymzhanov", "en-US": "/en/authors/almas-kasymzhanov", "x-default": "/authors/almas-kasymzhanov" } } };
export default function AlmasAuthorPage() { return <AuthorPage locale="ru" />; }
