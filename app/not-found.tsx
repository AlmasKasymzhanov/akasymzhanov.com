import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-[64px] font-light text-[var(--color-text)] tracking-tight">404</p>
        <p className="font-mono text-[14px] text-[var(--color-dim)] mt-2">Страница не найдена</p>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--color-dim)] hover:text-[var(--color-text)] transition-colors mt-6 no-underline"
        >
          ← На главную
        </Link>
      </div>
    </div>
  );
}
