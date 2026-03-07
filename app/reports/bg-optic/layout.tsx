import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BG Optic — Аналитический отчёт: Выход на Kaspi.kz с очковой продукцией",
  description:
    "Enterprise-отчёт для BG Optic: анализ 3 сегментов очков на Kaspi.kz — солнцезащитные, для зрения, смарт-очки. Данные RedStat Analytics, январь 2026.",
};

export default function BgOpticLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
