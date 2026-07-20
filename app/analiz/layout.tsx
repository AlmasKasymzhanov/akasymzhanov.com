import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отбор ниш для Wildberries: 7 из 7 545 — анализ рынка",
  description:
    "Клиентский отчёт: отбор товарных ниш Wildberries по росту спроса в штуках и доле рынка. 7 545 ниш → 7 кандидатов. Данные MPStats, июль 2025 — июнь 2026.",
  // Клиентская страница: доступна по прямой ссылке, в поиске не участвует.
  robots: { index: false, follow: false },
};

export default function NicheReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
