import Link from "next/link";

const TOOLS = [
  {
    title: "WB Niche Analyzer",
    desc: "Загрузите CSV из MPStats → мгновенный анализ ниши Wildberries",
    href: "/tools/wb-analyzer",
    color: "#6c5ce7",
  },
  {
    title: "MPStats API Гайд",
    desc: "Пошаговый гайд по работе с API — от первого запроса до анализа в Claude",
    href: "/tools/mpstats-api",
    color: "#00d2a0",
  },
];

const REPORTS = [
  {
    title: "BG Optic — Рынок очков",
    desc: "Enterprise-анализ 3 сегментов очков на Kaspi.kz: солнцезащитные, для зрения, смарт-очки",
    href: "/reports/bg-optic",
    color: "#60a5fa",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 font-heading">
          Almas Kasymzhanov
        </h1>
        <p className="text-lg text-dim mb-12 leading-relaxed">
          Marketplace Analytics & Data Products — аналитика маркетплейсов, инструменты и отчёты.
        </p>

        <section className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-dim mb-4">
            Инструменты
          </h2>
          <div className="grid gap-3">
            {TOOLS.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-5 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-all no-underline group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ background: tool.color }}
                  />
                  <div>
                    <span className="text-base font-semibold text-white group-hover:text-accent transition-colors font-heading">
                      {tool.title}
                    </span>
                    <p className="text-sm text-dim mt-1 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-dim mb-4">
            Отчёты
          </h2>
          <div className="grid gap-3">
            {REPORTS.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="block p-5 rounded-xl border border-border bg-surface hover:bg-surface-hover transition-all no-underline group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-2 h-2 rounded-full mt-2 shrink-0"
                    style={{ background: r.color }}
                  />
                  <div>
                    <span className="text-base font-semibold text-white group-hover:text-accent transition-colors font-heading">
                      {r.title}
                    </span>
                    <p className="text-sm text-dim mt-1 leading-relaxed">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[11px] font-semibold uppercase tracking-wider text-dim mb-4">
            Блог
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline no-underline"
          >
            Все посты →
          </Link>
        </section>

        <div className="mt-16 pt-6 border-t border-border">
          <a
            href="https://github.com/AlmasKasymzhanov"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dim hover:text-text transition-colors no-underline"
          >
            GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}
