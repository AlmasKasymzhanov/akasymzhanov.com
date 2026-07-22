import Link from "next/link";
import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "@/components/canon/site-chrome";
import { Term } from "@/components/canon/term";

const SOON_TIP = {
  ru: "Автор сейчас дорабатывает этот материал. Скоро будет доступно.",
  en: "The author is currently working on this. Coming soon.",
};

function ToolCard({ title, desc, href, badge }: { title: string; desc: string; href: string; badge: string }) {
  return (
    <Link
      href={href}
      className="group block p-6 border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)] transition-all no-underline"
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)] border border-[var(--color-brand)]/30">
          {badge}
        </span>
      </div>
      <h3 className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-[var(--color-dim)] leading-relaxed">{desc}</p>
    </Link>
  );
}

function SoonCard({ title, desc, badge, locale }: { title: string; desc: string; badge: string; locale: "ru" | "en" }) {
  return (
    <div className="group relative block p-6 border border-[var(--color-border)] bg-[var(--color-surface)]/60 text-[var(--color-dim)]/80 cursor-not-allowed overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg)]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
        <p className="text-center text-[13px] font-medium text-[var(--color-text)] leading-relaxed">
          {SOON_TIP[locale]}
        </p>
      </div>
      <div className="flex items-center gap-2.5 mb-3">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-[var(--color-dim)] border border-[var(--color-border)]">
          {badge}
        </span>
      </div>
      <h3 className="text-base font-bold text-[var(--color-text)] mb-2">{title}</h3>
      <p className="text-[13px] text-[var(--color-dim)] leading-relaxed">{desc}</p>
    </div>
  );
}

const TOOLS = [
  {
    title: "MCP-коннектор для Kaspi",
    desc: "Как Claude сам достаёт ниши, цены и долю «без бренда» на Kaspi — практический кейс с кодом.",
    href: "/blog/kaspi-mcp",
    badge: "Кейс",
    soon: false,
  },
  {
    title: "WB Niche Analyzer",
    desc: "Загрузите CSV из MPStats → мгновенный анализ ниши Wildberries: выручка, бренды, ценовые сегменты, монополизация.",
    href: "/tools/wb-analyzer",
    badge: "Анализатор",
    soon: true,
  },
  {
    title: "MPStats API Гайд",
    desc: "Пошаговый гайд по работе с API MPStats — от первого запроса до анализа данных в Claude.",
    href: "/tools/mpstats-api",
    badge: "Гайд",
    soon: true,
  },
  {
    title: "AI для селлеров",
    desc: "NotebookLM + Claude: база знаний без лимитов + мозг-аналитик. MCP, Claude for Sheets, API-интеграции.",
    href: "/tools/ai-seller-guide",
    badge: "Гайд",
    soon: true,
  },
];

export const metadata: Metadata = {
  title: "Практика — Kasymzhanov",
  description: "Инструменты, гайды и практические кейсы для аналитики маркетплейсов.",
  alternates: {
    canonical: "/tools",
    languages: { "ru-RU": "/tools", "en-US": "/en/tools", "x-default": "/tools" },
  },
};

export default function ToolsPage() {
  return (
    <div className="font-mono text-[var(--color-text)]">
      <div className="max-w-[1400px] mx-auto border-x border-[var(--color-border)] min-h-screen flex flex-col">
        <SiteHeader locale="ru" />

        <main className="w-full max-w-[1040px] mx-auto px-6 py-12 md:py-16">
          <header className="mb-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-brand)] mb-4">
              Рубрика
            </p>
            <h1 className="text-[32px] md:text-[44px] font-bold tracking-tight text-[var(--color-text)] leading-[1.05] mb-4">
              Практика
            </h1>
            <p className="text-[15px] md:text-[16px] text-[var(--color-dim)] leading-relaxed max-w-[640px]">
              Инструменты, гайды и практические кейсы для работы с данными маркетплейсов.
            </p>
          </header>

          <hr className="border-[var(--color-border)] mb-10" />

          <div className="grid gap-4 sm:grid-cols-2">
            {TOOLS.map((tool) =>
              tool.soon ? (
                <SoonCard key={tool.title} title={tool.title} desc={tool.desc} badge={tool.badge} locale="ru" />
              ) : (
                <ToolCard key={tool.title} title={tool.title} desc={tool.desc} href={tool.href} badge={tool.badge} />
              )
            )}
          </div>
        </main>

        <div className="flex-1" aria-hidden />
        <SiteFooter locale="ru" />
      </div>
    </div>
  );
}
