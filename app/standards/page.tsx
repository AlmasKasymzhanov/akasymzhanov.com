import type { Metadata } from "next";
import { EditorialStandardsPage } from "@/components/editorial-standards-page";

export const metadata: Metadata = { title: "Редакционные стандарты — Kasymzhanov", description: "Источники, методология, конфликты интересов, AI и политика исправлений независимого дата-издания Kasymzhanov.", alternates: { canonical: "/standards", languages: { "ru-RU": "/standards", "en-US": "/en/standards", "x-default": "/standards" } } };
export default function StandardsPage() { return <EditorialStandardsPage locale="ru" />; }
