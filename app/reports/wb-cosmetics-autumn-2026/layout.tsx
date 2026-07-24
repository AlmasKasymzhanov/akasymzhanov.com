import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Какие ниши косметики запускать на Wildberries осенью 2026",
  description: "Проверка 154 подкатегорий косметики: спрос, осенний тайминг, конкуренция, остатки, отзывы и план запуска.",
  robots: { index: false, follow: false },
};

export default function WBCosmeticsAutumnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
