import type { Metadata } from "next";
import { EditorialStandardsPage } from "@/components/editorial-standards-page";

export const metadata: Metadata = { title: "Editorial standards — Kasymzhanov", description: "Sources, methodology, conflicts, AI use, and corrections at Kasymzhanov.", alternates: { canonical: "/en/standards", languages: { "ru-RU": "/standards", "en-US": "/en/standards", "x-default": "/standards" } } };
export default function StandardsPageEn() { return <EditorialStandardsPage locale="en" />; }
