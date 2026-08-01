import type { Metadata } from "next";
import { NewsletterLanding } from "@/components/newsletter-landing";

export const metadata: Metadata = { title: "Рассылка — Kasymzhanov", description: "Новые расследования и дата-разборы цифровых рынков — без ежедневного информационного шума.", alternates: { canonical: "/newsletter", languages: { "ru-RU": "/newsletter", "en-US": "/en/newsletter", "x-default": "/newsletter" } } };
export default function NewsletterPage() { return <NewsletterLanding locale="ru" />; }
