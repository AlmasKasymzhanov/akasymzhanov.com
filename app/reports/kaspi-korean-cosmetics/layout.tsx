import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корейская косметика на Kaspi.kz — Enterprise-аналитика рынка",
  description:
    "Полный аналитический отчёт по рынку корейской косметики на Kaspi.kz: 73 000+ ниш, 21 бренд, 16 месяцев данных, ценовые сегменты, отзывы, стратегия входа.",
};

export default function KoreanCosmeticsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
