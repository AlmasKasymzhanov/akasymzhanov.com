import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">
          Marketplace Analytics
        </h1>
        <p className="text-lg text-dim max-w-xl leading-relaxed">
          Аналитика маркетплейсов, инструменты для продавцов и enterprise-отчёты.
        </p>
      </div>

      <section>
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-dim mb-5">
          Аналитика
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/reports/bg-optic"
            className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all no-underline"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent">
                Аналитика
              </span>
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors font-heading mb-2">
              BG Optic — Рынок очков
            </h3>
            <p className="text-sm text-dim leading-relaxed">
              Enterprise-анализ 3 сегментов очков на Kaspi.kz: солнцезащитные, для зрения, смарт-очки.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
