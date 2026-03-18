import Link from "next/link";

const TOOLS = [
  {
    title: "WB Niche Analyzer",
    desc: "Загрузите CSV из MPStats → мгновенный анализ ниши Wildberries: выручка, бренды, ценовые сегменты, монополизация.",
    href: "/tools/wb-analyzer",
    badge: "Анализатор",
    color: "#6c5ce7",
  },
  {
    title: "MPStats API Гайд",
    desc: "Пошаговый гайд по работе с API MPStats — от первого запроса в Hoppscotch до анализа данных в Claude.",
    href: "/tools/mpstats-api",
    badge: "Гайд",
    color: "#00d2a0",
  },
  {
    title: "AI для селлеров",
    desc: "NotebookLM + Claude: база знаний без лимитов + мозг-аналитик. Установка MCP, Claude for Sheets, API-интеграции.",
    href: "/tools/ai-seller-guide",
    badge: "Занятие 5",
    color: "#e84393",
  },
];

export const metadata = {
  title: "Инструменты — Almas Kasymzhanov",
  description: "Инструменты для аналитики маркетплейсов: WB Niche Analyzer, MPStats API гайд.",
};

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 font-heading">
          Инструменты
        </h1>
        <p className="text-dim max-w-lg leading-relaxed">
          Инструменты и гайды для работы с данными маркетплейсов.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all no-underline"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: `${tool.color}22`, color: tool.color }}
              >
                {tool.badge}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors font-heading mb-2">
              {tool.title}
            </h3>
            <p className="text-sm text-dim leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
