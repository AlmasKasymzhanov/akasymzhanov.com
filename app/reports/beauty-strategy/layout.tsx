import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Стратегические рекомендации — Beauty-портфель на Kaspi и Wildberries",
  description:
    "Финальный стратегический отчёт: приоритизация 21 бренда, каналы продаж, сезонная стратегия, ценовая политика, план действий по кварталам. На основе данных RedStat и MPStats.",
};

export default function StrategyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
