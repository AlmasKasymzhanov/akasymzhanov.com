import type { Metadata } from "next";
import { NewsletterLanding } from "@/components/newsletter-landing";

export const metadata: Metadata = { title: "Newsletter — Kasymzhanov", description: "New investigations and data stories on digital markets and Central Asia.", alternates: { canonical: "/en/newsletter", languages: { "ru-RU": "/newsletter", "en-US": "/en/newsletter", "x-default": "/newsletter" } } };
export default function NewsletterPageEn() { return <NewsletterLanding locale="en" />; }
