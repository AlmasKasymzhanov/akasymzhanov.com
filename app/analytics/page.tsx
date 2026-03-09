import Link from "next/link";

const REPORTS: { title: string; desc: string; href: string; badge: string }[] = [];

export const metadata = {
  title: "Аналитика — Almas Kasymzhanov",
  description: "Enterprise-аналитика маркетплейсов: отчёты по нишам, рынкам и категориям.",
};

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 font-heading">
          Аналитика
        </h1>
        <p className="text-dim max-w-lg leading-relaxed">
          Enterprise-отчёты по нишам и рынкам маркетплейсов.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REPORTS.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="group block p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all no-underline"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-accent/15 text-accent">
                {r.badge}
              </span>
            </div>
            <h3 className="text-base font-semibold text-white group-hover:text-accent transition-colors font-heading mb-2">
              {r.title}
            </h3>
            <p className="text-sm text-dim leading-relaxed">
              {r.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
