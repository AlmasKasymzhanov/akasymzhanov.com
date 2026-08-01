import type { Metadata } from "next";
import { AuthorPage } from "@/components/author-page";

export const metadata: Metadata = { title: "Almas Kasymzhanov — author", description: "Data journalist, analyst, and author of the independent publication Kasymzhanov.", alternates: { canonical: "/en/authors/almas-kasymzhanov", languages: { "ru-RU": "/authors/almas-kasymzhanov", "en-US": "/en/authors/almas-kasymzhanov", "x-default": "/authors/almas-kasymzhanov" } } };
export default function AlmasAuthorPageEn() { return <AuthorPage locale="en" />; }
