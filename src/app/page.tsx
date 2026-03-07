export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Алмас Касымжанов
        </h1>
        <p className="text-lg text-[var(--muted-foreground)]">
          Аналитика маркетплейсов &middot; Курсы &middot; Инструменты
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href="https://app.redstat.kz"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            RedStat Analytics
          </a>
          <a
            href="https://github.com/AlmasKasymzhanov"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-current/20 px-6 py-3 text-sm font-medium hover:bg-[var(--muted)] transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </main>
  );
}
